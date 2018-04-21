function HideStepwise(url) {
  this.url = url;
  this.moviesData = [];
  this.titles = [];
  this.description = [];
  this.containers = [];
  this.images = [];
  this.movies = [];
  this.loader = null;
}

HideStepwise.prototype.getDataFromServer = function () {
  return fetch(this.url).then((res) => {
    if (res.status === 200) {
      return res.json();
    } else {
      throw new Error('Network response was failed.');
    }
  })
    .then((res) => {
      this.moviesData = res.results;
      this.render();
    })
    .then(() => {
      return new Promise((resolve) => {
        setTimeout(() => {
          this.loader.style.width = '0';
          this.loader.addEventListener('transitionend', () => {
            resolve('success');
          });
        }, 2000);
      });
    })
    .catch((error) => {
      this.renderError(error.message);
    });
};

HideStepwise.prototype.render = function () {
  const {moviesData} = this;

  const wrapper = document.createElement('div');
  const loader = document.createElement('div');
  const loaderItem = document.createElement('div');

  wrapper.classList.add('container');
  loader.classList.add('loader');
  loaderItem.classList.add('loader__item');

  this.loader = loaderItem;

  loader.appendChild(loaderItem);
  wrapper.appendChild(loader);

  const fragment = document.createDocumentFragment();

  moviesData.forEach((element) => {
    const movieBlock = document.createElement('article');
    const movieWrap = document.createElement('div');
    const movieTitle = document.createElement('h2');
    const movieImg = document.createElement('img');
    const movieDescription = document.createElement('p');
    const titleText = document.createTextNode(`${element.title}`);
    const descriptionText = document.createTextNode(`${element.overview}`);

    movieBlock.classList.add('movie');
    movieWrap.classList.add('movie__container');
    movieImg.classList.add('movie__image');
    movieTitle.classList.add('movie__title');
    movieDescription.classList.add('movie__description');
    movieImg.src = `https://image.tmdb.org/t/p/w185_and_h278_bestv2${element.poster_path}`;

    this.titles = [...this.titles, movieTitle];
    this.containers = [...this.containers, movieWrap];
    this.description = [...this.description, movieDescription];
    this.images = [...this.images, movieImg];
    this.movies = [...this.movies, movieBlock];

    movieDescription.appendChild(descriptionText);
    movieTitle.appendChild(titleText);
    movieWrap.appendChild(movieImg);
    movieWrap.appendChild(movieDescription);
    movieBlock.appendChild(movieTitle);
    movieBlock.appendChild(movieWrap);
    fragment.appendChild(movieBlock);
  });

  wrapper.appendChild(fragment);
  document.body.appendChild(wrapper);
};

HideStepwise.prototype.renderError = function (message) {
  const error = document.createElement('p');
  error.classList.add('error');
  const errorText = document.createTextNode(`${message}`);

  error.appendChild(errorText);
  document.body.appendChild(error);
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

HideStepwise.prototype.hideFirstArticle = function () {
  return new Promise((resolve) => {
    setTimeout(() => {
      const image = this.movies[0] && this.movies[0].querySelector('.movie__image');

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
  this.getDataFromServer()
    .then(() => {
      this.hideFirstArticle(this.movies);
    });
};

function HideAll(url) {
  HideStepwise.apply(this, arguments);
}

HideAll.prototype = Object.create(HideStepwise.prototype);
HideAll.prototype.constructor = HideAll;

HideAll.prototype.hideArticlesAtOnce = function () {
  this.getDataFromServer()

    .then(() => {
      this.images.forEach((element, index) => {
        this.hideImage(element, index);
      });

      return new Promise((resolve) => {
        setTimeout(() => {
          resolve('success');
        }, 1000);
      });
    })

    .then(() => {
      this.description.forEach((element, index) => {
        this.hideDescription(index);
      });

      return new Promise((resolve) => {
        setTimeout(() => {
          resolve('success');
        }, 1000);
      });
    })

    .then(() => {
      setTimeout(() => {
        this.movies.forEach((element, index) => {
          this.hideArticle(index);
        });
      }, 1000);
    });
};

const api = '3492dc12ac3993b2c8fad3768fad8924';
const url = `https://api.themoviedb.org/3/search/movie?api_key=${api}&query=home`;

/* method1 - hiding of articles step by step: */
const obj1 = new HideStepwise(url);
obj1.hideElementsStepwise();

/* method2 - simultaneous hiding of articles: */
/* const obj2 = new HideAll(url);
obj2.hideArticlesAtOnce(); */
