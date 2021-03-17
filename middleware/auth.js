import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  try {
    const token = req.header("x-auth-token");

    if (!token) {
      res.status(401).json({ message: "No authentication." });
    }

    const verifyed = jwt.verify(token, process.env.JWT_SECRET);

    if (!verifyed) {
      res.status(401).json({ message: "No authentication." });
    }

    req.user = verifyed.id;
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default auth;
