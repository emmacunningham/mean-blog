const mongoose = require("mongoose");
const dataBaseConfig = require("./db");

// Connecting mongoDB
const initDb = () => {
  mongoose.Promise = global.Promise;
  mongoose
    .connect(dataBaseConfig.db, {
      useNewUrlParser: true,
      useFindAndModify: false,
    })
    .then(
      () => {
        console.log("Database connected sucessfully ");
      },
      (error) => {
        console.log("Could not connected to database : " + error);
      }
    );
};

module.exports = initDb;
