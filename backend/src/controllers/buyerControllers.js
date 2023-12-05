const { appError } = require("../utils/utils");

const getBuyerData = async (req, res) => {
  try {
    const buyerData = {};

    res.json({ data: buyerData });
  } catch (error) {
    console.error(error);
    const errorMessage = "Error fetching buyer data";
    const appError = appError(errorMessage, 500);
    res.status(appError.statusCode).json(appError);
  }
};

module.exports = {
  getBuyerData,
};
