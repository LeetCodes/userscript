// ==UserScript==
// @name           prueba-v07
// @authors        nico203
// @include        http://*managerzone.*
// ==/UserScript==


function saltarPagina()
{
	location = "http://managerzone.tn.com.ar/?p=match&sub=played&hidescore=1";
}
  
var boton = document.createElement("button");
boton.value = "Parar";
boton.innerHTML= "Estadísticas de Partidos";
boton.addEventListener("click",function() {saltarPagina()},false);
var ins = document.getElementById('contentDiv');
ins.parentNode.insertBefore(boton, ins);

var texto = 'Direcion: ' + location + '\n';
if(location == 'http://*managerzone.*/?p=match&sub=*')
	texto = texto + 'si';
else
	texto = texto + 'no';
alert(texto);