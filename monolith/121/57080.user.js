// ==UserScript==
// @name           FaceBook Auto Ignore ALL
// @namespace      Facebook
// @description    Simple Script To Click INGORE Button On Everything In Request Page
// @include        http://www.facebook.com/*reqs.php*
// ==/UserScript==



(function() {
  function $$(xpath,root) { 
    xpath=xpath.replace(/((^|\|)\s*)([^/|\s]+)/g,'$2.//$3').
               replace(/\.([\w-]+)(?!([^\]]*]))/g,'[@class="$1" or @class$=" $1" or @class^="$1 " or @class~=" $1 "]').
                replace(/#([\w-]+)/g,'[@id="$1"]').
                replace(/\/\[/g,'/*[');
    str='(@\\w+|"[^"]*"|\'[^\']*\')'
    xpath=xpath.replace(new RegExp(str+'\\s*~=\\s*'+str,'g'),'contains($1,$2)').
                replace(new RegExp(str+'\\s*\\^=\\s*'+str,'g'),'starts-with($1,$2)').
                replace(new RegExp(str+'\\s*\\$=\\s*'+str,'g'),'substring($1,string-length($1)-string-length($2)+1)=$2');
    var got=document.evaluate(xpath,root||document,null,null,null), result=[];
    while(next=got.iterateNext()) result.push(next);
    return result;


}

  var inputbuttons = $$('input.inputbutton');
  for (var i = 0; i < inputbuttons.length; i++){
    if (inputbuttons[i].value=="Ignore"){
      inputbuttons[i].click();
    }
  }
})();

//Ignore The Shit!!