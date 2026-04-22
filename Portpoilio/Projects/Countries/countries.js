const globalCountries = [];
let favoriteCountries = [];
const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
favoriteCountries.push(...savedFavorites);
const sortButtons = document.querySelectorAll(".sortBtn");
const darkBtn = document.getElementById("darkModeBtn")

darkBtn.addEventListener("click", ()=>{
  document.body.classList.toggle("dark-mode")
    const isDark = document.body.classList.contains("dark-mode")
  darkBtn.innerText = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";
  
  localStorage.setItem("darkMode" , isDark)
})
const savedMode = localStorage.getItem("darkMode") 
if (savedMode === "true"){
   document.body.classList.add("dark-mode");
  darkBtn.innerText = "☀️ Light Mode";
} else {
  darkBtn.innerText = "🌙 Dark Mode";
}



async function getCountries() {
  try {
    const result = await fetch(
      "https://restcountries.com/v3.1/all?fields=name,capital,currencies,flags,region,population,languages",
    );
    const countries = await result.json();
    console.log(countries);

    //print for the first country the:
    countries.forEach((country) => {
      const currencyValue = Object.values(country.currencies)[0];
      const normalizeCountry = {
        name: country.name.common,
        capital: country.capital[0],
        currency: currencyValue?.name,
        flag: country.flags.png,
        region: country.region,
        population: country.population,
        languages: Object.values(country?.languages|| {}).join(", ")  
         };


    
      
      printCountry(normalizeCountry);
      globalCountries.push(normalizeCountry);
    });
  } catch (error) {
    console.log(error);
  }
}

function printCountry({ name, capital, currency, flag, region, population, languages }) {
  const card = document.createElement("div")
  card.className = "country-card"

  card.innerHTML = `
  <span class="fav-btn">⭐</span>
  <img src = "${flag}" />
  <h2>${name}</h2>
  <p>Capital: ${capital}</p>
  <p>Currency: ${currency}</p>
  <p>Region: ${region}</p>
  <p>Poplation: ${population}</p>
  <p>Languages: ${languages}</p>
  `;
const favBtn = card.querySelector(".fav-btn");
const isFavorite = favoriteCountries.some((c)=> c.name === name)
if (isFavorite) {
  favBtn.classList.add("active");
}

favBtn.addEventListener("click", () => {
  const exists = favoriteCountries.some((c) => c.name === name);

  if (!exists) {
    favoriteCountries.push({ name, capital, currency, flag, region, population, languages });
    favBtn.classList.add("active");
  } else {
    favoriteCountries = favoriteCountries.filter((c) => c.name !== name);
    favBtn.classList.remove("active");
  }

  localStorage.setItem("favorites", JSON.stringify(favoriteCountries));
});
  const container = document.getElementById("countriesContainer");
  container.appendChild(card);

}

function searchCountry() {
  const searchQuery = document
    .getElementById("searchInput")
    .value.toLowerCase();

  const filteredCountries = globalCountries.filter(
    (country) =>
      country.name?.toLowerCase()?.includes(searchQuery) ||
      country.capital?.toLowerCase()?.includes(searchQuery),
  );
const container = document.getElementById("countriesContainer");
container.innerHTML = "";
filteredCountries.forEach((c) => printCountry(c));
}

getCountries();

const searchButton = document.getElementById("searchButton");
searchButton.addEventListener("click", searchCountry);

//////

const regionFilter = document.querySelectorAll(".regionFilter")

regionFilter.forEach((btn)=>{
btn.addEventListener("click", () => {
  document.querySelectorAll(".sidebar button")
  .forEach(b => b.classList.remove("active"));

  const selectedRegion = btn.innerText.trim();

  const container = document.getElementById("countriesContainer");
  container.innerHTML = "";

  regionFilter.forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");

  if (selectedRegion === "All") {
    globalCountries.forEach((c) => printCountry(c));
    return;
  }

  const filterred = globalCountries.filter(
    (country) => country.region === selectedRegion
  );

  filterred.forEach((c) => printCountry(c));
});
})


const resetBtn = document.getElementById("resetBtn")

resetBtn.addEventListener("click", ()=>{
   const container = document.getElementById("countriesContainer");
  container.innerHTML = "";
  globalCountries.forEach((c)=> printCountry(c))
  document.getElementById("searchInput").value = ""
  regionFilter.forEach((b)=> b.classList.remove("active"))
})


const favoriteBtn = document.getElementById("favoritesBtn");
console.log("favoriteBtn:", favoriteBtn);

favoriteBtn.addEventListener("click", () => {
  console.log("favorites clicked");
  const container = document.getElementById("countriesContainer");
  container.innerHTML = "";

  favoriteCountries.forEach((c) => printCountry(c));
});

sortAZ.addEventListener("click", () => {
  document.querySelectorAll(".sidebar button")
    .forEach(b => b.classList.remove("active"));

  sortAZ.classList.add("active");

  const sorted = [...globalCountries].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  const container = document.getElementById("countriesContainer");
  container.innerHTML = "";
  sorted.forEach(c => printCountry(c));
});

const sortPopAsc = document.getElementById("sortPopAsc");

sortPopAsc.addEventListener("click", () => {
  document.querySelectorAll(".sidebar button")
    .forEach(b => b.classList.remove("active"));

  sortPopAsc.classList.add("active"); // לא sortAZ!

  const sorted = [...globalCountries].sort(
    (a, b) => a.population - b.population
  );

  const container = document.getElementById("countriesContainer");
  container.innerHTML = "";
  sorted.forEach(c => printCountry(c));
});

const sortPopDesc = document.getElementById("sortPopDesc")
sortPopDesc.addEventListener("click", () => {
  document.querySelectorAll(".sidebar button")
    .forEach(b => b.classList.remove("active"));

  sortPopDesc.classList.add("active"); 

  const sorted = [...globalCountries].sort(
    (a, b) => b.population - a.population
  );

  const container = document.getElementById("countriesContainer");
  container.innerHTML = "";
  sorted.forEach(c => printCountry(c));
});

favoriteBtn.addEventListener("click", () => {


  document.querySelectorAll(".sidebar button")
    .forEach(b => b.classList.remove("active"));


  favoriteBtn.classList.add("active");

  const container = document.getElementById("countriesContainer");
  container.innerHTML = "";

  favoriteCountries.forEach(c => printCountry(c));
});