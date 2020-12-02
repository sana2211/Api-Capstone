'use strict';
const searchForm = document.querySelector("form");
const searchResultDiv = document.querySelector(".search-result");
const container = document.querySelector(".container");
let searchQuery = "";

const APP_ID = "edf43538";
const APP_key = "b9d880839cff9a41cc52c69b73ebba03"
// console.log(container)
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  searchQuery = e.target.querySelector("input").value;
  fetchAPI();
});
async function fetchAPI() {
  const baseURL1 = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_key}&from=0&to=10`;
  const response = await fetch(baseURL1);
  const data = await response.json();
  generateHTML(data.hits);
  console.log(data);
}
 
 function generateHTML(results) {
  container.classList.remove("initial");
  let generatedHTML = "";
  results.map((result) => {
    generatedHTML += `
      <div class="item">
        <img src="${result.recipe.image}" alt="img">
        <div class="flex-container">
          <h1 class="title">${result.recipe.label}</h1>
          <a class="view-btn" target="_blank" href="${
            result.recipe.url
          }">View Recipe</a>
        </div>
        <p class="item-data">Calories: ${result.recipe.calories.toFixed(2)}</p>
        <p class="item-data">Diet label: ${
          result.recipe.dietLabels.length > 0
            ? result.recipe.dietLabels
            : "No Data Found"
        }</p>
        <p class="item-data">Health labels: ${result.recipe.healthLabels}</p>
      </div>
    `;
  });
  searchResultDiv.innerHTML = generatedHTML;
}


const HOST = "tasty.p.rapidapi.com";
const app_key = "cd9209b5c5msh05d3c5b7d6e2767p1dd595jsna33064bfd4db";
  const baseURL2 ="https://www.themealdb.com/api/json/v1/1/random.php";
function fetchFromEndpointURL2()
{
  fetch(baseURL2)
  .then(response=>response.json())
  .then(response=>renderDataFromEndpointURL2(response.meals[0]))
  .catch(err=>console.log(err));
}

function renderDataFromEndpointURL2(data)
{
   $("main").html("");
  $("main").append(`<center><p>Check out this video on ${data.strMeal}</p></center>`);
  $("main").append(`<center><iframe width="420" height="315"
src="${data.strYoutube.replace("watch?v=", "embed/")}">
</iframe></center>`);
  $("main").append(`<p>${data.strInstructions}</p>`);
}

function submitForEndPointURL2()
{
  $("#randomVideo").click((e)=>{
    fetchFromEndpointURL2();
  })
}

function init()
{
 submitForEndPointURL2();
}
$(init);