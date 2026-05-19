 const Subscription=require('../Modal/Subscription.js')
 
 
 
 exports.getMySubscriptions = async (req, res) => {
  try {

    const subs = await Subscription.find({
      user: req.user._id
    })

    .populate(
      "api",
      "name endpoint method description"
    )

    .populate(
      "plan",
      "name price requestLimit duration"
    );

    res.status(200).json({
      subscriptions: subs
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};