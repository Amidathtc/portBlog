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
exports.rateArticle = exports.viewRatedArticle = exports.createRate = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const RatingModel_1 = __importDefault(require("../model/RatingModel"));
const userModel_1 = __importDefault(require("../model/userModel"));
const articleModel_1 = __importDefault(require("../model/articleModel"));
const mainError_1 = require("../error/mainError");
const createRate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { userID, articleID } = req.params;
        const { rate } = req.body;
        const User = yield userModel_1.default.findById(userID);
        const article = yield articleModel_1.default.findById(articleID);
        const rating = yield RatingModel_1.default.create({
            rate,
            ratedBy: User._id,
            article,
        });
        (_a = article === null || article === void 0 ? void 0 : article.ratings) === null || _a === void 0 ? void 0 : _a.push(new mongoose_1.default.Types.ObjectId(rating._id));
        article.save();
        return res.status(mainError_1.HTTP.CREATED).json({
            message: `Rating ${article.title} successfully`,
            data: rating,
        });
    }
    catch (error) {
        return res.status(mainError_1.HTTP.BAD_REQUEST).json({
            message: "error rating  article"
        });
    }
});
exports.createRate = createRate;
const viewRatedArticle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID, articleID } = req.params;
        const { rate } = req.body;
        const User = yield userModel_1.default.findById(userID);
        const Article = yield articleModel_1.default.findById(articleID).populate({
            path: "ratings",
        });
        return res.status(mainError_1.HTTP.OK).json({
            message: "Showing Rated Article",
            data: Article.ratings,
        });
    }
    catch (error) {
        return res.status(mainError_1.HTTP.BAD_REQUEST).json({
            message: "error viewing rated article"
        });
    }
});
exports.viewRatedArticle = viewRatedArticle;
const rateArticle = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID, articleID } = req.params;
        const { rate } = req.body;
        const User = yield userModel_1.default.findById(userID);
        const Article = yield articleModel_1.default.findById(articleID).populate({
            path: "ratings"
        });
        let totalRate = Article.ratings.length;
        let totalScore = Article.ratings.map((el) => {
            return el.rate;
        })
            .reduce((a, b) => {
            return a + b;
        });
        let Rate = totalScore / totalRate;
        const Rated = yield articleModel_1.default.findByIdAndUpdate(articleID, {
            rate: parseFloat(Rate.toFixed(2))
        }, {
            new: true
        });
        return res.status(mainError_1.HTTP.OK).json({
            message: "showing Rating Value",
            data: Rated,
        });
    }
    catch (error) {
        return res.status(mainError_1.HTTP.BAD_REQUEST).json({
            message: "error rating  Value",
            data: error.message
        });
    }
    ;
});
exports.rateArticle = rateArticle;
