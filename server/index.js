const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 3001;
const cors = require("cors");
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
} = require("./controllers/authController");

// Connect with SQLite (creates/opens server/database/coffeeshop.sqlite)
require("./database/db");
console.log("Connected to SQLite");

// Express routes
const router = express.Router();
const CategoriesRouter = express.Router();
const CheckoutRouter = express.Router();

// Routes
router.post("/users", createUser);
CheckoutRouter.post("/Checkout", createCheckOut);

// GET endpoint for retrieving orders for a specific user
router.get("/users", getAllUsers);
CategoriesRouter.get("/", getAllCategories);

CategoriesRouter.get("/categories/:categoryId", getCategoryById);
router.get("/users/:userId?", getUser);

///////////////////////////////
app.get("/categories", getAllCategories);
app.get("/users", getAllUsers);
app.get("/Checkout", getAllCheckOut);

// Use routers
app.use("/", router);
app.use("/", CategoriesRouter);
app.use("/", CheckoutRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
