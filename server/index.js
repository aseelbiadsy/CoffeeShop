const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

const {
  createUser,
  getUser,
  getAllUsers,
  getAllCategories,
  getCategoryById,
  createCheckOut,
  getAllCheckOut,
  getBestSellers,
} = require("./controllers/authController");

// Connect with SQLite (creates/opens server/database/coffeeshop.sqlite)
require("./database/db");
console.log("Connected to SQLite");

// All API routes live under /api so nginx can reverse-proxy just this
// prefix to the backend while serving the built frontend for everything else.
const api = express.Router();

api.get("/categories", getAllCategories);
api.get("/categories/:categoryId", getCategoryById);

api.get("/users", getAllUsers);
api.get("/users/:userId", getUser);
api.post("/users", createUser);

api.get("/Checkout", getAllCheckOut);
api.post("/Checkout", createCheckOut);

api.get("/BestSellers", getBestSellers);

app.use("/api", api);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
