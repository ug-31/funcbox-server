const mongoose = require("mongoose");
const Bucket = require("./Bucket");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  buckets: [Bucket.schema],
});

module.exports = mongoose.model("User", userSchema);
