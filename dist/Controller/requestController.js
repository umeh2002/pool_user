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
exports.declineRequest = exports.confirmRequest = exports.sendRequest = void 0;
const authModel_1 = __importDefault(require("../Model/authModel"));
const mongoose_1 = __importDefault(require("mongoose"));
const email_1 = require("../utils/email");
const sendRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID, friendID } = req.params;
        const user = yield authModel_1.default.findById(userID);
        const friend = yield authModel_1.default.findById(friendID);
        if (user && friend) {
            const addFriend = yield authModel_1.default.findByIdAndUpdate(friendID, { new: true });
            (0, email_1.sendFriendRequestMail)(user, friend).then(() => {
                console.log("mail sent");
            });
            return res.status(201).json({
                message: "request sent",
                data: addFriend,
            });
        }
        else {
            return res.status(404).json({
                message: "user not found",
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            message: "Error sending request",
            data: error.message,
        });
    }
});
exports.sendRequest = sendRequest;
const confirmRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const { userID, friendID } = req.params;
        const friend = yield authModel_1.default.findById(friendID);
        const user = yield authModel_1.default.findByIdAndUpdate(userID, { accept: true }, { new: true });
        if (!friend || !user) {
            return res.status(404).json({
                message: "User not found.",
            });
        }
        yield ((_a = user.friends) === null || _a === void 0 ? void 0 : _a.push(new mongoose_1.default.Types.ObjectId(friendID)));
        user.save();
        yield ((_b = friend.friends) === null || _b === void 0 ? void 0 : _b.push(new mongoose_1.default.Types.ObjectId(userID)));
        friend.save();
        (0, email_1.sendAcceptFriendMail)(user, friend).then(() => {
            console.log("sent confirm mail");
        });
        return res.status(201).json({
            message: "Request accepted. Users are now friends.",
            data: { user, friend },
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "Error occurred",
            data: error.message,
        });
    }
});
exports.confirmRequest = confirmRequest;
const declineRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID, friendID } = req.params;
        const friend = yield authModel_1.default.findById(friendID);
        const user = yield authModel_1.default.findById(userID);
        if (!friend) {
            return res.status(404).json({
                message: "Friend not found.",
            });
        }
        friend.pendingRequests = friend.pendingRequests
            ? friend.pendingRequests.filter((request) => request.toString() !== userID)
            : [];
        yield friend.save();
        (0, email_1.sendDeclineFriendMail)(user, friend).then(() => {
            console.log("sent decline mail");
        });
        return res.status(200).json({
            message: "Request declined. Friend request removed.",
            data: friend,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "Error occurred",
            data: error.message,
        });
    }
});
exports.declineRequest = declineRequest;
