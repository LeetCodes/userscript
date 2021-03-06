// ==UserScript==
// @name          Base Uploader (MIT)
// @description   Saves base info to a database
// @include       *.astroempires.com/*
// @exclude       *.astroempires.com/home.aspx*
// @exclude       *.astroempires.com/login.aspx*
// @exclude       forum.astroempires.com/*
// @exclude       support.astroempires.com/*
// @exclude       wiki.astroempires.com/*
// @exclude       wiki.astroempires.com/*/*
// @exclude       *.astroempires.com/upgrade.aspx*
// @exclude       *.astroempires.com/tables.aspx*
// @exclude       *.astroempires.com/register.aspx*
// @exclude       *.astroempires.com/smilies.aspx*
// ==/UserScript==


//================================================================
//===========================CONSTANTS============================
//================================================================

var SKIN = "Dark Astros";
var databaseText = 'DS Database';
var database = 'ds';
var server = 'juno';
var scriptVer = 3;

//================================================================
//=========================END CONSTANTS==========================
//================================================================

//================================================================
//==========================SCAN BASES============================
//================================================================

// New Version Popup
if (GM_getValue("oldversion","0")==scriptVer){
		// its up to date
		//alert("It's up to date.");
	}else{
		// detected a new version
		GM_setValue("oldversion",scriptVer);
		var htm="";
		htm+="Version "+ scriptVer +"\n";
		htm+="----------\n";
		htm+="MAIN UPDATE - Base owner's ID is now stored to help with some updates to the db. \n";
		alert(htm);
}

url = window.location.href;

findBase = 0;


if(url.match(/base\.aspx\?base/)){
	if(url.match(/\&view\=/)){
		findBase = 0;
	} else {
		findBase = 1;
	}
} else {
	findBase = 0;
}

if(findBase){

    var alertBox = document.createElement('div');
    aPosition = document.body.childNodes[5];
		alertBox.innerHTML = "<b>Checking script version...</b>";
		alertBox.style.width = "100%";
		alertBox.style.color = "red";
		alertBox.style.border = "0px solid #6699cc";
		alertBox.style.marginLeft = "auto";
		alertBox.style.marginRight = "auto";
		alertBox.style.backgroundColor = "#0";
		alertBox.style.textAlign = "center";
		document.body.appendChild(alertBox);
		document.body.insertBefore(alertBox, aPosition);

	GM_xmlhttpRequest({
	  method: "POST",
	  url: "http://ixion.mckflux.co.cc/"+ database +"/scriptCheck.php",
	  data: "scriptVer=" + scriptVer + "&rand=" + parseInt(Math.random()*99999999),
	  headers: {
		"Content-Type": "application/x-www-form-urlencoded"
	  },
	  onload: function(response) {
		rText = response.responseText;
		alertBox.innerHTML = rText;
		upToDate = rText.match(/Script is up to date./);
		if(upToDate){
			
			alertBox.innerHTML = "<b>Submitting Data...</b>";
			
			ihtmlz = document.body.innerHTML;

			// Owner information

				baseOwner = ihtmlz.match(/Base Owner<\/td><td colspan="2"><a .+?title=".+?">.+?<\/a>/);
				baseOwner = baseOwner[0].replace(/Base Owner<\/td><td colspan="2"><a .+?title=".+?">/,"");
				baseOwner = baseOwner.replace(/<\/a>/,"");

				ownerID = ihtmlz.match(/Base Owner<\/td><td colspan="2"><a(.+?)href="(.*?)profile.aspx\?player=(.+?)">(.+?)<\/a>/);
				ownerplayer = ownerID[0].match(/profile.aspx\?player=(.+?)"(.*?)>(.+?)</)[0];
				ownerID = ownerID[0].match(/profile.aspx\?player=(.+?)">/)[0];
				ownerplayer = ownerplayer.match(/>(.+?)</);
				ownerID = ownerID.match(/=[0-9]+/)[0];
				ownerID = ownerID.replace("=", "");
				
				if(baseOwner.match(/\[.+?\]/)){
					ownerGuild = baseOwner.match(/\[.+?\]/);
					ownerGuild = ownerGuild[0].replace(/\[/,"");
					ownerGuild = ownerGuild.replace(/\]/,"");
					baseOwner = baseOwner.replace(/\[.+?\] /,"");
				} else {
					ownerGuild = "";
				}
				
				if(baseOwner.match(/United Colonies/)){
					ownerLevel = "";
				} else {
					ownerLevel = ihtmlz.match(/Base Owner<\/td><td colspan="2"><a .+?" title="Player level .+?">/);
					ownerLevel = ownerLevel[0].replace(/Base Owner<\/td><td colspan="2"><a .+?" title="Player level /,"");
					ownerLevel = ownerLevel.replace(/ \(.+?\% of your level\)">/,"");
					ownerLevel = ownerLevel.replace(/">/,"");
				}

				if(ihtmlz.match(/Occupier<\/td><td colspan="2"><a/)){
					occupiedBy = ihtmlz.match(/<td>Occupier<\/td>.+?<\/a>/);
					occupiedBy = occupiedBy[0].replace(/<td>Occupier<\/td>.+?title="Player level .+?">/,"");
					occupiedBy = occupiedBy.replace(/<\/a>/,"");
				} else {
					occupiedBy="";
				}
				
			// Basic astro information

				astroLoc = ihtmlz.match(/<a href="map.aspx\?loc=.+?">/);
				astroLoc = astroLoc[0].replace(/<a href="map.aspx\?loc=/,"");
				astroLoc = astroLoc.replace(/">/,"");

			// Capacities
				
				economy = ihtmlz.match(/Economy<\/td><td align="right">.+?<\/td>/);
				economy = economy[0].replace(/Economy<\/td><td align="right">/,"");
				economy = economy.replace(/<\/td>/,"");
				
				ownerIncome = ihtmlz.match(/Owner Income<\/td><td align="right">.+?<\/td>/);
				ownerIncome = ownerIncome[0].replace(/Owner Income<\/td><td align="right">/,"");
				ownerIncome = ownerIncome.replace(/<\/td>/,"");
				
				baseCommander = ihtmlz.match(/<small>\(.+?\)<\/small>/);
				
				if(baseCommander){
					baseCommander = baseCommander[0].replace(/<small>\(/,"");
					baseCommander = baseCommander.replace(/\)<\/small>/,"");
				} else {
					baseCommander = "";
				}
				
			// Other stuff

			if(ihtmlz.match(/ credits in space debris.<\//)){
				debrisString = ihtmlz;
				debrisString = debrisString.replace(/\,/g,"");
				debrisString = debrisString.replace(/\./g,"");
				debris = debrisString.match(/\d+ credits in space debris<\//);
				debris = debris[0].match(/\d+/);
			} else {
				debris = 0;
			}
			
				
				topBarString=ihtmlz
				topBarString = topBarString.replace(/\d\d?\d?\/\d\d?\d?/,"");
				topBarString = topBarString.replace(/\d\d?\d?\/\d\d?\d?/,"");
				area = topBarString.match(/\d\d?\d?\/\d\d?\d?/);
				area = area[0]
				
				topBarString = topBarString.replace(/\d\d?\d?\/\d\d?\d?/,"");
				
				energy = topBarString.match(/\d\d?\d?\/\d\d?\d?/);
				energy = energy[0]
				
				topBarString = topBarString.replace(/\d\d?\d?\/\d\d?\d?/,"");

				population = topBarString.match(/\d\d?\d?\/\d\d?\d?/);
				population = population[0]
				
				topBarString = topBarString.replace(/\d\d?\d?\/\d\d?\d?/,"");

				trades = topBarString.match(/\d\d?\d?\/\d\d?\d?/);
				trades = trades[0]

				
			// Base structures of interest

				structureString = ihtmlz.match(/Level<\/th><th>Defenses.+?<\/td><\/tr>/);
				
				var arrayStructures = [];
					arrayStructures['commandCenters'] = null;
					arrayStructures['jumpGate'] = null;
					arrayStructures['capital'] = null;
					
				if(structureString[0].match(/Command Centers/)){arrayStructures['commandCenters'] = true;}
				if(structureString[0].match(/Jump Gate/)){arrayStructures['jumpGate'] = true;}
				if(structureString[0].match(/Capital/)){arrayStructures['capital'] = true;}
				
				structureStringZ = structureString[0];
				structureStringZ = structureStringZ.replace(/.+?<\/td><td>.+?<br><\/td><td>/,"");

				for(structure in arrayStructures){
					if(arrayStructures[structure]){
						arrayStructures[structure] = structureStringZ.match(/\d\d?/);
						structureStringZ = structureStringZ.replace(/\d\d?/,"");
					} else {
						arrayStructures[structure] = "0";
					}
				}
				
				
				
			// Base defenses
				
				var arrayDefenses = [];
					arrayDefenses['barracks'] = null;
					arrayDefenses['laserTurrets'] = null;
					arrayDefenses['missileTurrets'] = null;
					arrayDefenses['plasmaTurrets'] = null;
					arrayDefenses['ionTurrets'] = null;
					arrayDefenses['photonTurrets'] = null;
					arrayDefenses['disruptorTurrets'] = null;
					arrayDefenses['deflectionShields'] = null;
					arrayDefenses['planetaryShield'] = null;
					arrayDefenses['planetaryRing'] = null;
					
				if(structureString[0].match(/Barracks/)){arrayDefenses['barracks'] = true;}
				if(structureString[0].match(/Laser Turrets/)){arrayDefenses['laserTurrets'] = true;}
				if(structureString[0].match(/Missile Turrets/)){arrayDefenses['missileTurrets'] = true;}
				if(structureString[0].match(/Plasma Turrets/)){arrayDefenses['plasmaTurrets'] = true;}
				if(structureString[0].match(/Ion Turrets/)){arrayDefenses['ionTurrets'] = true;}
				if(structureString[0].match(/Photon Turrets/)){arrayDefenses['photonTurrets'] = true;}
				if(structureString[0].match(/Disruptor Turrets/)){arrayDefenses['disruptorTurrets'] = true;}
				if(structureString[0].match(/Deflection Shields/)){arrayDefenses['deflectionShields'] = true;}
				if(structureString[0].match(/Planetary Shield/)){arrayDefenses['planetaryShield'] = true;}
				if(structureString[0].match(/Planetary Ring/)){arrayDefenses['planetaryRing'] = true;}
				
				defenseString = structureString[0];

				for(defense in arrayDefenses){
					if(arrayDefenses[defense]){
						arrayDefenses[defense] = defenseString.match(/\d.?\d* \/ \d*.?\d/);
						defenseString = defenseString.replace(/\d.?\d* \/ \d*.?\d/,"");
					} else {
						arrayDefenses[defense] = "0 / 0";
					}
				}
				
			

				fleetLanded = 0;
				fleetIncoming = 0;
				arrayFleetString = ihtmlz.match(/<tr align="center"><td sorttable_customkey=.+?<a href="fleet.+?<\/a><\/td><\/tr>/g);
				
				for(i in arrayFleetString){
					thisFleet = arrayFleetString[i].match(/<a href="fleet.+?>.+?<\/a><\/td><\/tr>/);
					thisFleet = thisFleet[0].replace(/<a href="fleet.+?>/,"");
					thisFleet = thisFleet.match(/<a href="fleet.+?>.+?<\/a><\/td><\/tr>/);
					thisFleet = thisFleet[0].replace(/<a href="fleet.+?>/,"");
					thisFleet = thisFleet.replace(/<\/a><\/td><\/tr>/,"");
					thisFleet = thisFleet.replace(/\,/g,"");
					thisFleet = thisFleet.replace(/\./g,"");
					if(arrayFleetString[i].match(/id="time/)){
						fleetIncoming = fleetIncoming + parseInt(thisFleet);
					}
					else{
						fleetLanded = fleetLanded + parseInt(thisFleet);
					}
				}

			//Submitter info

				submitterAccount = ihtmlz.match(/Account<\/a><\/th><th width="90">\D\.\d+<\/th>/);
				
				if(submitterAccount){
				} else {
					submitterAccount = ihtmlz.match(/\D\.\d+</);
				}
				
				submitterAccount = submitterAccount[0].match(/\D\.\d+/,"");
				
			// Data submission
				
				submitURL = 	"scriptVer=" + scriptVer +
								"&baseOwner=" + encodeURIComponent(baseOwner) + 
								"&ownerGuild=" + encodeURIComponent(ownerGuild) + 
								"&ownerLevel=" + encodeURIComponent(ownerLevel) + 
								"&occupiedBy=" + encodeURIComponent(occupiedBy) + 
								"&astroLoc=" + encodeURIComponent(astroLoc) + 
								"&economy=" + encodeURIComponent(economy) + 
								"&ownerIncome=" + encodeURIComponent(ownerIncome) + 
								"&baseCommander=" + encodeURIComponent(baseCommander) + 
								"&debris=" + encodeURIComponent(debris) + 
								"&trades=" + encodeURIComponent(trades) + 
								"&barracks=" + encodeURIComponent(arrayDefenses['barracks']) + 
								"&laserTurrets=" + encodeURIComponent(arrayDefenses['laserTurrets']) + 
								"&missileTurrets=" + encodeURIComponent(arrayDefenses['missileTurrets']) + 
								"&plasmaTurrets=" + encodeURIComponent(arrayDefenses['plasmaTurrets']) + 
								"&ionTurrets=" + encodeURIComponent(arrayDefenses['ionTurrets']) + 
								"&photonTurrets=" + encodeURIComponent(arrayDefenses['photonTurrets']) + 
								"&disruptorTurrets=" + encodeURIComponent(arrayDefenses['disruptorTurrets']) + 
								"&deflectionShields=" + encodeURIComponent(arrayDefenses['deflectionShields']) + 
								"&planetaryShield=" + encodeURIComponent(arrayDefenses['planetaryShield']) + 
								"&planetaryRing=" + encodeURIComponent(arrayDefenses['planetaryRing']) + 
								"&commandCenters=" + encodeURIComponent(arrayStructures['commandCenters']) + 
								"&jumpGate=" + encodeURIComponent(arrayStructures['jumpGate']) + 
								"&capital=" + encodeURIComponent(arrayStructures['capital']) + 
								"&submitter=" + encodeURIComponent(submitterAccount) + 
								"&fleetLanded=" + encodeURIComponent(fleetLanded) + 
								"&fleetIncoming=" + encodeURIComponent(fleetIncoming) + 
								"&ownerID=" + encodeURIComponent(ownerID) + 
								"&rand=" + parseInt(Math.random()*99999999);

				GM_xmlhttpRequest({
				  method: "POST",
				  url: "http://ixion.mckflux.co.cc/"+ database +"/astroAdd.php",
				  data: submitURL,
				  headers: {
					"Content-Type": "application/x-www-form-urlencoded"
				  },
				  onload: function(response) {
					alertBox.innerHTML = response.responseText;
				  }
				});

		}

		 }
	});

}

//================================================================
//========================END SCAN BASES==========================
//================================================================

//================================================================
//====================DATABASE LINK IN NAV BAR====================
//================================================================
//Thanks to Nathan Hook for helping me with the nav bar link.

var databaseUrl = "http://ixion.mckflux.co.cc/"+ database +"/";

window.addEventListener('load',
function() {
  
  // Representss the ' - ' between all the links at the top of the page.
  var dividerText = document.createElement('span');
  
  dividerText.innerHTML=' - ';
  
  var linkArray;
  
  linkArray = document.evaluate('//a[contains(@href, "home.aspx?session=logout&id=")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  
  var logoutLink = linkArray.snapshotItem(0);
  
  var databaseLink = document.createElement('a');
  
  databaseLink.href=databaseUrl;
  databaseLink.setAttribute('href', databaseUrl);
  databaseLink.innerHTML=databaseText;
  // Opens the link in a new window.  Don't want that behavior, comment or remove the line below.
  databaseLink.target='_blank';
  
  logoutLink.parentNode.insertBefore(databaseLink, logoutLink);
  
  logoutLink.parentNode.insertBefore(dividerText, logoutLink);
  
}, true);

//================================================================
//======================END DATABASE LINK=========================
//================================================================



var VERSION = "1.6.5";
var BROWSER = "FF";

function checkToRun()
{
	if(typeof(GM_getValue) != 'function')
	{
		BROWSER = "Chrome";
		return;
	}
	else
	{
		BROWSER = "FF";
		servers = GM_getValue('excludeServers', '');
		if(servers.search(server) != -1)
		{
			exit(0);
		}
	}
}


function getServer()
{
	if(typeof(GM_xmlhttpRequest) != 'function')
		return;

	loc = window.location.href.substr(7);
	server = loc.substr(0, loc.search('astro') - 1);
}

function dateToString(time)
{
	month = time.getMonth() + 1;
	day = time.getDate();
	year = time.getFullYear();
	hours = time.getHours();
	min = time.getMinutes();
	sec = time.getSeconds();
	if(month < 10)
		month = '0' + month;
	if(day < 10)
		day = '0' + day;
	if(hours < 10)
		hours = '0' + hours;
	if(min < 10)
		min = '0' + min;
	if(sec < 10)
		sec = '0' + sec;
	return day + '-' + month + '-' + year + ' ' + hours + ':' + min + ':' + sec;
}

function timeToString(time, type)
{
	hours = time / 3600;
	mins = (time / 60) % 60;
	if(mins < 10)
		mins = '0' + parseInt(mins);
	else
		mins = parseInt(mins);
	secs = time % 60;
	if(secs < 10)
		secs = '0' + parseInt(secs);
	else
		secs = parseInt(secs);

	if(type == 'h')
		return parseInt(hours) + 'h ' + mins + 'm ' + secs + 's';
	else if(type == ':')
		return parseInt(hours) + ':' + mins + ':' + secs;
}

function stringToTime(time)
{
	parts = time.split(' ');
	if(time.search('h') != -1)
	{
		hours = parts[0].substr(0, parts[0].length - 1);
		mins = parts[1].substr(0, parts[1].length - 1);
		secs = parts[2].substr(0, parts[2].length - 1);
	}
	else if(time.search('m') != -1)
	{
		hours = 0;
		mins = parts[0].substr(0, parts[0].length - 1);
		secs = parts[1].substr(0, parts[1].length - 1);
	}
	else if(time.search('s') != -1)
	{
		hours = 0;
		mins = 0;
		secs = parts[0].substr(0, parts[0].length - 1);
	}
	else
	{
		parts = time.split(':');
		hours = parts[0];
		mins = parts[1];
		secs = parts[2];
	}

	secs = Number(secs);
	secs += Number(mins) * 60;
	secs += Number(hours) * 3600;

	return secs;
}

function setServerTime()
{
	element = document.getElementById('top-header_server-time');
	now = new Date();
	totalSeconds = Number(element.title);
	serverDate = new Date(totalSeconds * 1000 + now.getTime());
	element.innerHTML = 'Server Time: ' + dateToString(serverDate);
}

function setupServerTime()
{
	// Get the server time element
	elements = document.getElementsByTagName('small');
	element = null;
	for(i = 0; i < elements.length; i++)
	{
		if(elements[i].innerHTML.search('Server time:') != -1)
		{
			element = elements[i];
			element.id = 'top-header_server-time';
			break;
		}
	}

	// Deep Space
	if(element == null)
	{
		element = document.getElementById('top-header_server-time');
		SKIN = "Deep Space";
	}

	fullText = element.innerHTML;
	fullText = fullText.substr(	13);

	// Jan 20 2010,
	if(fullText.search(/[A-Z][A-Z][A-Z]/i) == 0)
	{
		serverDate = new Date(fullText);
	}
	// 20 Jan 2010,
	else if(fullText.search(/[0-9][0-9][ ]/i) == 0)
	{
		serverDate = new Date(fullText);
	}
	// 2010-01-20
	else
	{
		dateText = fullText.split(' ')[0];
		timeText = fullText.split(' ')[1];

		dateParts = dateText.split('-');
		serverDate = new Date(dateParts[1] + '/' + dateParts[2] + '/' + dateParts[0] + ' ' + timeText);
	}

	totalSeconds = serverDate.getTime() / 1000;
	now = new Date();
	totalSeconds = totalSeconds - (now.getTime() / 1000);

	element.title = '' + totalSeconds;
	setServerTime();
	setInterval(function() {setServerTime()}, 200);
}

function checkExcludes()
{
	currentServers = GM_getValue('excludeServers', '');
	currentServers = currentServers.replace(/,/gm, ' ');
	if(currentServers != '')
	{
		alert(currentServers);
	}
	else
	{
		alert('No servers excluded');
	}
}

function addExclude()
{
	answer = prompt('Add servers to exclude. Ex: beta ceti', '');
	if(answer == '')
		return;

	servers = answer.split(' ');

	currentServers = GM_getValue('excludeServers', '');
	if(currentServers == '')
	{
		currentServers = new Array();
	}
	else
	{
		currentServers = currentServers.split(',');
	}

	for(i = 0; i < servers.length; i++)
	{
		servers[i] = servers[i].toLowerCase();
		currentServers.push(servers[i]);
	}

	GM_setValue('excludeServers', currentServers.toString());
}
function removeExclude()
{
	answer = prompt('Add servers to exclude. Ex: beta ceti', '');
	if(answer == '')
		return;

	servers = answer.split(' ');

	currentServers = GM_getValue('excludeServers', '');
	if(currentServers == '')
	{
		return;
	}
	else
	{
		currentServers = currentServers.split(',');
	}

	for(i = 0; i < currentServers.length; i++)
	{
		for(j = 0; j < servers.length; j++)
		{
			if(currentServers[i] == servers[j].toLowerCase())
			{
				currentServers.splice(i, 1);
				i--;
				break;
			}
		}
	}

	GM_setValue('excludeServers', currentServers.toString());
}

function addOptions()
{
	if(typeof(GM_getValue) != 'function')
		return;

	GM_registerMenuCommand('Check Excluded Servers', checkExcludes, 'c', 'shift alt', 'c');
	GM_registerMenuCommand('Exclude Servers', addExclude, 'e', 'shift alt', 'e');
	GM_registerMenuCommand('Unexclude Servers', removeExclude, 'u', 'shift alt', 'u');
}

function addEmpireMenus()
{
	menu = document.createElement('table');
	menu.id = 'empire_menu';
	menu.class = 'header';
	menu.height = '25';
	menu.align = 'center';

	if(SKIN == 'Dark Astros')
	{
		menu.innerHTML = '<tbody><tr><th width="10%"><a href="empire.aspx?view=bases_events">Events</a></th><th width="10%"><a href="empire.aspx?view=bases_production">Production</a></th><th width="10%"><a href="empire.aspx?view=economy">Economy</a></th><th width="10%"><a href="empire.aspx?view=trade">Trade</a></th><th width="10%"><a href="empire.aspx?ch=1&amp;view=scanners">Scanners</a></th></tr><tr><th width="10%"><a href="empire.aspx?view=bases_capacities">Capacities</a></th><th width="10%"><a href="empire.aspx?view=structures">Structures</a></th><th width="10%"><a href="empire.aspx?view=fleets">Fleets</a></th><th width="10%"><a href="empire.aspx?view=units">Units</a></th><th width="*"><a href="empire.aspx?view=technologies">Technologies</a></th></tr></tbody>';

		tables = document.getElementsByTagName('table');
		firstTable = tables[0];

		menu.width = firstTable.width;
	}
	else if(SKIN == 'Deep Space')
	{
		menu.innerHTML = '<tbody><tr><td><table class="default_box-header box-header"><tbody><tr><td class="default_box-header-left box-header-left">&nbsp;</td><td class="default_box-header-center box-header-center">&nbsp;</td><td class="default_box-header-right box-header-right">&nbsp;</td></tr></tbody></table></td></tr><tr><td><table class="default_box-content box-content"><tbody><tr><td class="default_box-content-left box-content-left">&nbsp;</td><td class="default_box-content-center box-content-center"><div class="default_content"><table id="empire_menu" class="menu"><tbody><tr class="row1"><td class="menu-item" style="width: 20%;"><table id="bases_events" class="button button-normal-active"><tbody><tr><td class="button-left"><a href="empire.aspx?view=bases_events">&nbsp;</a></td><td class="button-center"><a href="empire.aspx?view=bases_events">Events</a></td><td class="button-right"><a href="empire.aspx?view=bases_events">&nbsp;</a></td></tr></tbody></table></td><td class="menu-separator"><div>&nbsp;</div></td><td class="menu-item" style="width: 20%;"><table id="bases_production" onmouseover=\'buttonOver(this, "button button-normal-over")\' onmouseout="buttonOut(this)" class="button button-normal"><tbody><tr><td class="button-left"><a href="empire.aspx?view=bases_production">&nbsp;</a></td><td class="button-center"><a href="empire.aspx?view=bases_production">Production</a></td><td class="button-right"><a href="empire.aspx?view=bases_production">&nbsp;</a></td></tr></tbody></table></td><td class="menu-separator"><div>&nbsp;</div></td><td class="menu-item" style="width: 20%;"><table id="economy" onmouseover=\'buttonOver(this, "button button-normal-over")\' onmouseout="buttonOut(this)" class="button button-normal"><tbody><tr><td class="button-left"><a href="empire.aspx?view=economy">&nbsp;</a></td><td class="button-center"><a href="empire.aspx?view=economy">Economy</a></td><td class="button-right"><a href="empire.aspx?view=economy">&nbsp;</a></td></tr></tbody></table></td><td class="menu-separator"><div>&nbsp;</div></td><td class="menu-item" style="width: 20%;"><table id="trade" onmouseover=\'buttonOver(this, "button button-normal-over")\' onmouseout="buttonOut(this)" class="button button-normal"><tbody><tr><td class="button-left"><a href="empire.aspx?view=trade">&nbsp;</a></td><td class="button-center"><a href="empire.aspx?view=trade">Trade</a></td><td class="button-right"><a href="empire.aspx?view=trade">&nbsp;</a></td></tr></tbody></table></td><td class="menu-separator"><div>&nbsp;</div></td><td class="menu-item"><table id="scanners" onmouseover=\'buttonOver(this, "button button-normal-over")\' onmouseout="buttonOut(this)" class="button button-normal"><tbody><tr><td class="button-left"><a href="empire.aspx?ch=1&amp;view=scanners">&nbsp;</a></td><td class="button-center"><a href="empire.aspx?ch=1&amp;view=scanners">Scanners</a></td><td class="button-right"><a href="empire.aspx?ch=1&amp;view=scanners">&nbsp;</a></td></tr></tbody></table></td></tr><tr class="row2"><td class="menu-item" style="width: 20%;"><table id="bases_capacities" onmouseover=\'buttonOver(this, "button button-normal-over")\' onmouseout="buttonOut(this)" class="button button-normal"><tbody><tr><td class="button-left"><a href="empire.aspx?view=bases_capacities">&nbsp;</a></td><td class="button-center"><a href="empire.aspx?view=bases_capacities">Capacities</a></td><td class="button-right"><a href="empire.aspx?view=bases_capacities">&nbsp;</a></td></tr></tbody></table></td><td class="menu-separator"><div>&nbsp;</div></td><td class="menu-item" style="width: 20%;"><table id="structures" onmouseover=\'buttonOver(this, "button button-normal-over")\' onmouseout="buttonOut(this)" class="button button-normal"><tbody><tr><td class="button-left"><a href="empire.aspx?view=structures">&nbsp;</a></td><td class="button-center"><a href="empire.aspx?view=structures">Structures</a></td><td class="button-right"><a href="empire.aspx?view=structures">&nbsp;</a></td></tr></tbody></table></td><td class="menu-separator"><div>&nbsp;</div></td><td class="menu-item" style="width: 20%;"><table id="fleets" onmouseover=\'buttonOver(this, "button button-normal-over")\' onmouseout="buttonOut(this)" class="button button-normal"><tbody><tr><td class="button-left"><a href="empire.aspx?view=fleets">&nbsp;</a></td><td class="button-center"><a href="empire.aspx?view=fleets">Fleets</a></td><td class="button-right"><a href="empire.aspx?view=fleets">&nbsp;</a></td></tr></tbody></table></td><td class="menu-separator"><div>&nbsp;</div></td><td class="menu-item" style="width: 20%;"><table id="units" onmouseover=\'buttonOver(this, "button button-normal-over")\' onmouseout="buttonOut(this)" class="button button-normal"><tbody><tr><td class="button-left"><a href="empire.aspx?view=units">&nbsp;</a></td><td class="button-center"><a href="empire.aspx?view=units">Units</a></td><td class="button-right"><a href="empire.aspx?view=units">&nbsp;</a></td></tr></tbody></table></td><td class="menu-separator"><div>&nbsp;</div></td><td class="menu-item"><table id="technologies" onmouseover=\'buttonOver(this, "button button-normal-over")\' onmouseout="buttonOut(this)" class="button button-normal"><tbody><tr><td class="button-left"><a href="empire.aspx?view=technologies">&nbsp;</a></td><td class="button-center"><a href="empire.aspx?view=technologies">Technologies</a></td><td class="button-right"><a href="empire.aspx?view=technologies">&nbsp;</a></td></tr></tbody></table></td></tr></tbody></table></div></td><td class="default_box-content-right box-content-right">&nbsp;</td></tr></tbody></table></td></tr><tr><td><table class="default_box-footer box-footer"><tbody><tr><td class="default_box-footer-left box-footer-left">&nbsp;</td><td class="default_box-footer-center box-footer-center">&nbsp;</td><td class="default_box-footer-right box-footer-right">&nbsp;</td></tr></tbody></table></td></tr></tbody>';
		menu.id = 'empire_menu';
		menu.className = 'box-complex box box-full default';

		firstTable = document.getElementById('main-header');
	}

	firstTable.parentNode.insertBefore(menu, firstTable.nextSibling);
	lineBreak = document.createElement('br');
	firstTable.parentNode.insertBefore(lineBreak, menu);
}

function addProfileLink()
{
	elem = document.getElementById('account');
	if(SKIN == 'Dark Astros')
	{
		elem = elem.nextSibling;
	}
	else if(SKIN == 'Deep Space')
	{
		elem = elem.parentNode.parentNode.parentNode.parentNode.rows[0];
		// alert(elem + ' ' + elem.innerHTML);
		elem = elem.cells[2].firstChild;
		elem = elem.rows[0].cells[1];
	}

	url = window.location.href;
	url = url.substr(0, url.search('com') + 3) + '/profile.aspx';
	elem.innerHTML = "<a href='" + url + "'>" + elem.innerHTML + '</a>';
}

function showFleets(elem)
{
	name = elem.title;

	if(window.location.href.search('map.aspx') != -1)
		table = document.getElementById('map_fleets');
	else
		table = document.getElementById('base_fleets');
	if(SKIN == 'Dark Astros')
	{
		table = table.rows[2].cells[0].firstChild;
	}
	else if(SKIN == 'Deep Space')
	{
		table = table.rows[2].cells[0].firstChild;
		table = table.rows[0].cells[1].firstChild.firstChild.nextSibling;
	}

	// Look for all fleets belonging to this guild and hide them
	for(i = 1; i < table.rows.length; i++)
	{
		row = table.rows[i];
		if(row.cells[1].innerHTML.indexOf(name) != -1 ||
			(name == "unguilded" && row.cells[1].innerHTML.search(/\[(.*?)\]/i) == -1))
		{
			row.style.display = '';
		}
	}

	// change elem to hide fleets
	parent = elem.parentNode;
	link = document.createElement('a');
	link.title = elem.title;
	link.href = "javascript:void(0);";
	link.innerHTML = "Hide";
	link.addEventListener('click',
		function()
		{
			hideFleets(this);
		},
		false
	);
	parent.removeChild(elem);
	parent.appendChild(link);
}

function hideFleets(elem)
{
	name = elem.title;

	if(window.location.href.search('map.aspx') != -1)
		table = document.getElementById('map_fleets');
	else
		table = document.getElementById('base_fleets');
	if(SKIN == 'Dark Astros')
	{
		table = table.rows[2].cells[0].firstChild;
	}
	else if(SKIN == 'Deep Space')
	{
		table = table.rows[2].cells[0].firstChild;
		table = table.rows[0].cells[1].firstChild.firstChild.nextSibling;
	}

	// Look for all fleets belonging to this guild and hide them
	for(i = 1; i < table.rows.length; i++)
	{
		row = table.rows[i];
		if(row.cells[1].innerHTML.indexOf(name) != -1 ||
			(name == "unguilded" && row.cells[1].innerHTML.search(/\[(.*?)\]/i) == -1))
		{
			row.style.display = 'none';
		}
	}

	// change elem to show fleets
	parent = elem.parentNode;
	link = document.createElement('a');
	link.title = elem.title;
	link.href = "javascript:void(0);";
	link.innerHTML = "Show";
	link.addEventListener('click',
		function()
		{
			showFleets(this);
		},
		false
	);
	parent.removeChild(elem);
	parent.appendChild(link);
}

function moveFleetSummary()
{
	sumElem = document.getElementById('fleets_summary');
	if(!sumElem)
		return;

	sumElem.style.display = 'block';

	if(window.location.href.search('map.aspx') != -1)
		fleetsTable = document.getElementById('map_fleets');
	else
		fleetsTable = document.getElementById('base_fleets');

	sumElem.parentNode.removeChild(sumElem);
	fleetsTable.parentNode.insertBefore(sumElem, fleetsTable);

	rowHTML = fleetsTable.rows[2].innerHTML
	fleetsTable.deleteRow(2);
	fleetsTable.insertRow(0);
	fleetsTable.rows[0].innerHTML = rowHTML;

	document.getElementById('link_hide_fleets_summary').style.display = 'inline';
	document.getElementById('link_show_fleets_summary').style.display = 'none';

	// add hides for each guild if more than one guild displayed
	if(SKIN == 'Dark Astros')
	{
		sumElem = sumElem.firstChild.rows[1].cells[0].firstChild;
	}
	else if(SKIN == 'Deep Space')
	{
		sumElem = sumElem.firstChild.rows[1].cells[0].firstChild;
		sumElem = sumElem.rows[0].cells[1].firstChild.firstChild.nextSibling;
	}

	if(sumElem.innerHTML.search('<th>Total</th>') == -1)
		return;

	for(i = 1; i < sumElem.rows.length - 1; i++)
	{
		name = sumElem.rows[i].cells[0];
		if(name.firstChild.innerHTML == null)
		{
			name = name.innerHTML;
		}
		else
		{
			name = name.firstChild.innerHTML;
		}
		sumElem.rows[i].cells[0].innerHTML += ' - ';
		link = document.createElement('a');
		link.href = "javascript:void(0);";
		link.innerHTML = "Hide";
		link.title = name;
		link.addEventListener('click',
			function()
			{
				hideFleets(this);
			},
			true
		);
		sumElem.rows[i].cells[0].appendChild(link);
	}
}

function enhanceCapacities()
{
	mainTable = document.getElementById('empire_capacities');
	mainRow = mainTable.rows[1];
	mainCell = mainRow.cells[0];
	if(SKIN == 'Dark Astros')
	{
		realTable = mainCell.firstChild;
	}
	else if(SKIN == 'Deep Space')
	{
		fakeTable = mainCell.firstChild;
		realTable = fakeTable.rows[0].cells[1].firstChild.firstChild.nextSibling;
	}

	addConstr = 0;
	addProd = 0;
	for(i = 1; i < realTable.rows.length - 1; i++)
	{
		commanderCell = realTable.rows[i].cells[7];
		if(commanderCell.innerHTML != '')
		{
			commanderText = commanderCell.firstChild.innerHTML;
			commanderParts = commanderText.split(' ');
			effect = (100 - Number(commanderParts[1])) / 100;
		}

		var bonusCell = null;
		if(commanderCell.innerHTML.search('Construction') != -1)
		{
			bonusCell = realTable.rows[i].cells[4];
			baseText = bonusCell.innerHTML.replace(/[,]/g, '').replace(/[.]/g, '');
			oldValue = Number(baseText);
			newValue = Math.ceil(oldValue / effect);
			bonusCell.innerHTML += ' <font color="orange">(' + newValue + ')</font>';
			addConstr += newValue - oldValue;
		}
		else if(commanderCell.innerHTML.search('Production') != -1)
		{
			bonusCell = realTable.rows[i].cells[5];
			baseText = bonusCell.innerHTML.replace(',', '').replace('.', '');
			parts = baseText.split(' ');
			oldValue = Number(parts[0]);
			newValue = Math.ceil(oldValue / effect);
			bonusCell.innerHTML += ' <font color="orange">(' + newValue + ')</font>';
			addProd += newValue - oldValue;
		}
	}

	// for last row add the new totals
	lastRow = realTable.rows[realTable.rows.length - 1];
	constrCell = lastRow.cells[4];
	prodCell = lastRow.cells[5];

	constrElem = constrCell.firstChild;
	oldConstr = Number(constrElem.innerHTML.replace(',', '').replace('.', ''));
	newConstr = oldConstr + addConstr;
	constrElem.innerHTML += ' <font color="orange">(' + newConstr + ')</font>';

	prodElem = prodCell.firstChild;
	oldProd = Number(prodElem.innerHTML.replace(',', '').replace('.', ''));
	newProd = oldProd + addProd;
	prodElem.innerHTML += ' <font color="orange">(' + newProd + ')</font>';
}

function enhanceBaseCapacities()
{
	tds = document.getElementsByTagName('td');
	i = 0;
	j = -1;
	for(i = 0; i < tds.length; i++)
	{
		if(tds[i].innerHTML.search('Base Commander') != -1)
		{
			j = i;
		}
	}

	// Quit if a Base Commander isn't found
	if(j == -1)
		return;

	elem = tds[j].lastChild;
	commanderText = elem.innerHTML;
	commanderText = commanderText.substr(1, commanderText.length - 2);
	parts = commanderText.split(' ');
	type = parts[0];
	level = Number(parts[1]);
	effect = (100 - level) / 100;

	if(type == 'Construction' || type == 'Production' || type == 'Research')
	{
		mainTable = document.getElementById('base_processing-capacities');
		fakeTable = mainTable.rows[1].cells[0].firstChild;
		if(SKIN == 'Dark Astros')
		{
			realTable = fakeTable;
		}
		else if(SKIN == 'Deep Space')
		{
			realTable = fakeTable.rows[0].cells[1].firstChild.lastChild;
		}

		var row;
		if(type == 'Construction')
			row = realTable.rows[0];
		else if(type == 'Production')
			row = realTable.rows[1];
		else
			row = realTable.rows[2];

		cell = row.cells[1];
		oldValue = Number(cell.innerHTML.replace(/[,]/g, '').replace(/[.]/g, ''));
		newValue = Math.ceil(oldValue / effect);
		cell.innerHTML += ' <font color="orange">(' + newValue + ')</font>';
	}
	else if(type == 'Logistics' || type == 'Tactical')
	{
		mainTable = document.getElementById('base_resume-structures');
		if(SKIN == 'Dark Astros')
		{
			realTable = mainTable.rows[0].cells[0].firstChild;
		}
		else if(SKIN == 'Deep Space')
		{
			fakeTable = mainTable.rows[1].cells[0].firstChild;
			realTable = fakeTable.rows[0].cells[1].firstChild.lastChild;
		}
		row = realTable.rows[1];

		// Get the index of value to change
		checkCol = row.cells[2];
		checkParts = checkCol.innerHTML.split('<br>');
		i = 0;
		for(i = 0; i < checkParts.length - 1; i++)
		{
			if((type == 'Logistics' && checkParts[i] == 'Jump Gate') || (type == 'Tactical' && checkParts[i] == 'Command Centers'))
			{
				break;
			}
		}

		// Change value of it
		changeCol = row.cells[3];
		changeParts = changeCol.innerHTML.split('<br>');
		changeValue = Number(changeParts[i]);

		if(type == 'Logistics')
		{
			newValue = 1 / (changeValue + 1) * effect;
			newValue = (1 / newValue) - 1;
			newValue = newValue.toFixed(2);
		}
		else
		{
			newValue = changeValue + (level / 5);
			newValue = newValue.toFixed(1);
		}


		changeParts[i] += ' <font color="orange">(' + newValue + ')</font>';

		// Rewrite back in
		newText = '';
		for(i = 0; i < changeParts.length - 1; i++)
		{
			newText += changeParts[i] + '<br>';
		}
		changeCol.innerHTML = newText;
	}
}

function addBaseQueue(elem)
{
	if(window.location.href.search('view=research') == -1)
	{
		timeCell  = 5;
	}
	else
	{
		timeCell = 3;
	}

	row = elem.parentNode.parentNode;
	elem = row.cells[1].getElementsByTagName('font');
	// If item already has queue info
	if(elem.length != 0)
	{
		elem = elem[0];
		currentLv = Number(elem.innerHTML.substr(7, elem.innerHTML.length - 8));
		currentLv++;
		elem.innerHTML = '{Level ' + currentLv + '}';

		elem = row.cells[2].getElementsByTagName('font')[0];
		currentCost = Number(elem.innerHTML.substr(1, elem.innerHTML.length - 2));
		currentCost *= 1.5;
		elem.innerHTML = '{' + currentCost.toFixed(0) + '}';

		elem = row.cells[timeCell].getElementsByTagName('font')[0];
		currentTime = stringToTime(elem.innerHTML.substr(1, elem.innerHTML.length - 2));
		currentTime *= 1.5;
		elem.innerHTML = '{' + timeToString(currentTime, 'h') + '}';
	}
	else
	{
		elem = row.cells[1];
		pos = elem.innerHTML.search('Level');
		// If level 0
		if(pos == -1)
		{
			currentLv = 0;
		}
		// if level >= 1
		else
		{
			currentLv = Number(elem.innerHTML.substr(pos + 6, elem.innerHTML.length - pos - 7).replace(/[)]/ig, ''));
		}
		currentLv++;
		row.cells[1].innerHTML += ' <font color="orange">(Level ' + currentLv + ')</font>';

		currentCost = row.cells[2].innerHTML.replace(/[,]/g, '').replace(/[.]/g, '');
		currentCost *= 1.5;
		row.cells[2].innerHTML += '<br><font color="orange">(' + currentCost.toFixed(0) + ')</font>';

		currentTime = stringToTime(row.cells[timeCell].innerHTML);
		currentTime *= 1.5;
		row.cells[timeCell].innerHTML += '<br><font color="orange">(' + timeToString(currentTime, 'h') + ')</font>';
	}
}

function removeBaseQueue(structure)
{
	// Get the table of structures
	table = document.getElementById('base_structures');
	endCell = 6;
	timeCell = 5;
	if(!table)
	{
		table = document.getElementById('base_defenses');
	}
	if(!table)
	{
		table = document.getElementById('base_reseach');
		endCell = 4;
		timeCell = 3;

		// Check if the user can even view the research here
		if(table.rows[1].cells[0].innerHTML.search('The research of this base') != -1 || table.rows[1].cells[0].innerHTML.search('You must build Research Labs first') != -1)
		{
			return;
		}
	}

	if(SKIN == 'Dark Astros')
	{
		table = table.rows[1].cells[0].firstChild.nextSibling.nextSibling;
		deleteCell = 1;
	}
	else if(SKIN == 'Deep Space')
	{
		table = table.rows[1].cells[0].firstChild;
		table = table.rows[0].cells[1].firstChild.firstChild.nextSibling.nextSibling.nextSibling;
		deleteCell = 0;
	}

	// Go through each line
	for(i = 1; i < table.rows.length; i += 2)
	{
		if(table.rows[i].innerHTML.search(structure) != -1)
		{
			row = table.rows[i];
			break;
		}
	}

	elem = row.cells[1].getElementsByTagName('font')[0];
	currentLv = Number(elem.innerHTML.substr(7, elem.innerHTML.length - 8));
	currentLv--;
	// If at actual level remove all of these extra labels
	if(elem.parentNode.innerHTML.search('Level ' + currentLv) != -1 ||
		(elem.parentNode.innerHTML.search('Level') > elem.parentNode.innerHTML.search('<font') && currentLv == 0))
	{
		elems = row.getElementsByTagName('font');
		while(elems.length != 0)
		{
			elems[0].parentNode.innerHTML = elems[0].parentNode.innerHTML.replace(/<br>/ig, '');
			elems[0].parentNode.removeChild(elems[0]);
		}
	}
	else
	{
		elem.innerHTML = '{Level ' + currentLv + '}';

		elem = row.cells[2].getElementsByTagName('font')[0];
		currentCost = Number(elem.innerHTML.substr(1, elem.innerHTML.length - 2));
		currentCost /= 1.5;
		elem.innerHTML = '{' + currentCost.toFixed(0) + '}';

		elem = row.cells[timeCell].getElementsByTagName('font')[0];
		currentTime = stringToTime(elem.innerHTML.substr(1, elem.innerHTML.length - 2));
		currentTime /= 1.5;
		elem.innerHTML = '{' + timeToString(currentTime, 'h') + '}';
	}
}

function refreshQueueItems(listElem)
{
	// Wait until the list of queued Items actually changes
	if(listElem == document.getElementById('item'))
	{
		window.setTimeout(
			function()
			{
				refreshQueueItems(listElem);
			}, 200);
		return;
	}

	listElem = document.getElementById('item');
	if(listElem)
	{
		opt = new Array(listElem.options.length);
		for(i = 0; i < listElem.options.length; i++)
		{
			opt[i] = listElem.options[i].value;
		}
	}
	else
	{
		opt = new Array();
	}

	// Get the table of structures
	table = document.getElementById('base_structures');
	endCell = 6;
	timeCell = 5;
	if(!table)
	{
		table = document.getElementById('base_defenses');
	}
	if(!table)
	{
		table = document.getElementById('base_reseach');
		endCell = 4;
		timeCell = 3;

		// Check if the user can even view the research here
		if(table.rows[1].cells[0].innerHTML.search('The research of this base') != -1 || table.rows[1].cells[0].innerHTML.search('You must build Research Labs first') != -1)
		{
			return;
		}
	}

	if(SKIN == 'Dark Astros')
	{
		table = table.rows[1].cells[0].firstChild.nextSibling.nextSibling;
		deleteCell = 1;
	}
	else if(SKIN == 'Deep Space')
	{
		table = table.rows[1].cells[0].firstChild;
		table = table.rows[0].cells[1].firstChild.firstChild.nextSibling.nextSibling.nextSibling;
		deleteCell = 0;
	}

	// Go through each line
	for(i = 1; i < table.rows.length; i += 2)
	{
		row = table.rows[i];

		// Search if this structure is possible to queue
		queue = false;
		if(row.cells[endCell].innerHTML.search('Build') != -1 || row.cells[endCell].innerHTML.search('Research') != -1)
		{
			queue = false;
		}
		else
		{
			for(j = 0; j < opt.length; j++)
			{
				if(table.rows[i].cells[0].innerHTML.search('Research Labs linked') != -1)
				{
					break;
				}

				row = table.rows[i];
				name = row.cells[1].firstChild.firstChild.innerHTML;

				if(opt[j] == name)
				{
					queue = true;
					break;
				}
			}
		}

		if(queue == true && row.cells[endCell].innerHTML.search('Queue') == -1)
		{
			input = document.createElement('input');
			input.type = 'button';
			input.value = 'Queue';
			input.title = j;
			input.addEventListener('click', function (e)
				{
					e.stopPropagation();
					queueItem(this);
				}
				, false);
			input.className = 'input-button';

			// If this is what is building
			if(row.cells[endCell].id == 'time1')
			{
				span = document.createElement('span');
				span.id = 'time1';
				span.class = 'active';
				span.title = row.cells[endCell].title;

				blank = document.createElement('span');
				blank.innerHTML = '<br/>';

				row.cells[endCell].innerHTML = '';
				row.cells[endCell].id = '';
				row.cells[endCell].class = '';
				row.cells[endCell].title = '';

				row.cells[endCell].appendChild(input);
				row.cells[endCell].appendChild(blank);
				row.cells[endCell].appendChild(span);
			}
			else
			{
				row.cells[endCell].innerHTML = "";
				row.cells[endCell].appendChild(input);
			}
		}
		// Change the title of the queue item
		else if(queue == true)
		{
			input = row.cells[endCell].firstChild;
			input.title = j;
		}
		else if(queue == false && row.cells[endCell].innerHTML.search('Queue') != -1)
		{
			if(row.cells[endCell].innerHTML.search('time1') == -1)
			{
				row.cells[endCell].className = 'gray inactive';
				row.cells[endCell].align = 'center';
				row.cells[endCell].innerHTML = 'working';
			}
			else
			{
				span = row.cells[endCell].lastChild;
				row.cells[endCell].innerHTML = span.innerHTML;
				row.cells[endCell].id = 'time1';
				row.cells[endCell].title = span.title;
			}
		}
	}

	elems = document.getElementsByClassName('remove-queue');
	for(i = 0; i < elems.length; i++)
	{
		elems[i].addEventListener('click',
			function()
			{
				listElem = document.getElementById('item');
				refreshQueueItems(listElem);
				removeBaseQueue(this.parentNode.parentNode.cells[0].innerHTML);
			},
		false);
	}
}

function queueItem(elem)
{
	listElem = document.getElementById('item');
	listElem.selectedIndex = elem.title;

	listElem.parentNode.parentNode.cells[1].firstChild.click();
	addBaseQueue(elem);

	refreshQueueItems(listElem);
}

function enhanceBaseConstruction()
{
	// Get already queued up items
	queueList = new Array();
	table = document.getElementById('base-queue_content');
	table = table.firstChild.firstChild;

	// Get list of items queued up
	for(i = 0; i < table.rows.length; i++)
	{
		if(table.rows[i].cells[1].innerHTML.search('Add to Queue') != -1)
		{
			break;
		}

		item = table.rows[i].cells[0].innerHTML;
		if(queueList[item] == null)
		{
			queueList[item] = 1;
		}
		else
		{
			queueList[item] = queueList[item] + 1;
		}
	}

	// Get the table of structures
	table = document.getElementById('base_structures');
	endCell = 6;
	timeCell = 5;
	if(!table)
	{
		table = document.getElementById('base_defenses');
	}
	if(!table)
	{
		table = document.getElementById('base_reseach');
		endCell = 4;
		timeCell = 3;

		// Check if the user can even view the research here
		if(table.rows[1].cells[0].innerHTML.search('The research of this base') != -1 || table.rows[1].cells[0].innerHTML.search('You must build Research Labs first') != -1)
		{
			return;
		}
	}

	if(SKIN == 'Dark Astros')
	{
		table = table.rows[1].cells[0].firstChild.nextSibling.nextSibling;
		deleteCell = 1;
	}
	else if(SKIN == 'Deep Space')
	{
		table = table.rows[1].cells[0].firstChild;
		table = table.rows[0].cells[1].firstChild.firstChild.nextSibling.nextSibling.nextSibling;
		deleteCell = 0;
	}

	// Get list of what can be done
	listElem = document.getElementById('item');
	if(listElem)
	{
		opt = new Array(listElem.options.length);
		for(i = 0; i < listElem.options.length; i++)
		{
			opt[i] = listElem.options[i].value;
		}
	}
	else
	{
		opt = new Array();
	}

	// Add queue option
	for(i = 1; i < table.rows.length; i += 2)
	{
		if(table.rows[i].cells[0].innerHTML.search('Research Labs linked') != -1)
		{
			break;
		}

		row = table.rows[i];
		name = row.cells[1].firstChild.firstChild.innerHTML;

		// If nothing to queue, menu already setup for it
		if(row.cells[endCell].innerHTML.search('Build') == -1 && row.cells[endCell].innerHTML.search('Research') == -1)
		{
			// Check if this is whats building to add it to queueList
			if(row.cells[endCell].id == 'timer1')
			{
				if(queueList[name] == null)
				{
					queueList[name] = 1;
				}
				else
				{
					queueList[name] = queueList[name] + 1;
				}
			}

			// Search for if their is a option to queue this building
			for(j = 0; j < opt.length; j++)
			{
				if(opt[j] == name)
				{
					input = document.createElement('input');
					input.type = 'button';
					input.value = 'Queue';
					input.title = j;
					input.addEventListener('click', function (e)
						{
							e.stopPropagation();
							queueItem(this);
						}
						, false);
					input.className = 'input-button';

					// If this is what is building
					if(row.cells[endCell].id == 'timer1')
					{
						span = document.createElement('span');
						span.id = 'timer1';
						span.class = 'active';
						span.title = row.cells[endCell].title;

						blank = document.createElement('span');
						blank.innerHTML = '<br/>';

						row.cells[endCell].innerHTML = '';
						row.cells[endCell].id = '';
						row.cells[endCell].class = '';
						row.cells[endCell].title = '';

						row.cells[endCell].appendChild(input);
						row.cells[endCell].appendChild(blank);
						row.cells[endCell].appendChild(span);
					}
					else
					{
						row.cells[endCell].innerHTML = "";
						row.cells[endCell].appendChild(input);
					}

					break;
				}

			}

			// Search for if there is a item of this type queued
			if(queueList[name] != null)
			{
				currentCost = row.cells[2].innerHTML;
				currentCost = currentCost.replace(/[,]/g, '').replace(/[.]/g, '');

				currentTime = row.cells[timeCell].innerHTML;
				currentTime = stringToTime(currentTime);

				currentLv = row.cells[1].innerHTML;
				currentLv = currentLv.split('(');
				if(currentLv.length != 1)
				{
					currentLv = currentLv[1].split(')')[0];
					currentLv = Number(currentLv.substr(6));
				}
				else
				{
					currentLv = 0;
				}

				queued = Number(queueList[name]);
				for(j = 0; j < queued; j++)
				{
					currentCost *= 1.5;
					currentTime *= 1.5;
					currentLv++;
				}

				row.cells[2].innerHTML += '<br/><font color="orange">(' + currentCost.toFixed(0) + ')</font>';
				row.cells[timeCell].innerHTML += '<br/><font color="orange">(' + timeToString(currentTime, 'h') + ')</font>';
				row.cells[1].innerHTML += ' <font color="orange">(Level ' + currentLv + ')</font>';
			}
		}
		// row.cells[endCell].align = 'right';
	}

	elems = document.getElementsByClassName('remove-queue');
	for(i = 0; i < elems.length; i++)
	{
		elems[i].addEventListener('click',
			function()
			{
				listElem = document.getElementById('item');
				refreshQueueItems(listElem);
				removeBaseQueue(this.parentNode.parentNode.cells[0].innerHTML);
			},
		false);
	}
}

function addQuote(link)
{
	table = document.getElementById('board_main');
	if(SKIN == 'Dark Astros')
	{
		table = table.rows[0].cells[0].firstChild.firstChild;
	}
	else if(SKIN == 'Deep Space')
	{
		fakeTable = table.rows[1].cells[0].firstChild;
		table = fakeTable.rows[0].cells[1].firstChild.firstChild.firstChild;
	}

	player = table.rows[Number(link.id) - 1].cells[1].firstChild;
	player = "[url=" + player.href + "]" + player.innerHTML + "[/url]";

	message = table.rows[link.id].cells[0].innerHTML;

	message = message.replace(/\n/gim, "")
	message = message.replace(/<img src="http:\/\/graphics2.astroempires.com\/skins\/darkAstros\/images\/stars\/Red%20Giant.jpg" height="10px" width="10px">/gim, "");
	message = message.replace(/<i>(.*?)<\/i>/gim, "[i]$1[/i]")
	message = message.replace(/<b>(.*?)<\/b>/gim, "[b]$1[/b]")
	message = message.replace(/<u>(.*?)<\/u>/gim, "[u]$1[/u]")
	message = message.replace(/<font color="(.*?)">(.*?)<\/font>/gim, "[color=$1]$2[/color]")
	message = message.replace(/<font size="(.*?)">(.*?)<\/font>/gim, "[size=$1]$2[/size]")
	message = message.replace(/<code>(.*?)<\/code>/gim, "[code]$1[/code]")
	message = message.replace(/<ul>(.*?)<\/ul>/gim, "[list]$1[/list]")
	message = message.replace(/<li>(.*?)<\/li>/gim, "[*]$1")
	message = message.replace(/<a href="redirect.aspx\?(.*?)" target="_blank">(.*?)<\/a>/gim, "[url=$1]$2[/url]")
	message = message.replace(/<a href="mailto:(.*?)">(.*?)<\/a>/gim, "[mail='$1']$2[/mail]")
	message = message.replace(/<img src="(.*?)"(.*?)>/gim, "[img]$1[/img]")
	message = message.replace(/<div align="(.*?)">(.*?)<\/div>/gim, "[$1]$2[/$1]")
	message = message.replace(/<blockquote>(.*?)<blockquote>(.*?)<blockquote>(.*?)<\/blockquote>(.*?)<\/blockquote>(.*?)<\/blockquote>/gim, "<blockquote>$1<blockquote>$2$4</blockquote>$5</blockquote>");
	message = message.replace(/<br(.*?)>/gim, "\n")

	message = message.replace(/<blockquote>/gi, '[quote]');
	message = message.replace(/<\/blockquote>/gi, '[/quote]');
	message = message.replace(/\[list\]/g, '[quote]');
	message = message.replace(/\[\/list\]/g, '[/quote]');

	message = message.replace(/<(.*?)>/gim, "")
	message = message.replace(/&lt;/gim, "<")
	message = message.replace(/&gt;/gim, ">")
	message = message.replace(/&amp;/gim, "&")

	message = '[quote]' + player + ':\n\n' + message + '[/quote]\n';

	board = document.getElementById('body');
	if(board.value)
	{
		board.value += '\n\n' + message;
	}
	else
	{
		board.value += message;
	}
	board.focus();
	board.scrollTop = board.scrollHeight;
}

function addBoardQuotes()
{
	table = document.getElementById('board_main');
	if(SKIN == 'Dark Astros')
	{
		table = table.rows[0].cells[0].firstChild.firstChild;
	}
	else if(SKIN == 'Deep Space')
	{
		fakeTable = table.rows[1].cells[0].firstChild;
		table = fakeTable.rows[0].cells[1].firstChild.firstChild.firstChild;
	}

	table.rows[0].cells[1].colSpan = '3';
	if(table.rows[1].innerHTML.search('Jump first unread') != -1)
	{
		table.rows[1].cells[0].colSpan = '5';
		i = 2;
		length = table.rows.length - 6;
	}
	else
	{
		i = 1;
		length = table.rows.length - 4;
	}

	// change header
	row = table.rows[i];
	row.cells[2].width = '20%';
	row.cells[3].width = '20%';
	newCell = document.createElement('td');
	newCell.width = '10%';
	row.appendChild(newCell);
	i++;

	for(i = i; i < length; i += 2)
	{
		row = table.rows[i];
		newCell = document.createElement('td');
		link = document.createElement('a');
		link.href = "javascript:void(0);";
		link.id = i + 1;
		link.innerHTML = 'Quote';
		link.addEventListener('click',
		 	function()
			{
				addQuote(this);
			},
			false);
		newCell.appendChild(link);
		row.appendChild(newCell);
	}

	table.rows[i + 1].cells[0].colSpan = '5';
	table.rows[i + 2].cells[1].colSpan = '3';
	table.rows[i + 3].cells[1].colSpan = '3';
	if(table.rows[1].innerHTML.search('Jump first unread') != -1)
	{
		table.rows[i + 4].cells[0].colSpan = '5';
	}
}

function setMasterProduction()
{
	typeElem = document.getElementById('mast_type');
	type = typeElem.value;
	quantElem = document.getElementById('mast_quant');
	quant = quantElem.value;

	for(i = 1; i > 0; i++)
	{
		selectElem = document.getElementById('select_' + i);
		quantElem = document.getElementById('quant_' + i);

		if(!selectElem)
		{
			break;
		}

		selectElem.value = type;
		if(selectElem.value == type)
		{
			quantElem.value = quant;
			unsafeWindow.update_row("" + i);
		}
	}
}

function addMasterProduction()
{
	table = document.getElementById('empire_ production');
	if(SKIN == 'Dark Astros')
	{
		table = table.rows[1].cells[0].firstChild.firstChild;
	}
	else if(SKIN == 'Deep Space')
	{
		table = table.rows[1].cells[0].firstChild;
		table = table.rows[0].cells[1].firstChild.firstChild.nextSibling.firstChild;
	}

	newRow = table.insertRow(1);
	newRow.align = 'center';

	cell0 = document.createElement('td');
	cell0.innerHTML = 'Master Set';
	newRow.appendChild(cell0);

	cell1 = document.createElement('td');
	cell1.colSpan = '2';
	newRow.appendChild(cell1);

	cell2 = document.createElement('td');
	cell2.innerHTML = '<select id="mast_type"><option value="Fighters">Fighters</option><option value="Bombers">Bombers</option><option value="Heavy Bombers">Heavy Bombers</option><option value="Ion Bombers">Ion Bombers</option><option value="Corvette">Corvette</option><option value="Recycler">Recycler</option><option value="Destroyer">Destroyer</option><option value="Frigate">Frigate</option><option value="Ion Frigate">Ion Frigate</option><option value="Scout Ship">Scout Ship</option><option value="Outpost Ship">Outpost Ship</option><option value="Cruiser">Cruiser</option><option value="Carrier">Carrier</option><option value="Heavy Cruiser">Heavy Cruiser</option><option value="Battleship">Battleship</option><option value="Fleet Carrier">Fleet Carrier</option><option value="Dreadnought">Dreadnought</option><option value="Titan">Titan</option><option value="Leviathan">Leviathan</option><option value="Death Star">Death Star</option><option value="Goods">Goods</option></select>';
	cell2.align = 'right';
	newRow.appendChild(cell2);

	cell3 = document.createElement('td');
	cell3.innerHTML = "<input type='text' size='5' id='mast_quant' class='input-numeric quant' maxlength='5'>";
	newRow.appendChild(cell3);

	cell4 = document.createElement('td');
	cell4.colSpan = '3';
	newRow.appendChild(cell4);

	newRow = table.insertRow(2);
	newRow.align = 'center';

	cell1 = document.createElement('td');
	cell1.colSpan = '4';
	newRow.appendChild(cell1);

	cell2 = document.createElement('td');
	input = document.createElement('input');
	input.type = 'button';
	input.value = 'Set';
	input.addEventListener('click', function ()
		{
			setMasterProduction();
		}
		, true);
	input.className = 'input-button';
	cell2.appendChild(input);
	newRow.appendChild(cell2);

	cell3 = document.createElement('td');
	cell3.colSpan = '3';
	newRow.appendChild(cell3);
}

function resetRecallTime()
{
	elem = document.getElementById('recall_duration');
	recallTime = Number(elem.title);
	elem.title = recallTime + 1;

	recallTimeString = timeToString(recallTime, 'h');

	elem.value = 'Recall Fleet (' + recallTimeString + ')';
}

function addRecallTime()
{
	arrivalElem = document.getElementById('timer1');
	arrivalTime = arrivalElem.title;

	centerElems = document.getElementsByTagName('center');
	for(i = 0; i < centerElems.length; i++)
	{
		if(centerElems[i].innerHTML.search('Travel Duration:') != -1)
		{
			durationElem = centerElems[i];
			break;
		}
	}

	parts = durationElem.firstChild.innerHTML.split(": ");
	duration = parts[1];

	secs = stringToTime(duration);

	recallTime = secs - arrivalTime;

	elems = document.getElementsByTagName('input');
	for(i = 0; i < elems.length; i++)
	{
		if(elems[i].value == 'Recall Fleet')
		{
			elems[i].id = 'recall_duration';
			elems[i].title = recallTime;
			break;
		}
	}

	resetRecallTime();
	setInterval(function() {resetRecallTime()}, 1000);
}

function removeNonAttackable()
{
	table = document.getElementById('fleets_attack-list');
	if(SKIN == 'Dark Astros')
	{
		table = table.rows[1].cells[0].firstChild;
	}
	else if(SKIN == 'Deep Space')
	{
		table = table.rows[1].cells[0].firstChild;
		table = table.rows[0].cells[1].firstChild.firstChild.nextSibling
	}

	for(i = 1; i < table.rows.length; i++)
	{
		if(table.rows[i].cells[3].innerHTML == '')
		{
			table.deleteRow(i);
			i--;
		}
	}
}

function delayedMove()
{
	// Get current date/time
	timeElem = document.getElementById('server-time');
	timeDate = new Date(timeElem.innerHTML);

	// Get desired date/time
	launchElem = document.getElementById('launch');
	launchDate = new Date(launchElem.value);

	// check if time to launch
	if((timeDate.getTime() - launchDate.getTime()) > 0)
	{
		// Find move button
		elems = document.getElementsByTagName('input');
		for(i = 0; i < elems.length; i++)
		{
			if(elems[i].value == 'Move')
			{
				elems[i].click();
			}
		}
	}
}

function startDelayedMove()
{
	elem = document.getElementById('autoLaunch');

	if(elem.value == 'Enable Auto-Launch')
	{
		elem.value = 'Disable Auto-Launch';

		delayedInterval = setInterval(
			function()
			{
				delayedMove();
			},
			1000
		);
	}
	else
	{
		elem.value = 'Enable Auto-Launch';
		clearInterval(delayedInterval);
	}
}

function addDelayedMove()
{
	table = document.getElementById('fleet_move');
	if(SKIN == 'Dark Astros')
	{
		table = table.rows[1].cells[0].firstChild.firstChild;
	}
	else if(SKIN == 'Deep Space')
	{
		table = table.rows[1].cells[0].firstChild;
		table = table.rows[0].cells[1].firstChild.firstChild.nextSibling.firstChild;
	}

	// Find move row
	for(i = 0; i < table.rows.length; i++)
	{
		if(table.rows[i].innerHTML.search('value="Move"') != -1)
		{
			i++;
			break;
		}
	}

	// Get current date/time
	timeElem = document.getElementById('server-time');

	row = table.insertRow(i);
	cell = document.createElement('th');
	if(SKIN == 'Dark Astros')
	{
		cell.innerHTML = '<input type="text" id="launch" class="quant" value="' + timeElem.innerHTML + '" size="26">';
	}
	else if(SKIN == 'Deep Space')
	{
		cell.innerHTML = '<input type="text" id="launch" class="quant input-numeric" value="' + timeElem.innerHTML + '" size="26">';
	}
	cell.align = 'center';
	cell.colSpan = '7';
	row.appendChild(cell);
	i++;

	row = table.insertRow(i);
	cell = document.createElement('th');
	link = document.createElement('input');
	link.type = 'button';
	link.value = 'Enable Auto-Launch';
	link.id = 'autoLaunch';
	link.addEventListener('click',
		function()
		{
			startDelayedMove();
		},
	false);
	link.className = 'input-button';
	cell.appendChild(link);
	cell.align = 'center';
	cell.colSpan = '7';
	row.appendChild(cell);
}

function enhanceTradePage()
{
	table = document.getElementById('empire_trade_trade-routes');
	if(SKIN == 'Dark Astros')
	{
		table = table.rows[1].cells[0].firstChild;
	}
	else if(SKIN == 'Deep Space')
	{
		table = table.rows[1].cells[0].firstChild;
		table = table.rows[0].cells[1].firstChild.firstChild.nextSibling;
	}

	// Get list of players
	players = new Array();
	for(i = 1; i < table.rows.length - 1; i++)
	{
		row = table.rows[i];

		// Check for duplicates
		nameElem = row.cells[1].firstChild.nextSibling.nextSibling;
		name = nameElem.innerHTML;

		// Check if player already found
		if(players[name] == null)
		{
			players[name] = i;
		}
		else
		{
			nameElem.innerHTML += ' <font color="red">(duplicate)</font>';

			// Havent changed first occurance yet
			if(players[name] != 0)
			{
				nameElem = table.rows[players[name]].cells[1].firstChild.nextSibling.nextSibling;
				nameElem.innerHTML += ' <font color="red">(duplicate)</font>';
			}
		}

		// Put difference between bases
		base1 = Number(row.cells[2].firstChild.wholeText);
		base2 = Number(row.cells[3].firstChild.wholeText);
		diff = base2 - base1;
		if(diff < 0)
		{
			diff = ' <font color="red">(' + diff + ')</font>';
		}
		else
		{
			diff = ' <font color="orange">(+' + diff + ')</font>';
		}

		row.cells[3].innerHTML += diff;
	}
}


function scoutReport(fleets, bases, astros, debris)
{
	// Stop scouting
	iframeDiv = document.getElementById('scoutDiv');
	document.body.removeChild(iframeDiv);
	GM_setValue(server + '_scouting', '');

	fleetDisplay = '';
	for(i = 0; i < fleets.length; i++)
	{
		fleet = fleets[i][0] + ' - ' + fleets[i][1] + ' - ' + fleets[i][2];
		fleetDisplay += fleet + '<br/>';
	}

	baseDisplay = '';
	for(i = 0; i < bases.length; i++)
	{
		base = bases[i][0] + ' - ' + bases[i][1];
		baseDisplay += base + '<br/>';
	}

	astroDisplay = '';
	for(i = 0; i < astros.length; i++)
	{
		astro = astros[i][0] + ' - ' + 'Position ' + astros[i][3] + ' ' + astros[i][2] + ' ' + astros[i][1];
		astroDisplay += astro + '<br/>';
	}

	debrisDisplay = '';
	for(i = 0; i < debris.length; i++)
	{
		debri = debris[i][0] + ' - ' + debris[i][1];
		debrisDisplay += debri + '<br/>';
	}

	GM_setValue(server + '_scout_fleet', fleetDisplay);
	GM_setValue(server + '_scout_base', baseDisplay);
	GM_setValue(server + '_scout_astro', astroDisplay);
	GM_setValue(server + '_scout_debris', debrisDisplay);

	checkScoutReport();
	link = document.createElement('input');
	link.title = 'fleet';
	displayScoutReport(link);
}

function scoutArea(scoutQueue, fleets, bases, astros, debris)
{
	iframe = document.getElementById('scoutFrame');

	// If document is not loaded yet need to wait until it is
	if(doc == iframe.contentDocument || !iframe.contentDocument.body)
	{
		window.setTimeout(
			function()
			{
				if(GM_getValue(server + '_scouting') != false)
				{
					scoutArea(scoutQueue, fleets, bases, astros, debris);
				}
				else
				{
					scoutReport(fleets, bases, astros, debris);
				}
			},
			200
		);
		return;
	}


	doc = iframe.contentDocument;
	area = scoutQueue.pop();



	if(area[0] == 'system')
	{
		elem = doc.body.lastChild.previousSibling.previousSibling;
		while(elem.nodeName != "TABLE")
		{
			elem = elem.previousSibling;
		}
		elem = elem.rows[0].cells[0].firstChild;
		elems = elem.getElementsByTagName('a');
		before = scoutQueue.length;
		for(i = elems.length - 1; i >= 0; i--)
		{
			// if not a fake astro or asteroid or gas giant then add to queue
			if(elems[i].parentNode == elem && elems[i].innerHTML.search('Asteroid Belt') == -1 && elems[i].innerHTML.search('Gas Giant') == -1)
			{
				url = elems[i].href;
				scoutQueue.push(['astro', url]);
			}
		}
		GM_setValue(server + '_scout_totalAstros', scoutQueue.length - before);
		GM_setValue(server + '_scout_currAstros', 1);
	}
	else if(area[0] == 'astro')
	{
		// Find fleet table
		tables = doc.body.getElementsByTagName('table');

		// Get location
		loc = area[1];
		if(loc.search('loc=') != -1)
		{
			position = loc.substr(loc.length - 2, 1);
			loc = '<a href="' + loc + '">' + loc.substr(loc.search('loc=') + 4) + '</a>';

			// Get astro info
			for(i = 0; i < tables.length; i++)
			{
				if(tables[i].className == 'astro')
				{
					table = tables[i];
					break;
				}
			}
			text = table.rows[0].cells[0].firstChild.innerHTML;
			pos = text.search('</b>');
			text = text.substr(pos + 5);
			pos = text.search('<br');
			type = text.substr(0, pos);

			pos = text.search('</b>');
			text = text.substr(pos + 5);
			pos = text.search('<br');
			size = text.substr(0, pos);

			astros.push([loc, type, size, position]);
		}
		else
		{
			// Look for table containing location
			for(i = 0; i < tables.length; i++)
			{
				if(tables[i].innerHTML.search('Location') != -1 || tables[i].innerHTML.search('Base Name') != -1)
				{
					// If you own base
					if(tables[i].innerHTML.search('Rename') != -1)
					{
						loc = tables[i].rows[1].cells[0].innerHTML;
					}
					else
					{
						loc = tables[i].rows[1].cells[1].innerHTML;
					}

					break;
				}
			}

			// Get base owner
			for(i = 0; i < tables.length; i++)
			{
				if(tables[i].className == 'base')
				{
					table = tables[i];
					break;
				}
			}
			table = table.rows[0].cells[2].firstChild.nextSibling;
			table = table.rows[1].cells[0].firstChild;
			owner = table.rows[7].cells[1].firstChild;
			owner = '<a href="' + owner.href + '">' + owner.innerHTML + '</a>';

			bases.push([loc, owner]);
		}

		table = null;
		for(i = 0; i < tables.length; i++)
		{
			if(tables[i].id == 'map_fleets' || tables[i].id == 'base_fleets')
			{
				table = tables[i];
				break;
			}
		}
		// If fleet table found
		if(table)
		{
			// If fleet summary there, skip over it
			if(table.rows[0].innerHTML.search('fleets summary') == -1)
			{
				table = table.rows[1].cells[0].firstChild;
			}
			else
			{
				table = table.rows[2].cells[0].firstChild;
			}

			// Go through each fleets
			for(i = table.rows.length - 1; i > 0; i--)
			{
				row = table.rows[i];
				name = row.cells[0].innerHTML;
				player = row.cells[1].innerHTML;
				arrival = row.cells[2].innerHTML;
				size = row.cells[3].innerHTML;
				fleets.push([loc, player, size, arrival]);
			}
		}

		// Get any possible debris
		centers = doc.body.getElementsByTagName('center');
		for(i = 0; i < centers.length; i++)
		{
			if(centers[i].innerHTML.search('credits in space debris') != -1)
			{
				firstSpace = centers[i].innerHTML.search(' ');
				debri = centers[i].innerHTML.substr(0, firstSpace) + ' Debris';
				debris.push([loc, debri]);
				break;
			}
		}

		currAstros = Number(GM_getValue(server + '_scout_currAstros'));
		GM_setValue(server + '_scout_currAstros', currAstros + 1);
	}

	// If done, remove the iframe div
	if(scoutQueue.length == 0)
	{
		scoutReport(fleets, bases, astros, debris);
	}
	// Otherwise set timer for the next check
	else
	{
		area = scoutQueue[scoutQueue.length - 1];

		// If next is a system, increase system counter
		if(area[0] == 'system')
		{
			systems = Number(GM_getValue(server + '_scout_currSystems'));
			GM_setValue(server + '_scout_currSystems', systems + 1);
			GM_setValue(server + '_scout_currAstros', 0);
		}

		iframe.src = area[1];

		time = 9843 + Math.floor(Math.random() * 7952);
		window.setTimeout(
			function()
			{
				if(GM_getValue(server + '_scouting') != false)
				{
					scoutArea(scoutQueue, fleets, bases, astros, debris);
				}
				else
				{
					scoutReport(fleets, bases, astros, debris);
				}
			},
			time
		);
	}
}

function startScouting()
{
	// Check for a scout
	if(SKIN == 'Dark Astros')
	{
		elem = document.getElementById('map-region_container');
		elems = elem.childNodes;
		elem = null;
		for(i = 0; i < elems.length; i++)
		{
			if(elems[i].nodeName == "TABLE")
			{
				elem = elems[i];
				break;
			}
		}
	}
	else if(SKIN == 'Deep Space')
	{
		elem = document.getElementById('map-region_content');
	}


	if(elem.innerHTML.search('text-decoration: underline') == -1 && elem.innerHTML.search('location-fleet-self') == -1)
	{
		alert('Error: Need to have a scout in the region');
		return;
	}

	scoutQueue = new Array();
	systems = elem.getElementsByTagName('div');
	for(i = systems.length - 1; i > 0; i--)
	{
		url = systems[i].firstChild.href;
		scoutQueue.push(['system', url]);
	}
	GM_setValue(server + '_scout_totalSystems', scoutQueue.length);
	GM_setValue(server + '_scout_currSystems', 0);
	GM_setValue(server + '_scout_totalAstros', 1);
	GM_setValue(server + '_scout_currAstros', 0);

	iframeDiv = document.createElement('div');
	iframeDiv.id = 'scoutDiv';
	iframeDiv.style.position = 'absolute';
	iframeDiv.style.top = '0';
	iframeDiv.style.left = '0';
	iframeDiv.style.height = '100%';
	iframeDiv.style.width = '100%';

	iframe = document.createElement('iframe');
	iframe.id = 'scoutFrame';
	iframe.width = '100%';
	iframe.height = '100%';

	iframeDiv.appendChild(iframe);
	document.body.appendChild(iframeDiv);

	area = scoutQueue[scoutQueue.length - 1];
	iframe.src = area[1];

	fleets = new Array();
	bases = new Array();
	astros = new Array();
	debris = new Array();

	GM_setValue(server + '_scouting', 'true');
	doc = null;
	time = 5182 + Math.floor(Math.random() * 4134);
	window.setTimeout(
		function()
		{
			scoutArea(scoutQueue, fleets, bases, astros, debris);
		},
		time
	);
}

function addScoutLink()
{
	elem = document.getElementById('map-region_container');
	elem = elem.firstChild;

	link = document.createElement('input');
	link.type = 'button';
	link.value = 'Scout';
	link.addEventListener('click',
		function()
		{
			startScouting();
		},
		false
	);
	link.className = 'input-button';

	elem.innerHTML += ' ';
	elem.appendChild(link);
}

function displayScoutReport(clickedLink)
{
	div = document.getElementById('scoutReport');
	div.innerHMTL = '';
	while(div.childNodes.length != 0)
	{
		div.removeChild(div.firstChild);
	}

	link = document.createElement('input');
	link.type = 'button';
	link.value = 'Hide Report';
	link.addEventListener('click',
		function()
		{
			removeScoutReport();
		},
		false
	);
	div.appendChild(link);
	div.appendChild(document.createElement('p'));

	table = document.createElement('table');
	row = table.insertRow(0);
	cell = row.insertCell(0);

	link = document.createElement('input');
	link.type = 'button';
	link.value = 'Fleets';
	link.title = 'fleet';
	link.addEventListener('click',
		function()
		{
			displayScoutReport(this);
		},
		false
	);
	cell.appendChild(link);

	link = document.createElement('input');
	link.type = 'button';
	link.title = 'base';
	link.value = 'Bases';
	link.addEventListener('click',
		function()
		{
			displayScoutReport(this);
		},
		false
	);
	cell.appendChild(link);

	link = document.createElement('input');
	link.type = 'button';
	link.title = 'astro';
	link.value = 'Astros';
	link.addEventListener('click',
		function()
		{
			displayScoutReport(this);
		},
		false
	);
	cell.appendChild(link);

	link = document.createElement('input');
	link.type = 'button';
	link.title = 'debris';
	link.value = 'Debris';
	link.addEventListener('click',
		function()
		{
			displayScoutReport(this);
		},
		false
	);
	cell.appendChild(link);

	row = table.insertRow(1);
	cell = row.insertCell(0);
	if(clickedLink.title == 'fleet')
	{
		display = GM_getValue(server + '_scout_fleet');
	}
	else if(clickedLink.title == 'base')
	{
		display = GM_getValue(server + '_scout_base');
	}
	else if(clickedLink.title == 'astro')
	{
		display = GM_getValue(server + '_scout_astro');
	}
	else if(clickedLink.title == 'debris')
	{
		display = GM_getValue(server + '_scout_debris');
	}
	cell.innerHTML = display;

	div.appendChild(table);
}

function removeScoutReport()
{
	div = document.getElementById('scoutReport');
	div.innerHTML = '';
	link = document.createElement('input');
	link.type = 'button';
	link.value = 'View Report';
	link.title = 'fleet';
	link.addEventListener('click',
		function()
		{
			displayScoutReport(this);
		},
		false
	);
	div.appendChild(link);
}

function checkScoutReport()
{
	if(typeof(GM_getValue) != 'function')
		return;

	// Check if a report has been
	fleetDisplay = GM_getValue(server + '_scout_fleet');
	if(fleetDisplay && fleetDisplay != '')
	{
		div = document.createElement('div');
		div.id = 'scoutReport';
		div.style.position = 'absolute';
		div.style.top = '0';
		div.style.left = '0';
		document.body.appendChild(div);

		removeScoutReport();
	}
}

function stopScouting()
{
	GM_setValue(server + '_scouting', false);
}

function checkScouting()
{
	if(typeof(GM_getValue) != 'function')
		return;

	// GM_setValue('scouting', '');
	scouting = GM_getValue(server + '_scouting');
	if(scouting)
	{
		div = document.createElement('div');
		div.id = 'scoutStatus';
		div.style.position = 'absolute';
		div.style.top = '0';
		div.style.left = '0';

		link = document.createElement('input');
		link.type = 'button';
		link.value = 'Stop Scouting';
		link.addEventListener('click',
			function()
			{
				stopScouting();
			},
			false
		);
		div.appendChild(link);
		div.appendChild(document.createElement('br'));

		/*link = document.createElement('input');
		link.type = 'button';
		link.value = 'Pause Scouting';
		div.appendChild(link);
		div.appendChild(document.createElement('br'));*/

		totalSystems = Number(GM_getValue(server + '_scout_totalSystems'));
		currSystems = Number(GM_getValue(server + '_scout_currSystems'));
		totalAstros = Number(GM_getValue(server + '_scout_totalAstros'));
		currAstros = Number(GM_getValue(server + '_scout_currAstros'));

		percent = 0;
		systemPerc = 100 / totalSystems;
		percent += currSystems * systemPerc;
		astroPerc = systemPerc / totalAstros;
		percent += currAstros * astroPerc;

		newDiv = document.createElement('div');
		newDiv.innerHTML = 'Status: ' + percent.toFixed(2) + '%';
		div.appendChild(newDiv);

		document.body.appendChild(div);
	}
}

/////////////////////////////////////////////////////////////
/////////////////////// Main ////////////////////////////////
/////////////////////////////////////////////////////////////

start = new Date();

//// Do for all AE pages
// Check if allowed to run
getServer();
addOptions();
checkToRun();


// Setup id into link to profile
addProfileLink();

// Check if a scout report exists
checkScoutReport();
// Check if currently scouting
checkScouting();

// Add Empire Menus below main menu bar if not on empire page
if(window.location.href.search('empire.aspx') == -1)
{
	// TODO: remove <br> on Deep Space
	addEmpireMenus();
}

//// Specific page enchancements
// If base or astro page, move fleet summary up to top default on
if((window.location.href.search('map.aspx') != -1 && window.location.href.search(/[A-Z][0-9][0-9][:][0-9][0-9][:][0-9][0-9][:][0-9][0-9]/i) != -1) || window.location.href.search('base.aspx') != -1)
{
	moveFleetSummary();
}

// Add commander effects on capacity page
if(window.location.href.search('bases_capacities') != -1)
{
	enhanceCapacities();
}
// Add commander effects on base page
if(window.location.href.search('base.aspx') != -1)
{
	if(window.location.href.search('view=') == -1)
	{
		enhanceBaseCapacities();
	}
	else if(window.location.href.search('structures') != -1 || window.location.href.search('defenses') != -1 || window.location.href.search('research') != -1)
	{
		enhanceBaseConstruction();
	}
}

// Add quotes option to public boards
if(window.location.href.search('board.aspx') != -1)
{
	addBoardQuotes();
}

// Add master set production
if(window.location.href.search('bases_production') != -1)
{
	addMasterProduction();
}

// Add recall time for in transit fleets
if(window.location.href.search('fleet.aspx?') != -1)
{
	if(document.getElementById('timer1') && window.location.href.search('recall') == -1)
	{
		addRecallTime();
	}
	else if(window.location.href.search('view=attack') != -1)
	{
		removeNonAttackable();
	}
	else if(window.location.href.search('view=move') != -1)
	{
		addDelayedMove();
	}
}

// Duplicates/difference in econ on trade page
if(window.location.href.search('view=trade') != -1)
{
	enhanceTradePage();
}


if(window.location.href.search(/[A-Z][0-9][0-9][:][0-9][0-9]/i) != -1
	&& window.location.href.search(/[A-Z][0-9][0-9][:][0-9][0-9][:][0-9][0-9]/i) == -1)
{
	addScoutLink();
}

end = new Date();
// alert((end.getTime() - start.getTime()) / 1000);

