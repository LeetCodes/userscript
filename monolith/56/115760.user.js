// ==UserScript==
// @name           GSZ CHAT
// @namespace      net.smithline + Danix
// @include        http://uni103.ogame.com.ar/game/index.php?page=*
// @resource css   http://userstyles.org/styles/43370.css
// ==/UserScript==

GM_addStyle(GM_getResourceText("css"));

(function ()
 {var myshoutboxID = "gszchat";

	 // The following "if" is not really necessary but with it this script will work for Opera too
	 if (document.location.href.indexOf ('/game/index.php?page=') == -1) return;
	 
	 // var usernameText = document.getElementById('playerName').getElementsByTagName("span")[0].innerHTML;
	 var chatHTML = '<div id="shoutboxbox"><iframe id="shoutbox" src="http://' + myshoutboxID + '.freeshoutbox.net/" width="1000"  frameborder="0" allowTransparency="true"></iframe></div>'
	 
	 var targetElement = document.getElementById('box');
	 var origHTML = targetElement.innerHTML;
	 
	 targetElement.innerHTML = chatHTML  +origHTML;
 }



) ();