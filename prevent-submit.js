// ==UserScript==
// @name        提交截拦
// @author      billypon
// @description 阻止某些输入框按回车时自动提交表单，改为点击默认按钮
// @version     1.0.0
// @namespace   http://www.canaansky.com/
// @match       http://66yp.cc/down-*.html
// @run-at      document-idle
// @grant       none
// ==/UserScript==

var input = document.querySelector("#code"), button = document.querySelector("#s1");
if (input && button) {
	console.info("elements:", input, button);
	input.addEventListener("keypress", function (event) {
		if (event.keyCode != 13)
			return;
		button.click();
		event.preventDefault();
	});
}
