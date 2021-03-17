import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const register = async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(404)
        .json({ message: "User with this email already exist." });
    }

    if (password !== confirmPassword) {
      return res.status(409).json({ message: "Passwords don't match" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      email,
      password: hashedPassword,
    });

    newUser.save();
    res.json(newUser);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ message: "User doesn't exist." });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      return res.status(404).json({ message: "Invalid Credentials." });
    }

    const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({
      token,
      user: {
        id: existingUser._id,
        email: existingUser.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const userDelete = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.user);
    res.json(deletedUser);
    console.log(req.user);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const validToken = async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) {
      return res.json(false);
    }
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    if (!verified) {
      return res.json(false);
    }
    const user = await User.findById(verified.id);

    if (!user) {
      return res.json(false);
    }

    return res.json(true);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getUser = async (req, res) => {
  const user = await User.findById(req.user);
  res.json({
    email: user.email,
    id: user._id,
  });
};

export const allUsers = async (req, res) => {
  const users = await User.find({});
  res.send(users);
};
