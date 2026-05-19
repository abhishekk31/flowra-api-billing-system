const Transaction = require("../Modal/TransectionModel.js");
const User = require("../Modal/modal");

exports.getProviderDashboardall = async (req, res) => {

  try {
 console.log(req.user);
    const providerId = req.user._id;

    // Get provider
    const provider = await User.findById(providerId);

    // Successful transactions
    const successfulPayments =
      await Transaction.countDocuments({
        provider: providerId,
        status: "success"
      });

    // Failed transactions
    const failedPayments =
      await Transaction.countDocuments({
        provider: providerId,
        status: "failed"
      });

    // Recent transactions
    const recentTransactions =
      await Transaction.find({
        provider: providerId
      })
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({

      totalEarned:
        provider.wallet.totalEarned,

      pending:
        provider.wallet.pending,

      withdrawn:
        provider.wallet.withdrawn,

      successfulPayments,

      failedPayments,

      recentTransactions
    });

  } catch (err) {

    res.status(500).json({
      message: err.message
    });
  }
};