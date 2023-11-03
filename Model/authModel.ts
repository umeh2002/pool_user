import mongoose from "mongoose";
import { iUserData } from "../Config/interface";

const userModel = new mongoose.Schema<iUserData>(
  {
    email: {
      type: String,
      unique: true,
    },
    name: {
      type: String,
    },
    location: {
      type: String,
    },
    avatar: {
      type: String,
    },
    avatarURL: {
      type: String,
    },
    friends: [
      {
        type: mongoose.Types.ObjectId,
        ref: "friends",
      },
    ],
    pendingRequests: [
      {
        type: mongoose.Types.ObjectId,
        ref: "users",
      },
    ],
    accept: {
      type: Boolean,
      default: false,
    },
    likes: [
      {
        type:Array,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<iUserData>("users", userModel);
