// ==UserScript==
// @name        91wii自动回答
// @description 自动回答运算
// @version     1.0.1
// @author      billypon
// @namespace   http://www.canaansky.com/
// @match       https://www.91wii.com/*
// @match       https://www.91tvg.com/*
// @run-at      document-idle
// ==/UserScript==

const submit = document.querySelector('[name="secqsubmit"]')
if (submit) {
	const container = submit.parentElement
	const answer = container.querySelector('[name="answer"]')
	const question = container.querySelector('b')
	if (answer && question) {
		answer.value = eval(`(${ question.textContent.replace(' = ?', '') })`)
		submit.click()
	}
}
