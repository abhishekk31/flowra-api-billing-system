const Transaction = require('../Modal/TransectionModel');

exports.getAdminRevenue = async (req, res) => {
  try {
    const transactions = await Transaction.find()
       .populate("user", "name email")
  .populate("plan", "name")
  .populate({
    path: "api",
    select: "name owner",
    populate: {
      path: "owner",
      select: "name email"
    }
  })
  .lean();

    const totalRevenue = transactions.reduce(
      (sum, t) => sum + (t.platformEarning || 0),
      0
    );

    res.json({
      totalRevenue,
      transactions
    });

  } catch (error) {
    console.log("ERROR:", error.message);
    res.status(500).json({
      message: error.message
    });
  }
};