const express = require("express");
const {
  loginUser,
  getNewAcessToken,
} = require("../controllers/auth-controllers");
const { authHeaderGuard } = require("../middlewares/auth");

const authRoutes = express.Router();

authRoutes.post("/login", loginUser);
authRoutes.get("/new-access-token", authHeaderGuard, getNewAcessToken);

module.exports = authRoutes;
