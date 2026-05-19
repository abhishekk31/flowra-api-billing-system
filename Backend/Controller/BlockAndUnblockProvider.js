const User = require("../Modal/modal");
const Activity = require("../Modal/ActivityModal.js"); 

exports.blockProvider = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isBlocked: true },
      { new: true }
    );

    
    await Activity.create({
      message: `Admin blocked user: ${user.email}`,
      type: "admin"
    });

    res.json({ msg: "Provider blocked" });

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.unblockProvider = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isBlocked: false },
      { new: true }
    );

    
    await Activity.create({
      message: `Admin unblocked user: ${user.email}`,
      type: "admin"
    });

    res.json({ msg: "Provider unblocked" });

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};