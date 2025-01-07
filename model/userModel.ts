import mongoose from "mongoose";

interface iUser {
  name?: string;
  email?: string;
  password?: string;
  avatar?: string;
  avatarID?: string;
  friends?: string[];
  request?: string[];
  articles?: {}[];
  category?: [];
}

interface iUserData extends iUser, mongoose.Document {}

const userModel = new mongoose.Schema<iUser>(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      toLowerCase: true
    },
    password: {
      type: String,
    },
    avatar: {
      type: String,
    },
    avatarID: {
      type: String,
    },
    friends: {
      type: Array<String>,
    },
    category: {
  type: Array<String>
},
    request:
      {
        type: Array<String>,
      },
    articles: [
      {
        type: mongoose.Types.ObjectId,
        ref: "articles",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<iUserData>("users", userModel);