// ==UserScript==
// @name            OGame FarmList [PT]
// @namespace       OGame FarmList PT]
// @description     Lista de Coordenadas Personalizadas. Tradução do Script de LordEvil.
// @include          http://*/game/index.php*
// ==/UserScript==



function addCoords(event) {
	if (gala) {
		planeta = this.innerHTML;
		coords = gala + ':' + uklad + ':' + planeta;
	}
	else coords = prompt('Introduza coordenadas X:XXX:XX' );
	var desc = prompt('Nome personalizado.');
	var typ = prompt('Tipo:, 1 - Planeta, 2 -TF, 3 - Lua','1');
	GM_setValue('coordList_'+server, GM_getValue('coordList_'+server )+'^'+coords+'|'+desc+'|'+typ);
	if (typeof(ramka)!='indefinido') zarzadzaj();
	return false;
}

var loc = document.location;
var reg = /http:\/\/(.*?)\/game\/index.php\?page=(.*?)&session=(.*?)/i;
var result = reg.exec( loc );
var server = result[1];

function gid( el )
{
	return document.getElementById( el );
}

if( result[2].indexOf('galaxy')!=-1 )
{
	var gala = document.getElementsByName('galaxy')[0].value;
	var uklad = document.getElementsByName('system')[0].value;
	tagi = document.getElementById('content').getElementsByTagName('a');
	for (i in tagi)
		if (tagi[i].getAttribute && tagi[i].getAttribute('tabindex')) 
			tagi[i].addEventListener('click',addCoords,true);
}


	
	function delAll()
	{
		if (confirm ('Apagar toda a lista de coordenadas personalizadas?')) {
			GM_setValue('coordList_'+server,'');
			alert('Todas as coordenadas apagadas');
			if (typeof(ramka)!='indefinido') zarzadzaj();
		}
	}
	
	function jumpmap(e) {
		adres = e.target.firstChild.nodeValue.split(':');

		reg = /(.*?)\?session=([0-9a-f]+)&*.*/;
		result = reg.exec (document.location);

        document.location.href='index.php?page=galaxy&galaxy='+adres[0]+'&system='+adres[1]+'&planet='+adres[2]+'&session=' + result[2];
		return false;
	}

	function delcoord(event) {
		adresyNowe = '';
		nr = event.target.getAttribute('nr');
		str = GM_getValue('coordList_'+server);
		adresy = str.split( '^' );
		for (i in adresy)
			if (adresy[i]!='' && i!=nr)
				adresyNowe = adresyNowe + '^' + adresy[i];
		GM_setValue('coordList_'+server, adresyNowe);
		zarzadzaj();
		return false;
	}
	
	function moveCoord(event) {
		nr = event.target.firstChild.nodeValue;
		CoordsTab = loadCoords();
		if ((poz = prompt ('Neue Position:')) && (poz>0) && (poz<CoordsTab.length)) {
			CoordsTabNew = new Array;
			ii = 1;
			for (i in CoordsTab) if (i > 0) {
				if (ii==poz) CoordsTabNew[ii++] = CoordsTab[nr];
				if (i!=nr) CoordsTabNew[ii++] = CoordsTab[i];
				if (ii==poz) CoordsTabNew[ii++] = CoordsTab[nr];
			}
			saveCoords(CoordsTabNew);
			zarzadzaj();
		}
	}

	function loadCoords() {
		var CoordsTab = new Array;
		str = GM_getValue('coordList_' + server);
		adresy = str.split( '^' );
		for (i in adresy)
			if (adresy[i]!='')
				CoordsTab[i] = adresy[i].split('|');
		return CoordsTab;
	}

	function saveCoords(CoordsTab) {
		str = '';
		for (i in CoordsTab) if (i > 0)
			if (typeof(CoordsTab[i]) != 'indefinido')
				str = str + '^' + CoordsTab[i][0] + '|' + CoordsTab[i][1];
		GM_setValue ('coordList_' + server, str);
	}

	function editCoord(event) {
		CoordsTab = loadCoords();
		nr = event.target.parentNode.parentNode.firstChild.firstChild.firstChild.nodeValue;
		if (coords = prompt('Ingrese coordenadas X:XXX:XX', CoordsTab[nr][0]))
			if (desc = prompt('Nombre personalizado', CoordsTab[nr][1])) {
				CoordsTab[nr][0] = coords;
				CoordsTab[nr][1] = desc;
				saveCoords(CoordsTab);
				zarzadzaj();
			}
		return false;
	}

	function zarzadzaj() {
		
		body = document.getElementById('content');
		while (body.firstChild)
			body.removeChild(body.firstChild);
		tab = document.createElement('TABLE');
		tab.style.padding=30;
		tr = tab.appendChild(document.createElement('TR'));
		td = tr.appendChild(document.createElement('TD'));
		td.className='c';
		td.colSpan=4;
		td.appendChild(document.createTextNode('Lista de coordenadas personalizada'));
		
		str = GM_getValue('coordList_'+server);
		array1 = str.split( '^' );
	len = array1.length;		
		for( i = 0; i < len; i++ )
		{
			x = array1[i];
			if( x != '' )
			{
				arr = x.split( '|' );
				if( arr[0] != null && typeof(arr[1])!='undefined')
				{
					tr = tab.appendChild(document.createElement('TR'));
					th = tr.appendChild(document.createElement('TH'));
					a = document.createElement('A');
					a.href = '#';
					a.addEventListener('click', moveCoord, false);
					a.appendChild(document.createTextNode(i));
					th.appendChild(a);
					th = tr.appendChild(document.createElement('TH'));
					a = document.createElement('A');
					a.href = '#';
					a.addEventListener('click', jumpmap, false);
					a.appendChild(document.createTextNode(arr[0]));
					th.appendChild(a);
					th = tr.appendChild(document.createElement('TH'));
					a = document.createElement('A');
					a.href = '#';
					a.addEventListener('click', editCoord, false);
					a.appendChild(document.createTextNode(arr[1]));
					th.appendChild(a);
					th = tr.appendChild(document.createElement('TH'));
					a = document.createElement('A');
					a.href = '#';
					a.setAttribute('nr',i);
					a.addEventListener('click', delcoord, false);
					a.appendChild(document.createTextNode('Apagar'));
					th.appendChild(a);
				}
			}
		}
		
		
		body.appendChild(tab);
	}

	function start1()
	{	
		x = document.createElement('DIV');
		x.style.textAlign='center';
		y = document.createElement('INPUT');
		y.setAttribute('type','button');
		y.value='Nova Coordenada';
		y.addEventListener('click',addCoords,true);
		x.appendChild(y);
		x.appendChild(document.createElement('TH'));
		y = document.createElement( 'INPUT' );
		y.setAttribute('type','button');
		y.value='Pagar todas Coords';
		y.addEventListener('click',delAll,true);
		x.appendChild(y);
		x.appendChild(document.createElement('TH'));
		y = document.createElement('INPUT');
		y.setAttribute('type','button');
		y.value='Lista de Coordenadas';
		y.addEventListener('click',zarzadzaj,true);
		x.appendChild(y);
		document.getElementById('menu').appendChild(x);
	}
	start1();

//}
if( result[2] == 'flotten2' )
{
	function start2()
	{
		x = document.getElementById('content').getElementsByTagName( 'table' );

		y = x[0];
		z = y.getElementsByTagName( 'tr' );
		
		a = document.createElement( 'TR' );
		b = document.createElement( 'TD' );
		b.innerHTML = 'Lista de Coordenadas Personalizada';
		b.colSpan = 2;
		b.className = 'c';
		a.appendChild( b );
		
		y.appendChild( a );

		str = GM_getValue('coordList_'+server);
		array1 = str.split('^');
		len = array1.length;
		v = document.createElement( 'TR' );
		for( i = 0; i < len; i++ )
		{
			x = array1[i];

			if( x != '' )
			{
				if( ( i - 1 ) % 2 == 0 )
				{
					v = document.createElement( 'TR' );
				}
				arr = x.split( '|' );
				
				
				o = document.createElement( 'TH' );
				arrC = arr[0].split( ':' );
				link = document.createElement( 'A' );
				link.href = 'javascript:setTarget('+arrC[0]+','+arrC[1]+','+arrC[2]+','+arr[2]+'); shortInfo()';				
				link.appendChild(document.createTextNode(arr[1]+' ['+arr[0]+']'));
				
				o.appendChild( link );
				v.appendChild( o );
			

			}
			if( ( i - 1 ) % 2 == 0 )
			{
				y.appendChild( v );
			
			}
		}

	
	}

	start2();
}b