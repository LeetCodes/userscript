// ==UserScript==
// @name          HWM_Tavern_Adv
// @description   HWM_Tavern_Adv
// @version   0.1.3
// @include       http://www.heroeswm.ru/tavern.php*
// ==/UserScript==


var url_cur = location.href ;
//alert("HWM_Tavern_Adv");

var conditions = [];
conditions.push(["Bear' Mountain", "START: 1/15 . 1/15 . 1/15 . 20 . 10 . . . . WIN: 200 . 500"]);
conditions.push(["Dragons's caves", "START: 5/10 . 5/10 . 5/10 . 20 . 10 . . . . WIN: 150 . 400"]);
conditions.push(["Eagle's Nest", "START: 2/5 . 2/5 . 2/5 . 20 . 5 . . . . WIN: 50 . 150"]);
conditions.push(["East River", "START: 3/5 . 3/5 . 3/5 . 20 . 10 . . . . WIN: 75 . 200"]);
conditions.push(["Empire Capital", "START: 2/5 . 2/5 . 2/5 . 20 . 5 . . . . WIN: 50 . 150"]);

conditions.push(["Fairy Trees", "START: 4/10 . 4/10 . 4/10 . 30 . 15 . . . .WIN: 100 . 300"]);
conditions.push(["Green Wood", "START: 4/10 . 4/10 . 4/10 . 30 . 15 . . . .WIN: 100 . 300"]);
conditions.push(["Lizard's Lowland", "START: 1/15 . 1/15 . 1/15 . 20 . 10 . . . . WIN: 200 . 500"]);
conditions.push(["Magma Mines", "START: 3/15 . 1/5 . 2/10 . 20 . 10 . . . . WIN: 125 . 350"]);
conditions.push(["Mythril Coast", "START: 3/5 . 3/5 . 3/5 . 20 . 10 . . . . WIN: 75 . 200"]);

conditions.push(["Peaceful Camp", "START: 3/15 . 1/5 . 2/10 . 20 . 10 . . . . WIN: 125 . 350"]);
conditions.push(["Port City", "START: 2/5 . 2/5 . 2/5 . 20 . 5 . . . . WIN: 50 . 150"]);
conditions.push(["Portal's Ruins", "START: 3/5 . 3/5 . 3/5 . 20 . 10 . . . . WIN: 75 . 200"]);
conditions.push(["Rogue's Wood", "START: 1/6 . 1/6 . 5/30 . 20 . 50 . . . . WIN: 100 . 300"]);
conditions.push(["Shining Spring", "START: 1/5 . 1/5 . 5/25 . 20 . 50 . . . . WIN: 100 . 300"]);
conditions.push(["Sunny City", "START: 5/25 . 5/25 . 5/25 . 50 . 50 . . . . WIN: 100 . 300"]);
conditions.push(["Tiger's Lake", "START: 5/25 . 5/25 . 5/25 . 20 . 10 . . . . WIN: 150 . 400"]);
conditions.push(["Wolf's Dale", "START: 5/20 . 3/10 . 5/20 . 50 . 50 . . . . WIN: 100 . 300"]);
//conditions.push(["Bear Mountain", "START: 1/15 | 1/15 | 1/15 | 20 | 10  WIN: 200 | 500"]);




//var td_tavern_xp = document.evaluate("//td[@class='tavern']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
//td_tavern = td_tavern_xp.snapshotItem(0);

var td_tavern = getTavernTd();

//alert("td_tavern = "+td_tavern.innerHTML);

//remove bg image...
td_tavern.style.background = "#DDD9CD";


var time2turn_str = "\u0412\u0440\u0435\u043C\u044F \u043D\u0430 \u0445\u043E\u0434"; // vremya na hod
var games_table;
var top_tbl;
for(var k=0; k<td_tavern.childNodes.length; k++){
	if(td_tavern.childNodes[k].innerHTML.indexOf(time2turn_str)!=-1){ 		
		games_table = td_tavern.childNodes[k];	
		
		top_tbl = td_tavern.childNodes[k-2];	
		
		break;
	}
}

//games_table = td_tavern.childNodes[3];
//alert("games_table = "+games_table.innerHTML);

var tr_arr = games_table.childNodes[0].childNodes;
//alert("first row = "+tr_arr[1].innerHTML);
var my_tr;
var tr_tmp;
var reg_1st_tr_arr = [];
for(var i=0; i<tr_arr.length; i++){
	my_tr = tr_arr[i];
	if(my_tr.childNodes.length==6 && i>0){
		reg_1st_tr_arr.push(i); 		
	}
	//
	if(my_tr.innerHTML.indexOf("join_to_card_game.php")!=-1){
		my_tr.style.background = "#cfc";
	}
	//
	for(var j=0; j<conditions.length; j++){
		if(my_tr.innerHTML.indexOf(conditions[j][0])!=-1){
			//alert("my_tr.childNodes[0].innerHTML = "+my_tr.childNodes[0].innerHTML);
			my_tr.childNodes[0].innerHTML = '<b><a href="javascript:void(0);" title="'+conditions[j][1]+'">'+my_tr.childNodes[0].innerHTML +"</a></b>";
		}
	}
	
	
	
}


/* */
for( i=0; i<reg_1st_tr_arr.length; i++){	
	tr_tmp = document.createElement('tr');
tr_tmp.innerHTML = "<td >&nbsp;</td>";
	games_table.childNodes[0].insertBefore(tr_tmp, games_table.childNodes[0].childNodes[ reg_1st_tr_arr[i] +i ]);
	
}

// =======

//alert("top_tbl = "+top_tbl.innerHTML);

//alert("document.forms.length = "+document.forms.length);
if(document.forms.length){
	var createGame_table = document.forms[0].parentNode;
		//alert("createGame_table = "+createGame_table);
	createGame_table.style.position = "absolute";
	createGame_table.style.top = 200;
	createGame_table.style.left = 200;	

}else{
	//top_tbl.style.background = "#eee";
	var tmp_td = document.createElement('td');
	tmp_td.width = 200;
	tmp_td.innerHTML = '<b><a href="http://www.heroeswm.ru/tavern.php?form=1" style="background:#aca;">\u0421\u043E\u0437\u0434\u0430\u0442\u044C_\u0437\u0430\u044F\u0432\u043A\u0443</a></b>';
	top_tbl.childNodes[0].childNodes[0].insertBefore(tmp_td, top_tbl.childNodes[0].childNodes[0].childNodes[1]);
	
}


// ==========
function getTavernTd(){
	var all_td = document.getElementsByTagName('td');
	var all_td_len = all_td.length;
	var tav_title = "<h2>\u0422\u0430\u0432\u0435\u0440\u043D\u0430. \u041A\u0430\u0440\u0442\u043E\u0447\u043D\u044B\u0435 \u0431\u0430\u0442\u0430\u043B\u0438\u0438.</h2>"; //taverna. kartochnye batalii
	var my_td;
	for(var i=0; i<all_td_len; i++){
		my_td = all_td[i];
		//if (my_td.innerHTML.indexOf(tav_title)!=-1 ){
		if (my_td.childNodes[0] && my_td.childNodes[0].innerHTML == tav_title ){
			return my_td;
		}		
	}
	
	return null;
	
}




// ==== END ====
