const mongoose = require("mongoose");

const bucketSchema = new mongoose.Schema({
  bname: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Bucket", bucketSchema);
