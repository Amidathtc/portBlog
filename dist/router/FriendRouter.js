"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const FriendsController_1 = require("../controller/FriendsController");
const router = express_1.default.Router();
router.route("/:userID/:friendID/add-friend").post(FriendsController_1.beFriend);
router.route("/:userID/:friendID/un-friend").post(FriendsController_1.unFriend);
exports.default = router;
