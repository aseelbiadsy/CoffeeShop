//authController.js
 
const {Checkout, User, Order, Category } = require("../models/Schema");
 
// Get all users
const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find({});
    res.json(allUsers);
  } catch (error) {
    console.error("Error getting all users:", error);
    res.status(500).json({ message: "Error getting all users" });
  }
};
// Get all Orders
// const getAllOrders = async (req, res) => {
//   console.log("Getting all Orders");

//   try {
//     const allOrders = await Order.find({});

//     console.log("Retrieved Orders:", allOrders);

//     res.json(allOrders);
//   } catch (error) {
//     console.error("Error getting all Orders:", error);
//     res.status(500).json({ message: "Error getting all Orders" });
//   }
// };

// Get all Categ
const getAllCategories = async (req, res) => {
  console.log("Getting all categories");

  try {
    const allCategories = await Category.find({});

    console.log("Retrieved Categories:", allCategories);

    res.json(allCategories);
  } catch (error) {
    console.error("Error getting all categories:", error);
    res.status(500).json({ message: "Error getting all categories" });
  }
};

const getAllCheckOut = async (req, res) => {
  console.log("Getting all checkout");

  try {
    const allCheckout = await Checkout.find({});

    console.log("Retrieved Checkout:", allCheckout);

    res.json(allCheckout);
  } catch (error) {
    console.error("Error getting all checkout:", error);
    res.status(500).json({ message: "Error getting all checkout" });
  }
}



//Get Category By Id
const getCategoryById = async (req, res) => {
  try {
    const categoryId = req.params.categoryId; // Extract categoryId from req.params

    console.log("Getting category by id: ", categoryId);

    if (!categoryId) {
      return res.status(400).json({ error: "Invalid categoryId" });
    }

    const category = await Category.findById(categoryId);

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    return res.json(category);
  } catch (error) {
    console.error("Error while fetching category by ID:", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};
//Get User By Id
const getUser = async (req, res) => {
  try {
    const { userId } = req.params;

    if (userId) {
      const user = await User.findById(userId);

      if (user) {
        return res.json(user);
      } else {
        return res.status(404).json({ message: "User not found" });
      }
    }
  } catch (error) {
    console.error("Error getting users:", error);
    res.status(500).json({ message: "Error getting users" });
  }
};


//  Create a new user
const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ name });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with the same name already exists." });
    }

    const newUser = await User.create({ name, email, password });
    res.json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Error creating user" });
  }
};
 
const createCheckOut =async(req,res)=>{

  const { userId, products, totalAmount, shippingAddress, customer } = req.body;

  console.log("Creating new checkout:", {
    userId,
    products,
    totalAmount,
    shippingAddress,
    customer,
  });
  try {

     const newCheckout = await Checkout.create({
      userId,
      products,
      totalAmount,
      shippingAddress,
      customer,
    });
    console.log("CheckOut created:", newCheckout);
    res.json(newCheckout); 

  } catch (error) {
    console.error('Error creating checkout order:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }

}
 
const getOrderById = async (req, res) => {
  const { orderId } = req.params;
  console.log("Getting order by ID:", orderId);

  try {
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    console.error('Error getting order by ID:', error);
    res.status(500).json({ message: 'Error getting order by ID' });
  }
};

module.exports = {
  createUser,
   getUser,
  getAllUsers,
  getAllCategories,
  getCategoryById,
  createCheckOut,
    getOrderById,
    getAllCheckOut,
};
