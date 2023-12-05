// utils/avatarUtils.js
const generateDefaultAvatar = (name) => {
  // const firstLetter = name.charAt(0).toUpperCase();
  const firstLetter = name.charAt(0).toLowerCase();
  return `/uploads/avatars/${firstLetter}.png`;
};

module.exports = { generateDefaultAvatar };
