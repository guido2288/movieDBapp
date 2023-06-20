const movieContainer = document.getElementById('movies-container');
const searchForm = document.getElementById('search-form');
const searchBox = document.getElementById('search-box');


const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
  params: {
    'api_key': API_KEY,
  },
});


searchForm.addEventListener('submit', (e) => {
  e.preventDefault()
  getMoviesBySearch(searchBox.value)
})

function createMoviesContainer(movies, container) {
  movies.forEach(movie => {

    const box = document.createElement('div');
    box.classList.add('box');

    const boxImg = document.createElement('div');
    boxImg.classList.add('box-img');

    const movieImg = document.createElement('img');
    movieImg.setAttribute('alt', movie.title);

    if (window.innerWidth < 770) {
      movieImg.setAttribute('src', `https://image.tmdb.org/t/p/w300${movie.poster_path}`);
    } else {
      movieImg.setAttribute('src', `https://image.tmdb.org/t/p/w300${movie.poster_path}`);
    }

    boxImg.appendChild(movieImg);

    const movieTitle = document.createElement('h3');
    movieTitle.innerText = movie.title;

    const releaseDate = document.createElement('span');
    releaseDate.innerText = movie.release_date;

    box.appendChild(boxImg);
    box.appendChild(movieTitle);
    box.appendChild(releaseDate);
    container.appendChild(box)

  });
}

async function getMoviesBySearch(query) {

  const { data } = await api(`/search/movie?query=${query}`, {
    params: {
      query,
    },
  });

  movieContainer.innerHTML = ''

  const movies = data.results;


  createMoviesContainer(movies, movieContainer);

};
