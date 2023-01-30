const backColorTag = document.querySelector('body');
const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

startBtn.addEventListener('click', startSwitchColor);
stopBtn.addEventListener('click', stopSwitchColor);

let intervalId = null;

function startSwitchColor() {
  startBtn.setAttribute('disabled', '');

  intervalId = setInterval(changeColor, 1000);

  getRandomHexColor();
}

function stopSwitchColor() {
  startBtn.removeAttribute('disabled', '');
  clearInterval(intervalId);
}

function changeColor() {
  backColorTag.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
let num
