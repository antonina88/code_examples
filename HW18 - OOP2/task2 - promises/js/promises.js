function HideStepwise(loader, movies, images, containers, description) {
  this.loader = loader;
  this.movies = movies;
  this.images = images;
  this.containers = containers;
  this.description = description;
}

HideStepwise.prototype.timer = function () {
  return new Promise((resolve) => {
    setTimeout(() => {
      this.loader.style.width = '0';
      this.loader.addEventListener('transitionend', () => {
        resolve('success');
      });
    }, 1000);
  });
};

HideStepwise.prototype.hideImage = function (element, index) {
  element.style.width = '0';
  element.style.height = '0';
  element.style.padding = '0';
  this.movies[index].style.height = '120px';

  element.addEventListener('transitionend', function (event) {
    event.target && event.target.parentNode
      && event.target.parentNode.removeChild(event.target);
  });
};

HideStepwise.prototype.hideDescription = function (index) {
  this.containers[index].style.height = '0';
  this.description[index].style.height = '8px';
  this.movies[index].style.height = '8px';
};

HideStepwise.prototype.hideArticle = function (index) {
  this.movies[index].style.height = '0';
  this.movies[index].style.padding = '0';

  this.movies[index].addEventListener('transitionend', function (event) {
    event.target && event.target.parentNode && event.target.parentNode.removeChild(event.target);
  });
};

HideStepwise.prototype.hideFirstArticle = function (array) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const image = array[0] && array[0].querySelector('.movie__image');

      this.hideImage(image, 0);
      resolve(this.movies);
    }, 2000);
  })
    .then((array) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          this.hideDescription(0);
          resolve(array);
        }, 2000);
      });
    })
    .then((array) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(array);
        }, 2000);
      })
        .then((array) => {
          this.hideArticle(0);

          return new Promise((resolve) => {
            setTimeout(() => {
              resolve(array);
            }, 2000);
          });
        })
        .then((array) => {
          this.movies = array.slice(1);
          if (this.movies.length > 0) {
            this.hideFirstArticle(this.movies);
          }
        });
    });
};

HideStepwise.prototype.hideElementsStepwise = function () {
  this.timer()
    .then(() => {
      this.hideFirstArticle(this.movies);
    });
};

function HideAll(loader, movies, images, containers, description) {
  HideStepwise.apply(this, arguments);
}

HideAll.prototype = Object.create(HideStepwise.prototype);
HideAll.prototype.constructor = HideAll;

HideAll.prototype.hideArticlesAtOnce = function () {
  this.timer()
    .then(() => {
      this.images.forEach((element, index) => {
        this.hideImage(element, index);
      });

      return new Promise((resolve) => {
        setTimeout(() => {
          resolve('success');
        }, 2000);
      });
    })

    .then(() => {
      this.description.forEach((element, index) => {
        this.hideDescription(index);
      });

      return new Promise((resolve) => {
        setTimeout(() => {
          resolve('success');
        }, 2000);
      });
    })

    .then(() => {
      this.movies.forEach((element, index) => {
        this.hideArticle(index);
      });
    });
};

const loaderElem = document.querySelectorAll('.loader__item');
const wrappItem = document.querySelectorAll('.wrapper__item');

const movies1 = Array.from(wrappItem[0].querySelectorAll('.movie'));
const movies2 = Array.from(wrappItem[1].querySelectorAll('.movie'));

const description1 = Array.from(wrappItem[0].querySelectorAll('.movie__description'));
const description2 = Array.from(wrappItem[1].querySelectorAll('.movie__description'));

const containers1 = Array.from(wrappItem[0].querySelectorAll('.movie__container'));
const containers2 = Array.from(wrappItem[1].querySelectorAll('.movie__container'));

const images1 = Array.from(wrappItem[0].querySelectorAll('.movie__image'));
const images2 = Array.from(wrappItem[1].querySelectorAll('.movie__image'));

/* method1 - hiding of articles step by step: */
const obj1 = new HideStepwise(loaderElem[0], movies1, images1, containers1, description1);
obj1.hideElementsStepwise();

/* method2 - parallel hiding of articles */
const obj2 = new HideAll(loaderElem[1], movies2, images2, containers2, description2);
obj2.hideArticlesAtOnce();
