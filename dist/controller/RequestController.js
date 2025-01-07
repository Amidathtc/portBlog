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
exports.viewRequest = exports.unSendingRequest = exports.makeRequest = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userModel_1 = __importDefault(require("../model/userModel"));
const mainError_1 = require("../error/mainError");
const makeRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID, friendID } = req.params;
        const User = yield userModel_1.default.findById(userID);
        const Friend = yield userModel_1.default.findById(friendID);
        if (User && Friend) {
            Friend.request.push(new mongoose_1.default.Types.ObjectId(userID));
            Friend.save();
            return res.status(mainError_1.HTTP.OK).json({
                message: "Your resquest has been sent"
            });
        }
    }
    catch (error) {
        return res.status(mainError_1.HTTP.BAD_REQUEST).json({
            message: "error making request"
        });
    }
});
exports.makeRequest = makeRequest;
const unSendingRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID, friendID } = req.params;
        const User = yield userModel_1.default.findById(userID);
        const Friend = yield userModel_1.default.findById(friendID);
        if (User && Friend) {
            Friend.request.pull(new mongoose_1.default.Types.ObjectId(userID));
            Friend.save();
            return res.status(mainError_1.HTTP.CREATED).json({
                message: "Your resquest has been removed"
            });
        }
    }
    catch (error) {
        return res.status(mainError_1.HTTP.BAD_REQUEST).json({
            message: "error removing request"
        });
    }
});
exports.unSendingRequest = unSendingRequest;
const viewRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID, friendID } = req.params;
        const User = yield userModel_1.default.findById(userID);
        if (User) {
            const data = yield userModel_1.default.findById(userID).populate({
                path: "request",
                options: {
                    sort: {
                        createdAt: -1,
                    },
                },
            });
            return res.status(mainError_1.HTTP.OK).json({
                message: "viewing request",
                data,
            });
        }
    }
    catch (error) {
        return res.status(mainError_1.HTTP.BAD_REQUEST).json({
            message: "Error",
        });
    }
});
exports.viewRequest = viewRequest;
