const router = require("express").Router();

const User = require("../models/User");

const Bucket = require("../models/Bucket");

const authorization = require("../middleware/authorization");

const validInfoText = require("../middleware/validInfoText");

router.get("/", authorization, async (req, res) => {
  try {
    const id = req.user;

    const user = await User.findOne({ _id: id });

    res.json(user.name);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

router.post("/", authorization, validInfoText, async (req, res) => {
  try {
    const id = req.user;

    const foundUser = await User.findOne({ _id: id });

    const checkBname = await User.findOne({
      _id: foundUser._id,
      "buckets.bname": req.body.bname,
    });

    if (checkBname) {
      return res
        .status(400)
        .json("Bucket name exists pls select another bucket name");
    }

    User.findById(foundUser._id, (error, user) => {
      if (error) {
        return res.status(400).json("Internal Error");
      } else {
        const bucketModel = new Bucket({
          bname: req.body.bname,
          text: req.body.text,
        });

        user.buckets.push(bucketModel);
        user.save();
      }
    });

    return res.json("Bucket Added with text");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

router.get("/bucket", authorization, async (req, res) => {
  try {
    const id = req.user;

    const user = await User.findOne({ _id: id });

    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
