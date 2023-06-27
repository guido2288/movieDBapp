const trendingMoviesContainer = document.getElementById('swiper-wrapper');
const upcomingMoviesContainer = document.getElementById('movies-container');
const popupModal = document.getElementById('popup');
const modalInfoContainer = document.getElementById('popup-info');

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
  params: {
    'api_key': API_KEY,
    "language": navigator.language
  },
});

// Local Storage
const favouritesMovies = JSON.parse(localStorage.getItem('liked_movies'));
// devuelve el array de pelis fav
function likedMovieList() {

  let movies;

  if (favouritesMovies) {
    movies = favouritesMovies;
  } else {
    movies = {};
  };

  return movies;
};

function likeMovie(movie) {

  const likedMovies = likedMovieList();

  if (likedMovies[movie.id]) {
    likedMovies[movie.id] = undefined;
  } else {
    likedMovies[movie.id] = movie;
  }

  localStorage.setItem('liked_movies', JSON.stringify(likedMovies))
}


// Create movie for Movie Modal
async function createMovieInfo(id) {

  const { data } = await api(`movie/${id}`)

  const movie = data;

  popupModal.classList.toggle('active');

  const movieImgModal = document.createElement('img');

  movieImgModal.setAttribute('src', `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`);
  movieImgModal.setAttribute('alt', movie.title);

  const movieTitle = document.createElement('h3');
  movieTitle.innerText = movie.title;

  const movieDate = document.createElement('span');
  movieDate.innerText = movie.release_date;

  const movieInfo = document.createElement('p');
  movieInfo.innerText = movie.overview;

  const genresContainer = document.createElement('ul');
  genresContainer.className = 'popup-genres';

  const closeModalBtn = document.createElement('i');
  closeModalBtn.className = 'bx bx-x';


  modalInfoContainer.appendChild(movieImgModal)
  modalInfoContainer.appendChild(movieTitle);
  modalInfoContainer.appendChild(closeModalBtn);
  modalInfoContainer.appendChild(movieDate);
  modalInfoContainer.appendChild(movieInfo);
  modalInfoContainer.appendChild(genresContainer);

  movie.genres.forEach(genre => {
    const genreItem = document.createElement('li');
    genreItem.innerText = genre.name;
    genreItem.className = 'btn'

    genresContainer.appendChild(genreItem)
  });

  upcomingMoviesContainer.classList.toggle('blur')
  trendingMoviesContainer.classList.toggle('blur')

  closeModalBtn.addEventListener('click', () => {
    popupModal.classList.toggle('active')
    upcomingMoviesContainer.classList.toggle('blur');
    trendingMoviesContainer.classList.toggle('blur');
    modalInfoContainer.innerHTML = ''
  });

};


async function getTrendingMoviesPreview() {
  const { data } = await api('trending/movie/week?');

  const trendingMovies = data.results.slice(0, 3);

  trendingMovies.forEach(movie => {

    const trendingMovie = document.createElement('div');
    trendingMovie.classList.add('swiper-slide');
    trendingMovie.classList.add('container');

    const trendingMovieImg = document.createElement('img');
    trendingMovieImg.setAttribute('alt', movie.title);


    if (window.innerWidth < 770) {
      trendingMovieImg.setAttribute('src', `https://image.tmdb.org/t/p/w1280${movie.poster_path}`);
    } else {
      trendingMovieImg.setAttribute('src', `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`);
    }


    const homeTextContainer = document.createElement('div');
    homeTextContainer.classList.add('home-text');

    const movieTitle = document.createElement('h1');
    movieTitle.innerText = movie.title;

    const movieOverview = document.createElement('p');
    movieOverview.innerText = `${movie.overview.split(' ').slice(0, 15).join(' ')} ...`;

    const btnSeeMore = document.createElement('a');
    btnSeeMore.classList.add('btn')
    btnSeeMore.setAttribute('href', '#')
    btnSeeMore.innerText = "Ver más...";



    trendingMovie.appendChild(trendingMovieImg);
    trendingMovie.appendChild(homeTextContainer);
    homeTextContainer.appendChild(movieTitle);
    homeTextContainer.appendChild(movieOverview);
    homeTextContainer.appendChild(btnSeeMore);


    trendingMoviesContainer.appendChild(trendingMovie);

    btnSeeMore.addEventListener('click', () => {
      return createMovieInfo(movie.id)
    })


  });

};

async function getUpcoming() {

  const { data } = await api('movie/upcoming?');

  const movies = data.results.slice(0, 10)

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

    const likeBtn = document.createElement('i');
    //bx bx-heart and bx bxs-heart
    if (likedMovieList()[movie.id]) {
      likeBtn.className = 'bx bxs-heart';
    } else {
      likeBtn.className = 'bx bx-heart';
    }

    likeBtn.addEventListener('click', () => {

      likeBtn.className === 'bx bx-heart' ? likeBtn.className = 'bx bxs-heart' : likeBtn.className = 'bx bx-heart'
      likeMovie(movie);
    });

    box.appendChild(boxImg);
    box.appendChild(movieTitle);
    box.appendChild(releaseDate);
    box.appendChild(likeBtn);
    upcomingMoviesContainer.appendChild(box);

    boxImg.addEventListener('click', () => {
      return createMovieInfo(movie.id)
    })

  })

};

getTrendingMoviesPreview()
getUpcoming()