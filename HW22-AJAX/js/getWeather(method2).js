const api = 'd61963ba96aea8547f4857bc75df7c51';
const city = localStorage.getItem('city') || 'Dnipropetrovsk';

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

function getDate() {
  const monthArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const currentDate = new Date();
  const month = monthArr[currentDate.getMonth()];
  const date = currentDate.getDate();
  const day = weekDays[currentDate.getDay()];

  return `${day}, ${date} ${month}`;
}

const header = document.querySelector('.header');
const weatherContainer = createElement('div', 'weather-conteiner', '', header);
const forecastContainer = createElement('div', 'forecast', '', weatherContainer);
const forecastTitle = createElement('h1', 'forecast__title', '', forecastContainer);

const forecastLink = createElement('a', 'forecast__link', '', forecastTitle, 'See forecast for 14 days');
forecastLink.setAttribute('href', './forecast.html');

const formSearch = createElement('form', 'search', '', weatherContainer);
const inputSearch = createElement('input', 'search__input', '', formSearch);
const btnSearch = createElement('button', 'search__btn', '', formSearch);

inputSearch.setAttribute('type', 'text');
inputSearch.setAttribute('placeholder', 'City');
btnSearch.setAttribute('type', 'submit');

const dataContainer = createElement('div', 'weather', '', weatherContainer);
const dateELemText = getDate();
createElement('p', 'weather__date', '', dataContainer, dateELemText);

const cityElem = createElement('h2', 'forecast__city', '', forecastContainer);
const degElem = createElement('p', 'forecast__degree', '', forecastContainer);
const summaryWeather = createElement('div', 'weather__summary', '', dataContainer);

const weatherIcon = createElement('p', 'weather__icon', '', summaryWeather);
const description = createElement('p', '', '', summaryWeather);

const weatherDetail = createElement('div', 'weather-detail', '', weatherContainer);
const dailyTemperature = createElement('p', 'weather__temperature', '', dataContainer);

const pressure = createElement('p', 'weather-detail__item', 'weather-detail__item--pressure', weatherDetail);
const humidity = createElement('p', 'weather-detail__item', 'weather-detail__item--humidity', weatherDetail);
const windSpeed = createElement('p', 'weather-detail__item', 'weather-detail__item--windSpeed', weatherDetail);
const clouds = createElement('p', 'weather-detail__item', 'weather-detail__item--clouds', weatherDetail);

function calcCelsium(temperature) {
  const celsiusTemperature = Math.round(temperature - 273.15);
  return celsiusTemperature;
}

function renderForecast(forecast) {
  const currentForecast = forecast.data[0];
  const summary = currentForecast.description;
  const currentDate = new Date();
  const currentHours = currentDate.getHours();

  let currentTemperature;

  if (currentHours >= 0 && currentHours < 6) {
    currentTemperature = calcCelsium(currentForecast.night);
  } else if (currentHours >= 6 && currentHours < 12) {
    currentTemperature = calcCelsium(currentForecast.morn);
  } else if (currentHours >= 12 && currentHours < 17) {
    currentTemperature = calcCelsium(currentForecast.day);
  } else if (currentHours >= 17 && currentHours < 24) {
    currentTemperature = calcCelsium(currentForecast.eve);
  }

  let icon;

  switch (summary) {
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
    default: {
      icon = '';
    }
  }

  const cityValue = `${forecast.city}, ${forecast.country}`;
  const pressureText = `pressure: ${currentForecast.pressure} hPa`;
  const humidityText = `humidity: ${currentForecast.humidity} %`;
  const windSpeedText = `wind speed: ${currentForecast.wind} m/s`;
  const cloudsText = `clouds: ${currentForecast.clouds} %`;

  cityElem.innerText = `${cityValue}`;
  description.innerText = `${summary}`;
  weatherIcon.style.backgroundImage = icon;

  degElem.innerHTML = currentTemperature <= 0
    ? `${currentTemperature}&deg;C`
    : `+${currentTemperature}&deg;C`;

  const minTemperature = (calcCelsium(currentForecast.min) <= 0)
    ? calcCelsium(currentForecast.min)
    : `+${calcCelsium(currentForecast.min)}`;

  const maxTemperature = (calcCelsium(currentForecast.max) <= 0)
    ? calcCelsium(currentForecast.max)
    : `+${calcCelsium(currentForecast.max)}`;

  dailyTemperature.innerHTML = `${minTemperature} ... ${maxTemperature} &deg;C`;

  pressure.innerText = `${pressureText}`;
  humidity.innerText = `${humidityText}`;
  windSpeed.innerText = `${windSpeedText}`;
  clouds.innerText = `${cloudsText}`;
}

function getWeatherData(city) {
  const url = `http://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&cnt=1&APPID=${api}`;

  const xhr = new XMLHttpRequest();

  xhr.open('GET', url, true);
  xhr.send();
  
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const result = JSON.parse(xhr.responseText);

      let forecast = {};
      forecast.city = result.city.name;
      forecast.country = result.city.country;

      localStorage.setItem('city', result.city.name);

      const days = result.list;
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
    } 
  };
}

function updateCity(event) {
  event.preventDefault();
  const newCity = inputSearch.value && inputSearch.value.trim();
  getWeatherData(newCity);
  inputSearch.value = '';
}

formSearch.addEventListener('submit', updateCity);
btnSearch.addEventListener('click', updateCity);

getWeatherData(city);
