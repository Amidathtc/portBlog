"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ratingModel = new mongoose_1.default.Schema({
    rate: {
        type: Number,
    },
    ratedBy: {
        type: String,
    },
    article: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "articles",
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model("ratings", ratingModel);
