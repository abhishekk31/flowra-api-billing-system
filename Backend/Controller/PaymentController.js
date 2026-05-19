const Razorpay = require("razorpay");
const User = require("../Modal/modal");
const Transaction = require("../Modal/TransectionModel.js");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY,
  key_secret: process.env.RAZORPAY_SECRET
});

const createOrder = async (req, res) => {
  try {
    
    const { amount, providerId, apiId, planId } = req.body;

    const provider = await User.findById(providerId);

    if (!provider) {
      return res.status(400).json({
        message: "Provider not found"
      });
    }

    // Create Razorpay order
    const order = await razorpay.orders.create({
      amount: Number(amount) * 100,
      currency: "INR",
      receipt: "order_" + Date.now(),
    });
  
    // CALCULATE SPLIT
    const providerEarning = amount * 0.7;
    const platformEarning = amount * 0.3;



   

    // CREATE-TRANSACTION(PENDING)
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
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createOrder };