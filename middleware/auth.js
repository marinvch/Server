import jwt from "jsonwebtoken";

export default function auth(req, res, next) {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ errorMessage: "Unauthorized" });
    }
    const decode = jwt.decode(token);
    const verify = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    res.status(401).json({ errorMessage: "Unauthorized" });
  }
}
