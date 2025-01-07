"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.coverImage = exports.image = exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "upload");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + "-" + uniqueSuffix + ".jpg");
    }
});
// for signing up
exports.upload = (0, multer_1.default)({ storage: storage }).single("avatar");
// for creating an article
// export const image = multer({ storage: storage }).single("image");
exports.image = (0, multer_1.default)({ storage: storage }).single("image");
// for cover image
exports.coverImage = (0, multer_1.default)({ storage: storage }).single("coverImage");
