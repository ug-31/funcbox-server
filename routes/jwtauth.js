const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const validInfo = require("../middleware/validInfo");
const authorization = require("../middleware/authorization");
const jwtGenerator = require("../utils/jwtgenerator");
const { findOne } = require("../models/User");

router.get("/login", (req, res) => {
  res.send("working");
});

router.post("/register", validInfo, async (req, res) => {
  try {
    const checkEmail = await User.findOne({ email: req.body.email });
    if (checkEmail) {
      return res.status(400).json("email exits");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    const sUser = await user.save();
    const token = jwtGenerator(sUser._id);

    res.json({ token });
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
});

router.post("/login", validInfo, async (req, res) => {
  try {
    const checkUser = await User.findOne({ email: req.body.email });
    if (!checkUser) {
      return res.status(400).json("Email doesn't exists");
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      checkUser.password
    );

    if (!validPassword) {
      return res.status(400).json("Wrong combination of email and password");
    }

    const token = jwtGenerator(checkUser._id);

    res.json({ token });
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
});

router.get("/verify", authorization, (req, res) => {
  try {
    res.json(true);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Message");
  }
});

module.exports = router;
