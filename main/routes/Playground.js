const express = require("express");
const router = express.Router();

const { compilecode } = require("../controllers/Playground/Compiler");

// Handle POST requests to compile code
router.post("/compile", compilecode);

module.exports = router;
