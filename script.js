const API_URL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCH_API =
  'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="';

const form = document.getElementById("form");
const search = document.getElementById("search");
const main = document.getElementById("main");
const reloadPage = document.getElementById("reload");
const nextBtn = document.getElementById("btn");
const prevBtn = document.getElementById("prevBtn");
// fetch
var pageNumber = 1;
getMovies(API_URL);
//
nextBtn.addEventListener("click", () => {
  pageNumber++;
  const stringeksde = pageNumber.toString();
  const URLeksde = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=${stringeksde}`;
  getMovies(URLeksde);
  window.scroll(0, 0);
});
prevBtn.addEventListener("click", () => {
  pageNumber--;
  if (pageNumber < 2) {
    pageNumber = 1;
  }
  const stringeksde = pageNumber.toString();
  const URLeksde = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=${stringeksde}`;
  getMovies(URLeksde);
});
async function getMovies(url) {
  const res = await fetch(url);
  const data = await res.json();
  showMovies(data.results);
}
//
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = search.value;
  if (searchTerm && searchTerm !== "") {
    getMovies(SEARCH_API + searchTerm);
    search.value = "";
  } else {
    window.location.reload();
  }
});
//
function showMovies(movies) {
  main.innerHTML = "";
  movies.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;
    const movieEL = document.createElement("div");
    movieEL.classList.add("movie");
    movieEL.innerHTML = `<img
    src="${IMG_PATH + poster_path}"
    alt="${title}"
  />
  <div class="movie-info">
    <h3>${title}</h3>
    <span class="${getRate(vote_average)}">${vote_average}</span>
  </div>
  <div class="overview">
    <h3>Overview</h3>
    ${overview}
  </div>
`;
    const xd = title;
    main.appendChild(movieEL);
    movieEL.addEventListener("click", () => {
      //window.open("http://google.com/search?q=" + xd);
      //window.open("https://www.imdb.com/find?q=" + xd);
      window.open("https://pahe.li/?s=" + xd);
    });
  });
}
function getRate(rate) {
  if (rate >= 8) {
    return "green";
  } else if (rate >= 5) {
    return "orange";
  } else {
    return "red";
  }
}
reloadPage.addEventListener("click", () => {
  window.location.reload();
});
