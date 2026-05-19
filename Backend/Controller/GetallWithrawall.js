const Withdrawal =
  require("../Modal/WithdrawalModel.js");

exports.getAllWithdrawals =
  async (req, res) => {

    try {

      const withdrawals =
        await Withdrawal.find()
          .populate(
            "provider",
            "name email wallet upiId bankName accountNumber ifscCode"
          )
          .sort({ createdAt: -1 });

      res.json(withdrawals);

    } catch (err) {

      res.status(500).json({
        message: err.message
      });
    }
  };