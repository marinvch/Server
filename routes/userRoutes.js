const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

router.post("/register", async (req, res) => {
  try {
    let { email, password, checkPassword } = req.body;

    if (!email || !password || !checkPassword) {
      return res.status(400).json({ msg: "Not all fields were not entered!!" });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ msg: "Password need to be minimum 8 characters long" });
    }

    if (password !== checkPassword) {
      return res.status(400).json({ msg: "Passwords need to be the same" });
    }

    if (username === null) {
      username = email;
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ msg: "User with this email already exist!!!" });
    }

    //incrypting password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      passwordHash,
      username,
    });
    console.log(newUser);

    const savedUser = await newUser.save();
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res
        .status(400)
        .json({ errorMessage: "Please enter all required fields." });

    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res.status(401).json({ errorMessage: "Wrong email or password." });

    const passwordCorrect = await bcrypt.compare(
      password,
      existingUser.passwordHash
    );
    if (!passwordCorrect)
      return res.status(401).json({ errorMessage: "Wrong email or password." });
    console.log("loged in");
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

router.get("/logout", (req, res) => {
  res
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
    })
    .send();
});

module.exports = router;
