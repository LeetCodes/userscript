// ==UserScript==
// @name           Kaskus & Mig33 Smiley for Facebook
// @icon           http://www.mig33.com/assets/images/mig33_logo.png
// @namespace      Kaskus mig33 Emoticon
// @description    smiley kaskus & mig33 for social network
// @require        http://userscripts.org/scripts/source/110547.user.js
// @include        http://*.facebook.com/*
// @include        http://twitter.com/*
// @include        http://www.mig33.com/*
// @version        2.1
// ==/UserScript==

var viewLogButton = document.createElement("div");viewLogButton.innerHTML="<a href=\"#\" onclick=\"window.open('http://www.kaskus.us/misc.php?do=getsmilies','popup','width=500,height=500,scrollbars=yes,resizable=no,toolbar=no,directories=no,location=no,menubar=no,status=no,left=100,top=60'); return false\"><img src=\"http://bangneo.co.cc/userscripts/button.jpg\" border=\"0\"/></a>";viewLogButton.setAttribute("style", "position: fixed; left: 0px; top: 300px; font-family: tahoma; font-size: 10pt; font-weight: 600; -moz-user-select: none; -khtml-user-select: none; cursor: pointer;");document.body.appendChild(viewLogButton);window=unsafeWindow;document=window.document;
replaceElement(document, yemo);
function listen(evt){
var node = evt.target;if (node.nodeType == document.ELEMENT_NODE) replaceElement(node, yemo); if (node.nodeType == document.TEXT_NODE) {var parent = node.parentNode;var span = replaceTextNode(node, yemo);if (span) parent.replaceChild(span, node);}}document.body.addEventListener('DOMNodeInserted', listen, true);
