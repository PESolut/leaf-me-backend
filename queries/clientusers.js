const db = require("../db/dbConfig.js");

const getAllClientUsers = async () => {
  try {
    const allClientUsers = await db.any("SELECT * FROM client_user");
    return allClientUsers;
  } catch (error) {
    return error;
  }
};

const getOneClientUser = async (idVal) => {
  try {
    const oneClientUser = await db.one("SELECT * FROM client_user WHERE id=$1", idVal);
    return oneClientUser;
  } catch (error) {
    return error;
  }
};

const createClientUser = async (clientUser) => {
  try {
    const newClientUser = await db.one(
      "INSERT INTO client_user (Name, Address, Latitude, Longitude) VALUES ($1, $2, $3, $4) RETURNING *",
      [
        clientUser.Name,
        clientUser.Address,
        clientUser.Latitude,
        clientUser.Longitude
      ]
    );
    return newClientUser;
  } catch (error) {
    return error;
  }
};

const updateClientUser = async (clientUser, idVal) => {
  try {
    const updatedClientUser = await db.one(
      "UPDATE client_user SET Name=$1, Address=$2, latitude=$3, longitude=$4 WHERE id=$5 RETURNING *",
      [
        clientUser.Name,
        clientUser.Address,
        clientUser.Latitude,
        clientUser.Longitude,
        idVal
      ]
    );
    return updatedClientUser;
  } catch (error) {
    return error;
  }
};

const deleteClientUser = async (idVal) => {
  try {
    const deletedClientUser = await db.one(
      "DELETE FROM client_user WHERE id=$1 RETURNING *",
      idVal
    );
    return deletedClientUser;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getAllClientUsers,
  getOneClientUser,
  createClientUser,
  updateClientUser,
  deleteClientUser
};
