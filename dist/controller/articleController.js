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
exports.unLikeUserArticle = exports.likeUserArticle = exports.viewFriendArticles = exports.getAllArticles = exports.getUserArticle = exports.createArticle = void 0;
const userModel_1 = __importDefault(require("../model/userModel"));
const articleModel_1 = __importDefault(require("../model/articleModel"));
const mongoose_1 = __importDefault(require("mongoose"));
const cloudinary_1 = __importDefault(require("../utils/cloudinary"));
const mainError_1 = require("../error/mainError");
const createArticle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { description, content, categoryName, title } = req.body;
        const { userID } = req.params;
        const User = yield userModel_1.default.findById(userID);
        const { secure_url, public_id } = yield cloudinary_1.default.uploader.upload((_a = req.file) === null || _a === void 0 ? void 0 : _a.path);
        const article = yield articleModel_1.default.create({
            title,
            description,
            content,
            categoryName,
            userID,
            image: secure_url,
            imageID: public_id,
        });
        User === null || User === void 0 ? void 0 : User.articles.push(new mongoose_1.default.Types.ObjectId(article._id));
        User === null || User === void 0 ? void 0 : User.save();
        return res.status(mainError_1.HTTP.CREATED).json({
            message: "Article created successfully",
            data: article,
        });
    }
    catch (error) {
        return res.status(mainError_1.HTTP.BAD_REQUEST).json({
            message: error.message,
        });
    }
});
exports.createArticle = createArticle;
const getUserArticle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        // const { articleID } = req.params;
        const user = yield userModel_1.default.findById(userID).populate({
            path: "articles",
            options: {
                sort: {
                    createdAt: -1,
                },
            },
        });
        // if (user === null) {
        //   return res.status(HTTP.OK).json({
        //     message: `${user?.name} have no article`,
        //   });
        // } else {
        //   res.status(HTTP.OK).json({
        //     message: "Gotten all of this user article",
        //     data: user,
        //   });
        // }
        res.status(mainError_1.HTTP.OK).json({
            message: "Gotten all of this user article",
            data: user,
        });
    }
    catch (error) {
        res.status(mainError_1.HTTP.BAD_REQUEST).json({
            message: "Error Found",
            data: error.message,
        });
    }
});
exports.getUserArticle = getUserArticle;
const getAllArticles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const article = yield articleModel_1.default.find();
        res.status(mainError_1.HTTP.OK).json({
            message: "viewing all Article from DB",
            data: article,
        });
    }
    catch (error) {
        res.status(mainError_1.HTTP.BAD_REQUEST).json({
            message: "Error Found",
            data: error.message,
        });
    }
});
exports.getAllArticles = getAllArticles;
const viewFriendArticles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const users = yield userModel_1.default.findById(userID);
        const article = yield articleModel_1.default.find();
        const user = yield userModel_1.default.findById(userID).populate({
            path: "articles",
            options: {
                sort: {
                    createdAt: -1,
                },
            },
        });
        let data = article === null || article === void 0 ? void 0 : article.filter((el) => users === null || users === void 0 ? void 0 : users.friends.includes(el.userID));
        res.status(201).json({
            message: "user's Article ",
            data,
        });
    }
    catch (error) {
        res.status(404).json({
            message: "Error Found",
            data: error,
        });
    }
});
exports.viewFriendArticles = viewFriendArticles;
const likeUserArticle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const { userID, articleID } = req.params;
        const user = yield userModel_1.default.findById(userID);
        if (user) {
            const likeArticle = yield articleModel_1.default.findById(articleID);
            if (!likeArticle) {
                return res.status(mainError_1.HTTP.BAD_REQUEST).json({
                    message: "Article not found",
                });
            }
            if ((_a = likeArticle.likes) === null || _a === void 0 ? void 0 : _a.includes(user._id)) {
                return res.status(mainError_1.HTTP.CONFILT).json({
                    message: "You have liked this article already",
                });
            }
            (_b = likeArticle === null || likeArticle === void 0 ? void 0 : likeArticle.likes) === null || _b === void 0 ? void 0 : _b.push(user._id);
            likeArticle === null || likeArticle === void 0 ? void 0 : likeArticle.save();
            return res.status(mainError_1.HTTP.CREATED).json({
                message: `post liked by ${user.name}`,
            });
        }
        else {
            return res.status(mainError_1.HTTP.OK).json({
                message: "you can't do this",
            });
        }
    }
    catch (error) {
        res.status(mainError_1.HTTP.BAD_REQUEST).json({
            message: "Error Found",
            data: error,
        });
    }
});
exports.likeUserArticle = likeUserArticle;
const unLikeUserArticle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { userID, articleID } = req.params;
        const user = yield userModel_1.default.findById(userID);
        if (user) {
            const likeArticle = yield articleModel_1.default.findById(articleID);
            (_a = likeArticle === null || likeArticle === void 0 ? void 0 : likeArticle.likes) === null || _a === void 0 ? void 0 : _a.pull(new mongoose_1.default.Types.ObjectId(user === null || user === void 0 ? void 0 : user._id));
            likeArticle === null || likeArticle === void 0 ? void 0 : likeArticle.save();
            return res.status(mainError_1.HTTP.CREATED).json({
                message: `post unliked by ${user.name}`,
                data: likeArticle,
            });
        }
        else {
            return res.status(mainError_1.HTTP.OK).json({
                message: "you can't do this",
            });
        }
    }
    catch (error) {
        res.status(mainError_1.HTTP.BAD_REQUEST).json({
            message: "Error Found",
            data: error,
        });
    }
});
exports.unLikeUserArticle = unLikeUserArticle;
