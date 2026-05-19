const crypto = require("crypto");
const Transaction = require("../Modal/TransectionModel.js");
const User = require("../Modal/modal");

exports.verifyPayment = async (req, res) => {

  try {
    

   
  

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    } = req.body;

    // Verify Razorpay signature
    const body =
      razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac(
        "sha256",
        process.env.RAZORPAY_SECRET
      )
      .update(body)
      .digest("hex");

    // Invalid signatur
    if (expectedSignature !== razorpay_signature) {

      return res.status(400).json({
        message: "Payment verification failed"
      });
    }

    // Find transaction
    const transaction = await Transaction.findOne({
      razorpayOrderId: razorpay_order_id
    });

    // Transaction not found
    if (!transaction) {

      return res.status(404).json({
        message: "Transaction not found"
      });
    }

    // Prevent duplicate processing
    if (transaction.status === "success") {

      return res.json({
        message: "Already processed"
      });
    }

    // Mark payment success
    transaction.status = "success";

    transaction.razorpayPaymentId =
      razorpay_payment_id;

    await transaction.save();

    // Update provider wallet
    await User.findByIdAndUpdate(
      transaction.provider,
      {
        $inc: {
          "wallet.totalEarned":
            transaction.providerEarning,

          "wallet.pending":
            transaction.providerEarning
        }
      }
    );

    // Success-response
    res.json({
      success: true,
      message: "Payment verified & wallet updated"
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};