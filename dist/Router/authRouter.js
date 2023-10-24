"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../Controller/authController");
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)().single("avatar");
const router = (0, express_1.Router)();
router.route("/create-user").post(upload, authController_1.createUser);
router.route("/find-users").get(authController_1.viewUsers);
router.route("/:userID/find-user").get(authController_1.viewUser);
router.route("/:userID/delete-user").delete(authController_1.deleteUser);
router.route("/:userID/like-user").patch(authController_1.likeUser);
exports.default = router;
