// ==UserScript==
// @name           Island Town View Arabic
// @namespace      http://s*.ikariam.*/*
// @description    Changes the townview to include a island, 24 different phases (Arabic).
// @include        http://s*.ikariam.*/*
// @exclude        http://s*.ikariam.*/skin/*
// @exclude        http://s*.ikariam.*/js/*
// @exclude        http://s*.ikariam.*/index.php?action=newPlayer
// ==/UserScript==


// This is an adaptation for the arabic servers , the original one can be downloaded from : http://userscripts.org/scripts/show/48916

 var URL= "http://i752.photobucket.com/albums/xx165/firstcauchemar/IslandView/";

GM_addStyle("#city #container .phase1	{background-image:url("+URL+"City_1.jpg)}");
GM_addStyle("#city #container .phase2	{background-image:url("+URL+"City_2.jpg)}");
GM_addStyle("#city #container .phase3	{background-image:url("+URL+"City_3.jpg)}");
GM_addStyle("#city #container .phase4	{background-image:url("+URL+"City_4.jpg)}");
GM_addStyle("#city #container .phase5	{background-image:url("+URL+"City_5.jpg)}");
GM_addStyle("#city #container .phase6	{background-image:url("+URL+"City_6.jpg)}");
GM_addStyle("#city #container .phase7	{background-image:url("+URL+"City_7.jpg)}");
GM_addStyle("#city #container .phase8	{background-image:url("+URL+"City_8.jpg)}");
GM_addStyle("#city #container .phase9	{background-image:url("+URL+"City_9.jpg)}");
GM_addStyle("#city #container .phase10	{background-image:url("+URL+"City_10-1.jpg)}");
GM_addStyle("#city #container .phase11	{background-image:url("+URL+"City_11-1.jpg)}");
GM_addStyle("#city #container .phase12	{background-image:url("+URL+"City_12.jpg)}");
GM_addStyle("#city #container .phase13	{background-image:url("+URL+"City_13.jpg)}");
GM_addStyle("#city #container .phase14	{background-image:url("+URL+"City_14.jpg)}");
GM_addStyle("#city #container .phase15	{background-image:url("+URL+"City_15.jpg)}");
GM_addStyle("#city #container .phase16	{background-image:url("+URL+"City_16.jpg)}");
GM_addStyle("#city #container .phase17	{background-image:url("+URL+"City_17.jpg)}");
GM_addStyle("#city #container .phase18	{background-image:url("+URL+"City_18.jpg)}");
GM_addStyle("#city #container .phase19	{background-image:url("+URL+"City_19.jpg)}");
GM_addStyle("#city #container .phase20	{background-image:url("+URL+"City_20.jpg)}");
GM_addStyle("#city #container .phase21	{background-image:url("+URL+"City_21.jpg)}");
GM_addStyle("#city #container .phase22	{background-image:url("+URL+"City_22.jpg)}");
GM_addStyle("#city #container .phase23	{background-image:url("+URL+"City_23.jpg)}");
GM_addStyle("#city #container .phase24	{background-image:url("+URL+"City_24.jpg)}");
GM_addStyle("#city #container .phase25	{background-image:url("+URL+"City_24.jpg)}");
GM_addStyle("#city #container .phase26	{background-image:url("+URL+"City_24.jpg)}");
GM_addStyle("#city #container .phase27	{background-image:url("+URL+"City_24.jpg)}");
GM_addStyle("#city #container .phase28	{background-image:url("+URL+"City_24.jpg)}");
GM_addStyle("#city #container .phase29	{background-image:url("+URL+"City_24.jpg)}");
GM_addStyle("#city #container .phase30	{background-image:url("+URL+"City_24.jpg)}");

// Building spots
GM_addStyle("#city #container #mainview #locations #position0		{right: 466px;	top: 152px;}")
GM_addStyle("#city #container #mainview #locations #position1		{right: 220px;	top: 351px;}")
GM_addStyle("#city #container #mainview #locations #position2		{right: 539px;	top: 344px;}")
GM_addStyle("#city #container #mainview #locations #position3		{right: 617px;	top: 260px;}")
GM_addStyle("#city #container #mainview #locations #position4		{right: 485px;	top: 218px;}")
GM_addStyle("#city #container #mainview #locations #position5		{right: 313px;	top: 253px;}")
GM_addStyle("#city #container #mainview #locations #position6		{right: 75px;	top: 330px;}")
GM_addStyle("#city #container #mainview #locations #position7		{right: 11px;	top: 226px;}")
GM_addStyle("#city #container #mainview #locations #position8		{right: 84px;	top: 144px;}")
GM_addStyle("#city #container #mainview #locations #position9		{right: 225px;	top: 187px;}")
GM_addStyle("#city #container #mainview #locations #position10		{right: 45px;	top: 55px;} ")
GM_addStyle("#city #container #mainview #locations #position11		{right: 580px;	top: 114px;}")
GM_addStyle("#city #container #mainview #locations #position12		{right: 373px;	top: 65px;} ")
GM_addStyle("#city #container #mainview #locations #position13		{right: 253px;	top: 82px;} ")
GM_addStyle("#city #container #mainview #locations #position14		{right: 501px;	top: 13px;} ")

GM_addStyle("#city #container #mainview #locations .wall .buildingimg	{left:-500px;top:-15px;width:720px;height:137px;background-image:url("+URL+"Building_Wall.png)}");



GM_addStyle(".beachboys 		{display: none;}");
GM_addStyle(".garnisonOutpost	{display: none;}");
GM_addStyle(".garnison			{display: none;}");
GM_addStyle(".garnisonGate1		{display: none;}");
GM_addStyle(".garnisonGate2		{display: none;}");
GM_addStyle(".garnisonCenter	{display: none;}");
