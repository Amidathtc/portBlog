"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminController_1 = require("../controller/adminController");
const multer_1 = require("../utils/multer");
const router = express_1.default.Router();
// router.route('/admin/ads').post(postAdByAdmin);
router.route("/register-admin").post(multer_1.upload, adminController_1.registerAdmin);
router.route("/sign-in").post(adminController_1.signInAdmin);
router.route("/get-admins").get(adminController_1.getAllAdmins);
router.route("/:userID/get-one-admin").get(adminController_1.getOneAdmin);
exports.default = router;
