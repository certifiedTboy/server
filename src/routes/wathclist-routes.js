const express = require("express");
const {
  addMovieToWatchlist,
  getWatchlistByUser,
} = require("../controllers/wathclist-controllers");
const { authGuard } = require("../middlewares/auth");

const watchlistRoutes = express.Router();

watchlistRoutes.post("/", authGuard, addMovieToWatchlist);
watchlistRoutes.get("/", authGuard, getWatchlistByUser);

module.exports = watchlistRoutes;
