const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv"); 
const cors = require("cors");
const cookieParser = require("cookie-parser");

dotenv.config();

//Setting server

const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));

app.use(express.json());
app.use(cookieParser());

//Connect to Databse
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
mongoose.connect(process.env.MDB_CONNECTION, options, (err) => {
  if (err) {
    return console.error(err);
  }
  console.log("Connected to MongoDB");
});

//Routes
app.use("/auth", require("./routes/userRouter"));
app.use("/posts", require("./routes/postRouter"));
app.use("/comments", require("./routes/commentRouter"));
