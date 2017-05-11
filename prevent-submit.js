// ==UserScript==
// @name        提交截拦
// @author      billypon
// @description 阻止某些输入框按回车时自动提交表单，改为点击默认按钮
// @version     1.6.3
// @namespace   http://www.canaansky.com/
// @match       http://www.123wzwp.com/down-*.html
// @match       http://www.678pan.com/down-*.html
// @match       http://www.feemoo.com/fmdown.php?*
// @match       http://hiyp.cc/down-*.html
// @match       http://www.sju.wang/down-*.html
// @match       http://www.wwp5.com/down-*.html
// @run-at      document-idle
// @grant       none
// ==/UserScript==

var domain = location.hostname.match(/\w+\.\w+$/)[0], path=location.pathname;
console.debug("domain", domain);

function prevent(input, button, element) {
	if (!element)
		element = document;
	input = element.querySelector(input);
	button = element.querySelector(button);
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
}

function listen(dialog, input, button) {
	var handler = function (event) {
		var target = event.target, list = target.classList;
		if (!list || !list.contains(dialog))
			return;
		console.debug("dialog", target);
		removeEventListener("DOMNodeInserted", handler);
		setTimeout(function () {
			prevent(input, button, target);
		});
	}
	addEventListener("DOMNodeInserted", handler);
}

switch (domain) {
	case "feemoo.com":
		listen("layui-layer", "#very_btn", "#vecysmt");
		break;
	default:
		prevent("#code", "#s1");
}

