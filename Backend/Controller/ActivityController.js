const Activity = require("../Modal/ActivityModal.js");

exports.getActivity = async (req, res) => {
  try {
    const logs = await Activity.find().sort({ createdAt: -1 });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};