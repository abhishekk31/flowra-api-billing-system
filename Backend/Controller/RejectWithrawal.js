const Withdrawal =
require("../Modal/WithdrawalModel.js");

exports.rejectWithdrawal =
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

    // Already rejected
    if (
      withdrawal.status ===
      "rejected"
    ) {

      return res.json({
        message:
        "Already rejected"
      });
    }

    // Prevent rejecting approved
    if (
      withdrawal.status ===
      "approved"
    ) {

      return res.status(400)
      .json({
        message:
        "Approved withdrawal cannot be rejected"
      });
    }

    // Update status
    withdrawal.status =
      "rejected";

    await withdrawal.save();

    res.json({
      success: true,
      message:
      "Withdrawal rejected"
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};