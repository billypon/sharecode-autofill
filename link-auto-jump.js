// ==UserScript==
// @name        链接自动跳转
// @author      billypon
// @description 访问分享链接时自动跳转至下载页面或验证页面
// @version     1.8.1
// @namespace   http://www.canaansky.com/
// @match       http://www.123wzwp.com/file-*.html
// @match       http://www.678pan.com/file-*.html
// @match       http://158pan.cn/file-*.html
// @match       http://pan.789xz.com/file-*.html
// @match       http://*.dfpan.com/*
// @match       http://www.feemoo.com/file-*.html
// @match       http://www.feemoo.com/fmdown.php?*
// @match       http://www.fxpan.com/share/*
// @match       http://www.fxpan.com/downhtml/*.html
// @match       http://www.fxpan.com/down.php?*
// @match       http://hiyp.cc/file-*.html
// @match       http://www.sju.wang/file-*.html
// @match       http://www.wwp5.com/file-*.html
// @run-at      document-idle
// @grant       none
// ==/UserScript==

var domain = location.hostname.match(/\w+\.\w+$/)[0], path=location.pathname;
console.debug("domain", domain);

function ajax(url, callback) {
	console.debug("ajax request", url);
	var request = new XMLHttpRequest();
	request.onreadystatechange = function (event) {
		var target = event.currentTarget;
		if (target.readyState != 4)
			return;
		if (target.status == 200)
			callback(target.responseText);
		else
			console.error("ajax response", target.status, target.responseText);
	};
	request.open("GET", url);
	request.send();
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
			jumpFromLink(newLink(url.replace(replace, final)));
		});
	} else {
		jumpFromLink(newLink(url));
	}
}

function getLink(selector) {
	var link = document.querySelector(selector);
	console.debug("link", link);
	return link;
}

function newLink(url) {
	var body = document.body, link = document.createElement("a");
	link.textContent = "download";
	link.href = url;
	body.insertBefore(link, body.children[0]);
	return link;
}

function jumpFromLink(link, click) {
	if (typeof link == "string") {
		link = getLink(link);
		if (!link)
			return;
	}
	if (click)
		link.click();
	else
		location = link.href;
}

function startsWith(string, prefix) {
	return string.slice(0, prefix.length) == prefix;
}

switch (domain) {
	case "158pan.cn":
		jump();
		break;
	case "123wzwp.com":
	case "678pan.com":
	case "789xz.com":
	case "wwp5.com":
	case "sju.wang":
		jump(null);
		break;
	case "hiyp.cc":
		setTimeout(function () { jumpFromLink(".down_btn:nth-child(2)") }, 1000);
		break;
	case "dfpan.com":
		if (startsWith(path, "/file/down/")) {
			downSubmit(1);
		} else if (startsWith(path, "/fs/") || startsWith(path, "/file/")) {
			dialog_Open2 = function () { };
			show_vcode();
		}
		break;
	case "feemoo.com":
		if (startsWith(path, "/file-")) {
			jumpFromLink(".ndown_out");
		} else if (startsWith(path, "/fmdown.php")) {
			var button = document.querySelector("#combtn");
			console.debug("button", button);
			if (button)
				button.click();
		}
		break;
	case "fxpan.com":
		if (startsWith(path, "/share/")) {
			var button = document.querySelector("#popup-submit");
			console.debug("button", button);
			if (button)
				setTimeout(function () { button.click() }, 1000);
		} else if (startsWith(path, "/downhtml/")) {
			jumpFromLink(".d3 a");
		} else {
			var time = document.querySelector("#time");
			console.debug("time", time);
			if (time)
				time.innerHTML = 0;
		}
		break;
}
