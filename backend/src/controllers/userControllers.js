const User = require("../models/user");
const { appError } = require("../utils/utils");

const toggleUserRole = async (req, res) => {
  try {
    // Find the logged-in user by ID
    const userToUpdate = await User.findById(req.user._id);
    if (!userToUpdate) {
      const error = appError("User not found", 404);
      return res.status(error.statusCode).json(error);
    }

    // Toggle between "buyer" and "seller"
    userToUpdate.role = userToUpdate.role === "buyer" ? "seller" : "buyer";
    await userToUpdate.save();

    res.json({ message: "User role toggled successfully", user: userToUpdate });
  } catch (error) {
    console.error(error);
    const errorMessage = "Error toggling user role";
    const appError = appError(errorMessage, 500);
    res.status(appError.statusCode).json(appError);
  }
};

module.exports = {
  toggleUserRole,
};
