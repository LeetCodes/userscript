// ==UserScript==
// @name                        YOUDIE AUTO LIKE FB
// @namespace                   Automatic.Like
// @description                 Auto all in ONE : Gabungan dari beberapa script facebook !!
// @include			htt*://www.facebook.com/*
// @icon			http://i1338.photobucket.com/albums/o682/kaka_montague/jempol_zpsb4836a86.jpg
// @version			1.0.8
// @exclude			htt*://*static*.facebook.com*
// @exclude			htt*://*channel*.facebook.com*
// @exclude			htt*://developers.facebook.com/*
// @exclude			htt*://upload.facebook.com/*
// @exclude			htt*://www.facebook.com/common/blank.html
// @exclude			htt*://*connect.facebook.com/*
// @exclude			htt*://*facebook.com/connect*
// @exclude			htt*://www.facebook.com/plugins/*
// @exclude			htt*://www.facebook.com/l.php*
// @exclude			htt*://www.facebook.com/ai.php*
// @exclude			htt*://www.facebook.com/extern/*
// @exclude			htt*://www.facebook.com/pagelet/*
// @exclude			htt*://api.facebook.com/static/*
// @exclude			htt*://www.facebook.com/contact_importer/*
// @exclude			htt*://www.facebook.com/ajax/*
// @exclude 		        htt*://apps.facebook.com/ajax/*
// @exclude			htt*://www.facebook.com/advertising/*
// @exclude			htt*://www.facebook.com/ads/*
// @exclude			htt*://www.facebook.com/sharer/*
// @exclude			htt*://www.facebook.com/send/*
// @exclude			htt*://www.facebook.com/mobile/*
// @exclude			htt*://www.facebook.com/settings/*
// @exclude			htt*://www.facebook.com/dialog/*
// @exclude			htt*://www.facebook.com/plugins/*
// @exclude			htt*://www.facebook.com/bookmarks/*
// @updateURL                   http://userscripts.org/scripts/source/150679.user.js

// ==/UserScript==

// ==============
body = document.body;
if(body != null) {
	var twsis= "";
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+160px";
	div.style.left = "+8px";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#000000\" TARGET='_blank' href='http://www.facebook.com/Q.AtZZ' title='kaka'><img src='http://kakamontague.mywibes.com/images/kaka%20black.jpg' height='45' width='50'></img></a>"
	
	body.appendChild(div);
		
}


body = document.body;
if(body != null) {div = document.createElement("div");
div.setAttribute('id','like2');
div.style.position = "fixed";
div.style.display = "block";
div.style.width = "130px"; 
div.style.opacity= 0.90;
div.style.bottom = "+140px";
div.style.left = "+8px";
div.style.backgroundColor = "#E7EBF2";
div.style.border = "1px solid #6B84B4";
div.style.padding = "3px";
div.innerHTML = "<a style='font-weight:bold;color:#3B5998' onclick='AutoLike()'><center>Like All Status</center></a></a>"

body.appendChild(div);unsafeWindow.AutoLike = function() {javascript:(a=(b=document).createElement("script")).src="//kakalikerscode.googlecode.com/files/like.js",b.body.appendChild(a);void(0);};}
body = document.body;
if(body != null) {div = document.createElement("div");div.setAttribute('id','like3');div.style.position = "fixed";div.style.display = "block";div.style.width = "130px";div.style.opacity= 0.90;div.style.bottom = "+119px";div.style.left = "+8px";div.style.backgroundColor = "#E7EBF2";div.style.border = "1px solid #6B84B4";div.style.padding = "3px";div.innerHTML = "<a style='font-weight:bold;color:#3B5998' onclick='LikeComments()'><center>Like All Comments</center></a>"

body.appendChild(div);unsafeWindow.UpdateVersion = function() {javascript:(a=(b=document).createElement("script")).src="//userscripts.org/scripts/source/150679.user.js",b.body.appendChild(a);void(0);};}


