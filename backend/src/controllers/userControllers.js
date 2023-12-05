const User = require("../models/user");
const { appError } = require("../utils/utils");

const updateRole = async (req, res) => {
  const { newRole } = req.body;

  try {
    // Find the logged-in user by ID
    const userToUpdate = await User.findById(req.user._id);
    if (!userToUpdate) {
      const error = appError("User not found", 404);
      return res.status(error.statusCode).json(error);
    }

    // Update the role
    userToUpdate.role = newRole;
    await userToUpdate.save();

    res.json({ message: "User role updated successfully", user: userToUpdate });
  } catch (error) {
    console.error(error);
    const errorMessage = "Error updating user role";
    const appError = appError(errorMessage, 500);
    res.status(appError.statusCode).json(appError);
  }
};

module.exports = {
  updateRole,
};
