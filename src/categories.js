const categoryMoviesContainer = document.getElementById('movies-container');
const dropdown = document.querySelector('.dropdown');

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
  params: {
    'api_key': API_KEY,
  },
});

const lazyLoader = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const url = entry.target.getAttribute('data-img');
      entry.target.setAttribute('src', url);
    }
  })
});


function createMoviesContainer(movies, container, category, page) {
  movies.forEach(movie => {

    const box = document.createElement('div');
    box.classList.add('box');

    const boxImg = document.createElement('div');
    boxImg.classList.add('box-img');

    const movieImg = document.createElement('img');
    movieImg.setAttribute('alt', movie.title);


    if (!movie.poster_path) {
      movieImg.setAttribute('data-img', `../images/imagen.png`);
      movieImg.style.objectFit = 'contain';
    } else {
      movieImg.setAttribute('data-img', `https://image.tmdb.org/t/p/w300${movie.poster_path}`); //src
    }


    boxImg.appendChild(movieImg);

    const movieTitle = document.createElement('h3');
    movieTitle.innerText = movie.title;

    const releaseDate = document.createElement('span');
    releaseDate.innerText = movie.release_date;

    lazyLoader.observe(movieImg)

    box.appendChild(boxImg);
    box.appendChild(movieTitle);
    box.appendChild(releaseDate);
    container.appendChild(box)

  });



  const btnLoadMore = document.createElement('button');
  btnLoadMore.innerText = 'Load More...';
  btnLoadMore.classList.add('btn')
  btnLoadMore.addEventListener('click', () => {

    console.log(page)
    btnLoadMore.style.display = 'none'
    return getMoviesByCategory(category, page + 1, false)
  })

  container.appendChild(btnLoadMore)
};



async function getMoviesByCategory(category, page = 1, clean = true) {

  const { data } = await api(`discover/movie?with_genres&`, {
    params: {
      with_genres: category,
      page: page,
    },
  });

  if (clean) {
    categoryMoviesContainer.innerHTML = '';
  }

  const movies = data.results;

  createMoviesContainer(movies, categoryMoviesContainer, category, page);

};


async function getCategories() {

  const { data } = await api('genre/movie/list');

  const categories = data.genres

  const select = dropdown.querySelector('.select');
  const caret = dropdown.querySelector('.caret');
  const menu = dropdown.querySelector('.menu-dropdown');

  const selected = dropdown.querySelector('.selected');

  select.addEventListener('click', () => {
    select.classList.toggle('select-clicked');
    caret.classList.toggle('caret-rotate');
    menu.classList.toggle('menu-dropdown-open');
  })

  categories.forEach(category => {

    const option = document.createElement('span');
    option.innerText = category.name
    menu.appendChild(option)

    // category selection function
    option.addEventListener('click', () => {

      const categorySelected = category.id;

      selected.innerText = option.innerText
      select.classList.remove('select-clicked');
      caret.classList.remove('caret-rotate');
      menu.classList.remove('menu-dropdown-open');

      getMoviesByCategory(categorySelected)
    })


  });


};

getCategories();