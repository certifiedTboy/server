const mongoose = require("mongoose");

const watchlistSchema = new mongoose.Schema(
  {
    movieId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },

    overview: {
      type: String,
      required: true,
    },

    imageUri: {
      type: String,
      required: true,
    },

    releaseYear: {
      type: Date,
      required: true,
    },

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  },
  { timestamps: true },
);

const Watchlist = mongoose.model("watchlist", watchlistSchema);

module.exports = Watchlist;
