const API=require('../Modal/apimodal.js')
const Subscription= require('../Modal/Subscription.js');
const Transaction= require('../Modal/TransectionModel.js');


exports.deleteAPI = async (req, res) => {
  try {
    const api = await API.findById(req.params.id);

    if (!api) {
      return res.status(404).json({
        message: "API not found"
      });
    }

    // Ownership check
    if (api.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Not authorized"
      });
    }

    // SOFT DELETE 
    api.isActive = false;
    await api.save();

    res.json({
      message: "API disabled successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};