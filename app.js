import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/user.js";
import postRoutes from "./routes/post.js";
import commentRoutes from "./routes/comment.js";

dotenv.config();

//Setting server
const app = express();

app.use(cors());
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
  .connect(
    "mongodb+srv://marin:marin123@cluster0.vucmi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

mongoose.set("useFindAndModify", false);

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join("build", "index.html")));
// }
