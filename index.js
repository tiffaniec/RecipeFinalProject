// for yourRecipes page
// var usernameInput= $("#usernameInput").var()
// var userSubmitBtn=$("#userSubmit")
var savedRecipes= $(".savedRecipes")
var addButton=$(".addRecipe")

addButton.on("click", createNewRec);
function createNewRec(){
  var newName= $('#nameInput').val();
  var newIngredients= $('#ingredientsInput').val();
  var newSteps=$('#stepsInput').val();

  var newRecipe={newName: newName, newIngredients:newIngredients, newSteps: newSteps};

  appendNewRec(newRecipe);
  clearInputs();
}

function appendNewRec(newRecipe){
  savedRecipes.append(`
    <div class="newRecipeCard">
    <p>${newRecipe.newName}</p>
    <p>${newRecipe.newIngredients}</p>
    <p>${newRecipe.newSteps}</p>
    <button class="deletebtn"> Delete </button>
    </div>
    `);
}
savedRecipes.on("click",".deletebtn", deleteItem)
function deleteItem(event){
  event.target.parentNode.remove();
}
function clearInputs(){
  $('#nameInput').val("");
  $('#ingredientsInput').val("");
  $('#stepsInput').val("");
}
