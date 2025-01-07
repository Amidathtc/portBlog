"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const adminModel = new mongoose_1.default.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
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
    request: [
        {
            type: (Array),
        },
    ],
    articles: [
        {
            type: mongoose_1.default.Types.ObjectId,
            ref: "articles",
        },
    ],
    likes: {
        type: [
            {
                type: mongoose_1.default.Types.ObjectId,
                ref: "user",
            },
        ],
    },
    rate: {
        type: Number,
    },
    ratings: [
        {
            type: mongoose_1.default.Types.ObjectId,
            ref: "ratings",
        },
    ],
    admin: [
        {
            type: mongoose_1.default.Types.ObjectId,
            ref: "users",
        },
    ],
    adminID: {
        type: String
    }
}, { timestamps: true });
exports.default = mongoose_1.default.model("admins", adminModel);
