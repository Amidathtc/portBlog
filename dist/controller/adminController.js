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
exports.getOneAdmin = exports.getAllAdmins = exports.signInAdmin = exports.registerAdmin = void 0;
const mainError_1 = require("../error/mainError");
const cloudinary_1 = __importDefault(require("../utils/cloudinary"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const adminModel_1 = __importDefault(require("../model/adminModel"));
const registerAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const { password, email, name, } = req.body;
        const salt = yield bcrypt_1.default.genSalt(10);
        const hashed = yield bcrypt_1.default.hash(password, salt);
        const { secure_url, public_id } = yield cloudinary_1.default.uploader.upload((_a = req.file) === null || _a === void 0 ? void 0 : _a.path);
        const admin = yield adminModel_1.default.create({
            name,
            email,
            password: hashed,
            avatar: secure_url,
            avatarID: public_id,
        });
        (_b = admin.friends) === null || _b === void 0 ? void 0 : _b.push(admin.id);
        admin.save();
        return res.status(mainError_1.HTTP.CREATED).json({
            message: `${admin.name} created successfully`,
            data: admin,
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
            message: error.message
        });
    }
});
exports.registerAdmin = registerAdmin;
const signInAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { password, email } = req.body;
        const admin = yield adminModel_1.default.findOne({ email });
        if (admin) {
            const checked = yield bcrypt_1.default.compare(password, admin.password);
            if (checked) {
                return res.status(mainError_1.HTTP.CREATED).json({
                    message: `welcome back ${admin.name}`,
                    data: admin._id,
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
exports.signInAdmin = signInAdmin;
// export const getAdmins = async (
//   req: Request,
//   res: Response,
// ): Promise<Response> => {
//   try {
//     const admin = await adminModel.find();
//     return res.status(HTTP.OK).json({
//       message: "This is all the Admins",
//       data: admin,
//     });
//   } catch (error:any) {
//     new mainError({
//       name: "GET Error",
//       message: `This Error is came as a result of you getting all Admin!!!`,
//       status: HTTP.BAD_REQUEST,
//       success: false,
//     });
//     return res.status(HTTP.BAD_REQUEST).json({
//       message: error.message
//     });
//   }
// };
const getAllAdmins = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const admin = yield adminModel_1.default.find();
        // console.log(admin)
        return res.status(mainError_1.HTTP.OK).json({
            message: "All Admin found",
            data: admin,
        });
    }
    catch (error) {
        new mainError_1.mainError({
            name: "GET Error",
            message: "Error finding all admins",
            status: mainError_1.HTTP.BAD_REQUEST,
            success: false,
        });
        return res.status(mainError_1.HTTP.BAD_REQUEST).json({
            message: "Error finding all adminss",
        });
    }
});
exports.getAllAdmins = getAllAdmins;
const getOneAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { adminID } = req.params;
        const admin = yield adminModel_1.default.findById(adminID);
        return res.status(mainError_1.HTTP.OK).json({
            message: "found",
            data: admin,
        });
    }
    catch (error) {
        new mainError_1.mainError({
            name: "GET Error",
            message: `This Error is came as a result of you creating this Admin!!!`,
            status: mainError_1.HTTP.BAD_REQUEST,
            success: false,
        });
        return res.status(mainError_1.HTTP.BAD_REQUEST).json({ message: "Error" });
    }
});
exports.getOneAdmin = getOneAdmin;
// export const postAdByAdmin = async (req: Request, res: Response) => {
//     try {
//       const { title, description, imageUrl } = req.body;
//       const newAd = new adModel({
//         title,
//         description,
//         imageUrl,
//       });
//       await newAd.save();
//       return res.status(HTTP.OK).json({
//         message: 'Ad posted successfully',
//         ad: newAd,
//       });
//     } catch (error) {
//       return res.status(HTTP.BAD_REQUEST).json({
//         message: 'Error posting ad',
//       });
//     }
//   };
