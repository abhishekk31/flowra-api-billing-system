const Withdrawal =
require("../Modal/WithdrawalModel.js");
const ProviderKyc =
require("../Modal/ProviderKYCmodal.js");

const User =
require("../Modal/modal.js");

exports.requestWithdrawal =
async (req, res) => {

  try {

    const providerId =
      req.user._id;

    const { amount } =
      req.body;

    // Find provider
    const provider =
      await User.findById(
        providerId
      );

      const kyc =
  await ProviderKyc.findOne({
    email: provider.email
  });

    // Check pending balance
    if (
      amount >
      provider.wallet.pending
    ) {

      return res.status(400)
      .json({
        message:
        "Insufficient pending balance"
      });
    }

    // Create withdrawal request
    const withdrawal =
  await Withdrawal.create({

    provider: providerId,

    amount,

    upiId:
      kyc?.bank?.upiId || "",

    accountNumber:
      kyc?.bank?.accountNumber || "",

    ifscCode:
      kyc?.bank?.ifsc || "",

    bankName:
      kyc?.bank?.accountHolderName || ""
  });

    res.json({
      message:
      "Withdrawal request submitted",

      withdrawal
    });

  } catch (err) {

    res.status(500).json({
      message: err.message
    });
  }
};