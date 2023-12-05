const User = require("../models/user");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const { generateDefaultAvatar } = require("../utils/avatarUtils");
const sendPasswordResetEmail = require("../utils/sendPasswordResetEmail");
const { createToken } = require("../utils/token");

const crypto = require("crypto");
const getUserFromToken = require("../utils/getUserFromToken");
const { appError } = require("../utils/utils");

// Signup controller
const signupUser = async (req, res) => {
  const { email, password, name, username } = req.body;

  try {
    // Check if a user with the given email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const error = appError("Email already in use", 409);
      return res.status(error.statusCode).json(error);
    }

    // Check if the username already exists in the database
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      const error = appError("Username has already been taken", 409);
      return res.status(error.statusCode).json(error);
    }

    // Salt the password (adding randomness and security)
    const saltRounds = 12;
    const salt = await bcrypt.genSalt(saltRounds);

    // Check if the password and salt variables have truthy values
    if (!password || !salt) {
      const error = appError("Invalid password or salt", 400);
      return res.status(error.statusCode).json(error);
    }

    // Hash the password using the generated salt
    const hashedPassword = await bcrypt.hash(password, salt);

    // Generate a default avatar URL based on the user's first name
    const defaultAvatar = generateDefaultAvatar(name);
    const avatarUrl = req.protocol + "://" + req.get("host") + defaultAvatar;
    console.log(defaultAvatar, "defaultAvatar");
    console.log(avatarUrl, "avatarUrl");

    // Create a new user
    const newUser = new User({
      displayName: name,
      email,
      password: hashedPassword,
      username,
      image: avatarUrl,
    });
    console.log(newUser, "user?");

    await newUser.save();

    // Create a JWT token with user id and key
    // const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET_KEY);
    const expiresIn = "1d";

    const token = createToken(newUser._id, expiresIn);

    // Get the user information from the JWT token using the getUserFromToken function
    const user = await getUserFromToken(token);
    console.log(user, "user? jwt");

    // Send the token and user information in the response
    res.json({
      token,
      user: user,
    });
  } catch (err) {
    console.log(err, "errro? ");
    const error = appError(`Signup Failed!`, 400);

    res.status(error.statusCode).json(error);
  }
};

// Signin controller

const signinUser = async (req, res) => {
  const { email, password, rememberMe } = req.body;

  try {
    // Handle JWT login
    const user = await User.findOne({ email });
    if (!user) {
      const error = appError("User not found. Please check your email.", 401);
      return res.status(error.statusCode).json(error);
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      const error = appError("Invalid password. Please try again.", 401);
      return res.status(error.statusCode).json(error);
    }

    // Get the expiration time based on whether "Remember Me" is checked
    const expiresIn = rememberMe ? "7d" : "1d";
    console.log(email, rememberMe);

    // Create a token
    const token = createToken(user._id, expiresIn);

    // Create a separate variable for essential user information
    const essentialUserData = {
      _id: user._id,
      displayName: user.displayName,
      email: user.email,
      username: user.username,
      image: user.image,
    };

    // Send the token and essential user information in the response
    res.json({
      message: "JWT signin successful",
      token,
      user: essentialUserData,
    });
  } catch (err) {
    console.log(err.message, "err");
    const error = appError(`Failed to signin user: ${err.message}`, 401);
    res.status(error.statusCode).json(error);
  }
};

// Helper function to get essential user data for google/jwt email login user

const getGoogleUser = async (user) => {
  return {
    _id: user._id,
    googleId: user.googleId,
    displayName: user.displayName,
    email: user.email,
    username: user.username,
    image: user.image,
    role: user.role,
  };
};

const getEmailUser = async (user) => {
  return {
    _id: user._id,
    displayName: user.displayName,
    email: user.email,
    username: user.username,
    image: user.image,
    role: user.role,
  };
};

// Main getUser function for the current logged-in user
const getCurrentUser = async (req, res, next) => {
  console.log(req.user, "main req header");

  try {
    if (req.user.googleId) {
      // Handle Google login user
      const googleUser = await getGoogleUser(req.user);
      console.log(googleUser, "googleid");
      return res.status(200).json({ user: googleUser });
    } else {
      // Handle JWT login user
      const jwtUser = await getEmailUser(req.user);
      console.log(jwtUser, "jwt user");
      return res.status(200).json({ user: jwtUser });
    }
  } catch (err) {
    const error = appError(`Failed to fetch user ${err.message}`);
    res.status(error.statusCode).json({ error });
  }
};

const logoutUser = async (req, res, next) => {
  // Check if the user is using Google authentication
  if (req.user?.googleId) {
    // For Google users, perform the logout action using req.logout
    req.logout(function (err) {
      if (err) {
        const error = appError(`Error: ${err.message}`);
        return res.status(error.statusCode).json(error);
      }
      // Redirect to the client login page after successful logout
      res.redirect("http://localhost:3000/login");
    });
  } else {
    // For JWT users and other types of authentication, no need to use req.logout
    // Redirect to the client login page after successful logout
    res.redirect("http://localhost:3000/login");
  }
};
//Controller for forgot password

const forgotPassword = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      const error = appError("User not found", 404);
      return res.status(error.statusCode).json(error);
    }

    // Generate a random token and save it in the database
    const token = crypto.randomBytes(20).toString("hex");
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour from now
    await user.save();

    // Compose and send the reset password email
    const resetUrl = `http://localhost:3000/reset-password/${token}`;
    const message = `
      <h1>You have requested a password reset</h1>
      <p>Please click the following link to reset your password:</p>
      <a href="${resetUrl}" target="_blank">${resetUrl}</a>
    `;

    try {
      await sendPasswordResetEmail({
        to: email,
        subject: "Password Reset Request",
        text: message,
      });

      res.json({ message: "Email sent successfully" });
    } catch (err) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      await user.save();

      const error = appError(`Error  while sending email: 4{err.message}`);
      return res.status(error.statusCode).json(error);
    }
  } catch (err) {
    const error = appError(`Internal server error: 4{err.message}`);
    return res.status(error.statusCode).json(error);
  }
};

//Controller for reset user password
const resetPassword = async (req, res) => {
  try {
    const { resetToken } = req.params;
    const user = await User.findOne({
      resetPasswordToken: resetToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      const error = appError(
        `Invalid or expired resetToken: ${err.message}`,
        400,
      );
      return res.status(error.statusCode).json(error);
    }

    // Update the password in the database
    const newPassword = req.body.newPassword;

    // Salt the password (same password will get different hash value)
    const saltRounds = 12;
    const salt = await bcrypt.genSalt(saltRounds);

    // Check if the password and salt variables have truthy values
    if (!newPassword || !salt) {
      const error = appError(`Invalid password or salt: ${err.message}`, 400);
      return res.status(error.statusCode).json(error);
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (err) {
    const error = appError(`Internal server error: 4{err.message}`);
    return res.status(error.statusCode).json(error);
  }
};
module.exports = {
  signupUser,
  signinUser,
  logoutUser,
  getCurrentUser,
  forgotPassword,
  resetPassword,
};
