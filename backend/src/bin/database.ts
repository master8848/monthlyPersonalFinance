import mongoose from "mongoose";

export const ConnectToDatbase = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
};
