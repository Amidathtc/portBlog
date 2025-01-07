"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const articleController_1 = require("../controller/articleController");
const articleController_2 = require("../controller/articleController");
const multer_1 = require("../utils/multer");
const router = express_1.default.Router();
router.route("/view-articles").get(articleController_1.getAllArticles);
router.route("/:userID/create-article").post(multer_1.image, articleController_1.createArticle);
router.route("/:userID/get-one-article").get(articleController_1.getUserArticle);
router.route("/:userID/read-friend-article").get(articleController_1.viewFriendArticles);
router.route("/:userID/:postID/unlike-post").post(articleController_2.unLikeUserArticle);
router.route("/:userID/:postID/like-post").post(articleController_2.likeUserArticle);
exports.default = router;
