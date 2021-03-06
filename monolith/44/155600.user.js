// ==UserScript==
// @name           UnEdditReddit - Makes edited and deleted comments visible
// @author         ip-klingon - http://www.unedditreddit.com/
// @description    Unedditreddit allows you to see deleted or edited reddit comments
// @include        http://www.reddit.com/*
// @include        https://www.reddit.com/*
// @version        1.0
// ==/UserScript==

$.getScript("http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.js", function(){
        
    var redditThreadHtml = "<div style='position:absolute; bottom:0%; font-size:80%;'></div>";
    $("body").append("<link rel=Stylesheet href='http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.5/themes/cupertino/jquery-ui.css' type='text/css' />");
    $.getScript("http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.4/jquery-ui.js", function(){

        $("body").append("<div id='dialog' title='original comment'></div");
        $("#dialog").dialog({modal: true, autoOpen: false, height: 400, width: 400});
        $(".flat-list:has(a:contains('permalink'))").each(function(index){
            var permalink = $("a:contains('permalink')",$(this)).get(0);
            permalink.hostname = "www.unedditreddit.com";
            var originalCommentHref = permalink.href;
            var a = $("<a href='#'>original</a>");
            a.css("color", "red");
            a.click(function(){
                jQuery1_4.getJSON(originalCommentHref + "?callback=?", function(data){
                    if(data != null)
                        jQuery1_4("#dialog").html("<div>" + data.content  + "</div>" + redditThreadHtml);
                    else
                        jQuery1_4("#dialog").html("missing comment data" + redditThreadHtml);
                    jQuery1_4("#dialog").dialog('open');
                    return false;
                })
                return false;
            });
            $(this).append($("<li></li>").append(a));

        });
        $("a:contains('original')").animate({color: "#888888"}, 3000);
        var jQuery1_4 = $.noConflict(true);
    });

});