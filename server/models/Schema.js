// models/Schema.js
const db = require("../database/db");

function rowToUser(row) {
  if (!row) return null;
  return { _id: String(row.id), name: row.name, email: row.email, password: row.password };
}

function rowToCategory(row) {
  if (!row) return null;
  return {
    _id: String(row.id),
    strCategory: row.strCategory,
    subcategories: JSON.parse(row.subcategories || "[]"),
  };
}

function rowToCheckout(row) {
  if (!row) return null;
  return {
    _id: String(row.id),
    userId: row.userId,
    orderDate: row.orderDate,
    products: JSON.parse(row.products || "[]"),
    totalAmount: row.totalAmount,
    shippingAddress: row.shippingAddress,
    customer: { name: row.customerName, phoneNumber: row.customerPhoneNumber },
  };
}

const User = {
  find: async () => db.prepare("SELECT * FROM users").all().map(rowToUser),
  findOne: async ({ name }) => rowToUser(db.prepare("SELECT * FROM users WHERE name = ?").get(name)),
  findById: async (id) => rowToUser(db.prepare("SELECT * FROM users WHERE id = ?").get(id)),
  create: async ({ name, email, password }) => {
    const info = db
      .prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)")
      .run(name, email, password);
    return rowToUser(db.prepare("SELECT * FROM users WHERE id = ?").get(info.lastInsertRowid));
  },
};

const Category = {
  find: async () => db.prepare("SELECT * FROM categories").all().map(rowToCategory),
  findById: async (id) => rowToCategory(db.prepare("SELECT * FROM categories WHERE id = ?").get(id)),
};

const Checkout = {
  find: async () => db.prepare("SELECT * FROM checkouts").all().map(rowToCheckout),
  create: async ({ userId, products, totalAmount, shippingAddress, customer }) => {
    const info = db
      .prepare(
        `INSERT INTO checkouts (userId, orderDate, products, totalAmount, shippingAddress, customerName, customerPhoneNumber)
         VALUES (?, ?, ?, ?, ?, ?, ?)`
      )
      .run(
        userId,
        new Date().toISOString(),
        JSON.stringify(products),
        totalAmount,
        shippingAddress,
        customer.name,
        customer.phoneNumber
      );
    return rowToCheckout(db.prepare("SELECT * FROM checkouts WHERE id = ?").get(info.lastInsertRowid));
  },
};

module.exports = { User, Category, Checkout };
