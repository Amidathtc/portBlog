"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const categoryController_1 = require("../controller/categoryController");
const router = express_1.default.Router();
router.route("/view-cat").get(categoryController_1.viewCategory);
router.route("/:userID/:articleID/cat").post(categoryController_1.createCategory);
exports.default = router;
