const clocBlock = document.createElement('div');
const clockArrows = document.createElement('div');

clocBlock.classList.add('clock');
clockArrows.classList.add('arrows');

const clockModifiers = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve'];
const arrowModifiers = ['seconds', 'minutes', 'hours'];

for (let i = 0; i < clockModifiers.length; i++) {
  const clockItem = document.createElement('div');
  const clockItemText = document.createTextNode(`${i + 1}`);
  clockItem.classList.add('clock__number', `clock__number--${clockModifiers[i]}`);
  clockItem.appendChild(clockItemText);
  clocBlock.appendChild(clockItem);
}

for (let i = 0; i < arrowModifiers.length; i++) {
  const clockArrowsItem = document.createElement('div');
  clockArrowsItem.classList.add('arrows__item', `arrows__item--${arrowModifiers[i]}`);
  clockArrows.appendChild(clockArrowsItem);
}

clocBlock.appendChild(clockArrows);

const headerBlock = document.querySelector('.header');
headerBlock.appendChild(clocBlock);

function clock() {
  const date = new Date();
  const seconds = date.getSeconds();
  const minutes = date.getMinutes();
  const hours = date.getHours();

  const secondArrow = document.querySelector('.arrows__item--seconds');
  const minuteArrow = document.querySelector('.arrows__item--minutes');
  const hourArrow = document.querySelector('.arrows__item--hours');

  secondArrow.style = `transform: rotate(${seconds * 6}deg)`;
  minuteArrow.style = `transform: rotate(${minutes * 6}deg)`;
  hourArrow.style = `transform: rotate(${hours * 30}deg)`;
}

setInterval(clock, 1000);
