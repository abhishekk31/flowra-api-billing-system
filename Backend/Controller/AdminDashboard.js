const User = require("../Modal/modal");
const API = require("../Modal/apimodal");

const getAdminDashboard = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalProviders = await User.countDocuments({ role: "provider" });
    const totalConsumers = await User.countDocuments({ role: "consumer" });
    const totalAPIs = await API.countDocuments();

    res.json({
      totalUsers,
      totalProviders,
      totalConsumers,
      totalAPIs
    });

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

module.exports = { getAdminDashboard };