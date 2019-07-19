// for yourRecipes page
var userbtn = $('#userSubmit')
userbtn.on("click", checkUsername)
var usernames = []
var userRec = []

function getUsernames(){
  var fetchUsernames = localStorage.getItem('usernames')
  if (fetchUsernames) {
    usernames = JSON.parse(fetchUsernames)
  } else {
    usernames = localStorage.setItem('usernames', JSON.stringify([]))
  }
}
getUsernames()

function checkUsername() {
  $('.savedRecipes').empty()
  var usernameInput = $("#usernameInput").val()
  var currentUser = null
  usernames = JSON.parse(localStorage.getItem('usernames'))
  for (var i = 0; i < usernames.length; i++) {
    if (usernameInput === usernames[i]) {
      currentUser = usernames[i]
    }
  }
  if (currentUser) {
    localStorage.setItem('currentUser', currentUser)
    var currentUserRecs = JSON.parse(localStorage.getItem(`${currentUser}Recs`))
    for (var i = 0; i < currentUserRecs.length; i++) {
      appendNewRec(currentUserRecs[i])
    }

  } else {
    localStorage.setItem('currentUser', usernameInput)
    existingUsernames = JSON.parse(localStorage.getItem('usernames'))
    existingUsernames.push(usernameInput)
    localStorage.setItem('usernames', JSON.stringify(existingUsernames))
    localStorage.setItem(`${usernameInput}Recs`, JSON.stringify([]))
  }
}

var savedRecipes = $(".savedRecipes")
var addButton = $(".addRecipe")

addButton.on("click", createNewRec);

function createNewRec() {
  var newName = $('#nameInput').val();
  var newLink = $('#webInput').val();
  var newIngredients = $('#ingredientsInput').val();
  var newSteps = $('#stepsInput').val();

  var newRecipe = {
    newName: newName,
    newLink: newLink,
    newIngredients: newIngredients,
    newSteps: newSteps
  };

  var currentUser = localStorage.getItem('currentUser')
  var currentUserRecs = JSON.parse(localStorage.getItem(`${currentUser}Recs`))
  currentUserRecs.push(newRecipe)
  stringRecs = JSON.stringify(currentUserRecs)
  localStorage.setItem(`${currentUser}Recs`, stringRecs)

  userRec.push(newRecipe);
  appendNewRec(newRecipe);
  clearInputs();
}

function appendNewRec(newRecipe) {
  console.log(newRecipe)
  savedRecipes.append(`
    <div class="newRecipeCard">
    <p>${newRecipe.newName}</p>
    <p>${newRecipe.newLink}</p>
    <p>${newRecipe.newIngredients}</p>
    <p>${newRecipe.newSteps}</p>
    <button class="deletebtn"> Delete </button>
    </div>
    `);
}

savedRecipes.on("click", ".deletebtn", deleteItem)

// Ingredients to Recipes finder
var recipes = [
  //eggs-------->
  {
    term: 'eggs',
    name: 'The Perfect Omlette',
    href: "https://www.delish.com/cooking/recipe-ideas/a24892843/how-to-make-omelet"
  },
  {
    term: 'eggs',
    name: 'Fail Proof Frittata',
    href: "https://www.bonappetit.com/test-kitchen/common-mistakes/article/frittata-common-mistakes"
  },
  {
    term: 'eggs',
    name: 'Skillet-Baked Eggs with Spinach, Yogurt, and Chili Oil',
    href: "https://www.bonappetit.com/recipe/skillet-baked-eggs-with-spinach-yogurt-and-chili-oil"
  },
  {
    term: 'eggs',
    name: 'Shakshuka With Feta',
    href: "https://cooking.nytimes.com/recipes/1014721-shakshuka-with-feta"
  },
  {
    term: 'eggs',
    name: 'Egg-in-a-hole',
    href: "https://www.foodnetwork.com/recipes/ree-drummond/egg-in-a-hole-recipe-1925587"
  },
  {
    term: 'eggs',
    name: 'Buffalo Deviled eggs',
    href: "https://www.foodnetwork.com/recipes/ree-drummond/buffalo-deviled-eggs-5384974"
  },
  //polenta------->
  {
    term: 'polenta',
    name: 'How to Make the Perfect Polenta',
    href: "https://www.allrecipes.com/recipe/234933/how-to-make-perfect-polenta/"
  },
  {
    term: 'polenta',
    name: 'Creamy Polenta Recipe with Parmesan Cheese',
    href: "https://www.billyparisi.com/creamy-polenta-recipe-parmesan-cheese/"
  },
  {
    term: 'polenta',
    name: 'Eggplant Ragout with Creamy Polenta',
    href: "https://www.tastingtable.com/cook/recipes/eggplant-ragout-vegetarian-polenta-recipe"
  },
  //chocolate, strawberries
  {
    term: 'chocolate, strawberries',
    name: 'Chocolate Covered Strawberries',
    href: "https://www.delish.com/cooking/recipe-ideas/recipes/a58094/how-to-make-chocolate-covered-strawberries/"
  },
  {
    term: 'chocolate, strawberries',
    name: 'Strawberry Chocolate Cake',
    href: "https://www.twopeasandtheirpod.com/strawberry-chocolate-cake/"
  },
  {
    term: 'chocolate, strawberries',
    name: 'Dark Chocolate Strawberry Ice Cream',
    href: "https://www.loveandoliveoil.com/2014/05/dark-chocolate-strawberry-ice-cream.html"
  },
  {
    term: 'chocolate, strawberries',
    name: 'Strawberry Brownies',
    href: "https://www.thecookierookie.com/strawberry-brownies-chocolate-covered-strawberry-brownie-recipe/"
  },
]

var cardContainer = $('.card-container');
var submit = $('.submit-btn');
var newIngredient = $('.newIngredient');

submit.on("click", createRecipe);

cardContainer.on("click", ".delete-btn", deleteItem);

function createRecipe() {
  var term = $('.newIngredient').val();
  var matchingRecipes = []

  for (var i = 0; i < recipes.length; i++) {
    var recipe = recipes[i]
    if (recipe.term === term){
      matchingRecipes.push(recipe)
    }
  }

  if (matchingRecipes.length === 0) {
    cardContainer.append(`
    <h3>Oops! no recipes match your term</h3>
  `)
  }

  for (var i = 0; i < matchingRecipes.length; i++) {
    var recipe = matchingRecipes[i]
    appendNewRecipe(recipe);
  }
  clearInputs();
}

function appendNewRecipe(recipe) {
    cardContainer.append(`
    <div class="to-do-card">
      <h3>${recipe.name}</h3>
      <a href=${recipe.href} target="_blank" style="font-size: 17px; text-decoration: none; color: #ffdb58;">Check Out This Recipe!</a>
      <br>
      <br>
      <br>
    </div>
  `);
}

function clearInputs() {
  $('.newIngredient').val("");
}

function deleteItem(event){
  event.target.parentNode.remove();
}

function clearInputs(){
  $('#nameInput').val("");
  $('#webInput').val("");
  $('#ingredientsInput').val("");
  $('#stepsInput').val("");
}

// Random Recipe Generator
var randomBtn=$(".newBtn")

randomBtn.on("click", randomRecipe);

var recipeOptions = ["https://www.101cookbooks.com/archives/001191.html", "https://www.loveandlemons.com/tzatziki-sauce/", "https://www.bonappetit.com/recipe/bas-best-hot-fudge", "https://www.bonappetit.com/recipe/thai-tea-ice-cream", "https://www.bonappetit.com/recipe/peach-lassi-sorbet-with-crushed-blackberries", "https://www.loveandlemons.com/homemade-pizza/", "https://www.101cookbooks.com/kale-quinoa-bites/"];

function randomRecipe(){
  var random = Math.random() * 7;
  var rounded = Math.floor(random);
  var recipe = recipeOptions[rounded];
  window.open(recipe)
}
