import mongoose from "mongoose";

const Messageschema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  text: {
    type: String,
  },
 
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const chat = mongoose.model("Message", Messageschema);

export default chat;
