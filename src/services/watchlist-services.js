const Watchlist = require("../models/watchlist-model");
const { checkUserExists } = require("./user-services");
const { getPagination } = require("../helpers/pagination");

const toggleMovieWatchlist = async (movieData) => {
  const watchlistExist = await Watchlist.findOne({
    movieId: movieData.movieId,
  });

  if (watchlistExist) {
    await Watchlist.deleteOne({ _id: watchlistExist._id });
    return {};
  }
  const watchlist = await Watchlist.create(movieData);

  return watchlist;
};

const watchlistByUserId = async (userId, page, limit) => {
  const { pageNumber, limitNumber, skip } = getPagination(page, limit);
  const watchlists = await Watchlist.find({ createdBy: userId })
    .skip(skip)
    .limit(limitNumber)
    .populate("createdBy", "firstName lastName email isVerified");

  return watchlists;
};

module.exports = { toggleMovieWatchlist, watchlistByUserId };

// pagination
// api documentation
