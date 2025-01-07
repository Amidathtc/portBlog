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
exports.deleteOneComment = exports.unLikeArticleComment = exports.likeArticleComment = exports.readArticleComment = exports.readOneComment = exports.readComment = exports.createComment = void 0;
const articleModel_1 = __importDefault(require("../model/articleModel"));
const userModel_1 = __importDefault(require("../model/userModel"));
const mongoose_1 = __importDefault(require("mongoose"));
const commentModel_1 = __importDefault(require("../model/commentModel"));
const createComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { userID, articleID } = req.params;
        const { comment } = req.body;
        const user = yield userModel_1.default.findById(userID);
        const post = yield articleModel_1.default.findById(articleID);
        const commentData = yield commentModel_1.default.create({
            comment,
            nameame: user.name,
            avatar: user.avatar,
        });
        (_a = post === null || post === void 0 ? void 0 : post.comments) === null || _a === void 0 ? void 0 : _a.push(new mongoose_1.default.Types.ObjectId(commentData._id));
        post === null || post === void 0 ? void 0 : post.save();
        return res.status(201).json({
            message: "comment created",
            data: commentData,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "Unable to create comment",
        });
    }
});
exports.createComment = createComment;
const readComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield commentModel_1.default.find();
        return res.status(200).json({
            message: "read comment",
            data: post,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "Unable to read comemnt",
        });
    }
});
exports.readComment = readComment;
const readOneComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { commentID } = req.params;
        const post = yield commentModel_1.default.findById(commentID);
        return res.status(200).json({
            message: "read comment",
            data: post,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "Unable to read comment",
        });
    }
});
exports.readOneComment = readOneComment;
const readArticleComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { articleID } = req.params;
        const article = yield articleModel_1.default.findById(articleID).populate({
            path: "comments",
            options: {
                sort: {
                    createAt: -1,
                },
            },
        });
        return res.status(200).json({
            message: "read post comment",
            data: article === null || article === void 0 ? void 0 : article.comments,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "Unable to read Posts comment",
        });
    }
});
exports.readArticleComment = readArticleComment;
const likeArticleComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { userID, commentID } = req.params;
        const user = yield userModel_1.default.findById(userID);
        const comment = yield commentModel_1.default.findById(commentID);
        if (user) {
            (_a = comment === null || comment === void 0 ? void 0 : comment.likes) === null || _a === void 0 ? void 0 : _a.push(new mongoose_1.default.Types.ObjectId(user._id));
            comment === null || comment === void 0 ? void 0 : comment.save();
            return res.status(201).json({
                message: "like a comment",
                length: comment === null || comment === void 0 ? void 0 : comment.likes.length,
                data: comment,
            });
        }
        else {
            return res.status(404).json({
                message: "Error",
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            message: "Unable to like Posts comment",
        });
    }
});
exports.likeArticleComment = likeArticleComment;
const unLikeArticleComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { userID, commentID } = req.params;
        const user = yield userModel_1.default.findById(userID);
        const comment = yield commentModel_1.default.findById(commentID);
        if (user) {
            (_a = comment === null || comment === void 0 ? void 0 : comment.likes) === null || _a === void 0 ? void 0 : _a.pull(new mongoose_1.default.Types.ObjectId(user._id));
            comment === null || comment === void 0 ? void 0 : comment.save();
            return res.status(201).json({
                message: "unlike a Post comment",
                data: comment,
                length: comment === null || comment === void 0 ? void 0 : comment.likes.length,
            });
        }
        else {
            return res.status(404).json({
                message: "Error",
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            message: "Unable to unlike a Posts comment",
        });
    }
});
exports.unLikeArticleComment = unLikeArticleComment;
const deleteOneComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { articleID, commentID } = req.params;
        const article = yield userModel_1.default.findByIdAndDelete(articleID);
        const comment = yield commentModel_1.default.findByIdAndDelete(commentID);
        (_a = article === null || article === void 0 ? void 0 : article.comments) === null || _a === void 0 ? void 0 : _a.pull(new mongoose_1.default.Types.ObjectId(commentID));
        article.save();
        return res.status(201).json({
            message: "read Post comment",
            data: comment,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "Unable to read Posts",
        });
    }
});
exports.deleteOneComment = deleteOneComment;
