// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

//we can add prices : {
//   s: Number,
//   M: Number,
//   L: Number,
// } ,

const categorySchema = new mongoose.Schema({
  strCategory: String,
  subcategories: [
    {
      name: String,
      price: Number,
      imgPath: String,
    },
  ],
});

 

const checkoutSchema = new mongoose.Schema({
  userId: {type: String,required: true,},
  orderDate: {type: Date,default: Date.now, },
  products: [
    {
      // productId: { type: String, required: true },
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true }, },
    ],
  totalAmount: { type: Number,    required: true,},
  shippingAddress: { type: String,    required: true,},
  customer: {
    name: {type: String,required: true,},
    phoneNumber: {type: String,required: true,},
  },
});

const User = mongoose.model("User", userSchema);
const Category = mongoose.model("Category", categorySchema);
 const Checkout = mongoose.model("Checkout", checkoutSchema);

module.exports = { User, Category, Checkout };
