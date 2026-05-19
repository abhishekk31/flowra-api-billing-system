const Provider = require("../Modal/modal");

const submitKyc = async (req, res) => {
  try {
    const providerId = req.user.id;

    const {
      pan,
      businessType,
      address,
      city,
      state,
      pincode,
      gst,
      accountNumber,
      ifsc,
      accountHolderName
    } = req.body;

    const provider = await Provider.findById(providerId);

    if (!provider) {
      return res.status(404).json({ message: "Provider not found" });
    }

    // Save KYC
    provider.kyc = {
      pan,
      businessType,
      address,
      city,
      state,
      pincode,
      gst
    };

    // Save bank details
    provider.bank = {
      accountNumber,
      ifsc,
      accountHolderName
    };

    provider.kycStatus = "submitted";

    await provider.save();

    res.json({
      success: true,
      message: "KYC submitted successfully"
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { submitKyc };