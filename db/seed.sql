\c leafme_db
-- Insert example data into the dispensary table
INSERT INTO dispensary (name, image, deliveryFee, minDeliveryTime, maxDeliveryTime, rating, address, latitude, longitude)
VALUES
  ('Dispensary 1', 'image1.jpg', 5.99, 30, 60, 4.5, '123 Main St', 40.7128, -74.0060),
  ('Dispensary 2', 'image2.jpg', 7.99, 45, 75, 3.9, '456 Elm St', 40.7306, -73.9352);

-- Insert example data into the store_item table
INSERT INTO store_item (name, image, description, price, dispensary_ID)
VALUES
  ('Item 1', 'item1.jpg', 'Description for Item 1', 9.99, 1),
  ('Item 2', 'item2.jpg', 'Description for Item 2', 12.99, 1),
  ('Item 3', 'item3.jpg', 'Description for Item 3', 6.99, 2);

-- Insert example data into the client_user table
INSERT INTO client_user (name, address, latitude, longitude)
VALUES
  ('John Doe', '789 Oak St', 40.7559, -73.9864),
  ('Jane Smith', '321 Pine St', 40.7401, -73.9903);

-- Insert example data into the basket table
INSERT INTO basket (client_user_ID, dispensary_ID)
VALUES
  (1, 1),
  (2, 2);

-- Insert example data into the basket_store_item table
INSERT INTO basket_store_item (Quantity, basket_ID, store_item_ID)
VALUES
  (2, 1, 1),
  (1, 1, 2),
  (3, 2, 3);

-- Insert example data into the client_order table
INSERT INTO client_order (total, status, client_user_ID, dispensary_ID)
VALUES
  (35.99, 'NEW', 1, 1),
  (19.99, 'NEW', 2, 2);

-- Insert example data into the order_store_item table
INSERT INTO order_store_item (quantity, client_order_ID, store_item_ID)
VALUES
  (2, 1, 1),
  (1, 1, 2),
  (3, 2, 3);
