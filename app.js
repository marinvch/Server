import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import userRoutes from "./routes/user.js";
import postRoutes from "./routes/post.js";
import commentRoutes from "./routes/post.js";

dotenv.config();

//Setting server

const app = express();

app.use(express.static(path.join("build")));

app.use(
  cors({
    origin: ["http://localhost:3000", "http://forum.marinvch.eu"],
    credentials: true,
  })
);

app.use(express.static(path.join("build", "../client/public")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
app.use("/auth", userRoutes);
app.use("/posts", postRoutes);
app.use("/comments", commentRoutes);

//Setup server port
const PORT = process.env.PORT || 5000;

//Connect to Databse
mongoose
  .connect(process.env.MONGODB_URI, {
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
