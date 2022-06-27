require("dotenv").config();
const mongoose = require("mongoose");

let env = process.env.NODE_ENV;
let mongoUri = "http://localhost:27017/recipes";
if (env == "staging") {
  mongoUri = process.env.MONGO_URI;
} else if (env == "local") {
  mongoUri = "mongodb://localhost:27017";
}

const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: "recipes",
};
module.exports = () => {
  mongoose
    .connect(mongoUri, mongoOptions)
    .then((resp) => {
      console.log("Connected to Database: " + resp.connection.host + "/" + mongoOptions.dbName);
    })
    .catch((err) => {
      console.log("error", err);
    });

  mongoose.connection.on("error", console.error.bind(console, "connection error:"));
};
