const Problem = require("../models/Problem/Problem");

exports.addProblem = async (req, res) => {
  try {
    const { qno, level, problem, sampleTestCase } = req.body;
    const TestCase = req.body.TestCase;

    if (!qno || !level || !problem || !sampleTestCase || !TestCase) {
      return res.status(400).json({
        success: false,
        message: "Enter Proper Problem Data",
      });
    }
    const addquestion = await Problem.create({
      qno: qno,
      level: level,
      problem: problem,
    });

    return res.status(200).json({
      success: true,
      addquestion,
      message: "Question added successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Question error ",
    });
  }
};
//

//
// display the problem
//
exports.showProblem = async (req, res) => {
  try {
    const problemId = req.body.problemId;

    const pdetails = await Problem.findById(problemId);

    return res.status(200).json({
      success: true,
      data: pdetails,
      message: "Problem Details",
    });
  } catch (error) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Error in problem Details ",
    });
  }
};

exports.showallproblem = async (req, res) => {
  try {
    const problem = await Problem.find({});
    if (!problem) {
      return res
        .status(404)
        .json({ success: false, message: "No problems found" });
    }
    return res.status(200).json({
      success: true,
      data: problem,
      message: "Problem Details",
    });
  } catch (error) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Error in problem Details ",
    });
  }
};
