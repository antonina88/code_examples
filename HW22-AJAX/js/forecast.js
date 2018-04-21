const api = 'd61963ba96aea8547f4857bc75df7c51';
const city = localStorage.getItem('city') || 'Dnipropetrovsk';

const wrapper = document.querySelector('.wrapper--forecast');
const headerCity = document.querySelector('.forecast__city');
const daysContainer = document.querySelector('.days-container');

const formSearch = document.querySelector('.search');
const inputSearch = document.querySelector('.search__input');

const btnSearch = document.querySelector('.search__btn');

function createElement(tagName, className1, className2, parentElem, text) {
  const element = document.createElement(tagName);

  if (className2) {
    element.classList.add(className1, className2);
  } else if (className1) {
    element.classList.add(className1);
  }

  if (text) {
    const elementText = document.createTextNode(text);
    element.appendChild(elementText);
  }
  parentElem.appendChild(element);

  return element;
}

function getOut(event) {
  const message = document.querySelector('.message');
  if (message && message !== event.target) {
    message.parentNode.removeChild(message);
  }
}

function createMessageError(textMsg) {
  const message = createElement('div', 'message', 'message--error', wrapper, textMsg);
  const crossBtn = createElement('button', 'message__cross', '', message);

  wrapper.addEventListener('click', getOut, true);
}

function convertDate(dateElem) {
  const monthArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const itemDate = new Date(dateElem * 1000);
  const date = itemDate.getDate();
  const numberMonth = itemDate.getMonth();
  const month = monthArr[numberMonth];
  const abridgedMonth = month.substring(0, 3);

  return `${date} ${abridgedMonth}`;
}

function calcCelsium(temperature) {
  const celsiusTemperature = Math.round(temperature - 273.15);
  return celsiusTemperature;
}

function getWeatherData(city) {
  const url = `http://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&cnt=14&APPID=${api}`;

  return fetch(url).then((res) => {
    if (res.status === 200) {
      return res.json();
    } else {
      throw new Error('You inputed incorrect data, please try again');
    }
  });
}

function getCurrentTemperature(nightTemper, mornTemper, dayTemper, eveTemper) {
  const time = new Date().getHours();

  if (time >= 0 && time < 6) {
    return calcCelsium(nightTemper);
  }

  if (time >= 6 && time < 12) {
    return calcCelsium(mornTemper);
  }

  if (time >= 12 && time < 17) {
    return calcCelsium(dayTemper);
  }

  if (time >= 17 && time < 24) {
    return calcCelsium(eveTemper);
  }
}

function getIcon(description) {
  let icon;

  switch (description) {
    case 'Clear': {
      icon = 'url(img/sunny.png)';
      break;
    }

    case 'Rain': {
      icon = 'url(img/rain.png)';
      break;
    }
    case 'Clouds': {
      icon = 'url(img/clouds.png)';
      break;
    }
    case 'Snow': {
      icon = 'url(img/snow.png)';
      break;
    }
    default: icon = '';
  }

  return icon;
}

function renderForecast(forecast) {
  const dataArr = forecast.data;
  const fragment1 = document.createDocumentFragment();
  const fragment2 = document.createDocumentFragment();

  const {night, morn, day, eve} = dataArr[0];
  const temperature = getCurrentTemperature(night, morn, day, eve);

  const currentTemperature = (temperature <= 0)
    ? temperature
    : `+${temperature}`;

  headerCity.innerHTML = `${forecast.city}, ${forecast.country}, ${currentTemperature} &deg;C`;

  dataArr.forEach((element, index) => {
    const dailyItem = createElement('div', 'daily', '', daysContainer);
    dailyItem.dataset.item = `item${index}`;

    const dailySummary = createElement('p', 'daily__summary', '', dailyItem);
    const description = createElement('p', 'daily__description', '', dailySummary);
    const daylyIcon = createElement('p', 'daily__icon', '', dailySummary);

    const daylyTemperature = createElement('p', 'daily__temperature', '', dailyItem);
    const dateElement = createElement('p', 'date', '', dailyItem, `${convertDate(element.date)}`);

    description.innerText = `${element.description}`;
    daylyIcon.style.backgroundImage = getIcon(element.description);

    const minTemperature = (calcCelsium(element.min) <= 0)
      ? calcCelsium(element.min)
      : `+${calcCelsium(element.min)}`;

    const maxTemperature = (calcCelsium(element.max) <= 0)
      ? calcCelsium(element.max)
      : `+${calcCelsium(element.max)}`;

    daylyTemperature.innerHTML = `${minTemperature} ... ${maxTemperature} &deg;C`;

    fragment1.appendChild(dailyItem);

    const descriptionContainer = createElement('div', 'daily-description', '', wrapper);
    descriptionContainer.dataset.item = `item${index}`;

    if (index === 0) {
      descriptionContainer.classList.add('daily-description--active');
      dailyItem.classList.add('daily--active');
    }

    const descriptionItem1 = createElement('p', 'daily-description__item', '', fragment2);
    const descriptionItem2 = createElement('p', 'daily-description__item', '', fragment2);
    const descriptionItem3 = createElement('p', 'daily-description__item', '', fragment2);
    const descriptionItem4 = createElement('p', 'daily-description__item', '', fragment2);
    const descriptionItem5 = createElement('p', 'daily-description__item', '', fragment2);
    const descriptionItem6 = createElement('p', 'daily-description__item', '', fragment2);

    descriptionItem1.innerText = `${element.description}`;
    descriptionItem2.innerHTML = `${minTemperature} ... ${maxTemperature} &deg;C`;
    descriptionItem3.innerText = `pressure: ${element.pressure} hPa`;
    descriptionItem4.innerText = `humidity: ${element.humidity} %`;
    descriptionItem5.innerText = `wind: ${element.wind} m/s`;
    descriptionItem6.innerText = `clouds: ${element.clouds} %`;

    descriptionContainer.appendChild(fragment2);
  });
  daysContainer.appendChild(fragment1);
}

function selectDay(event) {
  if (event.target.className !== 'daily') {
    return false;
  }

  const dailyActive = document.querySelector('.daily--active');
  const descriptionActive = document.querySelector('.daily-description--active');

  dailyActive.classList.remove('daily--active');
  descriptionActive.classList.remove('daily-description--active');
  event.target.classList.add('daily--active');

  const dataValue = event.target.dataset.item;
  const nextDescriptionBlock = document.querySelectorAll(`[data-item=${dataValue}]`)[1];
  nextDescriptionBlock.classList.add('daily-description--active');
}

function updateDataForecast(city) {
  getWeatherData(city)
    .then((result) => {
      localStorage.setItem('city', result.city.name);
      const days = result.list;
      const {night, morn, day, eve} = days[0].temp;
      const currentTemperature = getCurrentTemperature(night, morn, day, eve);

      headerCity.innerHTML = `${result.city.name}, ${result.city.country}, ${currentTemperature} &deg;C`;

      const dataArr = days.map((item) => {
        const day = {
          clouds: item.clouds,
          date: item.dt,
          humidity: item.humidity,
          pressure: Math.round(item.pressure),
          wind: item.speed,
          max: item.temp.max,
          min: item.temp.min,
          day: item.temp.day,
          eve: item.temp.eve,
          morn: item.temp.morn,
          night: item.temp.night,
          description: item.weather[0].main
        };
        return day;
      });

      const description = document.querySelectorAll('.daily__description');
      const daylyIcon = document.querySelectorAll('.daily__icon');

      const daylyTemperature = document.querySelectorAll('.daily__temperature');
      const dateElement = document.querySelectorAll('.date');

      const descriptionContainer = document.querySelectorAll('.daily-description');

      dataArr.forEach((element, index) => {
        description[index].innerText = `${element.description}`;
        daylyIcon[index].style.backgroundImage = getIcon(element.description);

        daylyTemperature[index].innerHTML = `${calcCelsium(element.min)} ... ${calcCelsium(element.max)} &deg;C`;
        dateElement[index].innerText = convertDate(element.date);

        const descriptionItems = descriptionContainer[index].querySelectorAll('.daily-description__item');

        descriptionItems[0].innerText = `${element.description}`;
        descriptionItems[1].innerHTML = `${calcCelsium(element.min)} ... ${calcCelsium(element.max)} &deg;C`;
        descriptionItems[2].innerText = `pressure: ${element.pressure} hPa`;
        descriptionItems[3].innerText = `humidity: ${element.humidity} %`;
        descriptionItems[4].innerText = `wind: ${element.wind} m/s`;
        descriptionItems[5].innerText = `clouds: ${element.clouds} %`;
      });
    })
    .catch((error) => {
      console.warn(error.message);
      createMessageError(error.message);
    });
}

function updateCity(event) {
  event.preventDefault();
  const newCity = inputSearch.value && inputSearch.value.trim();

  if (newCity === '') {
     return false;
  }

  updateDataForecast(newCity);
  inputSearch.value = '';
}

const allCookies = document.cookie;
const arrCookies = allCookies && allCookies.split(';');

const isAutorized = arrCookies && arrCookies.find((elem) => {
  return elem.includes('authorized');
});

const userEmail = isAutorized && isAutorized.split('=')[1];

if (!userEmail) {
  location.href = './login.html';
} else {
  getWeatherData(city)
    .then((result) => {
      let forecast = {};

      const days = result.list;
      forecast.city = result.city.name;
      forecast.country = result.city.country;

      localStorage.setItem('city', result.city.name);

      const data = days.map((item) => {
        const day = {
          clouds: item.clouds,
          date: item.dt,
          humidity: item.humidity,
          pressure: Math.round(item.pressure),
          wind: item.speed,
          max: item.temp.max,
          min: item.temp.min,
          day: item.temp.day,
          eve: item.temp.eve,
          morn: item.temp.morn,
          night: item.temp.night,
          description: item.weather[0].main
        };
        return day;
      });

      forecast.data = data;
      renderForecast(forecast);
    })
    .catch((error) => {
      console.warn(error.message);
      createMessageError(error.message);
    });
}

daysContainer.addEventListener('click', selectDay);
formSearch.addEventListener('submit', updateCity);
btnSearch.addEventListener('click', updateCity);
