// ==UserScript==
// @name		JVCAuteurColor2
// @namespace		JVCAuteurColor2
// @version			0.2
// @description		Colore le pseudo de l'auteur v2
// @copyright		Craftbukkit
// @include		http://www.jeuxvideo.com/forums/1-*
// @include		http://www.jeuxvideo.com/forums/3-*
// @require		http://code.jquery.com/jquery-latest.min.js
// ==/UserScript==
var rep="";
url = document.URL;
url = url.split("#formpost").join("");
url = url.split("forums/3").join("forums/1");
url2 = url.split("-");
url3 = url.split("0-1-0");
urlfinal = url2[0]+"-"+url2[1]+"-"+url2[2]+"-1-0-1-0"+url3[1];
if(localStorage[urlfinal]) {
var pseudofinal = localStorage[urlfinal];
var s = document.body.innerHTML.split("<strong>"+pseudofinal+"</strong>").join("<font color='blue'><strong>"+pseudofinal+"</strong></font>");
document.body.innerHTML = s;
}
else if(urlfinal==document.URL)
{
msg = document.body.innerHTML;
var pseudos = msg.split("<li class=\"pseudo\">");
var speudos = pseudos[1].split("<strong>");
var speudoss = speudos[1].split("</strong>");
var pseudofinal = speudoss[0];
localStorage[urlfinal] = pseudofinal;
var s = document.body.innerHTML.split("<strong>"+pseudofinal+"</strong>").join("<font color='blue'><strong>"+pseudofinal+"</strong></font>");
document.body.innerHTML = s;
}
else
{
$(document).ready( function () { 					 
		$.ajax({
		   type: "GET",
		   url: urlfinal,
		   data: "",
		   success: function(msg){
var pseudos = msg.split("<li class=\"pseudo\">");
var speudos = pseudos[1].split("<strong>");
var speudoss = speudos[1].split("</strong>");
var pseudofinal = speudoss[0];
localStorage[urlfinal] = pseudofinal;
var s = document.body.innerHTML.split("<strong>"+pseudofinal+"</strong>").join("<font color='blue'><strong>"+pseudofinal+"</strong></font>");
document.body.innerHTML = s;
		   }
		});
});
}