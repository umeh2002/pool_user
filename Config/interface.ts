import mongoose from "mongoose";

export interface iUser {
  name?: string;
  email?: string;
  location?: string;
  friends?: {}[];
  accept?: boolean
  declined?: boolean
  likes?: {}[];
  avatar?: string
  avatarURL?: string,
  pendingRequests?:string[]
}

export interface iFriends {
  email: string;
  user:{}
}

export interface iFriendsData extends iFriends, mongoose.Document{}
export interface iUserData extends iUser, mongoose.Document{}