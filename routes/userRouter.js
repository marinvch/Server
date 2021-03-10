const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

//Registe a new User
router.post("/", async (req, res) => {
  try {
    let { email, password, passwordVerify } = req.body;

    if (!email || !password || !passwordVerify) {
      return res
        .status(400)
        .json({ errorMessage: "Plese enter all required fields." });
    }
    if (password !== passwordVerify) {
      return res.status(400).json({ errorMessage: "Passwords do not match." });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ errorMessage: "Passwords needs at least 6 characters." });
    }
    const existingUser = await User.findOne({ email: email });

    //crypting the password

    let hashedPassword = await bcrypt.hash(password, 10);
    password = hashedPassword;

    if (existingUser) {
      return res
        .status(400)
        .json({ errorMessage: "User with this email already exist." });
    }

    const newUser = new User({
      _id: new mongoose.Types.ObjectId(),
      email,
      password,
    });

    await newUser.save();

    const token = jwt.sign(
      {
        user: newUser._id,
      },
      process.env.JWT_SECRET
    );

    res
      .cookie("token", token, {
        httpOnly: true,
      })
      .send();
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
});

//Login User
router.post("/login", async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ errorMessage: "Plese enter all required fields." });
    }
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(401).json({ errorMessage: "Wrong email or password" });
    }

    const correctPassword = bcrypt.compare(password, existingUser.password);
    if (!correctPassword) {
      return res.status(401).json({ errorMessage: "Wrong email or password" });
    }

    const token = jwt.sign(
      {
        user: existingUser._id,
      },
      process.env.JWT_SECRET
    );

    res
      .cookie("token", token, {
        httpOnly: true,
      })
      .send();
  } catch (err) {
    console.error(error);
    res.status(500).send();
  }
});

//Logout User

router.get("/logout", (req, res) => {
  res
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
    })
    .send();
});

module.exports = router;
