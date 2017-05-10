// ==UserScript==
// @name        提交截拦
// @author      billypon
// @description 阻止某些输入框按回车时自动提交表单，改为点击默认按钮
// @version     1.5.0
// @namespace   http://www.canaansky.com/
// @match       http://www.123wzwp.com/down-*.html
// @match       http://www.678pan.com/down-*.html
// @match       http://www.feemoo.com/fmdown.php?*
// @match       http://www.sju.wang/down-*.html
// @match       http://www.wwp5.com/down-*.html
// @run-at      document-idle
// @grant       none
// ==/UserScript==

var domain = location.hostname.match(/\w+\.\w+$/)[0], path=location.pathname;
console.debug("domain", domain);

var input, button;

switch (domain) {
	case "feemoo.com":
		input = "#very_btn";
		button = "#vecysmt";
		break;
	default
		input = "#code";
		button = "#s1";
}

input = document.querySelector("#code");
button = document.querySelector("#s1");
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
