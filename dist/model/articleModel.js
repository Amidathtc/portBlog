"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const articleModel = new mongoose_1.default.Schema({
    title: {
        type: String,
    },
    content: {
        type: String,
    },
    description: {
        type: String,
    },
    image: {
        type: String,
    },
    imageID: {
        type: String,
    },
    likes: {
        type: [{
                type: mongoose_1.default.Types.ObjectId,
                ref: "user",
            }],
    },
    userID: {
        type: String,
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
    categoryName: {
        type: String,
    },
    user: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "users",
    },
    comments: [
        {
            type: mongoose_1.default.Types.ObjectId,
            ref: "comments",
        },
    ],
}, { timestamps: true });
exports.default = mongoose_1.default.model("articles", articleModel);
