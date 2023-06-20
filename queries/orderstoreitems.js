const db = require("../db/dbConfig.js");


const getAllOrderStoreItems = async (client_user_id) => {
  try {
    console.log(client_user_id)
    const allOrderStoreItems = await db.any("SELECT * FROM order_store_item WHERE client_order_id=$1", client_user_id);
    return allOrderStoreItems;
  } catch (error) {
    return error;
  }
};

const getOneOrderStoreItem = async (idVal) => {
  try {
    const oneOrderStoreItem = await db.one("SELECT * FROM order_store_item WHERE id=$1", idVal);
    return oneOrderStoreItem;
  } catch (error) {
    return error;
  }
};

const createOrderStoreItem = async (orderStoreItem) => {
  try {
    const newStoreItem = await db.one(
      "INSERT INTO store_item (quantity, client_order_id, store_item_id) VALUES ($1, $2, $3) RETURNING *",
      [
        orderStoreItem.quantity,
        orderStoreItem.client_order_id,
        orderStoreItem.store_item_id
      ]
    );
    return newStoreItem;
  } catch (error) {
    return error;
  }
};

const updateOrderStoreItem = async (orderStoreItem, idVal) => {
  try {
    const updatedStoreItem = await db.one(
      "UPDATE store_item SET Name=$1, Image=$2, Description=$3, Price=$4, dispensary_ID=$5 WHERE id=$6 RETURNING *",
      [
        orderStoreItem.quantity,
        orderStoreItem.client_order_id,
        orderStoreItem.store_item_id,
        idVal
      ]
    );
    return updatedStoreItem;
  } catch (error) {
    return error;
  }
};

const deleteOrderStoreItem = async (idVal) => {
  try {
    const deletedOrderStoreItem = await db.one(
      "DELETE FROM store_item WHERE id=$1 RETURNING *",
      idVal
    );
    return deletedOrderStoreItem;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getAllOrderStoreItems,
  getOneOrderStoreItem,
  createOrderStoreItem,
  updateOrderStoreItem,
  deleteOrderStoreItem
};
