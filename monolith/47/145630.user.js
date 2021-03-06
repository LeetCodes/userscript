// ==UserScript==
// @name			Facebook New Chat Emojis Bar
// @description	                Adds new emojis bar to Facebook chat
// @description	        Report bugs at thespistek@yahoo.fr or Contact me on facebook http://www.facebook.com/tunisien7
// @description	        Thank you for using my script!
// @include			http://facebook.com/*
// @include			http://*.facebook.com/*
// @include			https://facebook.com/*
// @include			https://*.facebook.com/*
// @exclude			http://*.channel.facebook.com/*
// @exclude			https://*.channel.facebook.com/*
// @author			spistek
// @version			1
// @versionnumber	1
// @namespace		http://userscripts.org/scripts/show/145630
// ==/UserScript==
//

	var version, storage, spemotsInfo, spemotsTitle, headTag, styleTag, ArrowStyleUp, ArrowStyleDown, fEmotBarDom, fEmotsListDom, fArrow;

	version = 1;
	


	storage = 'none';

	try {
		if (typeof GM_getValue === 'function' && typeof GM_setValue === 'function') {
			GM_setValue('testkey', 'testvalue');
			if (GM_getValue('testkey', false) === 'testvalue') { storage='greasemonkey'; }
		}
	} catch(x) {}
	if (storage=='none' && typeof localStorage == 'object') { storage='localstorage'; }

	function setValue(key, value) {
		switch (storage) {
			case 'greasemonkey':
				GM_setValue('0-'+key, value);
				break;
			case 'localstorage':
				localStorage['femotbar-0-'+key] = value;
				break;
		}
	}

	function getValue(key, value) {
		switch (storage) {
			case 'greasemonkey':
				return GM_getValue('0-'+key, value);
			case 'localstorage':
				var val = localStorage['femotbar-0-'+key];
				if (val=='true') { return true; }
				else if (val=='false') { return false; }
				else if (val) { return val; }
				break;
		}
		return value;
	}
	
	function xmlhttpRequest(params, callBack) {
		if (typeof GM_xmlhttpRequest !== 'undefined') {
			params['onload'] = callBack;
			return GM_xmlhttpRequest(params);
		}
		return null;
	}

	function openInTab(url) {
		if (typeof GM_openInTab !== 'undefined') { GM_openInTab(url); }
		else { window.open(url); }
	}

	
	

	function createSelection(field, start, end) {
		if( field.createTextRange ) {
			var selRange = field.createTextRange();
			selRange.collapse(true);
			selRange.moveStart('character', start);
			selRange.moveEnd('character', end);
			selRange.select();
		} else if( field.setSelectionRange ) {
			field.setSelectionRange(start, end);
		} else if( field.selectionStart ) {
			field.selectionStart = start;
			field.selectionEnd = end;
		}
		field.focus();
	}       
	
	function getCursorPosition(field) {
		var CursorPos = 0;
		if (field.selectionStart || field.selectionStart == '0') CursorPos = field.selectionStart;
		return (CursorPos);
	}
	
var a = '[[458743470836752]]'
var b = '[[458743477503418]]'
var c = '[[458743480836751]]'
var d = '[[460446070666492]]'
var e = '[[458743647503401]]'
var f = '[[458743664170066]]'
var g = '[[458743684170064]]'
var h = '[[458743697503396]]'
var i = '[[458743710836728]]'
var j = '[[458743727503393]]'
var k = '[[458743744170058]]'
var l = '[[460457413998691]]'
var m = '[[458743760836723]]'
var n = '[[458743767503389]]'
var o = '[[458743777503388]]'
var p = '[[458743787503387]]'
var q = '[[458743794170053]]'
var r = '[[458743797503386]]'
var s = '[[458743814170051]]'
var t = '[[458743834170049]]'
var u = '[[458743840836715]]'
var v = '[[460457397332026]]'
var w = '[[460457423998690]]'
var x = '[[458743870836712]]'
var y = '[[458743887503377]]'
var z = '[[458743910836708]]'
var aa = '[[458743927503373]]'
var bb = '[[458743934170039]]'
var cc = '[[458743957503370]]'
var dd = '[[458744247503341]]'
var ee = '[[458744467503319]]'
var ff = '[[458744484169984]]'
var gg = '[[458744507503315]]'
var hh = '[[458744524169980]]'
var ii = '[[458744540836645]]'
var jj = '[[458744554169977]]'
var kk = '[[458744580836641]]'
var ll = '[[458744587503307]]'
var mm = '[[458744597503306]]'
var nn = '[[458744607503305]]'
var oo = '[[458744614169971]]'
var pp = '[[458744620836637]]'
var qq = '[[458744630836636]]'
var rr = '[[458744644169968]]'
var ss = '[[458744660836633]]'
var tt = '[[458744650836634]]'
var uu = '[[458744687503297]]'
var vv = '[[458744700836629]]'
var ww = '[[458744714169961]]'
var xx = '[[458744724169960]]'
var yy = '[[458744744169958]]'
var zz = '[[458744754169957]]'
var aaa = '[[458744780836621]]'
var bbb = '[[458744800836619]]'
var ccc = '[[458744784169954]]'
var ddd = '[[458744810836618]]'
var eee = '[[458744820836617]]'
var fff = '[[458744824169950]]'
var ggg = '[[458744837503282]]'
var hhh = '[[458744844169948]]'
var iii = '[[458744854169947]]'
var jjj = '[[458744874169945]]'
var kkk = '[[458744877503278]]'
var lll = '[[458744894169943]]'
var mmm = '[[458744897503276]]'
var nnn = '[[458744900836609]]'
var ooo = '[[458744920836607]]'
var ppp = '[[458744944169938]]'
var qqq = '[[458744954169937]]'
var rrr = '[[458744967503269]]'
var sss = '[[458744974169935]]'
var ttt = '[[458744994169933]]'
var uuu = '[[458745007503265]]'
var vvv = '[[458745020836597]]'
var www = '[[458745024169930]]'
var xxx = '[[458745034169929]]'
var yyy = '[[458745047503261]]'
var zzz = '[[460457430665356]]'
var no = '[[460457450665354]]'
var az = '[[460457453998687]]'
var er = '[[460457457332020]]'
var ty = '[[460457480665351]]'
var ui = '[[460457507332015]]'
var op = '[[460457527332013]]'
var qs = '[[460457547332011]]'
var df = '[[460457533998679]]'
var gh = '[[460472413997191]]'
var jk = '[[460472420663857]]'
var lm = '[[460472423997190]]'
var wx = '[[460472437330522]]'
var cv = '[[458745387503227]]'
var bn = '[[458745357503230]]'
var nb = '[[458745084169924]]'
var vc = '[[458745320836567]]'
var xw = '[[458745337503232]]'
var sp = 'Contact Me On Facebook www.facebook.com/tunisien7 Download From : http://userscripts.org/scripts/show/145630'
	spemotsInfo = [a, 'http://graph.facebook.com/458743470836752/picture', b, 'http://graph.facebook.com/458743477503418/picture', c, 'http://graph.facebook.com/458743480836751/picture',d, 'http://graph.facebook.com/460446070666492/picture', e, 'http://graph.facebook.com/458743647503401/picture', f, 'http://graph.facebook.com/458743664170066/picture', g, 'http://graph.facebook.com/458743684170064/picture', h, 'http://graph.facebook.com/458743697503396/picture', i, 'http://graph.facebook.com/458743710836728/picture', j, 'http://graph.facebook.com/458743727503393/picture', k, 'http://graph.facebook.com/458743744170058/picture', l, 'http://graph.facebook.com/460452017332564/picture', m, 'http://graph.facebook.com/458743760836723/picture', n, 'http://graph.facebook.com/458743767503389/picture', o, 'http://graph.facebook.com/458743777503388/picture', p, 'http://graph.facebook.com/458743787503387/picture', q, 'http://graph.facebook.com/458743794170053/picture', r, 'http://graph.facebook.com/458743797503386/picture', s, 'http://graph.facebook.com/458743814170051/picture', t, 'http://graph.facebook.com/458743834170049/picture', u, 'http://graph.facebook.com/458743840836715/picture', v, 'http://graph.facebook.com/460452010665898/picture', w, 'http://graph.facebook.com/460452020665897/picture', x, 'http://graph.facebook.com/458743870836712/picture', y, 'http://graph.facebook.com/458743887503377/picture', z, 'http://graph.facebook.com/458743910836708/picture', aa, 'http://graph.facebook.com/458743927503373/picture', bb, 'http://graph.facebook.com/458743934170039/picture', cc, 'http://graph.facebook.com/458743957503370/picture', dd, 'http://graph.facebook.com/458744247503341/picture', ee, 'http://graph.facebook.com/458744467503319/picture', ff, 'http://graph.facebook.com/458744484169984/picture', gg, 'http://graph.facebook.com/458744507503315/picture', hh, 'http://graph.facebook.com/458744524169980/picture', ii, 'http://graph.facebook.com/458744540836645/picture', jj, 'http://graph.facebook.com/458744554169977/picture', kk, 'http://graph.facebook.com/458744580836641/picture', ll, 'http://graph.facebook.com/458744587503307/picture', mm, 'http://graph.facebook.com/458744597503306/picture', nn, 'http://graph.facebook.com/458744607503305/picture', oo, 'http://graph.facebook.com/458744614169971/picture', pp, 'http://graph.facebook.com/458744620836637/picture', qq, 'http://graph.facebook.com/458744630836636/picture', rr, 'http://graph.facebook.com/458744644169968/picture', ss, 'http://graph.facebook.com/458744660836633/picture', tt, 'http://graph.facebook.com/458744650836634/picture', uu, 'http://graph.facebook.com/458744687503297/picture', vv, 'http://graph.facebook.com/458744700836629/picture', ww, 'http://graph.facebook.com/458744714169961/picture', xx, 'http://graph.facebook.com/458744724169960/picture', yy, 'http://graph.facebook.com/458744744169958/picture', zz, 'http://graph.facebook.com/458744754169957/picture', aaa, 'http://graph.facebook.com/458744780836621/picture', bbb, 'http://graph.facebook.com/458744800836619/picture', ccc, 'http://graph.facebook.com/458744784169954/picture', ddd, 'http://graph.facebook.com/458744810836618/picture', eee, 'http://graph.facebook.com/458744820836617/picture', fff, 'http://graph.facebook.com/458744824169950/picture', ggg, 'http://graph.facebook.com/458744837503282/picture', hhh, 'http://graph.facebook.com/458744844169948/picture', iii, 'http://graph.facebook.com/458744854169947/picture', jjj, 'http://graph.facebook.com/458744874169945/picture', kkk, 'http://graph.facebook.com/458744877503278/picture', lll, 'http://graph.facebook.com/458744894169943/picture', mmm, 'http://graph.facebook.com/458744897503276/picture', nnn, 'http://graph.facebook.com/458744900836609/picture', ooo, 'http://graph.facebook.com/458744920836607/picture', ppp, 'http://graph.facebook.com/458744944169938/picture', qqq, 'http://graph.facebook.com/458744954169937/picture', rrr, 'http://graph.facebook.com/458744967503269/picture', sss, 'http://graph.facebook.com/458744974169935/picture', ttt, 'http://graph.facebook.com/458744994169933/picture', uuu, 'http://graph.facebook.com/458745007503265/picture', vvv, 'http://graph.facebook.com/458745020836597/picture', www, 'http://graph.facebook.com/458745024169930/picture', xxx, 'http://graph.facebook.com/458745034169929/picture', yyy, 'http://graph.facebook.com/458745047503261/picture', zzz, 'http://graph.facebook.com/460452027332563/picture', no, 'http://graph.facebook.com/460457450665354/picture', az, 'http://graph.facebook.com/460457453998687/picture', er, 'http://graph.facebook.com/460457457332020/picture', ty, 'http://graph.facebook.com/460457480665351/picture', ui, 'http://graph.facebook.com/460457507332015/picture', op, 'http://graph.facebook.com/460457527332013/picture', qs, 'http://graph.facebook.com/460457547332011/picture', df, 'http://graph.facebook.com/460457533998679/picture', gh, 'http://graph.facebook.com/460472413997191/picture', jk, 'http://graph.facebook.com/460472420663857/picture', lm, 'http://graph.facebook.com/460472423997190/picture', wx, 'http://graph.facebook.com/460472437330522/picture', cv, 'http://graph.facebook.com/458745387503227/picture', bn, 'http://graph.facebook.com/458745357503230/picture', nb, 'http://graph.facebook.com/458745084169924/picture', vc, 'http://graph.facebook.com/458745320836567/picture', xw, 'http://graph.facebook.com/458745337503232/picture', sp, 'http://graph.facebook.com/458745394169893/picture'];
    spemotsTitle = ['a', '', 'b', '', 'c', '', 'd', '', 'e', '', 'f', '', 'g', '', 'h', '', 'i', '', 'j', '', 'k', '', 'l', '', 'm', '', 'n', '', 'o', '', 'p', '', 'q', '', 'r', '', 's', '', 't', '', 'u', '', 'v', '', 'w', '', 'x', '', 'y', '', 'z', '', 'aa', '', 'bb', '', 'cc', '', 'dd', '', 'ee', '', 'ff', '', 'gg', '', 'hh', '', 'ii', '', 'jj', '', 'kk', '', 'll', '', 'mm', '', 'nn', '', 'oo', '', 'pp', '', 'qq', '', 'rr', '', 'ss', '', 'tt', '', 'uu', '', 'vv', '', 'ww', '', 'xx', '', 'yy', '', 'zz', '', 'aaa', '', 'bbb', '', 'ccc', '', 'ddd', '', 'eee', '', 'fff', '', 'ggg', '', 'hhh', '', 'iii', '', 'jjj', '', 'kkk', '', 'lll', '', 'mmm', '', 'nnn', '', 'ooo', '', 'ppp', '', 'qqq', '', 'rrr', '', 'sss', '', 'ttt', '', 'uuu', '', 'vvv', '', 'www', '', 'xxx', '', 'yyy', '', 'zzz', '', 'no', '', 'az', '', 'er', '', 'ty', '', 'ui', '', 'op', '', 'qs', '', 'df', '', 'gh', '', 'jk', '', 'lm', '', 'wx', '', 'cv', '', 'bn', '', 'nb', '', 'vc', '', 'xw', '', 'sp'];
    headTag = document.getElementsByTagName('head')[0];
    if (headTag) {
		styleTag = document.createElement('style');
		styleTag.type = 'text/css';
		styleTag.innerHTML =
			'.chat_tab_emot_bar {padding-top: 2px; padding-bottom: 6px; line-height: 16px; padding-left: 2px; background:#EEEEEE none repeat scroll 0 0; border-style: solid; border-width: 0px 0px 1px 0px; border-color: #C9D0DA; position: static; }'+
			'.fbNubFlyoutInner {position:relative !important;bottom:0px !important;}';
		headTag.appendChild(styleTag);
	}
	
	ArrowStyleUp = 'cursor: pointer; position: absolute; right: 2px; -moz-transform: rotate(180deg); -webkit-transform: rotate(180deg);'
	ArrowStyleDown = 'cursor: pointer; position: absolute; right: 2px;'
	
	fEmotBarDom = document.createElement('div');
	fEmotBarDom.setAttribute('class','chat_tab_emot_bar');

	
	fEmotsListDom = document.createElement('div');
	fEmotsListDom.setAttribute('name','EmotsList');
	fEmotBarDom.appendChild(fEmotsListDom);
	
	
	for(i=0;i<spemotsInfo.length;i+=2) {
		var fEmotsDom = document.createElement('img');
		fEmotsDom.setAttribute('alt',spemotsInfo[i]);
		fEmotsDom.setAttribute('title',spemotsTitle[i]);
		fEmotsDom.setAttribute('src','' + spemotsInfo[i+1]);
		fEmotsDom.setAttribute('style','cursor: pointer;');
		fEmotsDom.setAttribute('class','emote_custom');
		fEmotsListDom.appendChild(fEmotsDom);
	}
	
	

	fArrow = document.createElement('i');
	fArrow.setAttribute('alt','');
	fArrow.setAttribute('class','img chat_arrow');
	fArrow.setAttribute('style',ArrowStyleUp);
	fEmotBarDom.appendChild(fArrow);
	
	var setting_visible = getValue('visible',true);
	
	document.addEventListener('DOMNodeInserted', fInsertedNodeHandler, false);

	function fInsertedNodeHandler(event) {
		if(event.target.getElementsByClassName && event.target.getElementsByClassName('fbNubFlyout fbDockChatTabFlyout')[0])
			fInsertEmotBar(event.target);
	}

	function fInsertEmotBar(fChatWrapper) {
		fChatToolBox = fChatWrapper.getElementsByClassName('fbNubFlyoutHeader')[0]
		fNewEmotBar = fEmotBarDom.cloneNode(true);
		setVisibility(fNewEmotBar);
		for(i=0;i<fNewEmotBar.firstChild.childNodes.length-2;i++) fNewEmotBar.firstChild.childNodes[i].addEventListener('click', fEmotClickHandler , false);

		fNewEmotBar.firstChild.childNodes[i].addEventListener('click' , fStyleClickHandler , false);
		fNewEmotBar.firstChild.childNodes[i+1].addEventListener('click' , fStyleClickHandler , false);
		
		fNewEmotBar.childNodes[1].addEventListener('click', fHideShowEmotBar , false);
		if(fChatToolBox.childNodes) fChatToolBox.insertBefore(fNewEmotBar,fChatToolBox.childNodes[1]);
	}

	function fEmotClickHandler(event){
		var fChatInput = event.target.parentNode.parentNode.parentNode.parentNode.getElementsByClassName('fbNubFlyoutFooter')[0].getElementsByClassName('inputContainer')[0].getElementsByClassName('uiTextareaAutogrow input')[0];
		var pos = getCursorPosition(fChatInput);
		
		var txtbef = ''; var txtaft = '';
		
		if (fChatInput.value.charAt(pos-1) != ' ' && pos-1 > 0) txtbef = ' ';
		if (fChatInput.value.charAt(pos) != ' ') txtaft = ' ';
		
		fChatInput.value = fChatInput.value.substring(0,pos) + txtbef + event.target.getAttribute('alt') + txtaft + fChatInput.value.substring(pos);
		createSelection(fChatInput,pos + event.target.getAttribute('alt').length + txtaft.length + txtbef.length,pos + event.target.getAttribute('alt').length + txtaft.length + txtbef.length);
	}
	
	function fStyleClickHandler(event){
		var fChatInput = event.target.parentNode.parentNode.parentNode.parentNode.getElementsByClassName('fbNubFlyoutFooter')[0].getElementsByClassName('inputContainer')[0].getElementsByClassName('uiTextareaAutogrow input')[0];
		
		var selectedText = fChatInput.value.substring(fChatInput.selectionStart, fChatInput.selectionEnd);
		
		var pos = getCursorPosition(fChatInput);
		var txtlen = selectedText.length;
		
		if (txtlen == 0) {
			fChatInput.value = fChatInput.value.substring(0,pos) + event.target.getAttribute('alt') + fChatInput.value.substring(pos);
			createSelection(fChatInput,pos + 1,pos + event.target.getAttribute('alt').length-1);
		}
		else {
			var txtbef = event.target.getAttribute('alt').charAt(0);
			var txtaft = event.target.getAttribute('alt').charAt(0);
			
			while (fChatInput.value.charAt(pos) == ' ') { pos += 1; txtlen -= 1; }
			while (fChatInput.value.charAt(pos+txtlen-1) == ' ') txtlen -= 1;
			
			if (fChatInput.value.charAt(pos-1) != ' ' && pos-1 > 0) txtbef = ' ' + txtbef;
			if (fChatInput.value.charAt(pos+txtlen) != ' ') txtaft += ' ';
			
			fChatInput.value = fChatInput.value.substring(0,pos) + txtbef + fChatInput.value.substring(pos,pos+txtlen) + txtaft + fChatInput.value.substring(pos + txtlen);
			
			createSelection(fChatInput, pos + txtlen + 2, pos + txtlen + 2);
		}
	}

	function fHideShowEmotBar(event){
		fChatBar = document.getElementsByName('EmotsList');
		if(fChatBar[0].getAttribute('style') == 'display: none;') {
			for(i=0;i<fChatBar.length;i++) {
				fChatBar[i].setAttribute('style','display: block;');
				fChatBar[i].parentNode.childNodes[1].setAttribute('style',ArrowStyleUp);
			}
		}
		else {
			for(i=0;i<fChatBar.length;i++) {
				fChatBar[i].setAttribute('style','display: none;');
				fChatBar[i].parentNode.childNodes[1].setAttribute('style',ArrowStyleDown);
			}
		}
		setValue('visible',!setting_visible);
		setting_visible = !setting_visible;
	}
	
	function setVisibility(DOM) {
		if(setting_visible) {
			DOM.firstChild.setAttribute('style','display: block;');
			DOM.childNodes[1].setAttribute('style',ArrowStyleUp);
		}
		else {
			DOM.firstChild.setAttribute('style','display: none;');
			DOM.childNodes[1].setAttribute('style',ArrowStyleDown);
		}
	}

