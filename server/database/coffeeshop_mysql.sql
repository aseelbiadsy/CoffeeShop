-- CoffeeShop MySQL import, migrated from coffeeshop.sqlite
-- Import with: mysql -u wnc -p -P 3306 < coffeeshop_mysql.sql

SET NAMES utf8mb4;
SET time_zone = '+00:00';
SET FOREIGN_KEY_CHECKS = 0;

CREATE DATABASE IF NOT EXISTS `coffeeshop`
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;
USE `coffeeshop`;

DROP TABLE IF EXISTS `checkouts`;
DROP TABLE IF EXISTS `categories`;
DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(320) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_users_name` (`name`),
  UNIQUE KEY `uq_users_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `categories` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `strCategory` VARCHAR(255) NULL,
  `subcategories` JSON NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `checkouts` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `userId` VARCHAR(255) NOT NULL,
  `orderDate` DATETIME(3) NOT NULL,
  `products` JSON NOT NULL,
  `totalAmount` DECIMAL(10,2) NOT NULL,
  `shippingAddress` TEXT NOT NULL,
  `customerName` VARCHAR(255) NOT NULL,
  `customerPhoneNumber` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_checkouts_userId` (`userId`),
  KEY `idx_checkouts_orderDate` (`orderDate`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `users` (`id`, `name`, `email`, `password`) VALUES
  (1, 'testuser', 'test@example.com', 'pass123'),
  (2, 'munee', 'test@test.com', 'test@test.com'),
  (3, 'Jamie Barista', 'jamie@coffeeshop.test', 'brew1234');

INSERT INTO `categories` (`id`, `strCategory`, `subcategories`) VALUES
  (1, 'Hot Coffee', JSON_ARRAY(JSON_OBJECT('name','Espresso','price',2.5,'imgPath','https://picsum.photos/seed/espresso/300/300','img','https://picsum.photos/seed/espresso/300/300'),JSON_OBJECT('name','Americano','price',3,'imgPath','https://picsum.photos/seed/americano/300/300','img','https://picsum.photos/seed/americano/300/300'),JSON_OBJECT('name','Latte','price',3.5,'imgPath','https://picsum.photos/seed/latte/300/300','img','https://picsum.photos/seed/latte/300/300'),JSON_OBJECT('name','Cappuccino','price',3.5,'imgPath','https://picsum.photos/seed/cappuccino/300/300','img','https://picsum.photos/seed/cappuccino/300/300'),JSON_OBJECT('name','Mocha','price',4,'imgPath','https://picsum.photos/seed/mocha/300/300','img','https://picsum.photos/seed/mocha/300/300'))),
  (2, 'Cold Coffee', JSON_ARRAY(JSON_OBJECT('name','Iced Latte','price',4,'imgPath','https://picsum.photos/seed/icedlatte/300/300','img','https://picsum.photos/seed/icedlatte/300/300'),JSON_OBJECT('name','Cold Brew','price',4,'imgPath','https://picsum.photos/seed/coldbrew/300/300','img','https://picsum.photos/seed/coldbrew/300/300'),JSON_OBJECT('name','Frappuccino','price',4.5,'imgPath','https://picsum.photos/seed/frappuccino/300/300','img','https://picsum.photos/seed/frappuccino/300/300'),JSON_OBJECT('name','Iced Americano','price',3.5,'imgPath','https://picsum.photos/seed/icedamericano/300/300','img','https://picsum.photos/seed/icedamericano/300/300'))),
  (3, 'Tea', JSON_ARRAY(JSON_OBJECT('name','Green Tea','price',2.5,'imgPath','https://picsum.photos/seed/greentea/300/300','img','https://picsum.photos/seed/greentea/300/300'),JSON_OBJECT('name','Black Tea','price',2.5,'imgPath','https://picsum.photos/seed/blacktea/300/300','img','https://picsum.photos/seed/blacktea/300/300'),JSON_OBJECT('name','Chai Latte','price',3.5,'imgPath','https://picsum.photos/seed/chailatte/300/300','img','https://picsum.photos/seed/chailatte/300/300'),JSON_OBJECT('name','Herbal Tea','price',3,'imgPath','https://picsum.photos/seed/herbaltea/300/300','img','https://picsum.photos/seed/herbaltea/300/300'))),
  (4, 'Desserts', JSON_ARRAY(JSON_OBJECT('name','Croissant','price',3,'imgPath','https://picsum.photos/seed/croissant/300/300','img','https://picsum.photos/seed/croissant/300/300'),JSON_OBJECT('name','Muffin','price',2.5,'imgPath','https://picsum.photos/seed/muffin/300/300','img','https://picsum.photos/seed/muffin/300/300'),JSON_OBJECT('name','Cheesecake','price',4.5,'imgPath','https://picsum.photos/seed/cheesecake/300/300','img','https://picsum.photos/seed/cheesecake/300/300'),JSON_OBJECT('name','Brownie','price',3.5,'imgPath','https://picsum.photos/seed/brownie/300/300','img','https://picsum.photos/seed/brownie/300/300'))),
  (5, 'Specialty Drinks', JSON_ARRAY(JSON_OBJECT('name','Caramel Macchiato','price',4.5,'imgPath','https://picsum.photos/seed/caramelmacchiato/300/300','img','https://picsum.photos/seed/caramelmacchiato/300/300'),JSON_OBJECT('name','Flat White','price',4,'imgPath','https://picsum.photos/seed/flatwhite/300/300','img','https://picsum.photos/seed/flatwhite/300/300'),JSON_OBJECT('name','Affogato','price',5,'imgPath','https://picsum.photos/seed/affogato/300/300','img','https://picsum.photos/seed/affogato/300/300'),JSON_OBJECT('name','Matcha Latte','price',4.25,'imgPath','https://picsum.photos/seed/matchalatte/300/300','img','https://picsum.photos/seed/matchalatte/300/300'))),
  (6, 'Snacks', JSON_ARRAY(JSON_OBJECT('name','Bagel','price',3,'imgPath','https://picsum.photos/seed/bagel/300/300','img','https://picsum.photos/seed/bagel/300/300'),JSON_OBJECT('name','Sandwich','price',6.5,'imgPath','https://picsum.photos/seed/sandwich/300/300','img','https://picsum.photos/seed/sandwich/300/300'),JSON_OBJECT('name','Cookie','price',2,'imgPath','https://picsum.photos/seed/cookie/300/300','img','https://picsum.photos/seed/cookie/300/300')));

INSERT INTO `checkouts` (`id`, `userId`, `orderDate`, `products`, `totalAmount`, `shippingAddress`, `customerName`, `customerPhoneNumber`) VALUES
  (1, '1', '2026-09-04 18:55:36.613', JSON_ARRAY(JSON_OBJECT('name','Latte','quantity',2,'price',3.5)), 7.00, '123 Main St', 'Test', '555-1234'),
  (2, '2', '2026-09-04 18:59:36.654', JSON_ARRAY(JSON_OBJECT('name','Cappuccino','quantity',3,'price',3.5)), 10.50, 'Isreal Jerusalem', 'munee', '0532777432'),
  (3, '3', '2026-09-04 19:18:08.149', JSON_ARRAY(JSON_OBJECT('name','Espresso','quantity',1,'price',2.5)), 2.50, '123 Main St, Tel Aviv', 'Jamie Barista', '555-1234');

ALTER TABLE `users` AUTO_INCREMENT = 4;
ALTER TABLE `categories` AUTO_INCREMENT = 7;
ALTER TABLE `checkouts` AUTO_INCREMENT = 4;

SET FOREIGN_KEY_CHECKS = 1;
