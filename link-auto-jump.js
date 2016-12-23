// ==UserScript==
// @name        链接自动跳转
// @author      billypon
// @description 访问分享链接时自动跳转至下载页面或验证页面
// @version     1.6.1
// @namespace   http://www.canaansky.com/
// @match       http://158pan.cn/file-*.html
// @match       http://66yp.cc/file-*.html
// @match       http://www.123wzwp.com/file-*.html
// @match       http://www.wwp5.com/file-*.html
// @match       http://pan.789xz.com/file-*.html
// @match       http://www.fmdisk.com/file-*.html
// @match       http://www.fxpan.com/downhtml/*.html
// @match       http://*.dfpan.com/fs/*
// @match       http://*.dfpan.com/file/*
// @run-at      document-idle
// @grant       none
// ==/UserScript==

var domain = location.hostname.match(/\w+\.\w+$/)[0], path=location.pathname;
console.info("domain:", domain);

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

function createLink(url) {
	var body = document.body, link = document.createElement("a");
	link.textContent = "download";
	link.href = url;
	body.insertBefore(link, body.children[0]);
	return link;
}

function jump(final, replace, search) {
	if (!final && final !== null)
		final = "download";
	if (!replace)
		replace = "down";
	if (!search)
		search = "file";
	var url = path.replace(search, replace);
	if (final) {
		ajax(url, function() {
			var link = createLink(url.replace(replace, final));
			link.click();
		});
	} else {
		var link = createLink(url);
		link.click();
	}
}

function startsWith(string, prefix) {
	return string.slice(0, prefix.length) == prefix;
}

switch (domain) {
	case "158pan.cn":
		jump();
		break;
	case "66yp.cc":
	case "123wzwp.com":
	case "wwp5.com":
	case "789xz.com":
		jump(null);
		break;
	case "fmdisk.com":
		jump(null, "down2");
		break;
	case "fxpan.com":
		var link = document.querySelector(".d3 a");
		console.info("link:", link);
		if (link)
			location = link.href;
		break;
	case "dfpan.com":
		if (startsWith(path, "/file/down/")) {
			downSubmit(1);
		}
		else if (startsWith(path, "/fs/") || startsWith(path, "/file/")) {
			dialog_Open2 = function () { };
			show_vcode();
		}
		break;
}
