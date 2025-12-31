import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createAccesstoken, createrefreshToken } from "../utils/token.js";

export const register = async (req, res) => {
  try {
    const { email, name, password } = req.body;

    let find = await User.findOne({ email });
    if (find) return res.json({ message: "email is alreay exists" });

    const data = new User({
      email,
      name,
      password,
    });

    await data.save();

    return res
      .status(201)
      .json({ message: "Register Succesfully", data: "added successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const Existemail = await User.findOne({ email });
    if (!Existemail) return res.status(400).json({ message: "user not found" });

    const ispassword = await bcrypt.compare(password, Existemail.password);
    if (!ispassword)
      return res.status(400).json({ message: "password incorrect" });

    const AccessToken = createAccesstoken(Existemail._id);

    const RefreshToken = createrefreshToken(Existemail._id);

    res.cookie("accessToken", AccessToken, {
      httpOnly: true,
      samSite: "strict",
    });
    res.cookie("refreshToken", RefreshToken, {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      secure: process.env.NODE_ENV === "production"
    });

    res.json({ success: true, message: "loggedin" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const refresh = (req, res) => {
  const accessToken = createAccesstoken(req.userId);
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    secure: process.env.NODE_ENV === "production"
  });
  res.json({ accessToken });
};

export const logout = async (req, res) => {
 
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  return res.json("Logged Out");
};

export const me = async (req, res) => {
 
  const user = await User.findById(req.userId).select("-password");
  
  return res.status(200).json(user);
};
