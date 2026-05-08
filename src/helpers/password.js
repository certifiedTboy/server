const { scrypt, randomBytes } = require("crypto");
const { promisify } = require("util");

const scryptAsync = promisify(scrypt);

const hashPassword = async (password) => {
  const salt = randomBytes(16).toString("hex");

  const buffer = await scryptAsync(password, salt, 64);

  return `${buffer.toString("hex")}.${salt}`;
};

const comparePassword = async (providedPassword, storedPassword) => {
  const [hashedPassword, salt] = storedPassword.split(".");

  const buffer = await scryptAsync(providedPassword, salt, 64);

  return buffer.toString("hex") === hashedPassword;
};

module.exports = { hashPassword, comparePassword };
