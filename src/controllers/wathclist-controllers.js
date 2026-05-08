const { ResponseHandler } = require("../lib");
const {
  toggleMovieWatchlist,
  watchlistByUserId,
} = require("../services/watchlist-services");

const addMovieToWatchlist = async (req, res, next) => {
  try {
    const result = await toggleMovieWatchlist({
      ...req.body,
      createdBy: req.user.id,
    });

    ResponseHandler.created(res, result, "movie added to watchlist");
  } catch (error) {
    next(error);
  }
};

const getWatchlistByUser = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { page, limit } = req.query;

    const result = await watchlistByUserId(id, page, limit);

    ResponseHandler.ok(res, result, "watchlist retrieved successfully");
  } catch (error) {
    next(error);
  }
};

module.exports = { addMovieToWatchlist, getWatchlistByUser };
