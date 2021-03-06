// ==UserScript==
// @name       TamperScript
// @namespace  http://tampermonkey.biniok.net/
// @author     Jan Biniok
// @version    2.3.5
// @description  make UserScripts links one-click installable (links to *.user.js are caught by chrome)
// @icon       http://tampermonkey.net/images/icon.png
// @icon64     http://tampermonkey.net/images/icon128.png
// @homepage   http://tampermonkey.net/
// @include    http://*/*
// @include    https://*/*
// @resource   down /images/download.gif
// @resource   icon /images/icon.png
// @copyright  2011+, Jan Biniok
// ==/UserScript==

var userscript = ".user.js";
var visible = 'position:relative; top: 2px; left: -3px; height: 16px; width: 16px;';
var cvisible = 'position:relative; top: 2px; left: 3px; height: 16px; width: 16px;';
var invisible = 'display: none';
var config = JSON.parse(GM_getValue('config', "{}"));

var tamperScriptClickHandler = function(url, nat, delem, ielem, celem) {
    if (nat) {
        GM_notification("Open script to install as Chrome extension :(", null, "", null, 5000);
        window.location = url;
    } else {
        var cb = function(resp) {
            var msg = '';
            if (resp.found) {
                if (resp.installed) {
                    msg = "Script loaded and installed";
                } else {
                    msg = "Script loaded but not installed :(";
                    if (ielem) ielem.setAttribute('style', visible);
                    if (celem) celem.setAttribute('style', cvisible);
                }
            } else {
                msg = "Error loading script :(";
            }
            GM_notification(msg, null, "", null, 5000);
            if (delem) delem.setAttribute('style', invisible);
        };
        GM_notification("Fetching script...", "TamperScript", "", null, 5000);
        GM_installScript(url, cb);
    }
};

var modifyUserScriptLinks = function(event) {
    // console.log(event);
    var aarr = [];

    if (event.type && event.type.search("DOMContentLoaded") != -1) {
        aarr = document.getElementsByTagName('a');
    } else {
        if (event.target && event.target.getElementsByTagName) {
            var r = event.target.getElementsByTagName('a');
            for (var k=0; k<r.length; k++) {
                aarr.push(r[k]);
            }
        }
        aarr.push(event.target);
    }

    for (var k=0; k<aarr.length; k++) {
        var a = aarr[k];
        var handled = false;
        if (a.href && a.href.search(userscript) != -1) {
            var d = document.createElement('img');
            d.src = TM_getResourceURL('down');
            d.setAttribute('style', invisible);
            d.setAttribute('id', 'TM_download_' + k);
            var i = document.createElement('img');
            i.src = TM_getResourceURL('icon');
            i.setAttribute('style', visible);
            i.setAttribute('id', 'TM_install_' + k);
            var c = document.createElement('img');
            c.src = 'http://www.google.com/images/icons/product/chrome-16.png';
            c.setAttribute('style', cvisible);
            c.setAttribute('id', 'TM_chrome_' + k);

            var install = function () {
                var d = document.getElementById('TM_download_' + this.idx);
                var i = document.getElementById('TM_install_' + this.idx);
                var c = document.getElementById('TM_chrome_' + this.idx);
                d.setAttribute('style', visible);
                if (i) i.setAttribute('style', invisible);
                if (c) c.setAttribute('style', invisible);
                tamperScriptClickHandler(this.tamper, null, d, i, c);
            };
            var narf = function () {
                tamperScriptClickHandler(this.tamper, true);
            };

            var prepareNode = function(idx, n, fn, comment) {
                if (comment == undefined) comment = 'Tampermonkey! :)';
                n.addEventListener('click', fn);
                n.tamper = a.href;
                n.idx = idx;
                n.title = comment;
            };

            if ((window.location.host == 'www.userscripts.org' ||
                 window.location.host == 'userscripts.org' ||
                 window.location.host == 'webcache.googleusercontent.com') &&
                a.getAttribute('class') == 'userjs') {
                var v = document.createElement('span');
                var cn = a.childNodes[0];
                prepareNode(k, v, install, null);
                prepareNode(k, i, install);
                prepareNode(k, c, narf, 'Native Extension :(');
                a.appendChild(d);
                a.appendChild(i);
                a.appendChild(v);
                a.appendChild(c);
                a.removeChild(cn);
                v.appendChild(cn);
                a.href = 'javascript://nop/';
                handled = true;
            }
        }
        if (!handled) {
            var check = function(e) {
                var findA = function(a, cnt) {
                    if (cnt == undefined) cnt = 10;
                    if (cnt == 0) return null;
                    if (a.tagName === "A") {
                        return a;
                    } else if (a.parentNode) {
                        return findA(a.parentNode, cnt-1);
                    }
                    return null;
                };

                var a = findA(e.target);
                if (a && a.href && a.href.search(userscript) != -1) {
                    var c = true;
                    if (config.hide_warning) {
                        GM_log("Wahhh. Userscipt found at click! :)");
                    } else {
                        var s = '';
                        s += "Tampermonkey noticed a click at a userscript.\n\n";
                        s += "Do you want to install this script:\n\n";
                        s += " * in Tampermonkey (Ok)?\n";
                        s += " * natively in Chrome (Cancel)?\n";
                        c = confirm(s);
                        GM_log("Wahhh. Userscipt found at click!");
                    }
                    if (c) {
                        var oldhref = a.href;
                        var wrap = function() {
                            var ab = a;
                            var revert = function() {
                                ab.href = oldhref;
                            };
                            window.setTimeout(revert, 700);
                        };
                        wrap();
                        a.href = "javascript://nop/";
                        e.stopPropagation();
                        tamperScriptClickHandler(oldhref, false);
                    }
                }
            }
            a.addEventListener('click', check, true);
        }
    }
};

var addNodeInsertedListener = function() {
    document.addEventListener("DOMNodeInserted", modifyUserScriptLinks, false);
};

document.addEventListener("DOMContentLoaded", modifyUserScriptLinks, false);
document.addEventListener("DOMContentLoaded", addNodeInsertedListener, false);
