import jwt from "jsonwebtoken";
import User from "../models/user.js";

const auth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      res.status(401).json({ error: "Need to be logged in." });
    }

    const token = authorization.replace("Bearer ", "");

    jwt.verify(token, process.env.JWT_SECRET, async (err, playload) => {
      if (err) {
        return res.status(401).json({ error: "Need to be logged in." });
      }
      const { _id } = playload;
      await User.findById(_id).then((userdata) => {
        req.user = userdata;
        next();
      });
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default auth;
