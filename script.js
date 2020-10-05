const meals = document.getElementById('meals');
const favMeals = document.getElementById('fav-meals');

getRandomMeal();
fetcFavMeal();

async function getRandomMeal() {
  const resp = await fetch(
    'https://www.themealdb.com/api/json/v1/1/random.php'
  );
  const respData = await resp.json();
  const randomMeal = respData.meals[0];
  addMeal(randomMeal);
}

async function getMealById(id) {
  const resp = await fetch(
    'https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + id
  );

  const respData = await resp.json();
  const meal = respData.meals[0];
  console.log(meal);
  return meal;
}
getMealById(52772);

async function getMealsBySearch(term) {
  const meals = await fetch(
    'https://www.themealdb.com/api/json/v1/1/search.php?s=' + term
  );
}

function addMeal(mealData) {
  const meal = document.createElement('div');
  meal.classList.add('meal');

  meal.innerHTML = `
       <div class="meal-header">
          <h2>Random Receipe</h2>
          <img
            src="${mealData.strMealThumb}"
            id="big"
            alt="${mealData.strMeal}"
          />
        </div>
        <div class="meal-body">
          <h4>${mealData.strMeal}</h4>
          <button class="btn"><i class="fa fa-heart"></i></button>
         </div>
   `;
  meals.appendChild(meal);

  const btn = document.querySelector('.meal-body .btn');
  btn.addEventListener('click', () => {
    if (btn.classList.contains('active')) {
      removeMealLS(mealData.idMeal);
      btn.classList.remove('active');
    } else {
      addMealLS(mealData.idMeal);
      btn.classList.add('active');
    }
    fetcFavMeal();
  });
}

function addMealLS(mealId) {
  localStorage.setItem('mealIds', JSON.stringify([mealId]));
}

function removeMealLS(mealId) {
  const mealIds = getMealLS();
  localStorage.setItem(
    'mealIds',
    JSON.stringify(mealIds.filter((id) => id === mealIds))
  );
}

function getMealLS() {
  const mealIdss = JSON.parse(localStorage.getItem('mealIds'));
  return mealIdss;
}

async function fetcFavMeal() {
  const mealIds = getMealLS();
  console.log([...mealIds]);

  const mealId = mealIds[0];
  console.log(mealId);
  meal = await getMealById(mealId);

  console.log(meal);
  addMealFav(meal);
}

function addMealFav(mealData) {
  const meal = document.createElement('li');

  meal.innerHTML = `
            <img
              src="${mealData.strMealThumb}"
              alt="${mealData.strMeal}"
            />
            <br />
            <span>${mealData.strMeal}</span>
          `;

  favMeals.appendChild(meal);
}
