// ==UserScript==
// @name          BuGil_Hider
// @namespace     http://userscripts.org/scripts/show/125911
// @description   Block thread bule gila di Computer Stuff
// @include       http://www.kaskus.us/forumdisplay.php?*
// @include       http://livebeta.kaskus.us/forum*
// @include       http://m.kaskus.us/forum/*
// @include       http://opera.kaskus.us/forum/*
// @version       2.1.36
// @author        Boule, the ultimate junker nubitol
// ==/UserScript==
var whit = new Array();
var patB = new Array();
var patS = new Array();
var patI = new Array();

//--------- whit Section ---------
whit[0]=/\[ask\]/gi;
whit[1]=/\[help\]/gi;
whit[2]=/\[share\]/gi;
whit[3]=/\Sticky:/gi;
whit[4]=/Manager League - Online Footbal Manager/gi;
whit[5]=/Blue HTV Online/gi;
whit[6]=/IHSG news Update/gi;
whit[7]=/Western Digital bayar/;
whit[8]=/Carona/;
whit[9]=/Unboxing and Review/;
whit[10]=/Komputer Kecil \$25/;
whit[11]=/Membuat TV online \/ streaming sendiri/;
whit[12]=/Mencari Uang Dengan Mudah !! sampai \$3000\/Bulan !!/;
whit[13]=/Agan2 yang mengerti bahasa program game online server side masuk dunk/;
whit[14]=/VSAT ipstar/;
whit[15]=/AllMyTube for Mac/;
whit[16]=/WD MYBOOK WORLD VS WD MYBOOK LIVE/;
whit[17]=/The Great Merchant Online [Maho Will Live Forever]/;
//--------- patB Section ---------
patB[0]=/live/gi;
patB[1]=/watch/gi;
patB[2]=/vs/gi;
patB[3]=/online/gi;
patB[4]=/soccer/gi;
patB[5]=/golf/gi;
patB[6]=/boxing/gi;
patB[7]=/champions/gi;
patB[8]=/league/gi;
patB[9]=/discount/gi;
patB[10]=/cheap/gi;
patB[11]=/sopcast/gi;
patB[12]=/american/gi;
patB[13]=/prescription/gi;
patB[14]=/viagra/gi;
patB[15]=/purse/gi;
patB[16]=/chanel/gi;
patB[17]=/stream/gi;
patB[18]=/cup/gi;
patB[19]=/preview/gi;
patB[20]=/federer/gi;
patB[21]=/del potro/gi;
patB[22]=/broadcasting/gi;
patB[23]=/gatorade/gi;
patB[24]=/daytona/gi;
patB[25]=/kartenlegen/gi;
patB[26]=/w@tch/gi;
patB[27]=/enjoy/gi;
patB[28]=/formula 1/gi;
patB[29]=/grand prix/gi;
patB[30]=/ncaa/gi;
patB[31]=/basketball tv/gi;
patB[32]=/handbags/gi;
patB[33]=/@/gi;
patB[34]=/tv feed/gi;
patB[35]=/hd quality/gi;
patB[36]=/episode/gi;
patB[37]=/regarder/gi;
//--------- patS Section ---------
patS[0]=/\$\d/gi;
patS[1]=/w~a~t~c~h/gi;
patS[2]=/e~n~j~o~y/gi;
patS[3]=/{UTV}/gi;
patS[4]=/online video/gi;
patS[5]=/TV!!PC/gi;
patS[6]=/cigaret/gi;
patS[7]=/tobacco/gi;
patS[8]=/dunhill/gi;
patS[9]=/kent /gi;
patS[10]=/lucky strike/gi;
patS[11]=/pall mall/gi;
patS[12]=/apollo soyuz/gi;
patS[13]=/benson/gi;
patS[14]=/bond street/gi;
patS[15]=/cambridge/gi;
patS[16]=/caro /gi;
patS[17]=/chesterfield/gi;
patS[18]=/kazakstan/gi;
patS[19]=/klubowe/gi;
patS[20]=/l&m/gi;
patS[21]=/lark /gi;
patS[22]=/longbeach/gi;
patS[23]=/marlboro/gi;
patS[24]=/merit/gi;
patS[25]=/multifilter/gi;
patS[26]=/muratti/gi;
patS[27]=/parliament/gi;
patS[28]=/peter jackson/gi;
patS[29]=/petra/gi;
patS[30]=/philip morris/gi;
patS[31]=/polyot/gi;
patS[32]=/vatra/gi;
patS[33]=/virginia slims/gi;
patS[34]=/ear candle/gi;
patS[35]=/kindle book/gi;
patS[36]=/soccer tv!!/gi;
patS[37]=/hd tv\^\^\^/gi;
patS[38]=/dvd iphho santosa/gi;
patS[39]=/dvd tung desem waringin/gi;
patS[40]=/dvd bong/gi;
patS[41]=/%%~Click~%%/gi;
patS[42]=/500@@2012/;
patS[43]=/International Friendly Football/;
patS[44]=/toyar matha/gi;
patS[45]=/lion tv/gi;
patS[46]=/tv fox/gi;
patS[47]=/hello lover/gi;
patS[48]=/padtype\(tm\)/gi;
patS[49]=/sunbritetv/gi;
patS[50]=/hurricanes vs crusaders/gi;
patS[51]=/el clasico/gi;
patS[52]=/ufc 145/gi;
patS[53]=/hd tv link/gi;
patS[54]=/en vivo/gi;
patS[55]=/burberry/gi;
patS[56]=/bondhu/gi;
patS[57]=/nascar/gi;
patS[58]=/register.php/gi;
patS[59]=/polsat/gi;
patS[60]=/best sex dating/gi;
patS[61]=/discount dvd/gi;
patS[62]=/results 2012/gi;
patS[63]=/shuihcuissc/gi;
patS[64]=/unlock iphone to/gi;
patS[65]=/unlock iphone 3g for/gi;
patS[66]=/match is very interesting and enjoyable/gi;
patS[67]=/extreme rules 2012/gi;
patS[68]=/paulie malignaggi/gi;
patS[69]=/watch the Avengers 2012/gi;
patS[70]=/nhl playoff/gi;
patS[71]=/chalon-sur-saone/gi;
patS[72]=/manchester city v/gi;
patS[73]=/so you think you can dance review:/gi;
patS[74]=/finpecia/gi;
patS[75]=/broadcast on your pc tv/gi;
patS[76]=/kermit, miss piggy/gi;
patS[77]=/primetime emmy awards/gi;
patS[78]=/how do you bypass windows/gi;
patS[79]=/valencia vs osasuna/gi;
patS[80]=/rlialsm xvi/gi;
patS[81]=/host new reality show/gi;
patS[82]=/birmingham v blackpool live/gi;
patS[83]=/blackpool v birmingham live/gi;
patS[84]=/the whole picture less expensive:/gi;
patS[85]=/www.av-hospital.blogspot.com:/gi;
//--------- patI Section ---------
patI[0]=/Naimur.Rahman/gi;
patI[1]=/rocalabs/gi;
patI[2]=/daynasona/gi;
patI[3]=/aslam/gi;
patI[4]=/reznikbon/gi;
patI[5]=/manoo/gi;
patI[6]=/muhibulah/gi;
patI[7]=/fmxnntyfwo/gi;
//--------- end  Section ---------

//------ function setCookie() & getCookie() taken from www.w3schools.com ------
function setCookie(c_name,value,exdays)
{
  var exdate = new Date();
  exdate.setDate(exdate.getDate() + exdays);

  var c_value=escape(value) + ((exdays==null) ? "" : "; expires=" + exdate.toUTCString());
  document.cookie=c_name + "=" + c_value;
};

function getCookie(c_name)
{
  var i,x,y,ARRcookies=document.cookie.split(";");
  for (i=0; i<ARRcookies.length; i++)
  {
    x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
    y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
    x = x.replace(/^\s+|\s+$/g,"");

    if (x==c_name)
    {
      return unescape(y);
    };
  };
};
// ----------------------------------------------------------------------------


function getButtonValue()
{
  var combValue = getCookie("BuGil_Hider");

  if (combValue!=null && combValue!="")
  {
    var spltValue = combValue.split("");

    if(spltValue[0] == "1") { var convSF  = "Show subforum"; } else { var convSF  = "Hide subforum"; }
    if(spltValue[1] == "1") { var convStk = "Show sticky"; }   else { var convStk = "Hide sticky"; }
    if(spltValue[2] == "1") { var convBot = "Show bot"; }      else { var convBot = "Hide bot"; }

    if(btnSF.value  != convSF)  { btnSF.click(); }
    if(btnStk.value != convStk) { btnStk.click(); }
    if(btnBot.value != convBot) { btnBot.click(); }
  }
}


function putButtonValue()
{
  var combValue = "";

  if(btnSF.value == "Show subforum")
  {
    combValue += "1";
  }
  else
  {
    combValue += "0";
  }

  if(btnStk.value == "Show sticky")
  {
    combValue += "1";
  }
  else
  {
    combValue += "0";
  }

  if(btnBot.value == "Show bot")
  {
    combValue += "1";
  }
  else
  {
    combValue += "0";
  }

  //alert(combValue);
  setCookie("BuGil_Hider", combValue, 7);
}

function IsBot(param)
{
  for (var i=0; i<whit.length; i++)
  {
    if (param.match(whit[i]) != null)
    {
      return false;
    }
  }

  var foundStat = 0;
  for (var i=0; i<patB.length; i++)
  {
    if (param.match(patB[i]) != null)
    {
      foundStat++;

      if (foundStat == 2)
      {
        return true;
      }
    }
  }

  for (var i=0; i<patS.length; i++)
  {
    if (param.match(patS[i]) != null)
    {
      return true;
    }
  }

  for (var i=0; i<patI.length; i++)
  {
    if (param.match(patI[i]) != null)
    {
      return true;
    }
  }

  return false;
}

function DisplayProc()
{
  var blokirs = document.getElementsByTagName("tr");

  for (i=0; i<blokirs.length; i++)
  {
    if(blokirs[i].innerHTML.match(/td_threadtitle_/gi))
    {
      try
      {

        if(blokirs[i].innerHTML.match(/Sticky:/) && btnBot.value == "Show bot" && btnStk.value == "Show sticky")
        {
          blokirs[i].style.display = "none";
          continue;
        }     

        if (IsBot(blokirs[i].innerHTML) == true)
        {
          if(btnBot.value == "Show bot")
          {
            blokirs[i].style.display = "none";
          }
          else
          {
            blokirs[i].style.display = "";
          }
        }
        else
        {
          if(btnBot.value == "Show bot")
          {
            blokirs[i].style.display = "";
          }
          else
          {
            blokirs[i].style.display = "none";
          }
        }
      }
      catch (e) { };
    }
  }
}

//------ Main proc ------
if (document.URL.match(/m.kaskus.us/gi) != null)
{
  var blokirs = document.getElementsByTagName("a");

  for (i=0; i<blokirs.length; i++)
  {
    if (IsBot(blokirs[i].innerHTML) == true)
    {
      blokirs[i].parentNode.style.display = "none";
    }
  }
}
else
{
  if (document.URL.match(/www.kaskus.us/gi) != null)
  {
    var tbl_frm = document.getElementById("JudulForumBlue");
    var subf_id = document.getElementById("lingForumIsifr_mid");
  }
  else
  {
    var tbl_frm = document.getElementById("header-forum");
    tbl_frm.innerHTML += "<p>&nbsp;<\/p><p>&nbsp;<\/p><p>&nbsp;<\/p><p>&nbsp;<\/p>"
    var subf_id = document.getElementById("subforum-table");
  }

  var btnSF = document.createElement("input");

  with(btnSF)
  {
    setAttribute("value", "Hide subforum" );
    setAttribute("type", "button" );
  }

  btnSF.onclick = function()
  {
    if(btnSF.value == "Hide subforum")
    {
      btnSF.value = "Show subforum";
      subf_id.style.display = "none";
    }
    else
    {
      btnSF.value = "Hide subforum";
      subf_id.style.display = "block";
    }

    putButtonValue();
  }

  var btnStk = document.createElement("input");

  with(btnStk)
  {
    setAttribute("value", "Hide sticky" );
    setAttribute("type", "button" );
  }

  btnStk.onclick = function()
  {
    if(btnStk.value == "Hide sticky")
    {
      btnStk.value = "Show sticky";
    }
    else
    {
      btnStk.value = "Hide sticky";
    }

    putButtonValue();

    DisplayProc();
  };

  var btnBot = document.createElement("input");

  with(btnBot)
  {
    setAttribute("value", "Show bot" );
    setAttribute("type", "button" );
  }

  btnBot.onclick = function()
  {
    if(btnBot.value == "Show bot")
    {
      btnBot.value = "Hide bot";
    }
    else
    {
      btnBot.value = "Show bot";
    }

    putButtonValue();

    DisplayProc();
  };

  try
  {
    tbl_frm.appendChild(btnSF);
    tbl_frm.appendChild(btnStk);
    tbl_frm.appendChild(btnBot);
  }
  catch (e) { };

  DisplayProc()

  getButtonValue();
}
