const Admin = require("../Modal/AdminModal");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(404).json({ msg: "Admin not found" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: admin._id, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token });

  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};


const createAdmin = async (req, res) => {
  try {
    const existing = await Admin.findOne();

    if (existing) {
      return res.json({ msg: "Admin already exists" });
    }

    const hashed = await bcrypt.hash("FlowraApi@18100731", 10);

    await Admin.create({
      email: "flowraapi@gmail.com",
      password: hashed
    });

    res.json({ msg: "Admin created" });

  } catch (err) {
    console.error(err); 
    res.status(500).json({ msg: "Error" });
  }
};


module.exports = { createAdmin, adminLogin };