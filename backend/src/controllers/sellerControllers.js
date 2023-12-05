const { appError } = require("../utils/utils");

const getSellerData = async (req, res) => {
  try {
    const sellerData = {};

    res.json({ data: sellerData });
  } catch (error) {
    console.error(error);
    const errorMessage = "Error fetching seller data";
    const appError = appError(errorMessage, 500);
    res.status(appError.statusCode).json(appError);
  }
};

module.exports = {
  getSellerData,
};
