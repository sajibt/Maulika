const express = require("express");
const router = express.Router();
const { getSellerData } = require("../controllers/sellerControllers");
const checkAuth = require("../middleware/checkAuth");

// Seller route
router.get("/seller", checkAuth, getSellerData);

module.exports = router;
