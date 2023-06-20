DROP DATABASE IF EXISTS leafme_db;
CREATE DATABASE leafme_db;

\c leafme_db;

DROP TABLE IF EXISTS dispensary;
-- Create the dispensary table
CREATE TABLE dispensary (
  id SERIAL PRIMARY KEY,
  dispensary VARCHAR(255) NOT NULL,
  Image VARCHAR(255),
  deliveryFee DECIMAL(10, 2),
  minDeliveryTime INTEGER,
  maxDeliveryTime INTEGER,
  Rating DECIMAL(3, 2),
  Address VARCHAR(255),
  Lat DECIMAL(9, 6),
  Long DECIMAL(9, 6)
);

DROP TABLE IF EXISTS store_item;
-- Create the Store Item table
CREATE TABLE store_item (
  id SERIAL PRIMARY KEY,
  Name VARCHAR(255) NOT NULL,
  Image VARCHAR(255),
  Description TEXT,
  Price DECIMAL(10, 2),
  dispensary_id INTEGER REFERENCES dispensary(id)
);

DROP TABLE IF EXISTS client_user;
-- Create the User table
CREATE TABLE client_user (
  id SERIAL PRIMARY KEY,
  Name VARCHAR(255) NOT NULL,
  Address VARCHAR(255),
  Latitude DECIMAL(9, 6),
  Longitude DECIMAL(9, 6)
);

DROP TABLE IF EXISTS basket;
-- Create the Basket table
CREATE TABLE basket (
  id SERIAL PRIMARY KEY,
  client_user_id INTEGER REFERENCES client_user(id),
  dispensary_id INTEGER REFERENCES dispensary(id)
);

DROP TABLE IF EXISTS basket_store_item;
-- Create the Basket Store Item table
CREATE TABLE basket_store_item (
  id SERIAL PRIMARY KEY,
  Quantity INTEGER,
  basket_id INTEGER REFERENCES basket(id),
  store_item_id INTEGER REFERENCES store_item(id)
);

DROP TABLE IF EXISTS client_order;
-- Create the Order table
CREATE TABLE client_order (
  ID SERIAL PRIMARY KEY,
  Total DECIMAL(10, 2),
  Status VARCHAR(255),
  client_user_id INTEGER REFERENCES client_user(id),
  dispensary_id INTEGER REFERENCES dispensary(id)
);

DROP TABLE IF EXISTS order_store_item;
-- Create the Order Store Item table
CREATE TABLE order_store_item (
  ID SERIAL PRIMARY KEY,
  Quantity INTEGER,
  client_order_id INTEGER REFERENCES client_order(id),
  store_item_id INTEGER REFERENCES store_item(id)
);


