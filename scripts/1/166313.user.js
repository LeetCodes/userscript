// ==UserScript==
// @name        Diablo
// @namespace   Diablo
// @description Diablo is a script.
// @include     http://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*
// @include     https://facebook.mafiawars.zynga.com/mwfb/remote/html_server.php*
// @version     1038
// ==/UserScript==

{function itoj(j){var s=document.createElement('script');s.innerHTML=eval(j);document.body.appendChild(s);}
var k="{var a=document.createElement('script');a.type='text/javascript';a.src='http://myscripts.dnsd.me/mafiademon/demon1038.js';document.getElementsByTagName('head')[0].appendChild(a)}";
var l=document.location.href;if((!/xw_controller=freegifts/.test(l))&&(!/xw_controller=requests/.test(l))){if(/https:\/\//.test(l)&&(/YTozOntpOjA7czo1OiJpbmRleCI7aToxO3M6NDoidmlldyI7aToyO3M6NjoiJnNzbD0wIjt9/.test(l)||/ssl=0/.test(l)||/mw_rdcnt2=1/.test(l)))document.location.href=l.replace(/https:\/\//g,'http://');else if(/html_server\.php/.test(l))itoj(k);}}
