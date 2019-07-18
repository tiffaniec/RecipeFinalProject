// var database = [
//   {
//     'danielle': [
//       {
//         //recipe1
//       },
//       {
//         //recipe2
//       }
//     ]
//   }
// ]

// for yourRecipes page
var userbtn = $('#userSubmit')
userbtn.on("click", checkUsername)
var usernames = []
var allRecArray = []
var userRec = []

function checkUsername() {
  var usernameInput = $("#usernameInput").val()
  for (var i = 0; i < usernames.length; i++) {
    if (usernameInput === usernames[i]) {
      return i;

    }
  }
  usernames.push(usernameInput)
  console.log(usernames.length - 1)
  return usernames.length - 1;
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
  userRec.push(newRecipe);
  localStorage.setItem('userRec', JSON.stringify(userRec))
  appendNewRec(newRecipe);
  clearInputs();
}

function appendNewRec(newRecipe) {
  savedRecipes.append(`
    <div class="newRecipeCard">
    <p>${newRecipe.newName}</p>
    <p>${newRecipe.newLink}</p>
    <p>${newRecipe.newIngredients}</p>
    <p>${newRecipe.newSteps}</p>
    <button class="deletebtn"> Delete </button>
    </div>
    `);
  // localStorage.setItem('newRecipe', JSON.stringify(newRecipe))
}

savedRecipes.on("click", ".deletebtn", deleteItem)

function deleteItem(event) {
  event.target.parentNode.remove();
}

function clearInputs() {
  $('#nameInput').val("");
  $('#webInput').val("");
  $('#ingredientsInput').val("");
  $('#stepsInput').val("");
}
