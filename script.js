const meals = document.getElementById('meals');

getRandomMeal();

async function getRandomMeal() {
  const resp = await fetch(
    'https://www.themealdb.com/api/json/v1/1/random.php'
  );
  const respData = await resp.json();
  const randomMeal = respData.meals[0];

  addMeal(randomMeal, true);
}

async function getMealById(id) {
  const meal = await fetch(
    'https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + id
  );
}

async function getMealsBySearch(term) {
  const meals = await fetch(
    'https://www.themealdb.com/api/json/v1/1/search.php?s=' + term
  );
}

function addMeal(mealData, random) {
  const meal = document.createElement('div');
  meal.classList.add('meal');

  meal.innerHTML = `
       <div class="meal-header">
          ${random ? `<h2>Random Receipe</h2>` : ''}
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
  });
}

function addMealLS(mealId) {
  localStorage.setItem('mealIds', JSON.stringify(mealId));
}

function removeMealLS(mealId) {
  const mealIds = getMealLS();

  localStorage.setItem(
    'mealIds',
    JSON.stringify(mealIds.filter((id) => id !== mealId))
  );
}

function getMealLS() {
  const mealId = JSON.parse(localStorage.getItem('mealsIds'));
  console.log(mealId);
  return mealId == null ? [] : mealIds;
}
