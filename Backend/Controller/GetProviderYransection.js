const Transaction =
require("../Modal/TransectionModel");

exports.getProviderTransactions =
async (req, res) => {

  try {

    const transactions =
      await Transaction.find({

        provider:
          req.user._id

      })

      .populate(
        "user",
        "name email"
      )

      .populate(
        "plan",
        "name price"
      )

      .sort({
        createdAt: -1
      });

    res.json(transactions);

  } catch (err) {

    res.status(500).json({

      message:
        err.message
    });
  }
};