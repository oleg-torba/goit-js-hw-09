import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const form = document.querySelector('.form');
form.addEventListener('submit', formSubmit);

let position = 1;
let step = 0;
let delay = 0;
let amount = 0;
function formSubmit(event) {
  event.preventDefault();
  step = Number(form.elements.step.value);
  delay = Number(form.elements.delay.value);
  amount = Number(form.elements.amount.value);
  startPromise();
  event.currentTarget.reset();
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      }
      reject({ position, delay });
    }, delay);
  });
}

function startPromise() {
  for (let i = 0; i < amount; i += 1) {
    createPromise(position, delay)
      .then(({ position, delay }) =>
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`)
      )
      .catch(({ position, delay }) =>
        console.log(`❌ Rejected promise ${position} in ${delay}ms`)
      );
    position += 1;
    delay += step;
  }
}
createPromise().then(startPromise());


