import { model, Schema } from "mongoose";
import type { UserSchema } from "./user.dto";

const schema = new Schema<UserSchema>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const userModel = model("user", schema);
