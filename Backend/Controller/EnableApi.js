const API=require('../Modal/apimodal.js')
const Subscription= require('../Modal/Subscription.js');
const Transaction= require('../Modal/TransectionModel.js');


exports.enableAPI = async (req, res) => {
  try {
    const api = await API.findById(req.params.id);

    if (!api) {
      return res.status(404).json({ message: "API not found" });
    }

    // ownership-check
    if (api.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // ENABLE-API
    api.isActive = true;
    await api.save();

    res.json({
      message: "API enabled successfully",
      api
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};