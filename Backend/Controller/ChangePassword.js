// Controller/userController.js

const User = require("../Modal/modal");

exports.changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(req.user._id);

    // check old password
    if (user.password !== oldPassword) {
      return res.status(400).json({
        message: "Old password is incorrect"
      });
    }

    user.password = newPassword;
    await user.save();

    res.json({
      message: "Password updated successfully"
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};