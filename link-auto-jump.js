// ==UserScript==
// @name        链接自动跳转
// @author      billypon
// @description 访问分享链接时自动跳转至下载页面或验证页面
// @version     1.2.0
// @namespace   http://www.canaansky.com/
// @match       http://158pan.cn/file-*.html
// @match       http://66yp.cc/file-*.html
// @match       http://www.fxpan.com/downhtml/*.php
// @match       http://*.dfpan.com/fs/*
// @match       http://*.dfpan.com/file/*
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

function startsWith(string, prefix) {
	return string.slice(0, prefix.length) == prefix;
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
	case "dfpan.com":
		if (startsWith(path, "/file/down/")) {
			setTimeout(function () {
				var button = document.querySelector("#downbtn a");
				console.info("button:", button);
				if (button)
					button.click();
			}, 1000);
		}
		else if (startsWith(path, "/fs/") || startsWith(path, "/file/")) {
			// remove dialog
			var dialog = document.querySelectorAll("#skyblue_dlg2, #login_registBox2");
			console.info("dialog:", dialog);
			if (dialog.length) {
				for (var i = 0; i < dialog.length; i++) {
					dialog[i].remove();
				}
			}

			// show verify code
			var button = document.querySelector("#inputDownWait .slow_button");
			console.info("button wait:", button);
			if (!button)
				return;
			button.click();

			// handle button click
			var code = document.querySelector("#vcode");
			console.info("code:", code);
			button = document.querySelector("#vcode_th .slow_button");
			console.info("button submit:", button);
			var a = document.querySelector("#premium_link");
			console.info("link:", a);
			if (!(code && button && link))
				return;
			button.onclick = "";
			button.addEventListener("click", function () {
				// create link
				var array = a.onclick.toString().split("','");
				var url = "/file/down/" + array[3] + array[4].split("'")[0] + "/" + code.value + ".html";
				a = link(url);

				// show wait
				var div = document.querySelector("#premium_div");
				console.info("div:", div);
				if (div)
					div.style.display = "none";
				div = document.querySelector("#wait_div");
				console.info("wait div:", div);
				var span = document.querySelector("#wait_span");
				console.info("wait span:", span);
				if (!(div && span))
					return;
				div.style.display = "";
				interval = 29;
				setInterval(function () {
					// jump
					span.textContent = --interval;
					if (!interval)
						a.click();
				}, 1000)
			});
		}
		break;
}
