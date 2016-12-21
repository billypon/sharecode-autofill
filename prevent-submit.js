// ==UserScript==
// @name        提交截拦
// @author      billypon
// @description 阻止某些输入框按回车时自动提交表单，改为点击默认按钮
// @version     1.1.2
// @namespace   http://www.canaansky.com/
// @match       http://66yp.cc/down-*.html
// @match       http://www.123wzwp.com/down-*.html
// @run-at      document-idle
// @grant       none
// ==/UserScript==

var input = document.querySelector("#code"), button = document.querySelector("#s1");
console.info("input:", input);
console.info("button:", button);
if (!(input && button))
	return;
input.addEventListener("keyup", function (event) {
	console.info("keyCode:", event.keyCode);
	if (event.keyCode != 13)
		return;
	button.click();
	event.preventDefault();
});
