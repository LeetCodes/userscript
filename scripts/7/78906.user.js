// ==UserScript==
// @name           MMOC Hero-logo Reviver 2
// @namespace      Marlamin
// @description    Changes the MMOC Logo back to the old one
// @include        http://www.mmo-champion.com/*
// ==/UserScript==
document.getElementById('logo').firstChild.src='data:image/png;base64,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';