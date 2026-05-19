const Withdrawal =
require("../Modal/WithdrawalModel.js");

exports.getProviderWithdrawals =
async (req, res) => {

  try {

    const providerId =
      req.user._id;

    const withdrawals =
      await Withdrawal.find({

        provider: providerId

      }).sort({
        createdAt: -1
      });

    res.json(withdrawals);

  } catch (err) {

    res.status(500).json({
      message: err.message
    });
  }
};