// ==UserScript==
// @name           bizarrify
// @namespace      gelignite
// @description    That ineffable Piraro touch
// @include        *
// ==/UserScript==

b=[
'iVBORw0KGgoAAAANSUhEUgAAACkAAAAWCAQAAAD3RX0FAAAAAXNSR0IArs4c6QAAAAJiS0dEAP+H\
j8y/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH2QEdEwAVFUu4dwAAA6dJREFUOMutlX1M\
1XUUxj8/uPJ29SI3Jo7hBEV508ChLHALzRcMmS9UKGtjpbRhJJEvYSQ5UlATLswmyXSTSKmYblKZ\
uGY53bRyuBvRMCSwBF0hCSoIIr+nfyrJLQcb56/vH8+e85zznHO+MMpxOnAE4MPGw3fBaGSvBhwK\
UpgCVPwNwHYaLNts02xRtkJbgfdDpGW4lClcfDeBdG5SidEPkEdfw/GQ2/RzlOnwbw0uw9eZ9WwK\
07kmb8LaoWp9svaETL16MuftTiceQO1IC6+ZFqnWkJSJMUoVrKyarEytDoOcOtvACk1UW/qIVX4+\
f2pbUPfAjQFssdtUn7rh7D4jZmGo9kf1Wp6umNuTuPQnYwQK9wApmhu4qVvBfkrQMlWHnLnyUpOh\
JMVrheZpucIEDmPY9mxm44+nbxyKrLXFXOkzp7gw82T9hTGXWUULT+IkFAve5lpFTKJtiE+Pi72h\
JY0HLjX0fRdbY8yjSa3GHDpJoxYv7uDLH9TjQZfeMYItaYMuUPQYsioD4MQ6D3qrr8XdMYI5D0Wx\
RLOGu4ynTn/Sy4TmREee4+vidtIGP/u7V0pQkOZpv46lP0paqQy5aKcqFKCD2iF3xWmfsuUrd4Wr\
XEOxSRuPCwx4f2tF/oTMmx4Xr68q6fBvxY2x3AU68cQVd8Lwby8LyJGTB1hxbnhm97djkmUzthgA\
B40OvcWxwoNB/at/YAlHDCBqe/QA7HR7Th/0/JPv3Ccl3WWCmlNFTVCqHYIP68YqVlF6LTxr6UxZ\
zd0CcFiwZMhN9v6ErioT1mBAnuPT1w8ci0/5qKAx18mvH79n6aemL/X2pRmN8Xdox5V2Tea8EUoS\
fabVpS23y/79pg7eYOGRLW6/hc2e4XOh05F7eUHDkB54qtp8ReWar3yla4oSlKvFWqY9ylSEPM1x\
MlrfVJk55/7aDoCti73lIaue6IluPlsIUDaEzQCIlB/jGMCde/yOD160MEgfLVgJ4Hk6/Wz5X2bM\
ZtakrLZsSild2vKF1fnLuhdvLm+GStIe9VQ+mXLXbPlokeKEfGTVFEWYT311tFK2BcEvXwjXzAc5\
h6HwP1N86P9nb3WBVRHyk6dClapiMdHVfst+KyT7avjP/r2+elXYT/kPf30t4GfOGjzn0bSoa+Xx\
M+Ov57kSubx2Du5Yaa/a0bp+SRm7jASN6Gyd2OVp2u95abxp1xglardK7m+e9ILt5DiA8hHffwOg\
tsRpuhFoTc4YjS/lL1f7mJtyNxVcAAAAAElFTkSuQmCC',
'iVBORw0KGgoAAAANSUhEUgAAABYAAAAnCAQAAAChm3C4AAAAAXNSR0IArs4c6QAAAAJiS0dEAP+H\
j8y/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH2QEdEwAcbJcA0wAAAsNJREFUOMuVlUtI\
VGEUx393xnnoOHrHR5GJo6P4To0eqJTiAxFDUiQMxJJCqKhl4cJSQyITQooSpEW4ahNGbcJVKhHu\
KlFXEqUZCUq+HzN6WowzzYPu1AcXzvmf3z33nHu+jw/+YymBwuEX6TPje/bwtc3Z24Exnb8b26U2\
WBd22/O/prad6goB65snDfO2OLad7wwLzZpwscmQAnNixRgLkSmaDSSLfRhsHckCYBvUzDxH2Hsw\
sgTAzlqImreBCFwAZFzVhMP5AajoAdhAE94mDVjHSGsFfOnRhPfYApwSwcAomE2asMIWYLq0AQIH\
CdHgDmC021FcEEWIMpyA7a1CYyM4/6UMZ3UseiOsbmnCiYSZYfWpOrJ6CFyKJnxsWlRYXFI2F63s\
j+YvcB0vs2OugOJarg5zgUELfgWsA+vMoy5DeKhfZwWSWOF1X1AoGI4EzN/WaW7p0KfrQxxJY0fp\
R4iU+k6oTwiMhvm7ia7FfNDhnKxvHxlJdFhIoPRT52pQ1pOXbVOslAg4MqE6p6q/UPIkU9I3lKms\
75CvAGagcChe1IWjw9eboDxoGPXD4ZImRfEAmGayJDXluTG4h7rWihmAqEd6OdKlg9wedWpa2Tze\
N+YGIi7EiHV/X0wMTDgAdhcVtvZ0YLv1sxYYnz3nBjYG06nsdtvRSdmJ7jMk5JiA4m7/T5coweVY\
OgwCOpiz+AdGJRjeYW9/gtuBobSm1A/+ikiR2zgdkKnlplEiBEp9NPPDWhV0sAZ0+gSm1KpnJrJl\
xHcLKW9+uTfPkyGzRzwPOPog/54qZW1/4KQHnrfuVPgUkjfmOFEqdd29CQc+Q82+muUhcu9m+MC5\
AhYB0HWf2fSo0Y+9gMELm/obeiFFLhZAZXmcNBQCNF2z3/fCZ73wDQtAmRR3ASToaxSAAmn0XBl1\
ivvxrHIFxMcv8Nq/AWys0SAhwP2sAAAAAElFTkSuQmCC',
'iVBORw0KGgoAAAANSUhEUgAAACoAAAANCAQAAAB1YzReAAAAAXNSR0IArs4c6QAAAAJiS0dEAP+H\
j8y/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH2QEdEjoz4y2JxAAAAmpJREFUOMud0jFM\
3GUYx/HPS4ECB94BBTUhaiyxi0PrMehgOgipGFeHxtGJxNGEczJNHK5DlybKLjEOMpjGRM1VEmrS\
WMMJC5XSa7CCSQvXctc/BwQsb4c7kMZB42963l/e9/v83jxPuI4/s38UX8j2FnW2vU5GRU9lf9b/\
VnOXxexnsyteAZ3Fuv1c9oTOUK87pHRrkZb+r1AKs3d8EgawpoYtq5GKldjurkSbKkhbR5/hMPpv\
0HW/GnQvLzdgUCNcIN1AtWpXRdWaqciLvoqb3gsHgC/jQDiLT8dP5Q/cppoyvhlfiMseNUB13XZb\
q13bWrXq0y/xcRgL5/xw5FZPuBIrZt3I7x56TTvZHV0SiybjT/Hz+G3kunlVU3Eq7po3EVmw4Ivx\
09K2vRuYOQSMOh8yBr028v5h+ubeYsqyXrCcK+eXRhIz8aTTYU8VS/GGD1yLN/F22PaL7+IDk1Eg\
pSalPauYceFqRQlD9UG95WsnrXvDYv6lXLGwHxJ3JFokqgbCapzHb/pBymgQ50zG+zocV7PrHWOB\
ku/HN/K1cFZznzPhSiyB+5rzW5Y9n/s9v6/ftmd06EEXttyKQ2EIS/ZcChWUDCoZBDUfXsxchDCt\
x49+Ht4s/GXVvqoWbHpT2YpXMedlJ1zTpsU5rCnLGgt/D6sCPopplwKEeQ/1SbCDB9lycXq4v9Dk\
rs7cep7MSKWwYUM3utUkKp51OWSObMBEZCzMuBnrrcK0lOMeok+iC+vajjzINHJkPHasUZN5atkn\
4r2RC1ePLP+cWzjjlMVsb5GuQ2SPPcc8lml8MPkH7EDnQ+mp8xM3i+fIQ8+H2AAAAABJRU5ErkJg\
gg==',
'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\
3wAAAABJRU5ErkJggg==',
'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\
TkSuQmCC',
'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'
];
var bn={0:
'iVBORw0KGgoAAAANSUhEUgAAAAYAAAAJCAQAAAC7k5UWAAAAAXNSR0IArs4c6QAAAAJiS0dEAP+H\
j8y/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH2QEdFDYFhK8v4wAAAGxJREFUCNc1wTsO\
AUEAANA3k0lofAtuYMMBtuciezOtxAFUoliRuIBGRa1QyIotZFTeC7W/KPU0DvmqsAyp65yPBjaa\
nF52KmVY55N4y3ez8MVQHAUeWhel1Jra5oWP+TP2Vd72VibjUKNFBz9HfB7vCw2LpAAAAABJRU5E\
rkJggg==',
1:'iVBORw0KGgoAAAANSUhEUgAAAAQAAAAKCAQAAAA58jeFAAAAAXNSR0IArs4c6QAAAAJiS0dEAP+H\
j8y/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH2QEdFCsDkqDmygAAAEBJREFUCNc1zLER\
QEAARNF3R6wE14VK1aAKoxUtEInMCXZs9GaDX7qssvajU9nseZozmL3BYwi4g8mFkQWUP/gBjwgL\
/aHJ8vMAAAAASUVORK5CYII=',
2:'iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAQAAAAnOwc2AAAAAXNSR0IArs4c6QAAAAJiS0dEAP+H\
j8y/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH2QEdFCwISjOphQAAAH1JREFUCNdtjqsN\
wmAYRc9XHqqCCdAEi4c0QWBAYaoqmQKBYwkSEhSWGRgDRihY3EH8PJrAlfcd8os2wMaaO3CIRGZQ\
emZEwfXjzODCkipa9JrxNTlwZP4tFZG9A0W2TpVI62NzJtwY8mAVJL1j34U7U+7lPNllFu/K+Hf+\
CQQtK7KtqLtjAAAAAElFTkSuQmCC',
3:'iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAQAAAAnOwc2AAAAAXNSR0IArs4c6QAAAAJiS0dEAP+H\
j8y/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH2QEdFCkhdfbFrAAAAIRJREFUCNdljSEK\
wgAYRt8PrhiEJZtVLUYPYFE8wZon8B6aLWqQCcL6itFTiIJWq8ELPMNwMHxf++DxQv5pARy8cOcN\
jCkCkK09M3PPjkzNlaj00hsvTkwpgt8590GbDh/WzAIby1xqFYKjXQbsebIAENmYmJiaulLq0M4r\
Q/pMAupQky/sNTzvTNxcNAAAAABJRU5ErkJggg==',
4:'iVBORw0KGgoAAAANSUhEUgAAAAcAAAAKCAQAAADSxYyGAAAAAXNSR0IArs4c6QAAAAJiS0dEAP+H\
j8y/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH2QEdFDQIyCgx3AAAAH9JREFUCNctxDGO\
AVEAAND3x0diEdM4wUYr2YPINi7lIKJGrdCoJJuJSqHQqKxkF8kkJl/BK17Yq9R4HytUtqkwCnVZ\
idLECsQWNumGtqaMnzQ19jBL/2LxO7dzdvKhIZ7y78sgv1r6ClEcBvqOaeGQOiG7g174lCOsvfzp\
Kj0B7v8miUffxYgAAAAASUVORK5CYII=',
5:'iVBORw0KGgoAAAANSUhEUgAAAAcAAAAKCAQAAADSxYyGAAAAAXNSR0IArs4c6QAAAAJiS0dEAP+H\
j8y/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH2QEdFC0kYfD0JwAAAG9JREFUCNdFzSEO\
wQEcR/HPz1RFEk3R/IsrSIIiKKLoBLrNBcwhlH82M0dxBQ7wFf4z7+W3JzrviajglI+nobbEPqPM\
s0uE2OSQX1LRZGaAc9Fj6YWHbegzdSxWeUObUSZpMs4lUXHNDQvr0n3/fAGM1jOgeQ7LkAAAAABJ\
RU5ErkJggg==',
6:'iVBORw0KGgoAAAANSUhEUgAAAAcAAAAKCAQAAADSxYyGAAAAAXNSR0IArs4c6QAAAAJiS0dEAP+H\
j8y/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH2QEdFDAMqykwwQAAAHJJREFUCNdVzqEN\
AjEAQNHXpgmGhIQFSDrABYdgDNiCAW6FW+M8C7AEogaDITkDikswGIpAAN/+L344+CXC2JbKCwn6\
7qkRP7bUk8037mVH+3qrpFIHg7M7tiIPaztzEzORpatetjJKTVi0l24qBwj/G28G5h0QfR5TzQAA\
AABJRU5ErkJggg==',
7:'iVBORw0KGgoAAAANSUhEUgAAAAYAAAAICAQAAABwz0azAAAAAXNSR0IArs4c6QAAAAJiS0dEAP+H\
j8y/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH2QEdFDgOjf7b5QAAAF1JREFUCNclwSEO\
wjAUAND3m0oUFhwVCCRutvfYCTnBHEndJBKDIkiSCUTDELwXF9lfl5c6Tx8vgxLpPT1w1ZB2MUax\
NVj2CZqDEvM3Zff1puL8TDQnx2Cz5q6igx8v7hgcA1+KwwAAAABJRU5ErkJggg==',
8:'iVBORw0KGgoAAAANSUhEUgAAAAYAAAAKCAQAAAA9B+e4AAAAAXNSR0IArs4c6QAAAAJiS0dEAP+H\
j8y/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH2QEdFDE3AznopAAAAIVJREFUCNcFwS0O\
wkAURtH7TSoQmKkABEkDWILA1iDYAR4EhnVgWQAbwDTBocaSGhZAMgpHQioGx595nKPAjwj0UifP\
INgBMWdJ1qQjJTNVdk7u4vusNOHD27tIFzjZnULZgJqtRdo0yU31oMWGktq7q41Yq9CXHO3ZGbwY\
s5ACN554hsAfOJIl5Wh8/vMAAAAASUVORK5CYII=',
9:'iVBORw0KGgoAAAANSUhEUgAAAAcAAAAKCAQAAADSxYyGAAAAAXNSR0IArs4c6QAAAAJiS0dEAP+H\
j8y/AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH2QEdFTkUaEV56QAAAHRJREFUCNdNzKEN\
wlAYReHvf3kCQYIDicZUMACWBZogOwYswgAMwAAdAUcYoNgGQajEUMQTcM0x59xo/S8VdONtHPZE\
6zGe9CbYSTMXncbCFXnw9nT0MkVmA+56VSTmUcdap/k9n61UQeYj2VoelDahimJ9AeC2GPw/YHIW\
AAAAAElFTkSuQmCC'
};
var sig='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\
brYAAAAASUVORK5CYII=';


var c=0;
for(var i=0; i<b.length; i++){
	if(Math.random()<0.2){
		var im=new Image();
		im.src='data:image/png;base64,'+b[i];
		var div=document.createElement('div');
		div.appendChild(im);
		div.style.border='none';
		div.style.position='absolute';
		div.style.left=Math.floor(Math.random()*990)/10+'%';
		var bh=document.getElementsByTagName('body')[0].scrollHeight;
		div.style.top=Math.floor(Math.random()*bh-50)+'px';
//		div.style.zIndex=Math.floor(Math.random()*1000)-500;
		document.getElementsByTagName('body')[0].appendChild(div);
		c++;
	}
}
var div=document.createElement('div');
div.style.position='fixed';
div.style.right='0';
div.style.bottom='0';
div.style.textAlign='right';
if(c>9){
	var d=new Image();
	d.src='data:image/png;base64,'+bn[Math.floor(c/10)];
	div.appendChild(d);
}
c%=10;
var s=new Image();
s.src='data:image/png;base64,'+bn[c];
div.appendChild(s);
div.appendChild(document.createElement('br'));
var g=new Image();
g.src='data:image/png;base64,'+sig;
div.appendChild(g);

document.getElementsByTagName('body')[0].appendChild(div);

