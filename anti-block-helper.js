// ==UserScript==
// @name        反截拦助手
// @author      billypon
// @description 让被误截拦的网页可以继续访问
// @version     1.0.0
// @namespace   http://www.canaansky.com/
// @match       *://liebao/*
// @run-at      document-idle
// ==/UserScript==

function liebao() {
	var match = /dangerUrl=([^&$]+)/.exec(location.search);
	var link = document.getElementById('closepage');
	if (match && link) {
		var url = decodeURIComponent(match[1]);
		link.href = url;
		link.innerHTML = '继续访问页面';
	}
}

switch (location.hostname) {
	case 'liebao':
		liebao()
		break;
}
