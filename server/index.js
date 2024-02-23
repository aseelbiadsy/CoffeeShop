const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const PORT = 3001;
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

// Connect with MongoDB
mongoose
  .connect("mongodb+srv://asil:******@cluster0.q5uaxwu.mongodb.net/users", {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

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
