const wrapperLogIn = document.querySelector('.wrapper--authoriation');
const inputs = document.querySelectorAll('.form__input');
const email = document.querySelector('#email-field');
const password = document.querySelector('#password-field');
const btnSubmit = document.querySelector('.form__submit');

const emailValue = localStorage.getItem('email-auth');
const passwordValue = localStorage.getItem('password-auth');

email.value = emailValue || '';
password.value = passwordValue || '';

const regEmail = /(^[a-zA-Z]\w{3,})@([a-z]{1,7}\.[a-z]{1,3}$)/;
const regPassword = /^[a-zA-Z0-9]{5,}$/;

function clearErrors(event) {
  const parentElem = event.target.parentNode;
  const errorElem = parentElem.querySelector('.form__error');
  event.target.classList.remove('form__input--error');
  return errorElem && event.target.parentNode.removeChild(errorElem);
}

function isEmpty(event) {
  if (event.target.value !== '') {
    return true;
  }
  clearErrors(event);
  const error = document.createElement('p');
  const errorText = document.createTextNode('This field is required');
  event.target.classList.add('form__input--error');
  error.classList.add('form__error');
  error.appendChild(errorText);
  event.target.parentNode.insertBefore(error, event.target);
}

function addDataToStorage(event) {
  const key = event.target.dataset.element;
  const value = event.target.value.trim();
  localStorage.setItem(key, value);
}

function getOut(event) {
  const message = document.querySelector('.message');
  if (message && message !== event.target) {
    message.parentNode.removeChild(message);
  }
}

function createMessageError(textMsg) {
  const message = document.createElement('div');
  const textMessage = document.createTextNode(textMsg);
  const crossBtn = document.createElement('button');

  message.classList.add('message', 'message--error');
  crossBtn.classList.add('message__cross');

  message.appendChild(crossBtn);
  message.appendChild(textMessage);
  wrapperLogIn.appendChild(message);

  wrapperLogIn.addEventListener('click', getOut, true);
}

function sendData(event) {
  event.preventDefault();
  const message = document.querySelector('.message-error');

  const emailData = email.value && email.value.trim();
  const passwordData = password.value && password.value.trim();

  if (emailData === '') {
    email.classList.add('form__input--error');
  }

  if (passwordData === '') {
    password.classList.add('form__input--error');
  }

  if ((emailData === '' || passwordData === '') && !message) {
    createMessageError('Fields not filled');
    return false;
  }

  const isValidPassword = regPassword.test(passwordData);
  const isValidEmail = regEmail.test(emailData);

  if (!isValidEmail) {
    email.classList.add('form__input--error');
  }

  if (!isValidPassword) {
    password.classList.add('form__input--error');
  }

  if (!isValidPassword || !isValidEmail) {
    createMessageError('Format is incorrect');
  }

  if (isValidPassword && isValidEmail) {
    const user = JSON.parse(localStorage.getItem(`${emailData}`));

    if (!user) {
      createMessageError('user with such email not found...');
      return false;
    }

    if (passwordData !== user.password) {
      createMessageError('password is incorrect, try again please');
      return false;
    }
    const expiration = new Date();
    expiration.setDate(expiration.getDate() + 1);
    document.cookie = `authorized=${emailData}; expires=${expiration.toGMTString()}`;

    localStorage.removeItem('email-auth');
    localStorage.removeItem('password-auth');
    location.href = './index.html';
  }
}

for (let i = 0; i < inputs.length; i++) {
  inputs[i].addEventListener('blur', isEmpty);
  inputs[i].addEventListener('input', clearErrors);
  inputs[i].addEventListener('change', addDataToStorage);
}

btnSubmit.addEventListener('click', sendData);
