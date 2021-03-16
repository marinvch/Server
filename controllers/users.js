import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import User from "../models/user.js";

export const register = async (req, res) => {
  const { email, password, confirmPassword } = req.body;
  try {
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

    const token = jwt.sign(
      { email: newUser.email, id: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res
      .cookie("token", token, {
        httpOnly: true,
      })
      .send();

    newUser.save();

    res.status(200).json({ newUser, token });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
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

    const token = jwt.sign({ user: existingUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res
      .cookie("token", token, {
        httpOnly: true,
      })
      .send();

    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getUser = async (req, res) => {
  try {
    const users = User.find();
    if (!user) {
      return res.status(404).json({ message: "User doesn't exist." });
    }
    res.status(200).json({ result: users });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const userLogout = async (req, res) => {
  try {
    res
      .cookie("token", "", {
        httpOnly: true,
        expires: new Date(0),
      })
      .status(200)
      .json({ message: "You are logedout" });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const userUpdate = async (req, res) => {
  try {
    const id = req.params.id;
    const { username, password } = req.body;
    models.User.update({ _id: id }, { username, password })
      .then((updatedUser) => res.send(updatedUser))
      .catch(next);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const userDelete = async (req, res) => {
  try {
    const id = req.params.id;
    models.User.deleteOne({ _id: id })
      .then((removedUser) => res.send(removedUser))
      .catch(next);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
