const db = require("../db/dbConfig.js");


const getAllOrders = async (client_user_id) => {
  try {
    console.log(client_user_id)
    const allOrders = await db.any("SELECT * FROM client_order WHERE client_user_id=$1", client_user_id);
    return allOrders;
  } catch (error) {
    return error;
  }
};

const getOneOrder = async (idVal) => {
  try {
    const oneOrder = await db.one("SELECT * FROM client_order WHERE id=$1", idVal);
    return oneOrder;
  } catch (error) {
    return error;
  }
};

const createOrder = async (order) => {
  try {
    const newOrder = await db.one(
      "INSERT INTO store_item (total, status, client_user_id, dispensary_id) VALUES ($1, $2, $3, $4) RETURNING *",
      [
        order.total,
        order.status,
        order.client_user_id,
        order.dispensary_id,
      ]
    );
    return newOrder;
  } catch (error) {
    return error;
  }
};

const updateOrder = async (storeItem, idVal) => {
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

const deleteStoreItem = async (idVal) => {
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
  getAllOrders
};
