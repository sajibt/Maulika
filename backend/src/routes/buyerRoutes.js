const express = require("express");
const router = express.Router();
const { getBuyerData } = require("../controllers/buyerControllers");
const checkAuth = require("../middleware/checkAuth");

// Buyer route
router.get("/buyer", checkAuth, getBuyerData);

module.exports = router;
