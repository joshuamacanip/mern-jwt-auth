import mongoose from "mongoose";

const connectDB = async (uri) => {
  return await mongoose.connect(uri);
};

export default connectDB;
