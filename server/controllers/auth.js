import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/Users.js";

export const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  
  try{
    const exisitng = await User.findOne({email});
    if(exisitng) return res.status(400).json({message:"Email already exists"});

    const user = new User({name,email,password,role});
    await user.save();

    res.status(201).json({message:"User registered successfully",user});
  } catch(err){
    res.status(500).json({message:"Server error",error: err.message});
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({email});
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },process.env.JWT_SECRET,{
        expiresIn: "1d",
      }
    );
    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
