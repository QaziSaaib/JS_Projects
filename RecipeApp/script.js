"use strict;";

const container = document.querySelector(".container");

const recipeContainer = document.querySelector(".recipe-container");
// const mealCard = document.querySelector(".meal-card");
const mealDetails = document.querySelector(".meals-details");

const imgEl = document.getElementById("img");

const mealName = document.getElementById("meal-name");
const mealOrigin = document.getElementById("meal-origin");
const mealCategory = document.getElementById("meal-category");

const inputBox = document.getElementById("input_box");
const searchBtn = document.getElementById("search_btn");

let recipeBtn;

async function getFood(searchedMeal) {
  try {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchedMeal}`;
    const response = await fetch(url);
    if (response.status === 200) {
      const data = await response.json();
      return data;
    }
  } catch (err) {
    recipeContainer.innerHTML = `<h2 class="status_message">No such recipes found...</h2>`;
  }
}

let curr_meal;

async function showRecipes() {
  container.innerHTML = "";
  container.appendChild(recipeContainer);
  recipeContainer.innerHTML = `<h2 class="status_message">Fetching recipes...</h2>`;
  const searchedMeal = inputBox.value;
  const mealItem = await getFood(searchedMeal);
  if (!mealItem.meals) {
    recipeContainer.innerHTML = `<h2 class="status_message">No such recipes found...</h2>`;
    return;
  }
  console.log(mealItem);
  recipeContainer.innerHTML = "";
  mealItem.meals.forEach((meal) => {
    const mealCard = document.createElement("div");
    mealCard.classList.add("meal-card");
    mealCard.innerHTML = `<img src="${meal.strMealThumb}" id="img" alt="Picture of meal item" /></a>
    <div class="meals-details">
      <h3 id="meal-name">${meal.strMeal}</h3>
      <p id="meal-origin"><span id="bold"> ${meal.strArea} Dish</span></p>
      <p id="meal-category">Belongs to <span id="bold"> ${meal.strCategory}</span> Category</p>
      </div>`;
    const overlayEl = document.createElement("div");
    overlayEl.classList.add("overlay");
    overlayEl.innerHTML = `<button class="recipe-btn">Click here</button>`;
    mealCard.appendChild(overlayEl);
    recipeContainer.appendChild(mealCard);

    recipeBtn = document.querySelectorAll(".recipe-btn");
  });
  recipeBtn.forEach((btn, index) => {
    btn.addEventListener("click", function () {
      getRecipe(mealItem.meals[index]);
    });
  });
}

searchBtn.addEventListener("click", showRecipes);

// Recipe Page

const getRecipe = function (item) {
  console.log(item);
  const containerEl = recipeContainer.parentElement;
  containerEl.innerHTML = "";

  const ingredients = [];
  const measure = [];
  for (const [key, val] of Object.entries(item)) {
    if (key.includes("strIngredient") && val !== "" && val !== null) {
      ingredients.push(val);
    } else if (key.includes("strMeasure") && val !== "" && val !== null) {
      measure.push(val);
    }
  }
  console.log(ingredients);
  console.log(measure);

  const ulEl = document.createElement("ul");
  ulEl.classList.add("ingredients");
  ingredients.forEach((ing, index) => {
    const li = document.createElement("li");
    li.innerText = `${ing} (${measure[index]})`;
    ulEl.appendChild(li);
  });
  console.log(ulEl);

  const html = `<div class="recipe">
  <div class="recipe-details">
    <div class="meal-img">
      <img
        src=${item.strMealThumb}
      />
    </div>
    <div class="meal-preparation-details">
      <h2 class="meal-name">${item.strMeal}</h2>
      <div class="tags">
        <span id="type">${item.strCategory}</span>
        <span id="origin">${item.strArea || " "}</span>
      </div>
      <div class="ingredients-box">
        <h2 id="ingredients-heading">Ingredients</h2>
      </div>
    </div>
  </div>
  <div class="recipe-instruction">
    <p>${item.strInstructions}</p>
    <a
      href="${item.strYoutube}"
      target="_blank"
      class="youtube-link"
      >Click here for video! &rAarr;
      <ion-icon name="logo-youtube" id="youtube-icon"></ion-icon
    ></a>
    <button class="btn-back"><ion-icon name="home"></ion-icon></ion-icon></button>
  </div>
</div>`;

  containerEl.innerHTML = html;
  const ingredientsBox = document.querySelector(".ingredients-box");
  ingredientsBox.appendChild(ulEl);
  console.log(ingredientsBox);
  console.log(containerEl);
  const btnBack = document.querySelector(".btn-back");
  btnBack.addEventListener("click", function () {
    console.log("Button back");
    showRecipes();
    const divLoadEl = document.createElement("div");
    divLoadEl.classList.add("loading");
    recipeContainer.innerHTML = `<div class='loading'></div>`;
  });
};
