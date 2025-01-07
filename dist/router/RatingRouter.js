"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const RatingController_1 = require("../controller/RatingController");
const router = express_1.default.Router();
router.route("/:userID/:articleID/rate-article").post(RatingController_1.createRate);
router.route("/:articleID/read-rate-article").get(RatingController_1.viewRatedArticle);
router.route("/:articleID/total-rate-article").patch(RatingController_1.rateArticle);
exports.default = router;
