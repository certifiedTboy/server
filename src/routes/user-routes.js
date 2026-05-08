const express = require("express");
const {
  createNewUser,
  verifyUserAccount,
  getCurrentUser,
} = require("../controllers/user-controllers");
const {
  checkValidationErrors,
  createUserValidationRules,
  verifyUserValidationRules,
} = require("../middlewares/data-validators");
const { sanitizeData } = require("../middlewares/sanitize-data");
const { authGuard } = require("../middlewares/auth");

const userRoutes = express.Router();

userRoutes.post(
  "/",
  createUserValidationRules,
  checkValidationErrors,
  sanitizeData,
  createNewUser,
);

userRoutes.put(
  "/verify",
  verifyUserValidationRules,
  checkValidationErrors,
  sanitizeData,
  verifyUserAccount,
);

userRoutes.get("/me", authGuard, getCurrentUser);

module.exports = userRoutes;
