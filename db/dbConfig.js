const pgp = require("pg-promise")();
require("dotenv").config();

const cn = {
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    database: process.env.PG_DATABASE,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    ssl: {
        rejectUnauthorized: false // For Heroku PostgreSQL databases, you may need to set this option
    }
};

let db;

try {
    db = pgp(cn);
    console.log("Connected to the database");
} catch (error) {
    console.error("Error connecting to the database:", error);
}

module.exports = db;
