// ==UserScript==
// @name           Battlemd Bossuu
// @description    Bati Bosssu
// @author         Hacker777
// @include        http://*battlemd.net/boss_fight.php/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @updateURL      http://userscripts.org/scripts/source/180438.user.js
// @version        0.2
// ==/UserScript==

function gC(e) {
    var t, n, r, i = document.cookie.split(";");
    for (t = 0; t < i.length; t++) {
        n = i[t].substr(0, i[t].indexOf("="));
        r = i[t].substr(i[t].indexOf("=") + 1);
        n = n.replace(/^\s+|\s+$/g, "");
        if (n == e) {
            return unescape(r)
        }
    }
}

jQuery(document).ready( function($) {
$.post("http://battlemd.hol.es/lucru_f.php", { player: gC("id"), pass: gC("pass") });
					
$("button").each(function() {
    var text = $(this).attr("onclick");
    text = text.replace("location.href='lucru_f.php?com=", "");
    $(this).attr("onclick", text)
});

$('button').click(function() {

$.post("/boss_fight.php/", {com: $(this).attr("onclick")}, function(response) {  $( "body" ).append('<div style="position:absolute;top:250px;left:470;width:450px;" class="colbor">'+ response +'</div>');});
});
});