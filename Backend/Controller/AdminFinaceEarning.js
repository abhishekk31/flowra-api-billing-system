const Transaction = require("../Modal/TransectionModel");
const User = require("../Modal/modal");

exports.getAdminFinanceDashboard = async (req, res) => {

  try {

    // Total platform revenue
    const revenueResult =
      await Transaction.aggregate([
        {
          $match: {
            status: "success"
          }
        },
        {
          $group: {
            _id: null,
            totalRevenue: {
              $sum: "$platformEarning"
            }
          }
        }
      ]);

    const totalRevenue =
      revenueResult[0]?.totalRevenue || 0;

    // Successful payments
    const successfulPayments =
      await Transaction.countDocuments({
        status: "success"
      });

    // Failed payments
    const failedPayments =
      await Transaction.countDocuments({
        status: "failed"
      });

    // Providers
    const providers =
      await User.find({
        role: "provider"
      }).select(
        "name email wallet"
      );

    // Recent transactions
    const recentTransactions =
      await Transaction.find()
      .sort({ createdAt: -1 })
      .limit(10);

    res.json({
      totalRevenue,
      successfulPayments,
      failedPayments,
      providers,
      recentTransactions
    });

  } catch (err) {

    res.status(500).json({
      message: err.message
    });
  }
};