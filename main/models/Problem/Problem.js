const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema({
  qno: {
    type: String,
  },
  level: {
    type: String,
  },
  problemTitle: {
    type: String,
  },
  problem: {
    type: String,
  },
  sampleCode: [
    {
      lang: {
        type: String,
      },
      code: {
        type: String,
      },
    },
  ],
  sampleTestCase: [
    {
      input: {
        type: String,
      },
      output: {
        type: String,
      },
    },
  ],
  TestCase: [
    {
      input: {
        type: String,
      },
      output: {
        type: String,
      },
    },
  ],

  status: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Problem", problemSchema);
