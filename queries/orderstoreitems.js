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
    const oneStoreItem = await db.one("SELECT * FROM order_store_item WHERE id=$1", idVal);
    return oneStoreItem;
  } catch (error) {
    return error;
  }
};

const createOrderStoreItem = async (storeItem) => {
  try {
    const newStoreItem = await db.one(
      "INSERT INTO store_item (Name, Image, Description, Price, dispensary_ID) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [
        storeItem.Name,
        storeItem.Image,
        storeItem.Description,
        storeItem.Price,
        storeItem.dispensary_ID,
      ]
    );
    return newStoreItem;
  } catch (error) {
    return error;
  }
};

const updateOrderStoreItem = async (storeItem, idVal) => {
  try {
    const updatedStoreItem = await db.one(
      "UPDATE store_item SET Name=$1, Image=$2, Description=$3, Price=$4, dispensary_ID=$5 WHERE id=$6 RETURNING *",
      [
        storeItem.Name,
        storeItem.Image,
        storeItem.Description,
        storeItem.Price,
        storeItem.dispensary_ID,
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
    const deletedStoreItem = await db.one(
      "DELETE FROM store_item WHERE id=$1 RETURNING *",
      idVal
    );
    return deletedStoreItem;
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
