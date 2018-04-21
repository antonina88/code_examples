function Element(tagName, className, parentElem) {
  this.tagName = tagName;
  this.className = className;
  this.parentElem = parentElem;
  this.element = '';
}

Element.prototype.createElement = function () {
  this.element = document.createElement(this.tagName);
  this.element.classList.add(this.className);
  this.parentElem.appendChild(this.element);
  return this.element;
};

function TextElement(tagName, className, parentElem, textElem) {
  Element.apply(this, arguments);
  this.textElem = textElem;
}

function Image(tagName, className, parentElem, altText, link) {
  Element.apply(this, arguments);
  this.altText = altText;
  this.link = link;
}

TextElement.prototype = Object.create(Element.prototype);
Image.prototype = Object.create(Element.prototype);

TextElement.prototype.constructor = TextElement;
Image.prototype.constructor = Image;

TextElement.prototype.addText = function () {
  const textNode = document.createTextNode(`${this.textElem}`);
  this.element.appendChild(textNode);
};

Image.prototype.addAtributes = function () {
  this.element.setAttribute('alt', `${this.altText}`);
  this.element.setAttribute('src', `${this.link}`);
  return this;
};

function Content(nameImages = [], titles = [], text = '') {
  this.nameImages = nameImages;
  this.titles = titles;
  this.text = text;
}

Content.prototype.render = function (amountWrap) {
  const elemWrap = new Element('div', 'wrapper', document.body);
  const wrapper = elemWrap.createElement();

  for (let i = 0; i < amountWrap; i++) {
    const elemWrap = new Element('div', 'wrapper__item', wrapper);
    const wrapperItem = elemWrap.createElement();

    const elemLoader = new Element('div', 'loader', wrapperItem);
    const loader = elemLoader.createElement();

    const elemLoaderItem = new Element('div', 'loader__item', loader);
    elemLoaderItem.createElement();

    const fragment = document.createDocumentFragment();

    for (let j = 0; j < this.nameImages.length; j++) {
      const elemArticle = new Element('article', 'movie', fragment);
      const article = elemArticle.createElement();

      const titleObj = new TextElement('h2', 'movie__title', article, `${this.titles[j]}`);
      titleObj.createElement();
      titleObj.addText();

      const containerObj = new Element('div', 'movie__container', article);
      const movieContainer = containerObj.createElement();

      const imgSrc = `./img/${this.nameImages[j]}.jpg`;
      const altImg = `${this.nameImages[j]}`;

      const imgObj = new Image('img', 'movie__image', movieContainer, altImg, imgSrc);
      imgObj.createElement();
      imgObj.addAtributes();

      const descriptionObj = new TextElement('p', 'movie__description', movieContainer, this.text);
      descriptionObj.createElement();
      descriptionObj.addText();
    }

    wrapperItem.appendChild(fragment);
    wrapper.appendChild(wrapperItem);
  }
};

const nameImages = ['home-alone', 'moana', 'pirates', 'home-alone'];
const titles = ['Home alone', 'Moana', 'Pirates of the Caribbean', 'Header4'];
const text = `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos laborum ratione unde, 
          provident facilis veniam amet doloribus suscipit aliquid esse ad natus repudiandae dolorum
          animi consequuntur cumque at dicta officia quas rerum itaque eos voluptates molestias.`;

const wrappObj = new Content(nameImages, titles, text);
wrappObj.render(2);
