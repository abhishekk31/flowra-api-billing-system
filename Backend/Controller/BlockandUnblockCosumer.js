const User=require('../Modal/modal')


exports.blockConsumer = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isBlocked: true },
      { new: true }
    );

    res.json({ msg: "Consumer blocked" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

exports.unblockConsumer = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isBlocked: false },
      { new: true }
    );

    res.json({ msg: "Consumer unblocked" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};