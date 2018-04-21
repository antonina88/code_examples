class Carousel {
  constructor(currSlidePosition, startAmountImg, carouselContainer, carousel) {
    this.currSlidePosition = currSlidePosition;
    this.startAmountImg = startAmountImg;
    this.carouselContainer = carouselContainer;
    this.carousel = carousel;
    this.prevCircle1 = null;
    this.nextCircle1 = null;
    this.circlesNav = null;

    this.getNextSlide = this.getNextSlide.bind(this);
  }

  getNextSlide() {
    const circlesBlock = this.carousel.querySelector('.circles-nav');
    this.prevCircle1 = circlesBlock.querySelector('.circles-nav__item--active');
    this.prevCircle1 && this.prevCircle1.classList.remove('circles-nav__item--active');
    this.carouselContainer.classList.remove('carousel__content--stopTransition');

    if (this.currSlidePosition < this.startAmountImg) {
      this.currSlidePosition += 1;
      this.carouselContainer.style.transform = `translateX(-${this.currSlidePosition * 700}px)`;

      const nextCircleSelector = `.circles-nav__item:nth-child(${this.currSlidePosition})`;
      this.nextCircle1 = circlesBlock.querySelector(`${nextCircleSelector}`);
      this.nextCircle1.classList.add('circles-nav__item--active');
    }

    this.carouselContainer.addEventListener('transitionend', () => {
      if (this.currSlidePosition >= this.startAmountImg) {
        this.carouselContainer.style.transform = 'translateX(0)';
        this.carouselContainer.classList.add('carousel__content--stopTransition');
        this.currSlidePosition = 0;
      }
    });
  }
}

class DifferentCarousel extends Carousel {
  constructor(currSlidePosition, startAmountImg, carouselContainer, carousel) {
    super(currSlidePosition, startAmountImg, carouselContainer, carousel);
    this.maxLength = this.startAmountImg + 1;

    this.selectSlide = this.selectSlide.bind(this);
    this.getPrevSlide = this.getPrevSlide.bind(this);
  }

  selectSlide(event) {
    const dataValue = event.target.dataset.slide;
    this.currSlidePosition = dataValue - 1;

    this.carouselContainer.style.transform = `translateX(-${dataValue * 700}px)`;
    const circlesBlock = this.carousel.querySelector('.circles-nav');
    const prevCircle2 = circlesBlock.querySelector('.circles-nav__item--active');
    prevCircle2 && prevCircle2.classList.remove('circles-nav__item--active');
    event.target.classList.add('circles-nav__item--active');
  }

  getPrevSlide() {
    const circlesBlock = this.carousel.querySelector('.circles-nav');
    const prevCircle2 = circlesBlock.querySelector('.circles-nav__item--active');
    prevCircle2 && prevCircle2.classList.remove('circles-nav__item--active');

    this.carouselContainer.classList.remove('carousel__content--stopTransition');

    if (this.maxLength > 0) {
      this.maxLength = this.maxLength - 1;
      this.carouselContainer.style.transform = `translateX(-${this.maxLength * 700}px)`;
    }

    if (this.maxLength === this.startAmountImg) {
      this.carouselContainer.classList.add('carousel__content--stopTransition');
    }

    const nextCircle2 = (this.maxLength === 0 || this.maxLength === this.startAmountImg)
      ? circlesBlock.querySelector(`.circles-nav__item:nth-child(${this.startAmountImg})`)
      : circlesBlock.querySelector(`.circles-nav__item:nth-child(${this.maxLength})`);

    nextCircle2.classList.add('circles-nav__item--active');

    this.carouselContainer.addEventListener('transitionend', () => {
      if (this.maxLength <= 0) {
        this.maxLength = this.carouselContainer.children.length - 1;
        this.carouselContainer.style.transform = 'translateX(0px)';
        this.carouselContainer.classList.add('carousel__content--stopTransition');
      }
    });

    circlesBlock.addEventListener('click', this.selectSlide);
  }
}

const carousel = document.querySelectorAll('.carousel');
const carouselContainer = document.querySelectorAll('.carousel__content');

const startAmountImg1 = carouselContainer[0].children.length - 2;
const startAmountImg2 = carouselContainer[1].children.length - 2;

const carouselObj1 = new Carousel(0, startAmountImg1, carouselContainer[0], carousel[0]);
const carouselObj2 = new DifferentCarousel(0, startAmountImg2, carouselContainer[1], carousel[1]);

const getCarousel1 = carouselObj1.getNextSlide;
setInterval(getCarousel1, 2000);

const getCarouselPrev2 = carouselObj2.getPrevSlide;
const getCarouselNext2 = carouselObj2.getNextSlide;
let idCarousel2 = setInterval(getCarouselPrev2, 2000);

let startX;

function changePosition(event) {
  const {clientX: currentX} = event;
  clearInterval(idCarousel2);
  const offsetLeftValue = event.target.offsetLeft;

  carouselContainer[1].classList.remove('carousel__content--stopTransition');

  if (startX >= currentX && offsetLeftValue > 3500) {
    carouselContainer[1].style.transform = 'translateX(-700px)';
    carouselContainer[1].classList.add('carousel__content--stopTransition');
  } else if (startX >= currentX && offsetLeftValue <= 3500) {
    carouselContainer[1].style.transform = `translateX(-${offsetLeftValue + 700}px)`;
  } else if (startX < currentX && offsetLeftValue > 0) {
    carouselContainer[1].style.transform = `translateX(-${offsetLeftValue - 700}px)`;
  } else if (startX < currentX && offsetLeftValue <= 0) {
    carouselContainer[1].style.transform = 'translateX(-3500px)';
    carouselContainer[1].classList.add('carousel__content--stopTransition');
  }

  idCarousel2 = (startX >= currentX)
    ? setInterval(getCarouselNext2, 2000)
    : setInterval(getCarouselPrev2, 2000);
}

carouselContainer[1].addEventListener('mousedown', function (event) {
  startX = event.clientX;
  carouselContainer[1].addEventListener('mousemove', changePosition);

  carouselContainer[1].addEventListener('mouseout', () => {
    carouselContainer[1].removeEventListener('mousemove', changePosition);
  });
});
