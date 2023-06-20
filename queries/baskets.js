const db = require("../db/dbConfig.js");

const getAllBaskets = async () => {
  try {
    const allBaskets = await db.any("SELECT * FROM basket");
    return allDispensaries;
  } catch (error) {
    return error;
  }
};

const getOneBasket = async (idVal) => {
  try {
    const oneBasket = await db.one("SELECT * FROM basket WHERE id=$1", idVal);
    return oneBasket;
  } catch (error) {
    return error;
  }
};

const createBasket = async (basket) => {
  try {
    const newBasket = await db.one(
      "INSERT INTO basket (client_user_ID, dispensary_ID) VALUES ($1, $2) RETURNING *",
      [
        basket.client_user_ID,
        basket.dispensary_ID,
      ]
    );
    return newBasket;
  } catch (error) {
    return error;
  }
};

const updateBasket = async (basket, idVal) => {
  try {
    const updatedBasket = await db.one(
      "UPDATE basket SET client_user_ID=$1, dispensary_ID=$2 WHERE $3 RETURNING *",
      [
        basket.client_user_ID,
        basket.dispensary_ID,
        idVal
      ]
    );
    return updatedBasket;
  } catch (error) {
    return error;
  }
};

const deleteBasket = async (idVal) => {
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
  getAllStoreItems,
  getOneStoreItem,
  createStoreItem,
  updateStoreItem,
  deleteStoreItem
};
