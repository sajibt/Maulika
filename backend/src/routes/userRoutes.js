const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/checkAuth");
const { toggleUserRole } = require("../controllers/userControllers");

router.put("/toggle-role", checkAuth, toggleUserRole);

module.exports = router;