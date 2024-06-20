const mongoose = require("mongoose");

const detailsSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  easy: {
    type: Number,
  },
  medium: {
    type: Number,
  },
  hard: {
    type: Number,
  },
  score: {
    type: Number,
  },
  submission: [
    {
      value: {
        type: Number,
        required: true,
      },
      day: {
        type: String,
        required: true,
      },
    },
  ],
  problems: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Problem",
    },
  ],
});

module.exports = mongoose.model("Details", detailsSchema);
