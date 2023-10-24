import { Request, Response } from "express";
import authModel from "../Model/authModel";
import { streamUpload } from "../Config/streamUpload";
import mongoose from "mongoose";


export const createUser = async(req: any, res: Response)=>{
    try {
        const {name, email, location}= req.body

     const { secure_url, public_id }: any = await streamUpload(req);


     const user = await authModel.create({
        name, email, location, avatar:secure_url, avatarURL:public_id,
     })

     user.friends?.push(new mongoose.Types.ObjectId(user!._id))
     user.save()

     return res.status(201).json({
        message:"created successfully",
        data:user
     })

    } catch (error:any) {
        return res.status(404).json({
            message:"Error creating user",
            data:error.message
        })
    }
}

export const viewUsers= async (req:Request, res:Response)=>{
    try {
        const user = await authModel.find()
        return res.status(201).json({
            message:"viewing successfully",
            data:user
         })
    } catch (error:any) {
        return res.status(404).json({
            message:"Error viewing user",
            data:error.message
        }) 
    }
}

export const viewUser= async (req:Request, res:Response)=>{
    try {
        const {userID} =req.params
        const user = await authModel.findById(userID)
        return res.status(201).json({
            message:"viewing one successfully",
            data:user
         })
    } catch (error:any) {
        return res.status(404).json({
            message:"Error viewing user",
            data:error.message
        }) 
    }
}

export const deleteUser= async (req:Request, res:Response)=>{
    try {
        const {userID} =req.params
        const user = await authModel.findByIdAndDelete(userID)
        return res.status(201).json({
            message:"delete one successfully",
            data:user
         })
    } catch (error:any) {
        return res.status(404).json({
            message:"Error deleting user",
            data:error.message
        }) 
    }
}

export const likeUser = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;
    const user:any= await authModel.findById(userID);
 if (user) {
    user?.likes?.push(new mongoose.Types.ObjectId(user._id!))
    user?.save()

    return res.status(201).json({
        message:'likes updated',
        data:user?.likes,
        length:user?.likes.length
    })
 } else {
    return res.status(404).json({
        message:'user not found',
    })
 }
  } catch (error: any) {
    return res.status(404).json({
      message: "error liking user",
      data: error.message,
    });
  }
};