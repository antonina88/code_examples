function getAge(date) {
  const currentDate = new Date();
  const birthday = new Date(date);
  const totalDifference = currentDate.getTime() - birthday.getTime();

  const dayMS = 1000 * 60 * 60 * 24;
  const weekMS = dayMS * 7;
  const monthMS = dayMS * 31;
  const yearMS = dayMS * 365;

  const amountYears = Math.floor(totalDifference / yearMS);
  const yearsTimeMS = amountYears * yearMS;
  const restTime = totalDifference - yearsTimeMS;

  const amountMonth = Math.floor(restTime / monthMS);
  const monthTimeMS = amountMonth * monthMS;
  const restTime2 = restTime - monthTimeMS;

  const amountWeeks = Math.floor(restTime2 / weekMS);
  const weeksTimeMS = amountWeeks * weekMS;
  const restTime3 = restTime2 - weeksTimeMS;
  const amountDays = Math.floor(restTime3 / dayMS);

  return `${amountYears} years, ${amountMonth} month, ${amountWeeks} weeks and ${amountDays} days`;
}

const cookies = document.cookie;
const arr = cookies && cookies.split(';');

const authElem = arr && arr.find((elem) => {
  return elem.includes('authorized');
});

const user = authElem && authElem.split('=')[1];
const currentUser = JSON.parse(localStorage.getItem(`${user}`));

const userAge = document.createElement('p');
userAge.classList.add('age');

const age = getAge(currentUser.date);
const userAgeText = document.createTextNode(`${age}`);

const mainBlock = document.querySelector('.main-content');
userAge.appendChild(userAgeText);
mainBlock.appendChild(userAge);
