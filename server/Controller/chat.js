import chat from "../models/Message.js";
import User from "../models/User.js";

export const Allchats = async (req, res) => {
  const  userId  = req.params.id

  const message = await chat
    .find({
      $or: [
        {
          sender: req.userId,
          receiver: userId,
        },
        {
          sender: userId,
          receiver: req.userId,
        },
      ],
    })
    .sort({ createdAt: 1 });
  return res.json(message);
};

export const list = async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.userId } }).select(
      "_id name"
    );
    return res.status(200).json({ message: users });
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};
