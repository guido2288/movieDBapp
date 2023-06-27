const favoritesMoviesContainer = document.getElementById('movies-container');
const popupModal = document.getElementById('popup');
const modalInfoContainer = document.getElementById('popup-info');

//Busca FavMovies
const favouritesMovies = JSON.parse(localStorage.getItem('liked_movies'));
const favouritesMoviesArray = Object.values(favouritesMovies);

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

  localStorage.setItem('liked_movies', JSON.stringify(likedMovies));
  location.reload();
}

// Create movie for Movie Modal
function createMovieInfo(movie) {

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

  favoritesMoviesContainer.classList.toggle('blur')


  closeModalBtn.addEventListener('click', () => {
    popupModal.classList.toggle('active')
    favoritesMoviesContainer.classList.toggle('blur');
    modalInfoContainer.innerHTML = ''
  });

};

function createMoviesContainer(movies) {

  movies.forEach(movie => {

    const box = document.createElement('div');
    box.classList.add('box');

    const boxImg = document.createElement('div');
    boxImg.classList.add('box-img');

    const movieImg = document.createElement('img');
    movieImg.setAttribute('alt', movie.title);


    if (!movie.poster_path) {
      movieImg.setAttribute('src', `../images/imagen.png`);
      movieImg.style.objectFit = 'contain';
    } else {
      movieImg.setAttribute('src', `https://image.tmdb.org/t/p/w300${movie.poster_path}`); //src
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
    box.appendChild(likeBtn)
    favoritesMoviesContainer.appendChild(box);


    boxImg.addEventListener('click', () => {
      return createMovieInfo(movie)
    })
  });

};

createMoviesContainer(favouritesMoviesArray)