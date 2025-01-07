"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unFriend = exports.beFriend = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userModel_1 = __importDefault(require("../model/userModel"));
const mainError_1 = require("../error/mainError");
const beFriend = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const { userID, friendID } = req.params;
        const User = yield userModel_1.default.findById(userID);
        const Friend = yield userModel_1.default.findById(friendID);
        if (User && Friend) {
            yield ((_a = User.friends) === null || _a === void 0 ? void 0 : _a.push(new mongoose_1.default.Types.ObjectId(friendID)));
            User.save();
            yield ((_b = Friend.friends) === null || _b === void 0 ? void 0 : _b.push(new mongoose_1.default.Types.ObjectId(userID)));
            Friend.save();
            return res.status(mainError_1.HTTP.CREATED).json({
                message: `you are now friends with ${Friend.name}`
            });
        }
        else {
            return res.status(mainError_1.HTTP.BAD_REQUEST).json({
                message: "Something went wrong",
            });
        }
    }
    catch (error) {
        return res.status(mainError_1.HTTP.BAD_REQUEST).json({
            message: "Error creating friends"
        });
    }
});
exports.beFriend = beFriend;
const unFriend = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const { userID, friendID } = req.params;
        const User = yield userModel_1.default.findById(userID);
        const Friend = yield userModel_1.default.findById(friendID);
        if (User && Friend) {
            yield ((_a = User.friends) === null || _a === void 0 ? void 0 : _a.pull(new mongoose_1.default.Types.ObjectId(friendID)));
            User.save();
            yield ((_b = Friend.friends) === null || _b === void 0 ? void 0 : _b.pull(new mongoose_1.default.Types.ObjectId(userID)));
            Friend.save();
            return res.status(mainError_1.HTTP.CREATED).json({
                message: `you are no longer friends with ${Friend.name}`
            });
        }
        else {
            return res.status(mainError_1.HTTP.BAD_REQUEST).json({
                message: "Something went wrong",
            });
        }
    }
    catch (error) {
        return res.status(mainError_1.HTTP.BAD_REQUEST).json({
            message: "Error removing friends"
        });
    }
});
exports.unFriend = unFriend;
