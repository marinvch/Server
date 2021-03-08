const mongoose = require("mongoose");

console.log("Trying to connect to Database");

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let db = mongoose.connection;

db.on("open", () => console.log("Database is connected"));
db.once("error", (err) => {
  console.log(err);
});
