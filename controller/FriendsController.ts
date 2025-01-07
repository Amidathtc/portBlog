import express,{Request,Response} from "express"
import mongoose from "mongoose"
import userModel from "../model/userModel"
import {HTTP} from "../error/mainError"

export const beFriend = async (req:Request,res:Response)=>{
    try {
    
    const {userID,friendID} = req.params;

        const User: any = await userModel.findById(userID);
        
    const Friend:any = await userModel.findById(friendID)

    if (User && Friend) {
        await User.friends?.push(new mongoose.Types.ObjectId(friendID!));
        User.save()
        await Friend.friends?.push(new mongoose.Types.ObjectId(userID!))
        Friend.save();

        return res.status(HTTP.CREATED).json({
            message:`you are now friends with ${Friend.name}`
        })
    } else {
        return res.status(HTTP.BAD_REQUEST).json({
            message: "Something went wrong",
          });
    }
} catch (error) {
  return res.status(HTTP.BAD_REQUEST).json({
    message:"Error creating friends"
    })
}
};


export const unFriend = async (req:Request,res:Response)=>{
try {
    const {userID,friendID} = req.params;

    const User:any = await userModel.findById(userID);
    const Friend:any = await userModel.findById(friendID)

    if (User && Friend) {
        await User.friends?.pull(new mongoose.Types.ObjectId(friendID!));
        User.save()
        await Friend.friends?.pull(new mongoose.Types.ObjectId(userID!))
        Friend.save();

        return res.status(HTTP.CREATED).json({
            message:`you are no longer friends with ${Friend.name}`
        })
    } else {
        return res.status(HTTP.BAD_REQUEST).json({
            message: "Something went wrong",
          });
    }
} catch (error) {
  return res.status(HTTP.BAD_REQUEST).json({
    message:"Error removing friends"
    })
}
};

