import mongoose from "mongoose";

const DBconnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("DataBase Connected");
  } catch (err) {
    console.log("error", err);
  }
};

export default DBconnection;
