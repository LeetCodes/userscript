// ==UserScript==
// @name           Gaia Online Auto Surfer
// @author              jcgurango
// @description    First, turn of greasemonkey. Log in to gaia online. Then, turn on greasemonkey and refresh.
// @include        *.gaiaonline.*
// ==/UserScript==

link = new Array(23);

link[0] = "http://www.gaiaonline.com/";
link[1] = "http://www.gaiaonline.com/mygaia/";
link[2] = "http://www.gaiaonline.com/market/";
link[3] = "http://www.gaiaonline.com/community/";
link[4] = "http://www.gaiaonline.com/world/";
link[5] = "http://www.gaiaonline.com/games/";
link[6] = "http://www.gaiaonline.com/profile/inventory.php?mode=equip";
link[7] = "http://www.gaiaonline.com/homes/";
link[8] = "http://www.gaiaonline.com/auto/";
link[9] = "http://www.gaiaonline.com/aquarium/";
link[10] = "http://www.gaiaonline.com/profile/inventory.php";
link[11] = "http://www.gaiaonline.com/collectibles/";
link[12] = "http://www.gaiaonline.com/market/?cashshop=true";
link[13] = "http://www.gaiaonline.com/museum/";
link[14] = "http://www.gaiaonline.com/gaia/bank.php";
link[15] = "http://www.gaiaonline.com/mobile/";
link[16] = "http://www.gaiaonline.com/games/zomg/";
link[17] = "http://www.gaiaonline.com/news-and-events/";
link[18] = "http://www.gaiaonline.com/search/";
link[19] = "http://www.gaiaonline.com/conventions/";
link[20] = "http://www.gaiaonline.com/cinema/movies/";
link[21] = "http://www.gaiaonline.com/downloads";
link[22] = "http://www.gaiaonline.com/labs";
link[23] = "http://www.gaiaonline.com/info/gold/gcash/";
link[24] = "http://www.gaiaonline.com/premiumitems/";
link[25] = 
"http://www.gaiaonline.com/forum/";
link[26] = 
"http://www.gaiaonline.com/forum/myposts/";
link[27] = 
"http://www.gaiaonline.com/forum/mytopics/";
link[28] = 
"http://www.gaiaonline.com/info/gold/";
link[29] = 
"http://www.gaiaonline.com/mygaia/#notices/";
link[30] = 
"http://www.gaiaonline.com/cinema/vj/";

function changePage(){
window.location = link[Math.floor(Math.random()*23+1)];
}

setTimeout(changePage,23000);

// this should work no promises