// ==UserScript==
// @name          Facebook Twitter Style
// @author        Michael D. Irizarry
// @namespace     http://socialvitamin.com/apps
// @description   Hide some parts of the new Facebook home page to make it cleaner and mimic Twitter, also hides the highlights column.
// @include        http://*.facebook.com/*
// @include        http://facebook.com/*
// @include        http://*.facebook.com/home.php#/*

// ==/UserScript==

GM_addStyle(
'#home_stream {width:750px;} ' +
'#home_left_column {width: 930px;} ' +
'#home_sidebar {display:none; !important} ' +
'#home_filter_list {float:right;} ' +
'#home_stream h3 {width:700px;} ' +
'.commentable_item .show_all_link, .commentable_item .wallpost {width:700px; !important} ' +
'.UIComposer_Pic {display:none;} ' +
'.UIComposer_STATE_PIC_OUTSIDE .UIComposer_UIRoundedBox {padding-left: 0px;}' +
'.UIComposer_Prompt label {display:none} ' +
'.UIComposer_Prompt:before {content:"What are you doing?"} ' +
'.UIComposer_Prompt {font-size:1.4em;!important}'
);