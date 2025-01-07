"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const RequestController_1 = require("../controller/RequestController");
const router = express_1.default.Router();
router.route("/:userID/:friendID/make-request").post(RequestController_1.makeRequest);
router.route("/:userID/:friendID/delete-request").delete(RequestController_1.unSendingRequest);
router.route("/:userID/view-request").get(RequestController_1.viewRequest);
exports.default = router;
