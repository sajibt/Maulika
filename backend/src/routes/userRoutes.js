const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/checkAuth");
const { updateRole } = require("../controllers/userControllers");

router.put("/update-role", checkAuth, updateRole);

module.exports = router;
