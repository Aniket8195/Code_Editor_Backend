const Details = require("../models/User/Details");
const User = require("../models/User/User");

exports.showprofile = async (req, res) => {
  try {
    const userId = req.body.userId;
    const details = await Details.findOne({ userId }).populate("problems");

    if (!details) {
      return res.status(404).json({
        success: false,
        message: "User details not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: details,
      message: "Details fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching user details:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
