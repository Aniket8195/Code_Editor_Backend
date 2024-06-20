const mongoose = require("mongoose");
const playgroundSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
});

module.exports = mongoose.model("Playground", playgroundSchema);
