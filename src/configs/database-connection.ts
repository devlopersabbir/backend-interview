import env from "@/app/env";
import mongoose from "mongoose";

export const databseConnection = async () => {
  try {
    await mongoose.connect(env.DATABASE_URL);
    console.log("Database connection successfull!");
  } catch (error) {
    throw new Error("Database connection fail!");
  }
};
