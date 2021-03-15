import jwt from "jsonwebtoken";

function auth(req, res, next) {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ errorMessage: "Unauthorized" });
    }

    const verify = jwt.verify(token, process.env.JWT_SECRET);

    userId = verify.id;
    next();
  } catch (err) {
    res.status(401).json({ errorMessage: "Unauthorized" });
  }
}

export default auth;
