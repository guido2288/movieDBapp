const trendingMoviesContainer = document.getElementById('swiper-wrapper');
const upcomingMoviesContainer = document.getElementById('movies-container');

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
  params: {
    'api_key': API_KEY,
  },
});

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
    btnSeeMore.innerText = "See More";



    trendingMovie.appendChild(trendingMovieImg);
    trendingMovie.appendChild(homeTextContainer);
    homeTextContainer.appendChild(movieTitle);
    homeTextContainer.appendChild(movieOverview);
    homeTextContainer.appendChild(btnSeeMore);


    trendingMoviesContainer.appendChild(trendingMovie);
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

    box.appendChild(boxImg);
    box.appendChild(movieTitle);
    box.appendChild(releaseDate);
    upcomingMoviesContainer.appendChild(box)

  })

};

getTrendingMoviesPreview()
getUpcoming()