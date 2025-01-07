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
exports.viewCategory = exports.createCategory = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const categoryModel_1 = __importDefault(require("../model/categoryModel"));
const mainError_1 = require("../error/mainError");
const userModel_1 = __importDefault(require("../model/userModel"));
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { userID } = req.params;
        const { categoryName } = req.body;
        const user = yield userModel_1.default.findById(userID);
        const category = yield categoryModel_1.default.create({
            categoryName,
            // userID:user._id
        });
        (_a = user.category) === null || _a === void 0 ? void 0 : _a.push(new mongoose_1.default.Types.ObjectId(category._id));
        user === null || user === void 0 ? void 0 : user.save();
        return res.status(mainError_1.HTTP.CREATED).json({
            message: "Category created",
            data: category.id,
        });
    }
    catch (error) {
        return res.status(mainError_1.HTTP.BAD_REQUEST).json({
            message: "Error creating category",
        });
    }
});
exports.createCategory = createCategory;
const viewCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield categoryModel_1.default.find();
        return res.status(200).json({
            message: "Viewing categories",
            data: category
        });
    }
    catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
});
exports.viewCategory = viewCategory;
