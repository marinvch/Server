import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();

import userRoutes from "./routes/user.js";
import postRoutes from "./routes/posts.js";

//Setting server

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

//Routes
app.use("/auth", userRoutes);
app.use("/posts", postRoutes);

///credetntials to .env file
dotenv.config();

//Setup server port
const PORT = process.env.PORT || 5000;

//Connect to Databse
mongoose
  .connect(process.env.MDB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

mongoose.set("useFindAndModify", false);
