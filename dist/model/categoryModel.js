"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const categoryModel = new mongoose_1.default.Schema({
    categoryName: {
        type: String,
    },
    article: [
        {
            type: (Array),
            item: mongoose_1.default.Schema.ObjectId,
            ref: "articles",
        },
    ],
}, {
    timestamps: true,
});
exports.default = mongoose_1.default.model("category", categoryModel);
