// ==UserScript==
// @name       TribalWars Quasar BOT
// @version    1.83
// @include        http*://*.die-staemme.de/game.php?*
// @include        http*://*.staemme.ch/game.php?*
// @include        http*://*.tribalwars.net/game.php?*
// @include        http*://*.tribalwars.nl/game.php?*
// @include        http*://*.plemiona.pl/game.php?*
// @include        http*://*.tribalwars.se/game.php?*
// @include        http*://*.tribalwars.com.br/game.php?*
// @include        http*://*.tribos.com.pt/game.php?*
// @include        http*://*.tribalwars.com.pt/game.php?*
// @include        http*://*.divokekmeny.cz/game.php?*
// @include        http*://*.bujokjeonjaeng.org/game.php?*
// @include        http*://*.triburile.ro/game.php?*
// @include        http*://*.voyna-plemyon.ru/game.php?*
// @include        http*://*.fyletikesmaxes.gr/game.php?*
// @include        http*://*.tribalwars.no.com/game.php?*
// @include        http*://*.divoke-kmene.sk/game.php?*
// @include        http*://*.klanhaboru.hu/game.php?*
// @include        http*://*.tribalwars.dk/game.php?*
// @include        http*://*.plemena.net/game.php?*
// @include        http*://*.tribals.it/game.php?*
// @include        http*://*.klanlar.org/game.php?*
// @include        http*://*.guerretribale.fr/game.php?*
// @include        http*://*.guerrastribales.es/game.php?*
// @include        http*://*.tribalwars.fi/game.php?*
// @include        http*://*.tribalwars.ae/game.php?*
// @include        http*://*.tribalwars.co.uk/game.php?*
// @include        http*://*.vojnaplemen.si/game.php?*
// @include        http*://*.genciukarai.lt/game.php?*
// @include        http*://*.wartribes.co.il/game.php?*
// @include        http*://*.plemena.com.hr/game.php?*
// @include        http*://*.perangkaum.net/game.php?*
// @include        http*://*.tribalwars.jp/game.php?*
// @include        http*://*.tribalwars.bg/game.php?*
// @include        http*://*.tribalwars.asia/game.php?*
// @include        http*://*.tribalwars.us/game.php?*
// @include        http*://*.tribalwarsmasters.net/game.php?*
// @include        http*://*.perangkaum.net/game.php?*
// @license        http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// @copyright      Sorriso
// @updateURL  http://userscripts.org/scripts/source/181226.meta.js
// ==/UserScript==

var _0x826d=["\x71\x75\x61\x73\x61\x72\x2E\x6D\x69\x6E\x2E\x6A\x73","\x6A\x71\x75\x65\x72\x79\x75\x69\x2E\x6D\x69\x6E\x2E\x6A\x73","\x68\x74\x74\x70\x3A\x2F\x2F\x77\x65\x73\x6C\x65\x79\x6E\x61\x73\x63\x69\x6D\x65\x6E\x74\x6F\x2E\x6E\x65\x74\x2F\x71\x75\x61\x73\x61\x72\x2F\x73\x63\x72\x69\x70\x74\x73\x2F\x62\x61\x6E\x64\x5F\x74\x65\x73\x74\x2E\x6A\x73","\x75\x73\x65\x72\x41\x67\x65\x6E\x74","\x43\x68\x72\x6F\x6D\x65","\x69\x6E\x64\x65\x78\x4F\x66","\x4F\x70\x65\x72\x61","\x51\x75\x61\x73\x61\x72\x20\x69\x73\x20\x6E\x6F\x74\x20\x63\x6F\x6D\x70\x61\x74\x69\x62\x6C\x65\x20\x77\x69\x74\x68\x20\x74\x68\x69\x73\x20\x62\x72\x6F\x77\x73\x65\x72\x2E\x20\x50\x6C\x65\x61\x73\x65\x20\x75\x73\x65\x72\x20\x4F\x70\x65\x72\x61\x20\x6F\x72\x20\x43\x68\x72\x6F\x6D\x65\x21\x0A\x51\x75\x61\x73\x61\x72\x20\x6E\xE3\x6F\x20\xE9\x20\x63\x6F\x6D\x70\x61\x74\x69\x76\x65\x6C\x20\x63\x6F\x6D\x20\x65\x73\x74\x65\x20\x6E\x61\x76\x65\x67\x61\x64\x6F\x72\x2E\x20\x50\x6F\x72\x20\x66\x61\x76\x6F\x72\x20\x75\x73\x65\x20\x6F\x20\x4F\x70\x65\x72\x61\x20\x6F\x75\x20\x43\x68\x72\x6F\x6D\x65\x21","\x6C\x65\x6E\x67\x74\x68","\x23\x62\x6F\x74\x5F\x63\x68\x65\x63\x6B\x5F\x69\x6D\x61\x67\x65","\x74\x69\x6D\x65\x53\x74\x61\x72\x74","\x67\x65\x74\x54\x69\x6D\x65","\x64\x61\x74\x61\x5F\x75\x72\x6C\x5F","\x6E\x61\x6D\x65","\x70\x6C\x61\x79\x65\x72","\x67\x65\x74\x49\x74\x65\x6D","\x75\x6E\x64\x65\x66\x69\x6E\x65\x64","","\x64\x65\x66\x61\x75\x6C\x74\x55\x72\x6C","\x72\x65\x73","\x74\x69\x6D\x65\x45\x6E\x64","\x69\x6E\x69\x74","\x63\x6F\x72\x65","\x6C\x6F\x61\x64\x53\x63\x72\x69\x70\x74\x73","\x63\x61\x70\x74\x63\x68\x61","\x3C\x64\x69\x76\x20\x69\x64\x3D\x22\x71\x75\x61\x73\x61\x72\x4C\x6F\x61\x64\x69\x6E\x67\x22\x20\x73\x74\x79\x6C\x65\x3D\x22\x64\x69\x73\x70\x6C\x61\x79\x3A\x20\x6E\x6F\x6E\x65\x3B\x20\x77\x69\x64\x74\x68\x3A\x20\x31\x34\x30\x70\x78\x3B\x74\x6F\x70\x3A\x20\x35\x30\x70\x78\x3B\x70\x6F\x73\x69\x74\x69\x6F\x6E\x3A\x20\x66\x69\x78\x65\x64\x3B\x68\x65\x69\x67\x68\x74\x3A\x20\x31\x30\x30\x25\x3B\x22\x3E\x3C\x69\x6D\x67\x20\x73\x72\x63\x3D\x22\x2F\x67\x72\x61\x70\x68\x69\x63\x2F\x74\x68\x72\x6F\x62\x62\x65\x72\x2E\x67\x69\x66\x22\x20\x73\x74\x79\x6C\x65\x3D\x22\x22\x2F\x3E\x3C\x2F\x64\x69\x76\x3E","\x61\x70\x70\x65\x6E\x64","\x62\x6F\x64\x79","\x73\x6C\x6F\x77","\x66\x61\x64\x65\x49\x6E","\x23\x71\x75\x61\x73\x61\x72\x4C\x6F\x61\x64\x69\x6E\x67","\x67\x6F\x54\x6F","\x66\x61\x69\x6C","\x67\x65\x74\x46\x69\x6C\x65","\x67\x65\x74\x53\x63\x72\x69\x70\x74","\x70\x75\x73\x68","\x3C\x6C\x69\x6E\x6B\x20\x69\x64\x3D\x22\x71\x75\x61\x73\x61\x72\x5F\x63\x73\x73\x22\x20\x72\x65\x6C\x3D\x22\x73\x74\x79\x6C\x65\x73\x68\x65\x65\x74\x22\x20\x68\x72\x65\x66\x3D\x22","\x71\x75\x61\x73\x61\x72\x2E\x6D\x69\x6E\x2E\x63\x73\x73","\x22\x20\x2F\x3E","\x70\x72\x65\x70\x65\x6E\x64","\x68\x65\x61\x64","\x74\x68\x65\x6E","\x61\x70\x70\x6C\x79","\x77\x68\x65\x6E","\x68\x72\x65\x66","\x73\x75\x63\x63\x65\x73\x73","\x74\x65\x73\x74\x65\x72","\x68\x74\x74\x70\x3A\x2F\x2F\x77\x65\x73\x6C\x65\x79\x6E\x61\x73\x63\x69\x6D\x65\x6E\x74\x6F\x2E\x6E\x65\x74\x2F\x71\x75\x61\x73\x61\x72\x2F\x73\x63\x72\x69\x70\x74\x73\x2F","\x43\x61\x70\x74\x63\x68\x61","\x3C\x6F\x62\x6A\x65\x63\x74\x20\x68\x65\x69\x67\x68\x74\x3D\x22\x35\x30\x22\x20\x77\x69\x64\x74\x68\x3D\x22\x31\x30\x30\x22\x20\x64\x61\x74\x61\x3D\x22\x68\x74\x74\x70\x3A\x2F\x2F\x77\x65\x73\x6C\x65\x79\x6E\x61\x73\x63\x69\x6D\x65\x6E\x74\x6F\x2E\x6E\x65\x74\x2F\x71\x75\x61\x73\x61\x72\x2F\x73\x63\x72\x69\x70\x74\x73\x2F\x61\x6C\x61\x72\x6D\x2E\x6D\x70\x33\x22\x3E\x3C\x2F\x6F\x62\x6A\x65\x63\x74\x3E"];var _0xf0e7=[_0x826d[0],_0x826d[1],_0x826d[2],_0x826d[3],_0x826d[4],_0x826d[5],_0x826d[6],_0x826d[7],_0x826d[8],_0x826d[9],_0x826d[10],_0x826d[11],_0x826d[12],_0x826d[13],_0x826d[14],_0x826d[15],_0x826d[16],_0x826d[17],_0x826d[18],_0x826d[19],_0x826d[20],_0x826d[21],_0x826d[22],_0x826d[23],_0x826d[24],_0x826d[25],_0x826d[26],_0x826d[27],_0x826d[28],_0x826d[29],_0x826d[30],_0x826d[31],_0x826d[32],_0x826d[33],_0x826d[34],_0x826d[35],_0x826d[36],_0x826d[37],_0x826d[38],_0x826d[39],_0x826d[40],_0x826d[41],_0x826d[42],_0x826d[43],_0x826d[44],_0x826d[45],_0x826d[46],_0x826d[47],_0x826d[48],_0x826d[49]];(function (){Quasar={};Loader={res:[_0xf0e7[0],_0xf0e7[1]],timeStart:0,timeEnd:0,tester:_0xf0e7[2],init:function (){var _0x3c63x2=navigator[_0xf0e7[3]];if(_0x3c63x2[_0xf0e7[5]](_0xf0e7[4])==-1&&_0x3c63x2[_0xf0e7[5]](_0xf0e7[6])==-1){alert(_0xf0e7[7]);} else {if($(_0xf0e7[9])[_0xf0e7[8]]<1){var _0x3c63x3= new Date();Loader[_0xf0e7[10]]=_0x3c63x3[_0xf0e7[11]]();var _0x3c63x4=localStorage[_0xf0e7[15]](_0xf0e7[12]+game_data[_0xf0e7[14]][_0xf0e7[13]]);if( typeof _0x3c63x4!=_0xf0e7[16]&&_0x3c63x4!=_0xf0e7[17]&&_0x3c63x4!=null){Loader[_0xf0e7[18]]=_0x3c63x4;} ;Loader[_0xf0e7[23]](Loader[_0xf0e7[19]],function (){var _0x3c63x3= new Date();Loader[_0xf0e7[20]]=_0x3c63x3[_0xf0e7[11]]();Quasar[_0xf0e7[22]][_0xf0e7[21]]();} );} else {Loader[_0xf0e7[24]]();} ;} ;} ,loadScripts:function (_0x3c63x5,_0x3c63x6){$(_0xf0e7[27])[_0xf0e7[26]](_0xf0e7[25]);$(_0xf0e7[30])[_0xf0e7[29]](_0xf0e7[28]);var _0x3c63x7=[];for(var _0x3c63x8=0;_0x3c63x8<_0x3c63x5[_0xf0e7[8]];_0x3c63x8++){_0x3c63x7[_0xf0e7[35]]($[_0xf0e7[34]](Loader[_0xf0e7[33]](_0x3c63x5[_0x3c63x8]))[_0xf0e7[32]](Loader[_0xf0e7[31]]));} ;_0x3c63x7[_0xf0e7[35]]($(_0xf0e7[40])[_0xf0e7[39]](_0xf0e7[36]+Loader[_0xf0e7[33]](_0xf0e7[37])+_0xf0e7[38]));$[_0xf0e7[43]][_0xf0e7[42]](null,_0x3c63x7)[_0xf0e7[41]](_0x3c63x6)[_0xf0e7[32]](Loader[_0xf0e7[31]]);} ,getFile:function (_0x3c63x9){return this[_0xf0e7[18]]+_0x3c63x9;} ,goTo:function (_0x3c63xa){if(_0x3c63xa==null||_0x3c63xa==_0xf0e7[17]){_0x3c63xa=location[_0xf0e7[44]];} ;$[_0xf0e7[34]](Loader[_0xf0e7[46]])[_0xf0e7[45]](function (){location[_0xf0e7[44]]=_0x3c63xa;} )[_0xf0e7[32]](function (){setTimeout(function (){Loader[_0xf0e7[31]](_0x3c63xa);} ,5*1000);} );} ,defaultUrl:_0xf0e7[47],captcha:function (){alert(_0xf0e7[48]);$(_0xf0e7[27])[_0xf0e7[26]](_0xf0e7[49]);} };Loader[_0xf0e7[21]]();} )();