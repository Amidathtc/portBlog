"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userController_1 = require("./../controller/userController");
const express_1 = __importDefault(require("express"));
;
const multer_1 = require("../utils/multer");
const router = express_1.default.Router();
router.route("/register").post(multer_1.upload, userController_1.registerUser);
router.route("/:userID/get-user").get(userController_1.getOneUser);
router.route("/sign-in").post(userController_1.signInUser);
router.route("/get-all-users").get(userController_1.getAllUsers);
router.route("/:userID/update").patch(userController_1.updateOneUser);
router.route("/:userID/delete").delete(userController_1.deleteOneUser);
exports.default = router;
