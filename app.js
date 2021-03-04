const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

//Seting up Express

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

console.log("Server is waiting for start");

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//Setting up Routes

app.use("/posts", require("./routes/postRoutes"));
app.use("/users", require("./routes/userRoutes"));

//Setting up Database

console.log("Database is starting connection");

const options = {
  useFindAndModify: true,
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

mongoose.connect(process.env.MONGODB_URI, options, (err) => {
  if (err) {
    return console.error(err);
  }

  console.log(`Database is connected!!!`);
});
