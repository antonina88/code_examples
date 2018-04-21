const allCookies = document.cookie;
const arrCookies = allCookies && allCookies.split(';');

const isAutorized = arrCookies && arrCookies.find((elem) => {
  return elem.includes('authorized');
});

const userEmail = isAutorized && isAutorized.split('=')[1];
let currUser;

const email = document.querySelector('.user__item--email');
const userPhone = document.querySelector('.user__item--phone');
const userBirthday = document.querySelector('.user__item--birthday');
const editPassword = document.querySelector('.user__item--password');
const editBtn = document.querySelectorAll('.user__btn--edit');
const logout = document.querySelector('.logout');

if (!userEmail) {
  location.href = './login.html';
} else {
  currUser = JSON.parse(localStorage.getItem(`${userEmail}`));
  email.innerText = `${userEmail}`;
  userPhone.innerText = `${currUser.phone}`;
  userBirthday.innerText = `${currUser.date}`;
}

function changePassword(event) {
  const regPassword = /^[a-zA-Z0-9]{5,}$/;
  const parentElem = event.target.parentNode;
  const input = parentElem.querySelector('.user__input');
  const link = parentElem.querySelector('.user__item--password');
  const saveBtn = parentElem.querySelector('.user__saveBtn');

  const newPassword = input.value;
  const isValidPassword = regPassword.test(newPassword);

  if (isValidPassword) {
    currUser.password = newPassword;
    const editedUser = JSON.stringify(currUser);
    localStorage.setItem(`${userEmail}`, editedUser);

    input.value = '';
    link.style = 'display: inline-block';
    input.style = 'display: none';
    saveBtn.style = 'display: none';

    createMessageError('Changes saved', 'message', 'message--success');
  }
}

editPassword.addEventListener('click', function (event) {
  const parentElem = event.target.parentNode;

  const input = parentElem.querySelector('.user__input');
  const saveBtn = parentElem.querySelector('.user__saveBtn');
  console.log(event);
  event.target.style = 'display: none';
  input.style = 'display: inline-block';
  saveBtn.style = 'display: inline-block';

  saveBtn.addEventListener('click', changePassword);
});

logout.addEventListener('click', () => {
  document.cookie = `authorized=; expires=${(new Date(0)).toGMTString()}`;
  location.href = './login.html';
});

function cancelFromEdit(event) {
  const cancelBtn = event.target;
  const parentElem = cancelBtn.parentNode;
  const input = parentElem.querySelector('input');
  const dataValue = input.dataset.user;

  const editBtn = parentElem.querySelector('.user__btn--edit');
  const saveBtn = parentElem.querySelector('.user__btn--save');

  const p = document.createElement('p');
  p.classList.add('user__item');

  switch (dataValue) {
    case 'email': {
      p.innerText = `${userEmail}`;
      p.dataset.user = 'email';
      break;
    }
    case 'phone': {
      p.innerText = `${currUser.phone}`;
      p.dataset.user = 'phone';
      break;
    }
    case 'birthday': {
      p.innerText = `${currUser.date}`;
      p.dataset.user = 'birthday';
      break;
    }
    default: p.innerText = '';
  }

  cancelBtn.style = 'display: none';
  saveBtn.style = 'display: none';
  editBtn.style = 'display: inline-block';
  parentElem.replaceChild(p, input);
}

function saveChange(event) {
  const regEmail = /(^[a-zA-Z]\w{3,})@([a-z]{1,7}\.[a-z]{1,3}$)/;
  const regPhone = /^(\+38)?\(?(0\d{2})\)?[\s-]?(\d{3})[\s-]?(\d{2})[\s-]?(\d{2}$)/;
  const regbirthDay = /^(0\d|1[0-2])\/?([0-2]\d|3[01])\/?(19\d{2}|20(0\d|1[0-7]))$/;

  const parentElem = event.target.parentNode;
  const input = parentElem.querySelector('input');
  const dataValue = input.dataset.user;

  if (dataValue === 'phone' && input.value !== currUser.phone) {
    if (regPhone.test(input.value)) {
      currUser.phone = input.value;
    } else {
      input.classList.add('user__input--error');
      createMessageError('Phone is incorrect', 'message', 'message--error');
      return false;
    }
  }

  if (dataValue === 'birthday' && input.value !== currUser.date) {
    if (regbirthDay.test(input.value)) {
      currUser.date = input.value;
    } else {
      input.classList.add('user__input--error');
      createMessageError('Date is incorrect', 'message', 'message--error');
      return false;
    }
  }

  let newEmail;

  if (dataValue === 'email' && input.value !== userEmail) {
    if (regEmail.test(input.value)) {
      newEmail = input.value;

      const date = new Date();
      date.setDate(date.getDate() + 1);
      document.cookie = `authorized=${newEmail}; expires=${date.toGMTString()}`;      
    } else {
      input.classList.add('user__input--error');
      createMessageError('Email is incorrect', 'message', 'message--error');
      return false;
    }
  }

  const email = newEmail || userEmail;
  const editedUser = JSON.stringify(currUser);
  localStorage.setItem(`${email}`, editedUser);

  const editBtn = parentElem.querySelector('.user__btn--edit');
  const cancelBtn = parentElem.querySelector('.user__btn--cancel');

  const p = document.createElement('p');
  p.classList.add('user__item');

  switch (dataValue) {
    case 'email': {
      p.innerText = `${email}`;
      p.dataset.user = 'email';
      break;
    }
    case 'phone': {
      p.innerText = `${currUser.phone}`;
      p.dataset.user = 'phone';
      break;
    }
    case 'birthday': {
      p.innerText = `${currUser.date}`;
      p.dataset.user = 'birthday';
      break;
    }
    default: p.innerText = '';
  }

  event.target.style = 'display: none';
  cancelBtn.style = 'display: none';
  editBtn.style = 'display: inline-block';

  parentElem.replaceChild(p, input);
}

function editElement(event) {
  const input = document.createElement('input');
  input.classList.add('user__input');

  const parentElem = event.target.parentNode;
  const p = parentElem.querySelector('p');
  const dataValue = p.dataset.user;

  const saveBtn = parentElem.querySelector('.user__btn--save');
  const cancelBtn = parentElem.querySelector('.user__btn--cancel');

  event.target.style = 'display: none';
  saveBtn.style = 'display: inline-block';
  cancelBtn.style = 'display: inline-block';

  switch (dataValue) {
    case 'email': {
      input.value = `${userEmail}`;
      input.dataset.user = 'email';
      break;
    }
    case 'phone': {
      input.value = `${currUser.phone}`;
      input.dataset.user = 'phone';
      break;
    }
    case 'birthday': {
      input.value = `${currUser.date}`;
      input.dataset.user = 'birthday';
      break;
    }
    default: input.value = '';
  }

  parentElem.replaceChild(input, p);

  cancelBtn.addEventListener('click', cancelFromEdit);
  saveBtn.addEventListener('click', saveChange);
  
  input.addEventListener('input', function (event) {
    event.target.classList.remove('user__input--error');
  });
}

for (let i = 0; i < editBtn.length; i++) {
  editBtn[i].addEventListener('click', editElement);
}

function getOut(event) {
  const message = document.querySelector('.message');
  if (message && message !== event.target) {
    message.parentNode.removeChild(message);
  }
}

function createMessageError(textMsg, className1, className2) {
  const message = document.createElement('div');
  const textMessage = document.createTextNode(textMsg);
  const crossBtn = document.createElement('button');
  const wrapper = document.querySelector('.wrapper');

  message.classList.add(className1, className2);
  crossBtn.classList.add(`${className1}__cross`);

  message.appendChild(crossBtn);
  message.appendChild(textMessage);
  wrapper.appendChild(message);

  wrapper.addEventListener('click', getOut, true);
}