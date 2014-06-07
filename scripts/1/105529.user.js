// ==UserScript==
// @name DictCN翻译
// @author DictCN
// @description  DictCN翻译
// @version 1.0.0.2
// @namespace  DictCN@alanfly
// @exclude        http://dict.cn/hc2/dict.php*
// @include *
// @updateURL     https://j.mozest.com/userscript/script/38.meta.js
// @screenshot    http://j.mozest.com/images/uploads/previews/000/00/00/59a65a5d-2253-84df-4a5b-255dd6b1fec8.jpg http://j.mozest.com/images/uploads/previews/000/00/00/thumb-59a65a5d-2253-84df-4a5b-255dd6b1fec8.jpg
// ==/UserScript==
(function(h,o){function P(){if(!(f.attachEvent&&f.readyState!=="complete")){d.unbindEvent(f,f.addEventListener?"DOMContentLoaded":"readystatechange",P);Q()}}function Q(){if(!R){for(var a in z)z[a]();R=true}}function ca(a){return a.replace(/-([a-z])/g,function(b,c){return c.toUpperCase()})}function da(a){if(!(a.which!=1||x)){var b=a.target;if(!(j.selfContains(b)||p.selfContains(b))){A();S();if(B.selfContains(b)){if(b=f.selection){b=b.createRange();b.parentElement();k={pageX:l.scrollLeft+b.boundingLeft,
pageY:l.scrollTop+b.boundingTop+b.boundingHeight-8}}else k=a;b="";if(/^input|textarea$/i.test(a.target.tagName))if(f.selection)b=f.selection.createRange().text;else{if(h.getSelection){a=a.target;if(a.selectionStart!=o)b=a.value.substring(a.selectionStart,a.selectionEnd)}}else if(h.getSelection)b=h.getSelection().toString();else if(f.getSelection)b=f.getSelection();else if(f.selection)b=f.selection.createRange().text;if(b.replace(/[^\x00-\xff]/g,"**").length>20)b="";if((r=T(b))&&i)if(y||q){G();C()}else{D.css({left:k.pageX+
"px",top:k.pageY+17+"px"}).show();H.css({left:k.pageX+8+"px",top:k.pageY+8+"px"}).show()}}}}}function ea(a){a.which==27&&U()}function A(){D.hide();H.hide()}function fa(){A();G();C(r);return false}function G(){if(!q){var a=k.pageX,b=k.pageY+10,c=f.body;if(a+332>(h.pageXOffset||l.scrollLeft||c.scrollLeft)+(l.clientWidth||c.clientWidth)){a-=332;b+=8}j.css({left:a+"px",top:b+"px"}).show()}I=true;if(i&&s.css("display")=="block"){t.appendTo(d("dictHcBottom").dom.firstChild);s.hide()}}function S(){if(!q)if(I){j.hide();
I=false;i||s.append(t).show()}}function U(a){if(!(a&&a.which!=1)){q=false;E.css("background-position","0 -44px");A();S();J();return false}}function ga(a){if(a.which==1){q=!q;E.css("background-position","0 -"+(q?66:44)+"px");return false}}function ha(){u.attr("style","border:1px solid #A1D9ED;");K.attr("checked",v);F.attr("checked",y);var a=u.offset();p.css({left:a.left+"px",top:a.top-49+"px"}).show();d("dictHcCntLine").show()}function J(a){clearTimeout(V);var b=d("dictHcCntLine");if(!(a&&(a.relatedTarget==
b.dom||a.relatedTarget==p.dom||a.relatedTarget==u.dom))){p.hide();u.attr("style",null)}}function W(){i=!i;L("dictHcEnable",i);t.css("background-position","3px -"+(i?105:127)+"px").html(i?unescape("%u5DF2%u5F00%u542F%u5212%u8BCD"):unescape("%u5DF2%u5173%u95ED%u5212%u8BCD"));return false}function ia(a){if(a.target.className!=="dictHcBtn1"){x=true;var b=j.offset();M={x:a.pageX-b.left,y:a.pageY-b.top};N.show();j.attr("class","dictHcDrag");return false}}function ja(a){if(x){var b=a.pageX-M.x;a=a.pageY-
M.y;if(b<0)b=0;if(a<0)a=0;j.css({left:b+"px",top:a+"px"})}}function ka(){if(x){x=false;j.attr("class",null);N.hide()}}function T(a){return a.replace(/^\s+|\s+$/g,"").replace(/\s*\r?\n\s*/g," ")}function C(){X.attr("src",Y+"dict.php?skin=default&q="+encodeURIComponent(r)+"#"+(v?1:0))}function L(a,b){d.cookie(a,b,{expires:3650,domain:f.domain})}if(!h.dictHc){var Z=h.dictHc={},f=h.document,l=f.documentElement,z=[],R=false,O={},w=document.createElement("div");w.style.display="none";w.innerHTML="<a href='/a' style='color:red;float:left;opacity:.55;'>a</a>";
w=w.getElementsByTagName("a")[0];O={style:/red/.test(w.getAttribute("style")),hrefNormalized:w.getAttribute("href")==="/a"};var la={"for":"htmlFor","class":"className",readonly:"readOnly",maxlength:"maxLength",cellspacing:"cellSpacing",rowspan:"rowSpan",colspan:"colSpan",tabindex:"tabIndex",usemap:"useMap",frameborder:"frameBorder"},ma=/^(?:href|src|style)$/,d=function(a){return new d.fn.init(a)};d.fn=d.prototype={init:function(a){this.dom=typeof a==="string"?f.getElementById(a):a.dom?a.dom:a;return this},
attr:function(a,b){if(typeof a==="object"){for(var c in a)this.attr(c,a[c]);return this}a=la[a]||a;c=this.dom;var g=b!==o,e=ma.test(a);if((a in c||c[a]!==o)&&!e)if(g)c[a]=b;else return c[a];else if(!O.style&&a==="style")if(g)c.style.cssText=""+b;else return c.style.cssText;else if(g)c.setAttribute(a,""+b);else return!O.hrefNormalized&&e?c.getAttribute(a,2):c.getAttribute(a);return this},css:function(a,b){if(typeof a==="object"){for(var c in a)this.css(c,a[c]);return this}c=this.dom.style;a=ca(a);
if(b!==o)c[a]=b;else return c[a];return this},show:function(){return this.css({display:"block"})},hide:function(){return this.css({display:"none"})},html:function(a){var b=this.dom;if(a!==o){b.innerHTML="";b.innerHTML=a}else return b.innerHTML;return this},text:function(a){var b=this.dom;if(a!==o)this.html("").append(f.createTextNode(a));else return d.text([b]);return this},offset:function(){var a;a=this.dom.getBoundingClientRect();var b=f.body;return{left:a.left+(h.pageXOffset||l.scrollLeft||b.scrollLeft)-
(l.clientLeft||b.clientLeft||0),top:a.top+(h.pageYOffset||l.scrollTop||b.scrollTop)-(l.clientTop||b.clientTop||0)}},bind:function(a,b){var c=this.dom,g={};if(typeof a==="object")g=a;else g[a]=b;for(a in g)d.bindEvent(c,a,g[a]);return this},append:function(a){this.dom.appendChild(a.dom?a.dom:a);return this},appendTo:function(a){d(a).append(this.dom);return this},contains:function(a){return d.contains(this.dom,a)},selfContains:function(a){return this.dom===a||d.contains(this.dom,a)}};d.fn.init.prototype=
d.fn;d.text=function(a){for(var b="",c,g=0;a[g];g++){c=a[g];if(c.nodeType===3||c.nodeType===4)b+=c.nodeValue;else if(c.nodeType!==8)b+=d.text(c.childNodes)}return b};d.contains=function(a,b){return a.contains?a!=b&&a.contains(b):!!(a.compareDocumentPosition(b)&16)};d.bindEvent=function(a,b,c){var g=b+c;a["e"+g]=c;a[g]=function(e){e=e||window.event;if(!e.target)e.target=e.srcElement||f;if(!e.relatedTarget&&e.fromElement)e.relatedTarget=e.fromElement===e.target?e.toElement:e.fromElement;if(e.pageX==
null&&e.clientX!=null){var m=f.documentElement,n=f.body;e.pageX=e.clientX+(m&&m.scrollLeft||n&&n.scrollLeft||0)-(m&&m.clientLeft||n&&n.clientLeft||0);e.pageY=e.clientY+(m&&m.scrollTop||n&&n.scrollTop||0)-(m&&m.clientTop||n&&n.clientTop||0)}if(e.which==null)e.which=e.charCode!=null?e.charCode:e.keyCode!=null?e.keyCode:null;if(!e.which&&e.button!==o)e.which=e.button&1?1:e.button&2?3:e.button&4?2:0;if(!(/mouse(over|out)/i.test(e.type)&&(e.target!==a&&!d.contains(a,e.target)||d.contains(a,e.relatedTarget))))if(a["e"+
g](e)===false){if(e.preventDefault){e.preventDefault();e.stopPropagation()}else e.returnValue=false;e.cancelBubble=true}};a.addEventListener?a.addEventListener(b,a[g],false):a.attachEvent("on"+b,a[g])};d.unbindEvent=function(a,b,c){c=b+c;a.removeEventListener?a.removeEventListener(b,a[c],false):a.detachEvent("on"+b,a[c]);a["e"+c]=a[c]=null};d.bindReady=function(a){if(f.readyState==="complete")return setTimeout(a,1);z[z.length]=a};d.bindEvent(f,f.addEventListener?"DOMContentLoaded":"readystatechange",
P);d.bindEvent(h,"load",Q);d.cookie=function(a,b,c){if(typeof b!="undefined"){c=c||{};var g=c.expires;if(b===null){b="";g=-1}if(typeof g==="number"){var e=g;g=new Date;g.setDate(g.getDate()+e)}return f.cookie=[encodeURIComponent(a),"="+encodeURIComponent(b),g?"; expires="+g.toUTCString():"",c.path?"; path="+c.path:"",c.domain?"; domain="+c.domain:"",c.secure?"; secure":""].join("")}else return(match=f.cookie.match(RegExp("(^|;| )"+a+"s*=([^;]*)(;|$)","i")))?unescape(match[2]):null};var B=f.documentElement,
Y="http://dict.cn/hc2/",$="default",aa=d(f);d(h);Z.init=function(a){if(a){if(a.area)B=a.area;if(a.skin)$=a.skin}};var na=function(a,b){if(typeof a==="string")r=a;else{var c=d(a);r=T(c.text());b=c.offset()}if(r){k={pageX:b.left,pageY:b.top+10};A();G();C()}},i=true,v=true,y=false,q=false,D,H,j,N,X,s,p,E,ba,t,u,K,F,I=false,x=false,M,r="",k,V;d.bindReady(function(){B=d(B);d(f.createElement("link")).attr({href:Y+"skins/"+$+"/hc.css?v1",rel:"stylesheet",type:"text/css"}).appendTo(f.getElementsByTagName("head")[0]);
D=d(f.createElement("div")).attr({id:"dictHcBtn",title:unescape("%u67E5%u8BE2%u5F53%u524D%u9009%u62E9%u8BCD")}).css("display","none").html(unescape("%u67E5%u8BCD%u5178")).appendTo(f.body);H=d(f.createElement("div")).attr("id","dictHcBtnTop").css("display","none").appendTo(f.body);j=d(f.createElement("div"));j.attr("id","dictHc").css("display","none").html('<div id="dictHcTop" onselectstart="return false"><div><span title="'+unescape("%u9501%u5B9A%u4F4D%u7F6E")+'" id="dictHcLock" class="dictHcBtn1"></span>&nbsp;<span title="'+
unescape("%u5173%u95ED")+' (Esc)" id="dictHcClose" class="dictHcBtn1"></span></div><span id="dictHcTitle">Dict.cn&nbsp;'+unescape("%u6D77%u8BCD")+"&nbsp;-&nbsp;"+unescape("%u5212%u8BCD%u91CA%u4E49")+'</span></div><div id="dictHcDragMask"></div><iframe id="dictHcContent" width="100%" height="100%" frameborder="0"></iframe><div id="dictHcBottom"><div><span id="dictHcEnable" class="dictHcBtn2" title="'+unescape("%u5F00%u542F%u6216%u5173%u95ED%u5212%u8BCD")+'">'+unescape("%u5DF2%u5F00%u542F%u5212%u8BCD")+
'</span></div><span id="dictHcSetting" class="dictHcBtn2">'+unescape("%u8BBE%u7F6E")+"</span></div>").appendTo(f.body);N=d("dictHcDragMask");X=d("dictHcContent");E=d("dictHcLock");ba=d("dictHcClose");t=d("dictHcEnable");u=d("dictHcSetting");p=d(f.createElement("div"));p.attr("id","dictHcSettingArea").css("display","none").html('<label for="dictHcSound"><input id="dictHcSound" type="checkbox" value="1" />'+unescape("%u60AC%u505C%u53D1%u97F3")+'</label><label for="dictHcDirect"><input id="dictHcDirect" type="checkbox" value="1" />'+
unescape("%u5373%u5212%u5373%u67E5")+'</label><div id="dictHcCntLine" />').appendTo(f.body);K=d("dictHcSound");F=d("dictHcDirect");s=d(f.createElement("div"));s.attr({id:"dictHcClosetip",href:""}).appendTo(f.body);aa.bind({mouseup:da,keydown:ea});D.bind("mouseup",fa);E.bind("mouseup",ga);ba.bind("mouseup",U);u.bind({mouseover:function(){V=setTimeout(ha,200)},mouseout:J});p.bind("mouseout",J);t.bind("click",W);K.bind("change",function(){v=d(this).attr("checked")?true:false;if(h._dict_config&&h.saveConfig){if(v)h._dict_config.ss=
_dict_config.ss>>1<<1;else h._dict_config.ss|=1;h.saveConfig()}L("dictHcSound",v);C()});F.bind("change",function(){y=F.attr("checked")?true:false;L("dictHcDirect",y)});d("dictHcTop").bind("mousedown",ia);aa.bind({mousemove:ja,mouseup:ka});var a=d.cookie("dictHcEnable"),b=d.cookie("dictHcSound"),c=d.cookie("dictHcDirect");a&&i!=(a==="true")&&W();if(b)v=b==="true"?true:false;if(c)y=c==="true"?true:false;i||s.append(t).show();Z.query=na})}})(window);