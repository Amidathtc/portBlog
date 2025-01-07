"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const db = () => {
    mongoose_1.default
        .connect(process.env.DB)
        .then(() => {
        console.log("all connected: 🚀✌💌");
    })
        .catch((error) => {
        console.log(error);
    });
};
exports.db = db;
