const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const routes = require("./routes/index");

dotenv.config();

// set up server
const app = express();

//Databse connection
require("./db");

//middlewares
app.use(express.json());
app.use("/api", routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
