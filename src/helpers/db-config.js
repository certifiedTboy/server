const mongoose = require("mongoose");
const { DB_URI } = require("../lib");

/**
 * connect to the mongodb database using
 * mongoose ODM connect method
 */
const connectDb = async () => {
  try {
    await mongoose.connect(DB_URI);

    console.log("connected to db");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDb;
