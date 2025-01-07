"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const commentController_1 = require("../controller/commentController");
const router = express_1.default.Router();
router.route("/:userID/:articleID/create-comment").post(commentController_1.createComment);
router.route("/comments").get(commentController_1.readComment);
router.route("/:commentID/comment-detail").get(commentController_1.readOneComment);
router.route("/:articleID/read-post-comment").get(commentController_1.readArticleComment);
router.route("/:userID/:commentID/like-comment").patch(commentController_1.likeArticleComment);
router.route("/:userID/:commentID/unlike-comment").patch(commentController_1.unLikeArticleComment);
router.route("/:articleID/:commentID/delete-comment").delete(commentController_1.deleteOneComment);
exports.default = router;
