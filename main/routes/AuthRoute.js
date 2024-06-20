const express = require("express");
const router = express.Router();

const { signup, login, sendotp } = require("../controllers/Auth");

const { auth } = require("../middleware/auth");
const { addProblemToUser } = require("../controllers/User/Problem");
const { showprofile } = require("../controllers/User");
router.post("/signup", signup);
router.post("/login", login);
router.post("/sendotp", sendotp);
router.post("/addproblemtouser", addProblemToUser);
router.post("/showprofile", showprofile);

module.exports = router;
