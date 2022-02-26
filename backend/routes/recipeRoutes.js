const express = require("express");
const router = express.Router();
const {
  getRecipes,
  setRecipe,
  putRecipe,
  deleteRecipe,
} = require("../controllers/recipeController");
const { protect } = require("../middleware/authMiddleware");
router.get("/", protect, getRecipes);

router.post("/", protect, setRecipe);

router.put("/:id", protect, putRecipe);

router.delete("/:id", protect, deleteRecipe);

module.exports = router;
