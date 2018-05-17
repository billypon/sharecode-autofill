// ==UserScript==
// @name        闲鱼助手
// @author      billypon
// @description 闲鱼恢复搜索框、移除APP提示框、强制PC版页面
// @version     1.1.1
// @namespace   http://www.canaansky.com/
// @match       *://2.taobao.com/*
// @match       *://s.2.taobao.com/*
// @match       *://g.alicdn.com/*
// @run-at      document-start
// ==/UserScript==

function restoreSearchBox() {
	var header = document.querySelector("#J_IdleHeader");
	var html = header.innerHTML;
	html = html.replace(/<!--([\w\W\r\n]*?)-->/g, "$1");
	html = html.replace('<input type="hidden"', '<input type="hidden" name="ist" value="0" /><input type="hidden"');
	header.innerHTML = html;
}

function removeAppHints(dialog, input, button) {
	var style = document.createElement("style");
	style.innerHTML = ".mau-guide, .download-layer { display: none !important }";

	var head = document.querySelector("head");
	head.appendChild(style);
}

function redirectPage() {
	var match = /itemid=(\d+)/.exec(location.search);
	if (match) {
		location.href = location.protocol + "//2.taobao.com/item.htm?id=" + match[1];
	}
}

switch (location.hostname) {
	case "g.alicdn.com":
		redirectPage();
		break;
	default:
		restoreSearchBox();
		removeAppHints();
		break;
}
