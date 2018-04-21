class NewElement {
  constructor(tagName, className, parentElem, textElem, link) {
    this.tagName = tagName;
    this.className = className;
    this.textElem = textElem;
    this.link = link;
    this.parentElem = parentElem;
    this.element = '';
  }

  createElement() {
    this.element = document.createElement(this.tagName);
    this.element.classList.add(this.className);

    if (this.textElem) {
      const textNode = document.createTextNode(`${this.textElem}`);
      this.element.appendChild(textNode);
    }

    if (this.link) {
      this.element.setAttribute('href', `${this.link}`);
    }

    this.parentElem.appendChild(this.element);
    return this.element;
  }
}

const elemWrap = new NewElement('div', 'wrapper', document.body);
const wrapper = elemWrap.createElement();

const elemNav = new NewElement('nav', 'main-menu', wrapper);
const nav = elemNav.createElement();

const elemNavTitle = new NewElement('h2', 'main-menu__title', nav, 'Navigation');
elemNavTitle.createElement();

const ulObj = new NewElement('ul', 'main-menu__list', nav);
const ul = ulObj.createElement();

const liObj = new NewElement('li', 'main-menu__item', ul);
const li = liObj.createElement();

const objLink = new NewElement('a', 'main-menu__link', li, 'Task2', '#');
objLink.createElement();

const crossBtnObj = new NewElement('button', 'main-menu__cross', nav);
crossBtnObj.createElement();

const containerObj = new NewElement('div', 'container', wrapper);
const divContainer = containerObj.createElement();

const headerObj = new NewElement('header', 'header', divContainer);
const header = headerObj.createElement();

const headerTitleObj = new NewElement('h1', 'header__title', header, 'Header');
headerTitleObj.createElement();

const menuBtnObj = new NewElement('button', 'header__menu-btn', header);
menuBtnObj.createElement();

const mainContentObj = new NewElement('div', 'main-content', divContainer);
const mainContent = mainContentObj.createElement();

const footerObj = new NewElement('footer', 'footer', divContainer);
const footer = footerObj.createElement();

const footerTitleObj = new NewElement('h2', 'footer__title', footer, 'Footer');
footerTitleObj.createElement();

class NewImageItem extends NewElement {
  constructor(tagName, className, parentElem, textElem, link, dataValue) {
    super(tagName, className, parentElem, textElem, link);
    this.dataValue = dataValue;
  }
  createElement() {
    this.element = document.createElement(this.tagName);
    this.element.classList.add(this.className);

    if (this.textElem) {
      this.element.setAttribute('alt', `${this.textElem}`);
    }

    if (this.dataValue) {
      this.element.dataset.slide = `${this.dataValue}`;
    }

    if (this.link) {
      this.element.setAttribute('src', `${this.link}`);
    }

    this.parentElem.appendChild(this.element);
    return this.element;
  }
}

for (let i = 0; i < 2; i++) {
  const carouselObj = new NewElement('div', 'carousel', mainContent);
  const carousel = carouselObj.createElement();

  const carouselContainerObj = new NewElement('div', 'carousel__content', carousel);
  const carouselContainer = carouselContainerObj.createElement();

  const circlesNavObj = new NewElement('div', 'circles-nav', carousel);
  const circlesNav = circlesNavObj.createElement();

  const nameImages = ['mountains.jpg', 'hedgehog.jpg', 'lion.jpg', 'nature.jpg', 'bridge.jpg'];

  for (let i = 0; i < nameImages.length; i++) {
    const alt = `slide1${i}`;
    const src = `./img/${nameImages[i]}`;
    const dataValue = `${i + 1}`;

    const dataImage = ['img', 'carousel__image', carouselContainer, alt, src, dataValue];
    const imgObj = new NewImageItem(...dataImage);
    imgObj.createElement();

    const dataCircle = ['a', 'circles-nav__item', circlesNav, '', '#', dataValue];
    const circlesItemObj = new NewImageItem(...dataCircle);
    const circlesNavItem = circlesItemObj.createElement();

    if (i === 0) {
      circlesNavItem.classList.add('circles-nav__item--active');
    }
  }

  const imgItem1 = carouselContainer.firstChild;

  const cloneLastImg = carouselContainer.lastChild.cloneNode(true);
  const cloneFirstImg = carouselContainer.firstChild.cloneNode(true);
  imgItem1.parentNode.insertBefore(cloneLastImg, imgItem1);
  carouselContainer.appendChild(cloneFirstImg);

  const firstCircleElem = carousel.querySelector('.circles-nav').firstChild;
  firstCircleElem.classList.add('circles-nav__item--active');
}
