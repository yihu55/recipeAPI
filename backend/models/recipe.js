const mongoose = require("mongoose");

const recipeSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  title: {
    type: String,
    required: true,
  },
  ingredients: [],
  cookingTime: String,
});

module.exports = mongoose.model("Recipe", recipeSchema);
