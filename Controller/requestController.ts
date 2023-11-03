import { Request, Response } from "express";
import userModel from "../Model/authModel";
import mongoose from "mongoose";

export const sendRequest = async (req: Request, res: Response) => {
  try {
    const { userID, friendID } = req.params;
    const { email } = req.body;

    const user = await userModel.findById(userID);

    if (user) {
      const addFriend = await userModel.findByIdAndUpdate(
        friendID,
        { email },
        { new: true }
      );

      return res.status(201).json({
        message: "request sent",
        data: addFriend,
      });
    } else {
      return res.status(404).json({
        message: "user not found",
      });
    }
  } catch (error: any) {
    return res.status(404).json({
      message: "Error sending request",
      data: error.message,
    });
  }
};

export const confirmRequest = async (req: Request, res: Response) => {
  try {
    const { userID, friendID } = req.params;

    const friend: any = await userModel.findById(friendID);
    const user: any = await userModel.findByIdAndUpdate(
      userID,
      { accept: true },
      { new: true }
    );

    if (!friend || !user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    await user.friends?.push(new mongoose.Types.ObjectId(friendID!));
    user.save();
    await friend.friends?.push(new mongoose.Types.ObjectId(userID!));
    friend.save();

    return res.status(201).json({
      message: "Request accepted. Users are now friends.",
      data: { user, friend },
    });
  } catch (error: any) {
    return res.status(404).json({
      message: "Error occurred",
      data: error.message,
    });
  }
};

export const declineRequest = async (req: Request, res: Response) => {
    try {
      const { userID, friendID } = req.params;
  
      const friend = await userModel.findById(friendID);
  
      if (!friend) {
        return res.status(404).json({
          message: "Friend not found.",
        });
      }
  
      friend.pendingRequests = friend.pendingRequests
      ? friend.pendingRequests.filter((request) => request.toString() !== userID)
      : [];
  
      await friend.save();
  
      return res.status(200).json({
        message: "Request declined. Friend request removed.",
        data: friend,
      });
    } catch (error: any) {
      return res.status(404).json({
        message: "Error occurred",
        data: error.message,
      });
    }
  };
  

