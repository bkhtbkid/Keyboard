const keys = document.querySelectorAll('.key')
const arrKeys = Array.from(keys)
const keyboardWrapper = document.querySelector('.keyboard__wrapper')
const textarea = document.querySelector('.textarea')
const ctrlLeft = document.querySelector('.ctrl__left')
const ctrlRight = document.querySelector('.ctrl__right')
const shiftLeft = document.querySelector('.shift__left')
const shiftRight = document.querySelector('.shift__right')
const altLeft = document.querySelector('.alt__left')
const altRight = document.querySelector('.alt__right')
const win = document.querySelector('.win')
const fn = document.querySelector('.fn')
const space = document.querySelector('.space')
const separateKeys = Array.from(document.querySelectorAll('.separate__keys'))
const arrSeparateKeys = separateKeys.concat(arrKeys)

const eng = document.querySelector('.eng')
const ru = document.querySelector('.ru')
const lang = document.querySelector('.change__lang')
const langKeys = Array.from(document.querySelectorAll('.lang-key'))
arrSeparateKeys.forEach(elem => {
	elem.style.borderRadius = '6px'
	elem.style.boxShadow = '0px 0px 2px 1px #272B26'
})

console.log(separateKeys);

const color = document.querySelector('.color__change')
const changeMode = document.querySelector('.change__mode')
const nightMode = document.querySelector('.night__mode')
const container = document.querySelector('.container')

const ruKeyCodes = [
	'Ё', 'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ', 'Ф', 'Ы', 'В', 'А', 'П',
	'Р', 'О', 'Л', 'Д', 'Ж', 'Э', 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', '.'
];
const engKeyCodes = [
	'`', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', 'A', 'S', 'D', 'F', 'G',
	'H', 'J', 'K', 'L', ';', "'", 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/'
];

const time = document.querySelector('.time')
const result = document.querySelector('.result')
const resultHeader = document.querySelector('.result-header')
const timeHeader = document.querySelector('.time-header')
const startHeader = document.querySelector('.start-header')
const start = document.querySelector('.start')
const printTime = document.querySelector('.print__time')


textarea.addEventListener('keydown', function (e) {
	for (let i = 0; i < arrKeys.length; i++) {
		if (e.key.toLowerCase() == arrKeys[i].innerHTML.toLowerCase()) {
			arrKeys[i].classList.add('active')
			deleteClassActive(arrKeys[i])
		} else {
			arrKeys[i].classList.remove('active')
		}
	}

	otherKey(e.code, 'ContextMenu', fn)
	otherKey(e.code, 'MetaLeft', win)
	otherKey(e.code, 'Space', space)
	separateKey(e.altKey, altRight, e.code, 'AltRight')
	separateKey(e.altKey, altLeft, e.code, 'AltLeft')
	separateKey(e.ctrlKey, ctrlLeft, e.code, 'ControlLeft')
	separateKey(e.ctrlKey, ctrlRight, e.code, 'ControlRight')
	separateKey(e.shiftKey, shiftRight, e.code, 'ShiftRight')
	separateKey(e.shiftKey, shiftLeft, e.code, 'ShiftLeft')
})

let deleteClassActive = function (elem) {
	setTimeout(function () {
		if (elem) {
			elem.classList.remove('active')
		}
	}, 1000)
}

function separateKey(key, elem, item, keyboard) {
	if (key && item === keyboard) {
		elem.classList.add('active')
	}
	deleteClassActive(elem)
}

function otherKey(key, code, elem) {
	if (key === code) {
		elem.classList.add('active')
	}
	deleteClassActive(elem)
}

color.addEventListener('input', changeColor)

function changeColor() {
	keyboardWrapper.style.backgroundColor = color.value
	keyboardWrapper.style.color = color.value
}

changeMode.addEventListener('click', modeHandler)

function modeHandler() {
	container.classList.toggle('page-color')
	nightMode.style.transform = 'translate(25px, 1px)'
	textarea.style.color = '#111'
	textarea.style.backgroundColor = '#fff'
	nightMode.style.backgroundColor = 'rgb(235, 222, 222)'
	changeMode.style.backgroundColor = 'rgb(116 111 111)'
	start.style.backgroundColor = '#fff'
	start.style.color = '#333'
	timeHeader.style.color = '#fff'
	resultHeader.style.color = '#fff'
	arrSeparateKeys.forEach(elem => {
		elem.style.color = '#fff'
		elem.style.backgroundColor = 'rgb(46 46 46)'
	})
	lang.style.backgroundColor = 'rgb(116, 111, 111)'
	if (container.classList.contains('page-color') != true) {
		nightMode.style.backgroundColor = 'rgb(21, 21, 21)'
		nightMode.style.transform = 'translate(-1px, 1px)'
		textarea.style.backgroundColor = '#333'
		textarea.style.color = '#fff'
		start.style.backgroundColor = '#333'
		start.style.color = '#fff'
		resultHeader.style.color = '#000'
		timeHeader.style.color = '#000'
		changeMode.style.backgroundColor = 'rgb(206, 206, 206)'
		lang.style.backgroundColor = 'rgb(206, 206, 206)'
		arrSeparateKeys.forEach(elem => {
			elem.style.color = '#000'
			elem.style.backgroundColor = '#fff'
			elem.style.boxShadow = '0px 0px 2px 1px #DFEADC'
		})
	}
}

lang.addEventListener('click', langHandler)

function langHandler(elem) {
	if (elem.target.className === 'eng') {
		ru.classList.remove('lang__active')
		eng.classList.add('lang__active')
		for (let i = 0; i < langKeys.length; i++) {
			langKeys[i].innerHTML = `${engKeyCodes[i]}`
		}
	}
	if (elem.target.className === 'ru') {
		eng.classList.remove('lang__active')
		ru.classList.add('lang__active')
		for (let i = 0; i < langKeys.length; i++) {
			langKeys[i].innerHTML = `${ruKeyCodes[i]}`
		}
	}
}

startHeader.addEventListener('click', startPrint)
time.addEventListener('input', setTimePrint)
textarea.addEventListener('input', onInput)

function startPrint() {
	startHeader.classList.add('hide')
	setTimePrint()
	resultHeader.classList.add('hide')
	textarea.removeAttribute('disabled')
	textarea.value = ''
	let interval = setInterval(() => {
		let timePrint = printTime.textContent

		if (timePrint <= 0) {
			clearInterval(interval)
			endPrint()
		} else {
			printTime.textContent = timePrint - 1
		}
	}, 1000)
	disableTime()
}

function setTimePrint() {
	let timeValue = +time.value
	printTime.textContent = timeValue
}

function endPrint() {
	time.removeAttribute('disabled')
	resultHeader.classList.remove('hide')
	startHeader.classList.remove('hide')
	textarea.setAttribute('disabled', 'disabled')
}

function disableTime() {
	time.setAttribute('disabled', 'disabled')
}

function onInput(e) {
	const length = e.target.value.length
	result.textContent = length
}