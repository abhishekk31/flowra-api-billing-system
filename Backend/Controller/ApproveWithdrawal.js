const Withdrawal =
require("../Modal/WithdrawalModel.js");

const User =
require("../Modal/modal");

exports.approveWithdrawal =
async (req, res) => {

  try {

    const withdrawalId =
      req.params.id;

    // Find withdrawal
    const withdrawal =
      await Withdrawal.findById(
        withdrawalId
      );

    if (!withdrawal) {

      return res.status(404)
      .json({
        message:
        "Withdrawal not found"
      });
    }

    // Already approved
    if (
      withdrawal.status ===
      "approved"
    ) {

      return res.json({
        message:
        "Already approved"
      });
    }

    // Update withdrawal status
    withdrawal.status =
      "approved";

    await withdrawal.save();

    // Find provider
    const provider =
      await User.findById(
        withdrawal.provider
      );

    // Update wallet with clean decimals
    provider.wallet.pending =
      Number(
        (
          provider.wallet.pending -
          withdrawal.amount
        ).toFixed(2)
      );

    provider.wallet.withdrawn =
      Number(
        (
          provider.wallet.withdrawn +
          withdrawal.amount
        ).toFixed(2)
      );

    await provider.save();

    res.json({
      success: true,
      message:
      "Withdrawal approved"
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};