const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const dotenv = require("dotenv");
const { getLoginByEmail } = require("../queries/clientusers.js");

dotenv.config();

const generateWebToken = (email) => {
    return JWT.sign({ email: email }, process.env.SECRET_TOKEN, {
      expiresIn: '720h',
    });
  };
  
const userLogin = async (req, res, next) => {
    const { email, password } = req.body;
    const credentials = await getLoginByEmail(email);
    if (!credentials.message) {
      const isPassValid = await bcrypt.compare(password, credentials.password);
      if (isPassValid) {
        const token = generateWebToken(email);
        req.body.token = token;
        req.body["user_id"] = credentials["id"]
        next();
      } else {
        res.status(400).json({ error: "Invalid password" });
      }
    } else {
      res.status(401).json({ error: `No account linked to ${email}` });
    }
  };

const hashPass = (req, res, next) => {
    bcrypt.genSalt().then((salt) => {
      bcrypt
        .hash(req.body.password, salt)
        .then((hash) => {
          req.body.password = hash;
        })
        .then(() => next());
    });
  };

  

module.exports = {
    hashPass,
    userLogin
  };