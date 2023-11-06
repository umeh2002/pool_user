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
exports.sendDeclineFriendMail = exports.sendAcceptFriendMail = exports.sendFriendRequestMail = void 0;
const googleapis_1 = require("googleapis");
const nodemailer_1 = __importDefault(require("nodemailer"));
const path_1 = __importDefault(require("path"));
const ejs_1 = __importDefault(require("ejs"));
const GOOGLE_ID = "72356347044-mqbmm2k1lg8ql2mmkg873ss0cfbeqcqu.apps.googleusercontent.com";
const GOOGLE_SECRET = "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";
const GOOGLE_REFRESH_TOKEN = "1//04qtjA_KSfpfpCgYIARAAGAQSNwF-L9Ir4X-EeFIM9uCrqqRTr3aEr7PrEtryJxtiv0G5BwtgALMNtr7XnbVya7kqOMRZgWgZQIw";
const GOOGLE_URL = "https://developers.google.com/oauthplayground";
// import file from "../views/index.ejs"
const oAuth = new googleapis_1.google.auth.OAuth2(GOOGLE_ID, GOOGLE_SECRET, GOOGLE_URL);
oAuth.setCredentials({ access_token: GOOGLE_REFRESH_TOKEN });
const sendFriendRequestMail = (user, friend) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getAccess = (yield oAuth.getAccessToken()).token;
        const transport = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: "eumeh3882@gmail.com",
                clientId: GOOGLE_ID,
                clientSecret: GOOGLE_SECRET,
                refreshToken: GOOGLE_REFRESH_TOKEN,
                accessToken: getAccess,
            },
        });
        const passedData = {
            name: friend === null || friend === void 0 ? void 0 : friend.name,
            url: `https://pool-user.web.app/${user === null || user === void 0 ? void 0 : user._id}/${friend === null || friend === void 0 ? void 0 : friend._id}/send-request`,
        };
        const readData = path_1.default.join(__dirname, "../view/sendRequest.ejs");
        const data = yield ejs_1.default.renderFile(readData, passedData);
        const mailer = {
            from: " <eumeh3882@gmail.com> ",
            to: user.email,
            subject: "Welcome ",
            html: data,
        };
        transport.sendMail(mailer);
    }
    catch (error) {
        console.log(error);
    }
});
exports.sendFriendRequestMail = sendFriendRequestMail;
const sendAcceptFriendMail = (user, friend) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getAccess = (yield oAuth.getAccessToken()).token;
        const transport = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: "eumeh3882@gmail.com",
                clientId: GOOGLE_ID,
                clientSecret: GOOGLE_SECRET,
                refreshToken: GOOGLE_REFRESH_TOKEN,
                accessToken: getAccess,
            },
        });
        const passedData = {
            name: friend === null || friend === void 0 ? void 0 : friend.name,
            url: `https://pool-user-challenge.onrender.com/api${user === null || user === void 0 ? void 0 : user._id}/${friend === null || friend === void 0 ? void 0 : friend._id}/confirm-request`,
        };
        const readData = path_1.default.join(__dirname, "../view/confirmRequest.ejs");
        const data = yield ejs_1.default.renderFile(readData, passedData);
        const mailer = {
            from: " <eumeh3882@gmail.com> ",
            to: user.email,
            subject: "Welcome ",
            html: data,
        };
        transport.sendMail(mailer);
    }
    catch (error) {
        console.log(error);
    }
});
exports.sendAcceptFriendMail = sendAcceptFriendMail;
const sendDeclineFriendMail = (user, friend) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getAccess = (yield oAuth.getAccessToken()).token;
        const transport = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: "eumeh3882@gmail.com",
                clientId: GOOGLE_ID,
                clientSecret: GOOGLE_SECRET,
                refreshToken: GOOGLE_REFRESH_TOKEN,
                accessToken: getAccess,
            },
        });
        const passedData = {
            name: friend === null || friend === void 0 ? void 0 : friend.name,
            url: `https://pool-user-challenge.onrender.com/api${user === null || user === void 0 ? void 0 : user._id}/${friend === null || friend === void 0 ? void 0 : friend._id}/decline-request`,
        };
        const readData = path_1.default.join(__dirname, "../view/declineRequest.ejs");
        const data = yield ejs_1.default.renderFile(readData, passedData);
        const mailer = {
            from: " <eumeh3882@gmail.com> ",
            to: user.email,
            subject: "Welcome ",
            html: data,
        };
        transport.sendMail(mailer);
    }
    catch (error) {
        console.log(error);
    }
});
exports.sendDeclineFriendMail = sendDeclineFriendMail;
