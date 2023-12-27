const root = document.querySelector(".row");
const search = document.querySelector(".search");
const votesort = document.querySelector(".votesort");
const url = "https://api.themoviedb.org/3/discover/tv";
const imgSource = "https://image.tmdb.org/t/p/original/";
let base = [];

const options = {
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZDdhMWU1MWU3MTE4ZTgyNGQ2NzMzOWZmZWFjZTI2MiIsInN1YiI6IjY1MDEzNDRjZDdkY2QyMDBlMmZkNTA0NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.h3KHEvS_zj3QyxxIJkm5BvEymyvrLEgOYOph7gJha_o",
  },
};

fetch(url, options)
  .then((res) => res.json())
  .then((data) => {
    base = [...data.results];
    console.log(data);
    return renderData(data.results);
  })
  .catch((err) => console.log(err));

const renderData = (data) => {
  root.textContent = "";
  const fragment = document.createDocumentFragment();

  data.forEach((element) => {
    votesort.addEventListener("click", () => {
      const sort_product = (option) => {
        base.sort((a, b) => {
          if (option === "asc") {
            return a.vote_average - b.vote_average;
          } else if (option === "desc") {
            return b.vote_average - a.vote_average;
          }
        });
      };

      sort_product("desc");
      renderData(base);
    });

    const card = document.createElement("div");
    console.log(element);
    card.className = "card";
    card.innerHTML = `
    <img class='card-img' src=${imgSource + element.poster_path} alt=${
      element.name
    }>
    <div class='card-body'>
    <div class = 'vote'>
    <b class='vote_average'> ${element.vote_average}</b>
    <b class='vote_average'>${element.vote_count}</b>
    </div>
    <h3 class = 'card-title'>${element.name}</h3>
    <p class='card-text'>${element.overview.slice(0, 50)}</p>
    </div>
    `;
    fragment.appendChild(card);
  });
  root.appendChild(fragment);
};

search.addEventListener("input", () => {
  let serchFun = base.filter(
    (element) =>
      element.name.toLowerCase().includes(search.value.toLowerCase()) ||
      element.overview.toLowerCase().includes(search.value.toLowerCase())
  );
  console.log(serchFun);
  renderData(serchFun);
});
