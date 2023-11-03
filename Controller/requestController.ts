import { Request, Response } from "express";
import userModel from "../Model/authModel";
import mongoose from "mongoose";
import { sendAcceptFriendMail, sendDeclineFriendMail, sendFriendRequestMail } from "../utils/email";

export const sendRequest = async (req: Request, res: Response) => {
  try {
    const { userID, friendID } = req.params;

    const user:any = await userModel.findById(userID);
    const friend:any = await userModel.findById(friendID);

    if (user && friend) {
      const addFriend = await userModel.findByIdAndUpdate(
        friendID,
        { new: true }
      );
      sendFriendRequestMail(user, friend).then(()=>{
        console.log("mail sent")
      })
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

    sendAcceptFriendMail(user, friend).then(()=>{
      console.log("sent confirm mail")
    })

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
      const user = await userModel.findById(userID);
  
      if (!friend) {
        return res.status(404).json({
          message: "Friend not found.",
        });
      }
  
      friend.pendingRequests = friend.pendingRequests
      ? friend.pendingRequests.filter((request) => request.toString() !== userID)
      : [];
  
      await friend.save();

      sendDeclineFriendMail(user, friend).then(()=>{
        console.log("sent decline mail")
      })
  
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
  

