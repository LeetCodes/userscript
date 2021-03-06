// ==UserScript==
// @name           OGame Redesign: Simple Calc
// @namespace      Baracs
// @version        1.04
// @description    Replaces the officer icons with a simple and useful calculator.
// @include        http://*.ogame.*
// ==/UserScript==
/*
06.05.2010 v1.04
	Added dropdown menu and cleaned up buttons

04.05.2010 v1.03
	Added Cost object with methods:							//Cost object was submitted by nackle userscripts.org
	//Calculate the cost for the # of def
	Cost.RL(#) //rocket launcher
	Cost.LL(#) //light laser
	Cost.HL(#) //heavy laser
	Cost.GC(#) //gauss cannon
	Cost.IC(#) //ion cannon
	Cost.PT(#) //plasma turret
	Cost.SmS(#) //small shield dome
	Cost.LgS(#) //large shield dome
	Cost.ABM(#) //anti-ballistic missile
	Cost.IPM(#) //interplanetary missile
	//Calculate the cost for the # of ships
	Cost.LF(#) //light fighter
	Cost.HF(#) //heavy fighter
	Cost.CR(#) //cruiser
	Cost.BS(#) //battleship
	Cost.BC(#) //battlecruiser
	Cost.DS(#) //destroyer
	Cost.RIP(#) //deathstar
	Cost.SC(#) //small cargo
	Cost.LC(#) //large cargo
	Cost.CS(#) //colony ship
	Cost.REC(#) //recycler
	Cost.SPY(#) //espionage probe
	Cost.SS(#) //solar satellite

30.04.2010 v1.02
	Fixed errors in Time.dif(
	Made the calculator wider
	Added dropdown buttons									//requested by la faucille userscripts.org

25.04.2010 v1.01
	Added Time object with methods:							//requested by la faucille userscripts.org
	 Time.dif('hh:mm:ss','hh:mm:ss');						//returns the diffrence T1 - T2 as ogame time format 'hh:mm:ss'
	 Time.dif('dd.mm.yy hh:mm:ss','dd.mm.yy hh:mm:ss'); 	//returns the diffrence T1 - T2 as ogame time format 'hh:mm:ss'
	 Time.dif('dd.mm.yy hh:mm:ss','hh:mm:ss');				//returns the diffrence T1 - T2 as ogame date format 'dd.mm.yy hh:mm:ss'
	 //for use by Time.dif
	 Time.toSec('hh:mm:ss');								//converts ogame time format to seconds
	 Time.secToStr(seconds);								//converts seconds to ogame time format
	 Time.strToDate('dd.mm.yy hh:mm:ss');					//returns Date() object from ogame date format 
	 
21.04.2010 v1.00
	Basic calculator that uses javascripts eval to calculate.		//requested by Nackle[TRICHOME] electra.ogame.org
	
Created By Baracs[TRICHOME] electra.ogame.org 
*/

(function ()
{

var script = document.createElement("script");
script.type = 'text/javascript';
script.textContent = 'function evalOnEnter(e){\nif(e.keyCode==13){\ndocument.myform.display.value=eval(document.myform.display.value);\n}\n}\n';
script.textContent += 'function SimpleCalc_Time(){\n';
script.textContent += 'this.toSec = function(aString) {\ntimeArray = aString.split(":");\nif(timeArray.length==3){\nseconds = timeArray[0]*3600;\nseconds += timeArray[1]*60;\nseconds += parseInt(timeArray[2]);\nreturn seconds\n}\n}\n';
script.textContent += 'this.secToStr = function(seconds){\nhours = seconds/3600;\nhours -= hours%1;\nseconds -= hours*3600;\nmin = seconds/60;\nmin -= min%1;\nseconds -= min*60\nreturn "\'"+hours+":"+Math.abs(min)+":"+Math.abs(seconds)+"\'";\n}\n';
script.textContent += 'this.strToDate = function(date){\ndateArray = date.split(".");\nday = parseInt(dateArray[0]);\nmonth = parseInt(dateArray[1]);\nyear = 2000+parseInt(dateArray[2].split(" ")[0]);\ntmpTime = dateArray[2].split(" ")[1].split(":");\nhours = parseInt(tmpTime[0]);\nmin = parseInt(tmpTime[1]);\nseconds = parseInt(tmpTime[2]);	\ntmpDate = new Date(year, month, day, hours, min, seconds, 0);	\nreturn tmpDate;\n}\n';
script.textContent += 'this.dif = function(tOne,tTwo) {\nif(tOne.indexOf (".") != -1){\ntmpDate = Time.strToDate(tOne);\nif(tTwo.indexOf (".") != -1){\nreturn Time.secToStr(Math.ceil((tmpDate.getTime()- Time.strToDate(tTwo).getTime())/1000));	\n}else{\ntmpDate = new Date(tmpDate.getTime()-Time.toSec(tTwo)*1000);\nreturn "\'"+tmpDate.getDate()+"."+tmpDate.getMonth()+"."+(tmpDate.getYear()-100)+" "+tmpDate.getHours()+":"+tmpDate.getMinutes()+":"+tmpDate.getSeconds()+"\'";\n}\n}else{\nreturn Time.secToStr(Time.toSec(tOne) - Time.toSec(tTwo));\n}\n}\n}\n';
script.textContent += 'Time = new SimpleCalc_Time();\n';
script.textContent += 'function SimpleCalc_Display(aBool){\nif(aBool){\ndocument.getElementById("calc_display").style.display = "block";\ndocument.getElementById("calc_display_on").style.display = "none";\ndocument.getElementById("calc_display_off").style.display = "block";\n}else{\ndocument.getElementById("calc_display").style.display = "none";\ndocument.getElementById("calc_display_on").style.display = "block";\ndocument.getElementById("calc_display_off").style.display = "none";\n}\n}\n';
script.textContent += 'function SimpleCalc_Cost(){\n';
script.textContent += 'this.RL = function(number){metal=2000;return (metal*number)+"m ";}\n';
script.textContent += 'this.LL = function(number){metal=1500;crystal=500;return (metal*number)+"m "+(crystal*number)+"c ";}\n';
script.textContent += 'this.HL = function(number){metal=6000;crystal=2000;return (metal*number)+"m "+(crystal*number)+"c ";}\n';
script.textContent += 'this.GC = function(number){metal=20000;crystal=15000;deut=2000;return (metal*number)+"m "+(crystal*number)+"c "+(deut*number)+"d ";}\n';
script.textContent += 'this.IC = function(number){metal=2000;crystal=6000;return (metal*number)+"m "+(crystal*number)+"c ";}\n';
script.textContent += 'this.PT = function(number){metal=50000;crystal=50000;deut=30000;return (metal*number)+"m "+(crystal*number)+"c "+(deut*number)+"d ";}\n';
script.textContent += 'this.SmS = function(number){metal=10000;crystal=10000;return (metal*number)+"m "+(crystal*number)+"c ";}\n';
script.textContent += 'this.LgS = function(number){metal=50000;crystal=50000;return (metal*number)+"m "+(crystal*number)+"c ";}\n';
script.textContent += 'this.ABM = function(number){metal=8000;deut=2000;return (metal*number)+"m "+(deut*number)+"d ";}\n';
script.textContent += 'this.IPM = function(number){metal=12500;crystal=2500;deut=10000;return (metal*number)+"m "+(crystal*number)+"c "+(deut*number)+"d ";}\n';
script.textContent += 'this.LF = function(number){metal=3000;crystal=1000;return (metal*number)+"m "+(crystal*number)+"c ";}\n';
script.textContent += 'this.HF = function(number){metal=6000;crystal=4000;return (metal*number)+"m "+(crystal*number)+"c ";}\n';
script.textContent += 'this.CR = function(number){metal=20000;crystal=7000;deut=2000;return (metal*number)+"m "+(crystal*number)+"c "+(deut*number)+"d ";}\n';
script.textContent += 'this.BS = function(number){metal=45000;crystal=15000;return (metal*number)+"m "+(crystal*number)+"c ";}\n';
script.textContent += 'this.BC = function(number){metal=30000;crystal=40000;deut=15000;return (metal*number)+"m "+(crystal*number)+"c "+(deut*number)+"d ";}\n';
script.textContent += 'this.BM = function(number){metal=50000;crystal=25000;deut=15000;return (metal*number)+"m "+(crystal*number)+"c "+(deut*number)+"d ";}\n';
script.textContent += 'this.DS = function(number){metal=60000;crystal=50000;deut=15000;return (metal*number)+"m "+(crystal*number)+"c "+(deut*number)+"d ";}\n';
script.textContent += 'this.RIP = function(number){metal=5000000;crystal=4000000;deut=1000000;return (metal*number)+"m "+(crystal*number)+"c "+(deut*number)+"d ";}\n';
script.textContent += 'this.SC = function(number){metal=2000;crystal=2000;return (metal*number)+"m "+(crystal*number)+"c ";}\n';
script.textContent += 'this.LC = function(number){metal=6000;crystal=6000;return (metal*number)+"m "+(crystal*number)+"c "+(deut*number)+"d ";}\n';
script.textContent += 'this.CS = function(number){metal=10000;crystal=20000;deut=10000;return (metal*number)+"m "+(crystal*number)+"c "+(deut*number)+"d ";}\n';
script.textContent += 'this.REC = function(number){metal=10000;crystal=6000;deut=2000;return (metal*number)+"m "+(crystal*number)+"c "+(deut*number)+"d ";}\n';
script.textContent += 'this.SPY = function(number){crystal=1000;return (crystal*number)+"c ";}\n';
script.textContent += 'this.SS = function(number){crystal=2000;deut=500;return (crystal*number)+"c "+(deut*number)+"d ";}\n}\n';
script.textContent += 'Cost = new SimpleCalc_Cost();\n';

/*
function SimpleCalc_Display(aBool){
	if(aBool){
		document.getElementById("calc_display").style.display = "block";
		document.getElementById("calc_display_on").style.display = "none";
		document.getElementById("calc_display_off").style.display = "block";
	}else{
		document.getElementById("calc_display").style.display = "none";
		document.getElementById("calc_display_on").style.display = "block";
		document.getElementById("calc_display_off").style.display = "none";
	}
}
*/

document.getElementsByTagName("head")[0].appendChild(script);
var div = document.createElement("div");
div.className = "content-box-s";
var divHeader = document.createElement("div");
divHeader.className = "header"
divHeader.innerHTML = "<center><h3>simple calc</h3></center>";
var version = document.createElement("div");
version.innerHTML += "<h6 align = 'right'>v 1.04</h6>";
version.setAttribute("style","position:relative; right:40px; top:-9px");
divHeader.appendChild(version);
var divContent = document.createElement("div");
divContent.className = "content";
divContent.innerHTML = '<form name="myform" onSubmit="return false;" onKeyPress="evalOnEnter(event,this.form);"><center><input type="text" name="display" size="45" style="font-size:10px; height:16px; border:2px solid; border-color:#262a2f"> <input type="button" value="   =   " onClick="myform.display.value=eval(myform.display.value)"></center></form>';
var contentDisplay = document.createElement("div");
contentDisplay.id = "calc_display";
contentDisplay.setAttribute("style","display:none; padding-bottom:5px; position:relative; top:5px");

var calcBasic = document.createElement("div");
calcBasic.id = "calcBasic";
calcBasic.setAttribute("style","display:none; padding-bottom:10px; padding-left:20px; padding-top:3px");
calcBasic.innerHTML = "<input type='button' value='  7  ' style='border:2px solid #262a2f; font-size:11px;' onClick='myform.display.value+=\"7\"'>";
calcBasic.innerHTML += "<input type='button' value='  8  ' style='border:2px solid #262a2f; font-size:11px;' onClick='myform.display.value+=\"8\"'>";
calcBasic.innerHTML += "<input type='button' value='  9  ' style='border:2px solid #262a2f; font-size:11px;' onClick='myform.display.value+=\"9\"'>&nbsp;&nbsp;";
calcBasic.innerHTML += "<input type='button' value='   *  ' style='border:2px solid #262a2f; font-size:11px;' onClick='myform.display.value+=\"*\"'>";
calcBasic.innerHTML += "<input type='button' value='  =  ' style='border:2px solid #262a2f; font-size:11px;' onClick='myform.display.value+=\"=\"'><br/>";
calcBasic.innerHTML += "<input type='button' value='  4  ' style='border:2px solid #262a2f; font-size:11px;' onClick='myform.display.value+=\"4\"'>";
calcBasic.innerHTML += "<input type='button' value='  5  ' style='border:2px solid #262a2f; font-size:11px;' onClick='myform.display.value+=\"5\"'>";
calcBasic.innerHTML += "<input type='button' value='  6  ' style='border:2px solid #262a2f; font-size:11px;' onClick='myform.display.value+=\"6\"'>&nbsp;&nbsp;";
calcBasic.innerHTML += "<input type='button' value='   /  ' style='border:2px solid #262a2f; font-size:10px;' onClick='myform.display.value+=\"/\"'>";
calcBasic.innerHTML += "<input type='button' value='  %  ' style='border:2px solid #262a2f; font-size:10px;' onClick='myform.display.value+=\"%\"'><br/>";
calcBasic.innerHTML += "<input type='button' value='  1  ' style='border:2px solid #262a2f; font-size:11px;' onClick='myform.display.value+=\"1\"'>";
calcBasic.innerHTML += "<input type='button' value='  2  ' style='border:2px solid #262a2f; font-size:11px;' onClick='myform.display.value+=\"2\"'>";
calcBasic.innerHTML += "<input type='button' value='  3  ' style='border:2px solid #262a2f; font-size:11px;' onClick='myform.display.value+=\"3\"'>&nbsp;&nbsp;"
calcBasic.innerHTML += "<input type='button' value='   -  ' style='border:2px solid #262a2f; font-size:11px;' onClick='myform.display.value+=\"-\"'>";
calcBasic.innerHTML += "<input type='button' value='   (   ' style='border:2px solid #262a2f; font-size:10px;' onClick='myform.display.value+=\"(\"'><br/>";
calcBasic.innerHTML += "<input type='button' value='  0  ' style='border:2px solid #262a2f; font-size:11px;' onClick='myform.display.value+=\"0\"'>";
calcBasic.innerHTML += "<input type='button' value=' -/+ ' style='border:2px solid #262a2f; font-size:10px;' onClick='myform.display.value+=\"-\"'>";
calcBasic.innerHTML += "<input type='button' value='   .  ' style='border:2px solid #262a2f; font-size:11px;' onClick='myform.display.value+=\".\"'>&nbsp;&nbsp;";
calcBasic.innerHTML += "<input type='button' value='  +  ' style='border:2px solid #262a2f; font-size:10px;' onClick='myform.display.value+=\"+\"'>";
calcBasic.innerHTML += "<input type='button' value='   )   ' style='border:2px solid #262a2f; font-size:10px;' onClick='myform.display.value+=\")\"'>&nbsp;&nbsp;";
calcBasic.innerHTML += "<input type='button' value='  C  ' style='border:2px solid #262a2f; font-size:10px;' onClick='myform.display.value=\"\"'>";

var calcMath = document.createElement("div");
calcMath.id = "calcMath";
calcMath.setAttribute("style","display:none; padding-bottom:10px; padding-left:20px; padding-right:20px; padding-top:3px; font-size:9px");
calcMath.innerHTML = "<input type='button' value='  Math.abs(  ' style='border:2px solid #262a2f; font-size:9px;' onClick='myform.display.value+=\"Math.abs(\"'> //Returns the absolute value<br/>";
calcMath.innerHTML += "<input type='button' value='  Math.acos(  ' style='border:2px solid #262a2f; font-size:9px;' onClick='myform.display.value+=\"Math.acos(\"'> //Returns the arccosine in radians<br/>";
calcMath.innerHTML += "<input type='button' value='  Math.asin(  ' style='border:2px solid #262a2f; font-size:9px;' onClick='myform.display.value+=\"Math.asin(\"'> //Returns the arcsine in radians<br/>";
calcMath.innerHTML += "<input type='button' value='  Math.atan(  ' style='border:2px solid #262a2f; font-size:9px;' onClick='myform.display.value+=\"Math.atan(\"'> //Returns the arctangent as a numeric value<br/>";
calcMath.innerHTML += "<input type='button' value='  Math.atan2(  ' style='border:2px solid #262a2f; font-size:9px;' onClick='myform.display.value+=\"Math.atan2(\"'> //Returns the arctangent of the quotient of its arguments<br/>";
calcMath.innerHTML += "<input type='button' value='  Math.ceil(  ' style='border:2px solid #262a2f; font-size:9px;' onClick='myform.display.value+=\"Math.ceil(\"'> //Returns the number rounded upwards<br/>";
calcMath.innerHTML += "<input type='button' value='  Math.cos(  ' style='border:2px solid #262a2f; font-size:9px;' onClick='myform.display.value+=\"Math.cos(\"'> //Returns cosin in radians<br/>";
calcMath.innerHTML += "<input type='button' value='  Math.exp(  ' style='border:2px solid #262a2f; font-size:9px;' onClick='myform.display.value+=\"Math.exp(\"'> //Returns the value of e^x<br/>";
calcMath.innerHTML += "<input type='button' value='  Math.floor(  ' style='border:2px solid #262a2f; font-size:9px;' onClick='myform.display.value+=\"Math.floor(\"'> //Returns the number rounded downwards<br/>";
calcMath.innerHTML += "<input type='button' value='  Math.log(  ' style='border:2px solid #262a2f; font-size:9px;' onClick='myform.display.value+=\"Math.log(\"'> //Returns the natural logarithm<br/>";
calcMath.innerHTML += "<input type='button' value='  Math.max(  ' style='border:2px solid #262a2f; font-size:9px;' onClick='myform.display.value+=\"Math.max(\"'> //Returns the number with the highest value<br/>";
calcMath.innerHTML += "<input type='button' value='  Math.min(  ' style='border:2px solid #262a2f; font-size:9px;' onClick='myform.display.value+=\"Math.min(\"'> //Returns the number with the lowest value<br/>";
calcMath.innerHTML += "<input type='button' value='  Math.pow(  ' style='border:2px solid #262a2f; font-size:9px;' onClick='myform.display.value+=\"Math.pow(\"'> //Returns the value of x to the power of y<br/>";
calcMath.innerHTML += "<input type='button' value='  Math.random()  ' style='border:2px solid #262a2f; font-size:9px;' onClick='myform.display.value+=\"Math.random()\"'> //Returns a random number between 0 and 1<br/>";
calcMath.innerHTML += "<input type='button' value='  Math.round(  ' style='border:2px solid #262a2f; font-size:9px;' onClick='myform.display.value+=\"Math.round(\"'> //Returns the value rounded<br/>";
calcMath.innerHTML += "<input type='button' value='  Math.sin(  ' style='border:2px solid #262a2f; font-size:9px;' onClick='myform.display.value+=\"Math.sin(\"'> //Returns the sine in radians<br/>";
calcMath.innerHTML += "<input type='button' value='  Math.sqrt(  ' style='border:2px solid #262a2f; font-size:9px;' onClick='myform.display.value+=\"Math.sqrt(\"'> //Returns the square root<br/>";
calcMath.innerHTML += "<input type='button' value='  Math.tan(  ' style='border:2px solid #262a2f; font-size:9px;' onClick='myform.display.value+=\"Math.tan(\"'> //Returns the tangent of an angle";

var calcTime = document.createElement("div");
calcTime.id = "calcTime";
calcTime.setAttribute("style","display:none; padding-bottom:10px; padding-left:20px; padding-right:20px; padding-top:3px; font-size:9px");
calcTime.innerHTML = "//Time.dif has the following properties:<br/>Time.dif(time,time);<br/>Time.dif(date,date);<br/>Time.dif(date,time);<br/>time = 'hh:mm:ss'<br/>date = 'mm.dd.yy hh:mm:ss'<br/>";
calcTime.innerHTML += "<input type='button' value='  Time.diff(  ' style='border:2px solid #262a2f; font-size:9px;' onClick='myform.display.value+=\"Time.diff(\"'> //Returns time/date T1-T2<br/>";

var calcCost = document.createElement("div");
calcCost.id = "calcCost";
calcCost.setAttribute("style","display:none; padding-bottom:10px; padding-left:20px; padding-right:20px; padding-top:3px; font-size:9px");
calcCost.innerHTML = "//Calculates the cost for the # of ships/def<br/>";
calcCost.innerHTML += "<input type='button' value='  Cost.RL(  ' style='border:2px solid #262a2f; font-size:9px;' onClick='myform.display.value+=\"Cost.RL(\"'> //rocket launcher<br/>";
calcCost.innerHTML += "<input type='button' value='  Cost.LL(  ' style='border:2px solid #262a2f; font-size:9px;' onClick='myform.display.value+=\"Cost.LL(\"'> //light laser<br/>";
calcCost.innerHTML += "<input type='button' value='  Cost.HL(  ' style='border:2px solid #262a2f; font-size:9px;' onClick='myform.display.value+=\"Cost.HL(\"'> //heavy laser<br/>";
calcCost.innerHTML += "<input type='button' value='  Cost.GC(  ' style='border:2px solid #262a2f; font-size:9px;' onClick='myform.display.value+=\"Cost.GC(\"'> //gauss cannon<br/>";
calcCost.innerHTML += "<input type='button' value='  Cost.IC(  ' style='border:2px solid #262a2f; font-size:9px;' onClick='myform.display.value+=\"Cost.IC(\"'> //ion cannon<br/>";
calcCost.innerHTML += "<input type='button' value='  Cost.PT(  ' style='border:2px solid #262a2f; font-size:9px;' onClick='myform.display.value+=\"Cost.PT(\"'> //plasma turret<br/>";
calcCost.innerHTML += "<input type='button' value='  Cost.SmS(  ' style='border:2px solid #262a2f; font-size:9px;' onClick='myform.display.value+=\"Cost.SmS(\"'> //small shield dome<br/>";
calcCost.innerHTML += "<input type='button' value='  Cost.LgS(  ' style='border:2px solid #262a2f; font-size:9px;' onClick='myform.display.value+=\"Cost.LgS(\"'> //large shield dome<br/>";
calcCost.innerHTML += "<input type='button' value='  Cost.ABM(  ' style='border:2px solid #262a2f; font-size:9px;' onClick='myform.display.value+=\"Cost.ABM(\"'> //anti-ballistic missile<br/>";
calcCost.innerHTML += "<input type='button' value='  Cost.IPM(  ' style='border:2px solid #262a2f; font-size:9px;' onClick='myform.display.value+=\"Cost.IPM(\"'> //interplanetary missile<br/>";
calcCost.innerHTML += "<input type='button' value='  Cost.LF(  ' style='border:2px solid #262a2f; font-size:9px;' onClick='myform.display.value+=\"Cost.LF(\"'> //light fighter<br/>";
calcCost.innerHTML += "<input type='button' value='  Cost.HF(  ' style='border:2px solid #262a2f; font-size:9px;' onClick='myform.display.value+=\"Cost.HF(\"'> //heavy fighter<br/>";
calcCost.innerHTML += "<input type='button' value='  Cost.CR(  ' style='border:2px solid #262a2f; font-size:9px;' onClick='myform.display.value+=\"Cost.CR(\"'> //cruiser<br/>";
calcCost.innerHTML += "<input type='button' value='  Cost.BS(  ' style='border:2px solid #262a2f; font-size:9px;' onClick='myform.display.value+=\"Cost.BS(\"'> //battleship<br/>";
calcCost.innerHTML += "<input type='button' value='  Cost.BC(  ' style='border:2px solid #262a2f; font-size:9px;' onClick='myform.display.value+=\"Cost.BC(\"'> //battlecruiser<br/>";
calcCost.innerHTML += "<input type='button' value='  Cost.DS(  ' style='border:2px solid #262a2f; font-size:9px;' onClick='myform.display.value+=\"Cost.DS(\"'> //destroyer<br/>";
calcCost.innerHTML += "<input type='button' value='  Cost.RIP(  ' style='border:2px solid #262a2f; font-size:9px;' onClick='myform.display.value+=\"Cost.RIP(\"'> //deathstar<br/>";
calcCost.innerHTML += "<input type='button' value='  Cost.SC(  ' style='border:2px solid #262a2f; font-size:9px;' onClick='myform.display.value+=\"Cost.SC(\"'> //small cargo<br/>";
calcCost.innerHTML += "<input type='button' value='  Cost.LC(  ' style='border:2px solid #262a2f; font-size:9px;' onClick='myform.display.value+=\"Cost.IPM(\"'> //large cargo<br/>";
calcCost.innerHTML += "<input type='button' value='  Cost.CS(  ' style='border:2px solid #262a2f; font-size:9px;' onClick='myform.display.value+=\"Cost.CS(\"'> //colony ship<br/>";
calcCost.innerHTML += "<input type='button' value='  Cost.REC(  ' style='border:2px solid #262a2f; font-size:9px;' onClick='myform.display.value+=\"Cost.REC(\"'> //recycler<br/>";
calcCost.innerHTML += "<input type='button' value='  Cost.SPY(  ' style='border:2px solid #262a2f; font-size:9px;' onClick='myform.display.value+=\"Cost.SPY(\"'> //espionage probe<br/>";
calcCost.innerHTML += "<input type='button' value='  Cost.SS(  ' style='border:2px solid #262a2f; font-size:9px;' onClick='myform.display.value+=\"Cost.SS(\"'> //solar satellite<br/>";



contentDisplay.innerHTML += '<center><a id="sc_basic_on" onclick="document.getElementById(\'sc_basic_on\').style.display=\'none\'; document.getElementById(\'sc_basic_off\').style.display =\'block\';document.getElementById(\'calcBasic\').style.display =\'block\';" style="display:block">[&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Basic&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;]</a><a id="sc_basic_off" onclick="document.getElementById(\'sc_basic_off\').style.display=\'none\'; document.getElementById(\'sc_basic_on\').style.display =\'block\'; document.getElementById(\'calcBasic\').style.display =\'none\';" style="display:none">[&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Basic&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;]</a></center>';
contentDisplay.appendChild(calcBasic);
contentDisplay.innerHTML += '<center><a id="sc_math_on" onclick="document.getElementById(\'sc_math_on\').style.display=\'none\'; document.getElementById(\'sc_math_off\').style.display =\'block\';document.getElementById(\'calcMath\').style.display =\'block\';" style="display:block">[&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Math&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;]</a><a id="sc_math_off" onclick="document.getElementById(\'sc_math_off\').style.display=\'none\'; document.getElementById(\'sc_math_on\').style.display =\'block\'; document.getElementById(\'calcMath\').style.display =\'none\';" style="display:none">[&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Math&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;]</a></center>';
contentDisplay.appendChild(calcMath);
contentDisplay.innerHTML += '<center><a id="sc_time_on" onclick="document.getElementById(\'sc_time_on\').style.display=\'none\'; document.getElementById(\'sc_time_off\').style.display =\'block\';document.getElementById(\'calcTime\').style.display =\'block\';" style="display:block">[&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Time&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;]</a><a id="sc_time_off" onclick="document.getElementById(\'sc_time_off\').style.display=\'none\'; document.getElementById(\'sc_time_on\').style.display =\'block\'; document.getElementById(\'calcTime\').style.display =\'none\';" style="display:none">[&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Time&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;]</a></center>';
contentDisplay.appendChild(calcTime);
contentDisplay.innerHTML += '<center><a id="sc_cost_on" onclick="document.getElementById(\'sc_cost_on\').style.display=\'none\'; document.getElementById(\'sc_cost_off\').style.display =\'block\';document.getElementById(\'calcCost\').style.display =\'block\';" style="display:block">[&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Cost&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;]</a><a id="sc_cost_off" onclick="document.getElementById(\'sc_cost_off\').style.display=\'none\'; document.getElementById(\'sc_cost_on\').style.display =\'block\'; document.getElementById(\'calcCost\').style.display =\'none\';" style="display:none">[&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Cost&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;]</a></center>';
contentDisplay.appendChild(calcCost);



divContent.appendChild(contentDisplay);
var divFooter = document.createElement("div");
divFooter.className = "footer";
divFooter.innerHTML += '<center><a id= "calc_display_off" onclick="SimpleCalc_Display(false)" style="display:none; font-size:9px">(close)</a><a id="calc_display_on" onclick="SimpleCalc_Display(true)" style="display:block; font-size:9px; position:relative; top:4px">(open)</a></center>';
div.setAttribute("style","position:absolute; left:720px; top:19px; width: 275px; z-index:100;");
divHeader.setAttribute("style","padding: 0px; -moz-background-size: 100% 100%;");
divContent.setAttribute("style","padding: 0px; -moz-background-size: 100% 100%;");
divFooter.setAttribute("style","padding: 0px; -moz-background-size: 100% 100%;");
div.appendChild(divHeader);
div.appendChild(divContent);
div.appendChild(divFooter);
document.getElementById("info").appendChild(div);

})();