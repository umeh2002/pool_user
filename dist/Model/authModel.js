"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userModel = new mongoose_1.default.Schema({
    email: {
        type: String,
        unique: true,
    },
    name: {
        type: String,
    },
    location: {
        type: String,
    },
    avatar: {
        type: String,
    },
    avatarURL: {
        type: String,
    },
    friends: [
        {
            type: mongoose_1.default.Types.ObjectId,
            ref: "friends",
        },
    ],
    pendingRequests: [
        {
            type: mongoose_1.default.Types.ObjectId,
            ref: "users",
        },
    ],
    accept: {
        type: Boolean,
        default: false,
    },
    likes: [
        {
            type: Array,
        },
    ],
}, { timestamps: true });
exports.default = mongoose_1.default.model("users", userModel);
