const jwt = require("jsonwebtoken");

const generateJWT = (secret, payload, expiresIn) => {
  return jwt.sign(payload, secret, { expiresIn });
};

const verifyJWT = (secret, token) => {
  return jwt.verify(token, secret);
};

module.exports = { generateJWT, verifyJWT };
