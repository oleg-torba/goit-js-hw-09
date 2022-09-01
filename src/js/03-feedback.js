import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');

const STORAGE_KEY = 'feedback-form-state';

form.addEventListener('input', throttle(onTextAreaInput, 500));
form.addEventListener('submit', onFormSubmit);

let formData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};

getItemFromStorage();

function onTextAreaInput(e) {
  formData[e.target.name] = e.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit(e) {
  e.preventDefault();
  if (form.elements.email.value === '') {
    alert('Заповніть поле "EMail"');
  } else if (form.elements.message.value === '') {
    alert('Заповніть поле "Message"');
  } else {
    console.log(formData);
    e.currentTarget.reset();
    localStorage.removeItem(STORAGE_KEY);

    formData = {};
  }
}

function getItemFromStorage() {
  const storageData = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (storageData) {
    form.elements.email.value = storageData.email || '';
    form.elements.message.value = storageData.message || '';
  }
}
