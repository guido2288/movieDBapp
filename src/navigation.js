window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);

function navigator() {

  console.log({ location });

  if (location.pathname === '/trends.html') {
    trendsPage();
  } else if (location.pathname === '/search') {
    searchPage();
  } else if (location.pathname === '/details') {
    movieDetailsPage();
  } else if (location.pathname === '/categories') {
    categoriesPage();
  } else {
    homePage();
  }

  console.log(location.pathname)

  location.hash
};

function trendsPage() {

};

function movieDetailsPage() {

};

function categoriesPage() {

};


function homePage() {

}