const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

mongoose.connect(
  process.env.MONGODB,
  {
    useNewUrlParser: true,
  },
  () => console.log("connected")
);

app.use(express.json());
app.use(cors());

app.use("/auth", require("./routes/jwtauth"));
app.use("/dashboard", require("./routes/dashboard"));

app.listen(process.env.PORT, () => {
  console.log("server running");
});
