const express = require("express");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const port = process.env.PORT || 5000;

connectDB();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(errorHandler);

app.use("/api/recipes", require("./routes/recipeRoutes"));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
