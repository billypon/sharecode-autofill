// ==UserScript==
// @name        链接自动跳转
// @author      billypon
// @description 访问分享链接时自动跳转至下载页面或验证页面
// @version     1.1.0
// @namespace   http://www.canaansky.com/
// @match       http://158pan.cn/file-*.html
// @match       http://66yp.cc/file-*.html
// @match       http://www.fxpan.com/downhtml/*.php
// @run-at      document-idle
// @grant       none
// ==/UserScript==

function ajax(url, callback) {
	console.info("ajax request:", url);
	var request = new XMLHttpRequest();
	request.onreadystatechange = function (event) {
		var target = event.currentTarget;
		if (target.readyState != 4)
			return;
		if (target.status == 200)
			callback(target.responseText);
		else
			console.error("ajax response:", target.status, target.responseText);
	};
	request.open("GET", url);
	request.send();
}

function link(url) {
	var body = document.body, a = document.createElement("a");
	a.textContent = "download";
	a.href = url;
	body.insertBefore(a, body.children[0]);
	return a;
}

function jump(x, y, z) {
	if (!x && x !== null)
		x = "download";
	if (!y)
		y = "down";
	if (!z)
		z = "file";
	var url = location.pathname;
	if (x) {
		ajax(url.replace(z, y), function() {
			var a = link(url.replace(z, x));
			a.click();
		});
	} else {
		var a = link(url.replace(z, y));
		a.click();
	}
}

var domain = location.hostname.match(/\w+\.\w+$/)[0];
console.info("domain:", domain);
switch (domain) {
	case "158pan.cn":
		jump();
		break;
	case "66yp.cc":
		jump(null);
		brea;
	case "fxpan.com":
		var a = document.querySelector(".d3 a");
		if (a) {
			console.info("link:", a);
			location = a.href;
		}
		break;
}
