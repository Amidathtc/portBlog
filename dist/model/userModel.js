"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userModel = new mongoose_1.default.Schema({
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
        type: (Array),
    },
    category: {
        type: (Array)
    },
    request: {
        type: (Array),
    },
    articles: [
        {
            type: mongoose_1.default.Types.ObjectId,
            ref: "articles",
        },
    ],
}, { timestamps: true });
exports.default = mongoose_1.default.model("users", userModel);
