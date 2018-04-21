const wrapperReg = document.querySelector('.wrapper--registration');
const inputs = document.querySelectorAll('.form__input');
const btnSubmit = document.querySelector('.form__submit');

const email = document.querySelector('#email-field');
const phone = document.querySelector('#phone-field');
const password = document.querySelector('#password-field');
const confirmPassword = document.querySelector('#confirm-password');
const birthDay = document.querySelector('#birth-day');

const emailValue = localStorage.getItem('email');
const phoneValue = localStorage.getItem('phone');
const passwordValue = localStorage.getItem('password');
const confirmValue = localStorage.getItem('confirmPassword');
const birthDayValue = localStorage.getItem('birthday');

email.value = emailValue || '';
phone.value = phoneValue || '';
password.value = passwordValue || '';
confirmPassword.value = confirmValue || '';
birthDay.value = birthDayValue || '';

const regEmail = /(^[a-zA-Z]\w{3,})@([a-z]{1,7}\.[a-z]{1,3}$)/;
const regPassword = /^[a-zA-Z0-9]{5,}$/;
const regPhone = /^(\+38)?\(?(0\d{2})\)?[\s-]?(\d{3})[\s-]?(\d{2})[\s-]?(\d{2}$)/;
const regbirthDay = /^(0\d|1[0-2])\/?([0-2]\d|3[01])\/?(19\d{2}|20(0\d|1[0-7]))$/;

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

function updatePhone(event) {
  const strPhone = event.target.value;

  const updateValue = strPhone.replace(regPhone, (str, code, elem1, elem2, elem3, elem4) => {
    if (!code) {
      code = '+38';
    }
    elem1 = elem1
      ? `(${elem1})`
      : '';
    elem2 = elem2
      ? `-${elem2}`
      : '';
    elem3 = elem3
      ? `-${elem3}`
      : '';
    elem4 = elem4
      ? `-${elem4}`
      : '';

    return `${code}${elem1}${elem2}${elem3}${elem4}`;
  });

  event.target.value = updateValue;
  return updateValue;
}

function updateBirthDay(event) {
  const strDate = event.target.value;

  const updateValue = strDate.replace(regbirthDay, (str, elem1, elem2, elem3) => {
    elem1 = elem1
      ? `${elem1}/`
      : '';
    elem2 = elem2
      ? `${elem2}/`
      : '';

    return `${elem1}${elem2}${elem3}`;
  });

  event.target.value = updateValue;
  return updateValue;
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
  wrapperReg.appendChild(message);

  wrapperReg.addEventListener('click', getOut, true);
}

function sendData(event) {
  event.preventDefault();
  const message = document.querySelector('.message-error');

  const emailData = email.value && email.value.trim();
  const passwordData = password.value && password.value.trim();
  const phoneData = phone.value && phone.value.trim();
  const birthDayData = birthDay.value && birthDay.value.trim();
  const confirmPasswordData = confirmPassword.value && confirmPassword.value.trim();

  if (emailData === '') {
    email.classList.add('form__input--error');
  }
  if (passwordData === '') {
    password.classList.add('form__input--error');
  }
  if (phoneData === '') {
    phone.classList.add('form__input--error');
  }
  if (birthDayData === '') {
    birthDay.classList.add('form__input--error');
  }
  if (confirmPasswordData === '') {
    confirmPassword.classList.add('form__input--error');
  }

  if ((emailData === '' || passwordData === '' || phone === '' || birthDay === '' || confirmPasswordData === '') && !message) {
    createMessageError('Fields not filled');
    return false;
  }

  const isValidPassword = regPassword.test(passwordData);
  const isValidEmail = regEmail.test(emailData);
  const isValidPhone = regPhone.test(phoneData);
  const isValidBirthDay = regbirthDay.test(birthDayData);

  if (!isValidEmail) {
    email.classList.add('form__input--error');
  }

  if (!isValidPassword) {
    password.classList.add('form__input--error');
  }

  if (!isValidPhone) {
    phone.classList.add('form__input--error');
  }

  if (!isValidBirthDay) {
    birthDay.classList.add('form__input--error');
  }

  if (!isValidPassword || !isValidEmail || !isValidPhone || !isValidBirthDay) {
    createMessageError('Format is incorrect');
    return false;
  }

  if (isValidPassword && isValidEmail && isValidPhone && isValidBirthDay) {
    if (password.value !== confirmPassword.value) {
      createMessageError('Passwords are different');
      return false;
    }

    const user = JSON.parse(localStorage.getItem(`${emailData}`));

    if (user) {
      email.classList.add('form__input--error');
      createMessageError('User with such email already exists');
    } else {
      const userData = {
        password: passwordData,
        phone: phoneData,
        date: birthDayData,
      };

      const newUser = JSON.stringify(userData);
      localStorage.setItem(`${email.value}`, newUser);

      const expiration = new Date();
      expiration.setDate(expiration.getDate() + 1);
      document.cookie = `authorized=${email.value}; expires=${expiration.toGMTString()}`;

      localStorage.removeItem('email');
      localStorage.removeItem('phone');
      localStorage.removeItem('password');
      localStorage.removeItem('confirmPassword');
      localStorage.removeItem('birthday');

      location.href = './profile.html';
    }
  }
}

for (let i = 0; i < inputs.length; i++) {
  inputs[i].addEventListener('blur', isEmpty);
  inputs[i].addEventListener('input', clearErrors);
  inputs[i].addEventListener('change', addDataToStorage);
}

phone.addEventListener('input', updatePhone);
birthDay.addEventListener('input', updateBirthDay);
btnSubmit.addEventListener('click', sendData);
