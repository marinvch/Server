import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const register = async (req, res) => {
  try {
    const { email, username, password, confirmPassword } = req.body;

    if (!email || !username || !password || !confirmPassword) {
      return res.status(422).json({ error: "Need to fill al fields." });
    }

    const findUser = await User.findOne({ email });

    if (findUser) {
      return res
        .status(422)
        .json({ error: "User with this email already exist." });
    }

    if (password !== confirmPassword) {
      return res.status(409).json({ error: "Passwords don't match." });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({
      email,
      username,
      password: hashedPassword,
    });

    newUser.save();
    res.json({ message: "Registration successful." });
  } catch (error) {
    res.status(422).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(422).json({ error: "Please enter all fields." });
    }

    const findUser = await User.findOne({ email });

    if (!findUser) {
      return res.status(422).json({ error: "Invalid Credentials." });
    }

    const isPasswordCorrect = await bcrypt.compare(password, findUser.password);

    if (!isPasswordCorrect) {
      return res.status(422).json({ error: "Invalid Credentials." });
    }

    // res.json({ message: "successfully loged In" });

    const token = jwt.sign({ _id: findUser._id }, process.env.JWT_SECRET);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};
