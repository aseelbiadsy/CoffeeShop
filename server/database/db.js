const path = require("path");
const { DatabaseSync } = require("node:sqlite");

const dbPath = path.join(__dirname, "coffeeshop.sqlite");
const db = new DatabaseSync(dbPath);

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    strCategory TEXT,
    subcategories TEXT
  );

  CREATE TABLE IF NOT EXISTS checkouts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId TEXT NOT NULL,
    orderDate TEXT NOT NULL,
    products TEXT NOT NULL,
    totalAmount REAL NOT NULL,
    shippingAddress TEXT NOT NULL,
    customerName TEXT NOT NULL,
    customerPhoneNumber TEXT NOT NULL
  );
`);

const seedCategories = [
  {
    strCategory: "Hot Coffee",
    subcategories: [
      { name: "Espresso", price: 2.5, imgPath: "https://picsum.photos/seed/espresso/300/300", img: "https://picsum.photos/seed/espresso/300/300" },
      { name: "Americano", price: 3.0, imgPath: "https://picsum.photos/seed/americano/300/300", img: "https://picsum.photos/seed/americano/300/300" },
      { name: "Latte", price: 3.5, imgPath: "https://picsum.photos/seed/latte/300/300", img: "https://picsum.photos/seed/latte/300/300" },
      { name: "Cappuccino", price: 3.5, imgPath: "https://picsum.photos/seed/cappuccino/300/300", img: "https://picsum.photos/seed/cappuccino/300/300" },
      { name: "Mocha", price: 4.0, imgPath: "https://picsum.photos/seed/mocha/300/300", img: "https://picsum.photos/seed/mocha/300/300" },
    ],
  },
  {
    strCategory: "Cold Coffee",
    subcategories: [
      { name: "Iced Latte", price: 4.0, imgPath: "https://picsum.photos/seed/icedlatte/300/300", img: "https://picsum.photos/seed/icedlatte/300/300" },
      { name: "Cold Brew", price: 4.0, imgPath: "https://picsum.photos/seed/coldbrew/300/300", img: "https://picsum.photos/seed/coldbrew/300/300" },
      { name: "Frappuccino", price: 4.5, imgPath: "https://picsum.photos/seed/frappuccino/300/300", img: "https://picsum.photos/seed/frappuccino/300/300" },
      { name: "Iced Americano", price: 3.5, imgPath: "https://picsum.photos/seed/icedamericano/300/300", img: "https://picsum.photos/seed/icedamericano/300/300" },
    ],
  },
  {
    strCategory: "Tea",
    subcategories: [
      { name: "Green Tea", price: 2.5, imgPath: "https://picsum.photos/seed/greentea/300/300", img: "https://picsum.photos/seed/greentea/300/300" },
      { name: "Black Tea", price: 2.5, imgPath: "https://picsum.photos/seed/blacktea/300/300", img: "https://picsum.photos/seed/blacktea/300/300" },
      { name: "Chai Latte", price: 3.5, imgPath: "https://picsum.photos/seed/chailatte/300/300", img: "https://picsum.photos/seed/chailatte/300/300" },
      { name: "Herbal Tea", price: 3.0, imgPath: "https://picsum.photos/seed/herbaltea/300/300", img: "https://picsum.photos/seed/herbaltea/300/300" },
    ],
  },
  {
    strCategory: "Desserts",
    subcategories: [
      { name: "Croissant", price: 3.0, imgPath: "https://picsum.photos/seed/croissant/300/300", img: "https://picsum.photos/seed/croissant/300/300" },
      { name: "Muffin", price: 2.5, imgPath: "https://picsum.photos/seed/muffin/300/300", img: "https://picsum.photos/seed/muffin/300/300" },
      { name: "Cheesecake", price: 4.5, imgPath: "https://picsum.photos/seed/cheesecake/300/300", img: "https://picsum.photos/seed/cheesecake/300/300" },
      { name: "Brownie", price: 3.5, imgPath: "https://picsum.photos/seed/brownie/300/300", img: "https://picsum.photos/seed/brownie/300/300" },
    ],
  },
  {
    strCategory: "Specialty Drinks",
    subcategories: [
      { name: "Caramel Macchiato", price: 4.5, imgPath: "https://picsum.photos/seed/caramelmacchiato/300/300", img: "https://picsum.photos/seed/caramelmacchiato/300/300" },
      { name: "Flat White", price: 4.0, imgPath: "https://picsum.photos/seed/flatwhite/300/300", img: "https://picsum.photos/seed/flatwhite/300/300" },
      { name: "Affogato", price: 5.0, imgPath: "https://picsum.photos/seed/affogato/300/300", img: "https://picsum.photos/seed/affogato/300/300" },
      { name: "Matcha Latte", price: 4.25, imgPath: "https://picsum.photos/seed/matchalatte/300/300", img: "https://picsum.photos/seed/matchalatte/300/300" },
    ],
  },
  {
    strCategory: "Snacks",
    subcategories: [
      { name: "Bagel", price: 3.0, imgPath: "https://picsum.photos/seed/bagel/300/300", img: "https://picsum.photos/seed/bagel/300/300" },
      { name: "Sandwich", price: 6.5, imgPath: "https://picsum.photos/seed/sandwich/300/300", img: "https://picsum.photos/seed/sandwich/300/300" },
      { name: "Cookie", price: 2.0, imgPath: "https://picsum.photos/seed/cookie/300/300", img: "https://picsum.photos/seed/cookie/300/300" },
    ],
  },
];

const categoryCount = db.prepare("SELECT COUNT(*) AS count FROM categories").get().count;
if (categoryCount === 0) {
  const insertCategory = db.prepare("INSERT INTO categories (strCategory, subcategories) VALUES (?, ?)");
  for (const category of seedCategories) {
    insertCategory.run(category.strCategory, JSON.stringify(category.subcategories));
  }
  console.log(`Seeded ${seedCategories.length} categories into SQLite`);
}

module.exports = db;
