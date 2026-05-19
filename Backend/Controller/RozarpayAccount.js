const Razorpay = require("razorpay");
const User = require("../Modal/modal");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY,
  key_secret: process.env.RAZORPAY_SECRET
});

const createRazorpayAccount = async (req, res) => {
  try {
    console.log('hit the rozarpay')
    const provider = await User.findById(req.user.id);

    if (!provider) {
      return res.status(404).json({ message: "User not found" });
    }

    if (provider.role !== "provider") {
      return res.status(403).json({ message: "Not a provider" });
    }

    // Create Razorpay account
    const account = await razorpay.accounts.create({
      email: provider.email,
      phone: provider.phone,
      type: "route",
      legal_business_name: provider.name,
      business_type: provider.kyc?.businessType || "individual",
      contact_name: provider.name,
      profile: {
        category: "services",
        subcategory: "home_services"
      }
    });

    // Saveaccount ID
    provider.razorpayAccountId = account.id;
    provider.kycStatus = "verified";

    await provider.save();

    res.json({
      success: true,
      accountId: account.id
    });

  } catch (error) {
    console.log("RAZORPAY ERROR:", error);
  console.log("ERROR BODY:", error?.response?.data);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createRazorpayAccount };