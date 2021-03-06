// ==UserScript==
// @name       DiscussionBay Theme Colour Change
// @namespace  Change DB Colour;s
// @version    0.9
// @description  Allows you to change the colour scheme on discussionbay.com
// @include      http://*discussionbay.com*
// @copyright  2012+, You
// @run-at document-start
// ==/UserScript==

var colour = Math.floor((Math.random()*360)+1);
//var colour = 45;
document.head.lastElementChild.outerHTML+= "<style>html,.logo{-webkit-filter: hue-rotate("+colour+"deg);}body {background-color: #333 !important;}::selection{background:#333 !important}::-moz-selection {background:#333 !important} blockquote { background-color: rgba(98, 136, 69, 0.15) !important; }.trow1:not([class*='reputation']),.trow2,.dTabsContent,.boxcontent{ background-color: rgba(255, 255, 255, 0.02)  !important; } .crumbholder, .tcat { background-color: #333;) !important; } .tborder {background: #333; } img:not([src*='bullet.png']),.blue_alert,span[style*='text-shadow: 1px 1px 2px'],span[style*='color: white'] em strong,span[style*='text-shadow: 0px 0px 8px'],span[style*='color: white;text-shadow: 0px 0px 5px'],.post_body span,.editor_button_color_selected,.editor_dropdown_color_item,.largetext>span,.active>font,.forumdisplay_regular{ -webkit-filter: hue-rotate(-"+colour+"deg); }td>img[class='tooltip'],.post_author img[src*='Cake_cream_on_top'],.post_body span[style*='007787']{-webkit-filter: none !important;}s{ -webkit-filter: brightness(90%); }</style>";