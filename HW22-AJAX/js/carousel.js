const mainContainer = document.querySelector('.main-content');
const carousel = document.createElement('div');
const carouselContent = document.createElement('div');
const circlesNav = document.createElement('div');

carousel.classList.add('carousel');
carouselContent.classList.add('carousel__content');
circlesNav.classList.add('circles-nav');

const fragment1 = document.createDocumentFragment();
const fragment2 = document.createDocumentFragment();
const images = ['mountains', 'hedgehog', 'lion', 'nature', 'bridge'];

for (let i = 0; i < images.length; i++) {
  const imgItem = document.createElement('img');
  const circlesNavItem = document.createElement('a');

  imgItem.setAttribute('src', `./img/${images[i]}.jpg`);
  imgItem.setAttribute('alt', `slide${i + 1}`);
  circlesNavItem.setAttribute('href', '#');

  if (i === 0) {
    imgItem.classList.add('carousel__image', 'carousel__image--active');
    circlesNavItem.classList.add('circles-nav__item', 'circles-nav__item--active');
  } else {
    imgItem.classList.add('carousel__image');
    circlesNavItem.classList.add('circles-nav__item');
  }

  fragment1.appendChild(imgItem);
  fragment2.appendChild(circlesNavItem);
}

carouselContent.appendChild(fragment1);
circlesNav.appendChild(fragment2);
carousel.appendChild(carouselContent);
carousel.appendChild(circlesNav);
mainContainer.appendChild(carousel);

const getCarousel = () => {
  const imgCurrent = document.querySelector('.carousel__image--active');
  const circleElem = document.querySelector('.circles-nav__item--active');

  let nextImage = imgCurrent.nextSibling;
  let nextCircle = circleElem.nextSibling;

  if (!nextImage) {
    nextImage = document.querySelector('.carousel__image:first-child');
    nextCircle = document.querySelector('.circles-nav__item:first-child');
  }

  imgCurrent.classList.remove('carousel__image--active');
  circleElem.classList.remove('circles-nav__item--active');

  nextImage.classList.add('carousel__image--active');
  nextCircle.classList.add('circles-nav__item--active');
};

let idCarousel = setInterval(getCarousel, 2000);

const stopSlider = () => {
  clearInterval(idCarousel);
};

const runSlider = () => {
  idCarousel = setInterval(getCarousel, 2000);
};

carouselContent.addEventListener('mouseover', stopSlider);
carouselContent.addEventListener('mouseout', runSlider);
