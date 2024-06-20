const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  profileImg: {
    type: String,
  },
  playground: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Playground",
  },
  additionalDetails: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Details",
  },
});

module.exports = mongoose.model("User", userSchema);
