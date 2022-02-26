const asyncHandler = require("express-async-handler");

const Recipe = require("../models/recipe");

//@ description Get recipes
//@ routes GET /api/recipes
//@access Private
const getRecipes = asyncHandler(async (req, res) => {
  const recipes = await Recipe.find({ user: req.user.id });
  res.status(200).json(recipes);
});

//@ description Post recipe
//@ routes POST /api/recipes
//@access Private
const setRecipe = asyncHandler(async (req, res) => {
  if (!req.body) {
    res.sendStatus(400);
    throw new Error("please add a recipe");
  }
  const recipe = new Recipe({
    title: req.body.title,
    ingredients: req.body.ingredients,
    cookingTime: req.body.cookingTime,
    user: req.user._id,
  });
  recipe.save();
  res.status(200).json(recipe);
  //res.status(200).json({ message: `Updated recipe ${req.params.id}` });
  //   res.status(200).json({ message: "Set recipe" });
});

//@ description Update recipe
//@ routes PUT /api/recipes/:id
//@access Private
const putRecipe = asyncHandler(async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);
  if (!recipe) {
    res.sendStatus(400);
    throw new Error("Recipe not found");
  }
  const updatedRecipe = await Recipe.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json(updatedRecipe);
});

//@ description Delete recipe
//@ routes DELETE /api/recipes/:id
//@access Private
const deleteRecipe = asyncHandler(async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);
  if (!recipe) {
    res.sendStatus(400);
    throw new Error("Recipe not found");
  }
  recipe.remove();
  res.status(200).json({ message: "Delete recipes" });
});

module.exports = {
  getRecipes,
  setRecipe,
  putRecipe,
  deleteRecipe,
};
