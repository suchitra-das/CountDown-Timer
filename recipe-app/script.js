const mealsEl = document.getElementById("meals");
const favoriteContainer = document.getElementById("fav-meals");
const mealPopup = document.getElementById("meal-popup");
const mealInfoEl = document.getElementById("meal-info");
const popupCloseBtn = document.getElementById("close-popup");
const searchTerm = document.getElementById("search-term");
const searchBtn = document.getElementById("search");


const mealsData = [
    {
        idMeal: "1",
        strMeal: "Pizza",
        strMealThumb: "https://picsum.photos/200/300",
        ingredients: [
            { ingredient: "Flour", measure: "2 cups" },
            { ingredient: "Cheese", measure: "200g" },
            { ingredient: "Tomato Sauce", measure: "1 cup" }
        ]
    },
    {
        idMeal: "2",
        strMeal: "Burger",
        strMealThumb: "https://picsum.photos/200/300",
       
        ingredients: [
            { ingredient: "Bun", measure: "1 piece" },
            { ingredient: "Beef Patty", measure: "150g" },
            { ingredient: "Lettuce", measure: "2 leaves" }
        ]
    }


  
];


getRandomMeal();
fetchFavMeals();


function getRandomMeal() {
    const randomIndex = Math.floor(Math.random() * mealsData.length);
    const randomMeal = mealsData[randomIndex];
    addMeal(randomMeal, true);
}


function getMealById(id) {
    return mealsData.find(meal => meal.idMeal === id);
}


function getMealsBySearch(term) {
    return mealsData.filter(meal => meal.strMeal.toLowerCase().includes(term.toLowerCase()));
}


function addMeal(mealData, random = false) {
    const meal = document.createElement("div");
    meal.classList.add("meal");

    meal.innerHTML = `
        <div class="meal-header">
            ${random ? `<span class="random"> Random Recipe </span>` : ""}
            <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}" />
        </div>
        <div class="meal-body">
            <h4>${mealData.strMeal}</h4>
            <button class="fav-btn"><i class="fas fa-heart"></i></button>
        </div>
    `;

    const btn = meal.querySelector(".meal-body .fav-btn");
    btn.addEventListener("click", () => {
        if (btn.classList.contains("active")) {
            removeMealLS(mealData.idMeal);
            btn.classList.remove("active");
        } else {
            addMealLS(mealData.idMeal);
            btn.classList.add("active");
        }
        fetchFavMeals();
    });

    meal.addEventListener("click", () => {
        showMealInfo(mealData);
    });

    mealsEl.appendChild(meal);
}


function addMealLS(mealId) {
    const mealIds = getMealsLS();
    localStorage.setItem("mealIds", JSON.stringify([...mealIds, mealId]));
}


function removeMealLS(mealId) {
    const mealIds = getMealsLS();
    localStorage.setItem("mealIds", JSON.stringify(mealIds.filter(id => id !== mealId)));
}


function getMealsLS() {
    return JSON.parse(localStorage.getItem("mealIds")) || [];
}


function fetchFavMeals() {
    favoriteContainer.innerHTML = "";
    const mealIds = getMealsLS();
    mealIds.forEach(mealId => {
        const meal = getMealById(mealId);
        if (meal) addMealFav(meal);
    });
}


function addMealFav(mealData) {
    const favMeal = document.createElement("li");

    favMeal.innerHTML = `
        <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}" />
        <span>${mealData.strMeal}</span>
        <button class="clear"><i class="fas fa-window-close"></i></button>
    `;

    const btn = favMeal.querySelector(".clear");
    btn.addEventListener("click", () => {
        removeMealLS(mealData.idMeal);
        fetchFavMeals();
    });

    favMeal.addEventListener("click", () => {
        showMealInfo(mealData);
    });

    favoriteContainer.appendChild(favMeal);
}


function showMealInfo(mealData) {
    mealInfoEl.innerHTML = "";

    const mealEl = document.createElement("div");

    mealEl.innerHTML = `
        <h1>${mealData.strMeal}</h1>
        <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}" />
        <p>${mealData.strInstructions}</p>
        <h3>Ingredients:</h3>
        <ul>
            ${mealData.ingredients.map(ing => `<li>${ing.ingredient} - ${ing.measure}</li>`).join("")}
        </ul>
    `;

    mealInfoEl.appendChild(mealEl);
    mealPopup.classList.remove("hidden");
}





searchBtn.addEventListener("click", () => {
    mealsEl.innerHTML = "";
    const search = searchTerm.value;
    const meals = getMealsBySearch(search);
    meals.forEach(meal => addMeal(meal));
});


popupCloseBtn.addEventListener("click", () => {
    mealPopup.classList.add("hidden");
});
