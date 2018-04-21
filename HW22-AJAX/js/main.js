const allCookies = document.cookie;
const arrCookies = allCookies && allCookies.split(';');

const isAutorized = arrCookies && arrCookies.find((elem) => {
  return elem.includes('authorized');
});

const userEmail = isAutorized && isAutorized.split('=')[1];

if (!userEmail) {
  location.href = './login.html';
} else {
  const wrapper = document.createElement('div');
  const nav = document.createElement('nav');
  const navTitle = document.createElement('h2');
  const navTitleText = document.createTextNode('Navigation');
  const ul = document.createElement('ul');
  const li = document.createElement('li');
  const menuLink = document.createElement('a');
  const menuItemText = document.createTextNode('Profile');

  const logoutBtn = document.createElement('button');
  const logoutBtnText = document.createTextNode('Log out');

  wrapper.classList.add('wrapper');
  nav.classList.add('main-menu');
  ul.classList.add('main-menu__list');
  li.classList.add('main-menu__item');
  menuLink.classList.add('main-menu__link');
  menuLink.setAttribute('href', './profile.html');
  navTitle.classList.add('main-menu__title');
  logoutBtn.classList.add('logout');

  const cross = document.createElement('button');
  cross.classList.add('main-menu__cross');
  nav.appendChild(cross);

  menuLink.appendChild(menuItemText);
  li.appendChild(menuLink);
  ul.appendChild(li);
  navTitle.appendChild(navTitleText);
  nav.appendChild(navTitle);
  nav.appendChild(ul);
  logoutBtn.appendChild(logoutBtnText);
  nav.appendChild(logoutBtn);

  wrapper.appendChild(nav);

  const divContainer = document.createElement('div');
  const header = document.createElement('header');

  const formSearch = document.createElement('form');
  const inputSearch = document.createElement('input');
 
  divContainer.classList.add('container');
  header.classList.add('header');

  divContainer.appendChild(header);

  const mainContent = document.createElement('div');
  mainContent.classList.add('main-content');
  divContainer.appendChild(mainContent);

  const footer = document.createElement('footer');
  const footerItem = document.createElement('p');
  const footerItemText = document.createTextNode('Developer: Antonina Kukhta');

  footer.classList.add('footer');
  footerItem.classList.add('footer__item');

  footerItem.appendChild(footerItemText);
  footer.appendChild(footerItem);
  footer.appendChild(footerItem);
  divContainer.appendChild(footer);

  wrapper.appendChild(divContainer);
  document.body.appendChild(wrapper);

  logoutBtn.addEventListener('click', () => {
    document.cookie = `authorized=; expires=${(new Date(0)).toGMTString()}`;
    location.href = './login.html';
  });
}
