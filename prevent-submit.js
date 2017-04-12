// ==UserScript==
// @name        提交截拦
// @author      billypon
// @description 阻止某些输入框按回车时自动提交表单，改为点击默认按钮
// @version     1.4.2
// @namespace   http://www.canaansky.com/
// @match       http://www.123wzwp.com/down-*.html
// @match       http://66yp.cc/down-*.html
// @match       https://www.feemoo.com/down2-*.html
// @match       http://www.sju.wang/down-*.html
// @match       http://www.wwp5.com/down-*.html
// @run-at      document-idle
// @grant       none
// ==/UserScript==

var input = document.querySelector("#code"), button = document.querySelector("#s1");
console.debug("input", input);
console.debug("button", button);
if (!(input && button))
	return;
input.addEventListener("keydown", function (event) {
	console.debug("keyCode", event.keyCode);
	if (event.keyCode != 13)
		return;
	button.click();
	event.preventDefault();
});
