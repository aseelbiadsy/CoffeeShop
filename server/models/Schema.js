// models/Schema.js
const db = require("../database/db");

function parseJson(value) {
  if (value == null) return [];
  if (typeof value === "string") return JSON.parse(value || "[]");
  return value;
}

function rowToUser(row) {
  if (!row) return null;
  return { _id: String(row.id), name: row.name, email: row.email, password: row.password };
}

function rowToCategory(row) {
  if (!row) return null;
  return {
    _id: String(row.id),
    strCategory: row.strCategory,
    subcategories: parseJson(row.subcategories),
  };
}

function rowToCheckout(row) {
  if (!row) return null;
  return {
    _id: String(row.id),
    userId: String(row.userId),
    orderDate: row.orderDate instanceof Date ? row.orderDate.toISOString() : row.orderDate,
    products: parseJson(row.products),
    totalAmount: Number(row.totalAmount),
    shippingAddress: row.shippingAddress,
    customer: { name: row.customerName, phoneNumber: row.customerPhoneNumber },
  };
}

const User = {
  find: async () => {
    const [rows] = await db.query("SELECT * FROM users");
    return rows.map(rowToUser);
  },
  findOne: async ({ name }) => {
    const [rows] = await db.execute("SELECT * FROM users WHERE name = ? LIMIT 1", [name]);
    return rowToUser(rows[0]);
  },
  findById: async (id) => {
    const [rows] = await db.execute("SELECT * FROM users WHERE id = ? LIMIT 1", [id]);
    return rowToUser(rows[0]);
  },
  create: async ({ name, email, password }) => {
    const [result] = await db.execute(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, password]
    );
    const [rows] = await db.execute("SELECT * FROM users WHERE id = ?", [result.insertId]);
    return rowToUser(rows[0]);
  },
};

const Category = {
  find: async () => {
    const [rows] = await db.query("SELECT * FROM categories");
    return rows.map(rowToCategory);
  },
  findById: async (id) => {
    const [rows] = await db.execute("SELECT * FROM categories WHERE id = ? LIMIT 1", [id]);
    return rowToCategory(rows[0]);
  },
};

const Checkout = {
  find: async () => {
    const [rows] = await db.query("SELECT * FROM checkouts");
    return rows.map(rowToCheckout);
  },
  create: async ({ userId, products, totalAmount, shippingAddress, customer }) => {
    const [result] = await db.execute(
      `INSERT INTO checkouts (userId, orderDate, products, totalAmount, shippingAddress, customerName, customerPhoneNumber)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [userId, new Date(), JSON.stringify(products), totalAmount, shippingAddress, customer.name, customer.phoneNumber]
    );
    const [rows] = await db.execute("SELECT * FROM checkouts WHERE id = ?", [result.insertId]);
    return rowToCheckout(rows[0]);
  },
};

module.exports = { User, Category, Checkout };
