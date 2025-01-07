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
exports.deleteOneUser = exports.updateOneUser = exports.getOneUser = exports.getAllUsers = exports.signInUser = exports.registerUser = void 0;
const mainError_1 = require("../error/mainError");
const cloudinary_1 = __importDefault(require("../utils/cloudinary"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const userModel_1 = __importDefault(require("../model/userModel"));
// import articleModel from "../model/articleModel";
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const { name, email, password } = req.body;
        const salt = yield bcrypt_1.default.genSalt(10);
        const hashed = yield bcrypt_1.default.hash(password, salt);
        const { secure_url, public_id } = yield cloudinary_1.default.uploader.upload((_a = req.file) === null || _a === void 0 ? void 0 : _a.path);
        const user = yield userModel_1.default.create({
            name,
            email,
            password: hashed,
            avatar: secure_url,
            avatarID: public_id,
        });
        (_b = user.friends) === null || _b === void 0 ? void 0 : _b.push(user.id);
        user.save();
        return res.status(mainError_1.HTTP.CREATED).json({
            message: "Created user Successfully",
            data: user,
        });
    }
    catch (error) {
        new mainError_1.mainError({
            name: "Create Error",
            message: `This Error is came as a result of you creating this User!!!`,
            status: mainError_1.HTTP.BAD_REQUEST,
            success: false,
        });
        return res.status(mainError_1.HTTP.BAD_REQUEST).json({
            message: error.messge
        });
    }
});
exports.registerUser = registerUser;
const signInUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { password, email } = req.body;
        const user = yield userModel_1.default.findOne({ email });
        if (user) {
            const checked = yield bcrypt_1.default.compare(password, user.password);
            if (checked) {
                return res.status(mainError_1.HTTP.CREATED).json({
                    message: `welcome back ${user.name}`,
                    data: user.id,
                });
            }
            else {
                new mainError_1.mainError({
                    name: "Invalid Password Error",
                    message: `User Password is not correct`,
                    status: mainError_1.HTTP.BAD_REQUEST,
                    success: false,
                });
                return res
                    .status(mainError_1.HTTP.BAD_REQUEST)
                    .json({ message: "User Password is not correct" });
            }
        }
        else {
            new mainError_1.mainError({
                name: "Invalid User Error",
                message: `User can't be found in our Database`,
                status: mainError_1.HTTP.BAD_REQUEST,
                success: false,
            });
            return res
                .status(mainError_1.HTTP.BAD_REQUEST)
                .json({ message: "User can't be found in our Database" });
        }
    }
    catch (error) {
        new mainError_1.mainError({
            name: "Create Error",
            message: `This Error is came as a result of you creating this User!!!`,
            status: mainError_1.HTTP.BAD_REQUEST,
            success: false,
        });
        return res.status(mainError_1.HTTP.BAD_REQUEST).json({ message: "Error" });
    }
});
exports.signInUser = signInUser;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel_1.default.find();
        return res.status(mainError_1.HTTP.OK).json({
            message: "All Users found",
            data: user,
        });
    }
    catch (error) {
        new mainError_1.mainError({
            name: "GET Error",
            message: "Error finding all users",
            status: mainError_1.HTTP.BAD_REQUEST,
            success: false,
        });
        return res.status(mainError_1.HTTP.BAD_REQUEST).json({
            message: "Error finding all users",
        });
    }
});
exports.getAllUsers = getAllUsers;
const getOneUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const user = yield userModel_1.default.findById(userID);
        return res.status(mainError_1.HTTP.OK).json({
            message: `${user.name} found`,
            data: user,
        });
    }
    catch (error) {
        new mainError_1.mainError({
            name: "GET Error",
            message: `This Error is came as a result of you creating this User!!!`,
            status: mainError_1.HTTP.BAD_REQUEST,
            success: false,
        });
        return res.status(mainError_1.HTTP.BAD_REQUEST).json({
            message: "Error"
        });
    }
});
exports.getOneUser = getOneUser;
const updateOneUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        const { userID } = req.params;
        const user = yield userModel_1.default.findByIdAndUpdate(userID, { name }, { new: true });
        return res.status(mainError_1.HTTP.CREATED).json({
            message: `updated ${user.name} successfully`,
            data: user,
        });
    }
    catch (error) {
        new mainError_1.mainError({
            name: "GET Error",
            message: `This Error is came as a result of you updating this User!!!`,
            status: mainError_1.HTTP.BAD_REQUEST,
            success: false,
        });
        return res.status(mainError_1.HTTP.BAD_REQUEST).json({
            message: "Error updating user",
        });
    }
});
exports.updateOneUser = updateOneUser;
const deleteOneUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const user = yield userModel_1.default.findByIdAndDelete(userID);
        return res.status(mainError_1.HTTP.NOT_FOUND).json({
            message: `delete ${user.name} successfully`,
        });
    }
    catch (error) {
        new mainError_1.mainError({
            name: "GET Error",
            message: `This Error is came as a result of you deleting this User!!!`,
            status: mainError_1.HTTP.BAD_REQUEST,
            success: false,
        });
        return res.status(mainError_1.HTTP.BAD_REQUEST).json({
            message: "Error deleting user",
        });
    }
});
exports.deleteOneUser = deleteOneUser;
// export const CategoryAuthors = async (req: Request, res: Response) => {
//   try {
//     const { userID } = req.params;
//     const { category } = req.body;
//     const user: any = await userModel.findById(userID);
//     user?.category.push(category);
//     user.save();
//     return res.status(201).json({
//       message: "Category updated successfully",
//       data: user,
//     });
//   } catch (error) {
//     res.status(404).json({
//       message: "error Occured",
//     });
//   }
// };
// export const AuthorCategoryForArticle = async (req: Request, res: Response) => {
//   try {
//     const { authorID } = req.params;
//     const user = await userModel.findById(authorID);
//     const article: any = await articleModel.find().populate({
//       path: "categoryName",
//       options: {
//         sort: {
//           createdAt: -1,
//         },
//       },
//     });
//     let data: any = article?.filter((el: any) =>
//       user?.category!.includes(el.categoryName)
//     );
//     //  console.log("List of articles", article.filter((el:any)=>{
//     //      author?.category.includes()
//     //   }))
//     return res.status(200).json({
//       message: "Article successfully found ",
//       data: data,
//     });
//   } catch (error) {
//     return res.status(404).json({
//       message: "error Occured",
//     });
//   }
// };
