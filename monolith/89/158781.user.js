// ==UserScript==
// @name        Hf l33t to legion replacement. 
// @author 	beginnerhackingsection
// @namespace   http://userscripts.org/users/BeginnerHackingSection
// @include     http*://www.hackforums.net/*
// @version     1.2
// @description Changes the userbar
// @grant none
// ==/UserScript==

var ilist = document.images;
for(var i = 0; i < ilist.length; i++) {
    if(ilist[i].src == "http://cdn2.hackforums.net/images/blackreign/groupimages/english/ub3r.png") {
         ilist[i].src = "http://i.minus.com/iN0n2mYMaqL4O.png";
    }
}