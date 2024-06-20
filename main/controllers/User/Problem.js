const User = require("../../models/User/User");
const Details = require("../../models/User/Details");
const Problem = require("../../models/Problem/Problem");

exports.addProblemToUser = async (req, res) => {
  try {
    const userId = req.body.userId;
    const problemId = req.body.problemId;

    const problem = await Problem.findById(problemId);

    if (!problem) {
      return res.status(400).json({
        success: false,
        message: "Problem not found",
      });
    }

    const user = await Details.findOne({ userId });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.problems.includes(problemId)) {
      const today = new Date().toISOString().split("T")[0];
      const submissionIndex = user.submission.findIndex(
        (entry) => entry.day === today
      );

      if (submissionIndex !== -1) {
        user.submission[submissionIndex].value++;
      } else {
        user.submission.push({ value: 1, day: today });
      }

      await user.save();
      return res.status(200).json({
        success: true,
        message: "User already added this problem",
      });
    }

    if (problem.level === "Easy") {
      user.easy++;
    } else if (problem.level === "Medium") {
      user.medium++;
    } else {
      user.hard++;
    }

    user.score += 5;
    user.problems.push(problemId);

    const today = new Date().toISOString().split("T")[0];
    console.log(today);
    // display current time
    let startTime = new Date().getHours() + ":00";
    console.log(startTime);

    const submissionIndex = user.submission.findIndex(
      (entry) => entry.day === today
    );

    if (submissionIndex !== -1) {
      user.submission[submissionIndex].value++;
    } else {
      user.submission.push({ value: 1, day: today });
    }

    await user.save();

    return res.status(200).json({
      success: true,
      data: problem,
      message: "Question added successfully",
    });
  } catch (error) {
    console.error("Error adding problem to user:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
