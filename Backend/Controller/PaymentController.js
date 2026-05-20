const Razorpay = require("razorpay");
const User = require("../Modal/modal");
const Transaction = require("../Modal/TransectionModel.js");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY,
  key_secret: process.env.RAZORPAY_SECRET
});

const createOrder = async (req, res) => {

  try {

    const {
      amount,
      providerId,
      apiId,
      planId
    } = req.body;

    const provider =
      await User.findById(providerId);

    if (!provider) {

      return res.status(400).json({
        message: "Provider not found"
      });
    }

    // FREE PLAN
    if (Number(amount) === 0) {

      await Transaction.create({

        user: req.user._id,
        api: apiId,
        plan: planId,
        amount: 0,
        providerEarning: 0,
        platformEarning: 0,
        provider: providerId,
        status: "success"

      });

      return res.json({

        success: true,
        freePlan: true,
        message: "Free plan activated"

      });
    }

    // PAID PLAN
    const order =
      await razorpay.orders.create({

        amount: Number(amount) * 100,
        currency: "INR",
        receipt: "order_" + Date.now()

      });

    // SPLIT
    const providerEarning =
      amount * 0.7;

    const platformEarning =
      amount * 0.3;

    // CREATE TRANSACTION
    await Transaction.create({

      user: req.user._id,
      api: apiId,
      plan: planId,
      amount,
      providerEarning,
      platformEarning,
      provider: providerId,
      razorpayOrderId: order.id,
      status: "pending"

    });

    res.json({

      success: true,
      order,
      key: process.env.RAZORPAY_KEY

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: error.message
    });
  }
};

module.exports = { createOrder };