const express = require("express");
const router = express.Router();
const {
  getRecipes,
  setRecipe,
  putRecipe,
  deleteRecipe,
} = require("../controller/recipeController");
router.get("/", getRecipes);

router.post("/", setRecipe);

router.put("/:id", putRecipe);

router.delete("/:id", deleteRecipe);

module.exports = router;
