"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.likeUser = exports.deleteUser = exports.viewUser = exports.viewUsers = exports.createUser = void 0;
const authModel_1 = __importDefault(require("../Model/authModel"));
const streamUpload_1 = require("../Config/streamUpload");
const mongoose_1 = __importDefault(require("mongoose"));
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { name, email, location } = req.body;
        const { secure_url, public_id } = yield (0, streamUpload_1.streamUpload)(req);
        const user = yield authModel_1.default.create({
            name, email, location, avatar: secure_url, avatarURL: public_id,
        });
        (_a = user.friends) === null || _a === void 0 ? void 0 : _a.push(new mongoose_1.default.Types.ObjectId(user._id));
        user.save();
        return res.status(201).json({
            message: "created successfully",
            data: user
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "Error creating user",
            data: error.message
        });
    }
});
exports.createUser = createUser;
const viewUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield authModel_1.default.find();
        return res.status(201).json({
            message: "viewing successfully",
            data: user
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "Error viewing user",
            data: error.message
        });
    }
});
exports.viewUsers = viewUsers;
const viewUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const user = yield authModel_1.default.findById(userID);
        return res.status(201).json({
            message: "viewing one successfully",
            data: user
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "Error viewing user",
            data: error.message
        });
    }
});
exports.viewUser = viewUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID } = req.params;
        const user = yield authModel_1.default.findByIdAndDelete(userID);
        return res.status(201).json({
            message: "delete one successfully",
            data: user
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "Error deleting user",
            data: error.message
        });
    }
});
exports.deleteUser = deleteUser;
const likeUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const { userID } = req.params;
        const user = yield authModel_1.default.findById(userID);
        if (user) {
            (_b = user === null || user === void 0 ? void 0 : user.likes) === null || _b === void 0 ? void 0 : _b.push(new mongoose_1.default.Types.ObjectId(user._id));
            user === null || user === void 0 ? void 0 : user.save();
            return res.status(201).json({
                message: 'likes updated',
                data: user === null || user === void 0 ? void 0 : user.likes,
                length: user === null || user === void 0 ? void 0 : user.likes.length
            });
        }
        else {
            return res.status(404).json({
                message: 'user not found',
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            message: "error liking user",
            data: error.message,
        });
    }
});
exports.likeUser = likeUser;
