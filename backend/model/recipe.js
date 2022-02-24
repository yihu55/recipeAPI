const mongoose = require("mongoose");

const recipeSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  ingredients: [],
  cookingTime: String,
});

module.exports = mongoose.model("Recipe", recipeSchema);
