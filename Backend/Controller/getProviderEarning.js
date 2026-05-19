const Transaction = require("../Modal/TransectionModel.js");
const API = require("../Modal/apimodal.js");

exports.getProviderEarnings = async (req, res) => {
  try {
    const providerId = req.user._id;

    // find APIs owned by provider
    const apis = await API.find({ owner: providerId });

    const apiIds = apis.map(api => api._id);

    // find transactions for those APIs
    const transactions = await Transaction.find({
      api: { $in: apiIds }
    });

    let totalEarnings = 0;

    transactions.forEach(t => {
      totalEarnings += t.providerEarning;
    });

    res.json({
      totalEarnings,
      transactions
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};