import { google } from "googleapis";
import nodemailer from "nodemailer";
import path from "path";
import ejs from "ejs";

const GOOGLE_ID =
  "72356347044-mqbmm2k1lg8ql2mmkg873ss0cfbeqcqu.apps.googleusercontent.com";
const GOOGLE_SECRET = "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";
const GOOGLE_REFRESH_TOKEN =
  "1//04qtjA_KSfpfpCgYIARAAGAQSNwF-L9Ir4X-EeFIM9uCrqqRTr3aEr7PrEtryJxtiv0G5BwtgALMNtr7XnbVya7kqOMRZgWgZQIw";
const GOOGLE_URL = "https://developers.google.com/oauthplayground";
// import file from "../views/index.ejs"
const oAuth = new google.auth.OAuth2(GOOGLE_ID, GOOGLE_SECRET, GOOGLE_URL);
oAuth.setCredentials({ access_token: GOOGLE_REFRESH_TOKEN });

export const sendFriendRequestMail = async (user: any, friend: any) => {
  try {
    const getAccess: any = (await oAuth.getAccessToken()).token;

    const transport = nodemailer.createTransport({
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
      name: friend?.name,
      url: `http://localhost:3474/${user?._id}/${friend?._id}/send-request`,
    };

    const readData = path.join(__dirname, "../view/sendRequest.ejs");
    const data = await ejs.renderFile(readData, passedData);

    const mailer = {
      from: " <eumeh3882@gmail.com> ",
      to: friend.email,
      subject: "Welcome ",
      html: data,
    };

    transport.sendMail(mailer);
  } catch (error) {
    console.log(error);
  }
};

export const sendAcceptFriendMail = async (user: any, friend: any) => {
  try {
    const getAccess: any = (await oAuth.getAccessToken()).token;

    const transport = nodemailer.createTransport({
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
      name: friend?.name,
      url: `http://localhost:3474/${user?._id}/${friend?._id}/confirm-request`,
    };

    const readData = path.join(__dirname, "../view/confirmRequest.ejs");
    const data = await ejs.renderFile(readData, passedData);

    const mailer = {
      from: " <eumeh3882@gmail.com> ",
      to: friend.email,
      subject: "Welcome ",
      html: data,
    };

    transport.sendMail(mailer);
  } catch (error) {
    console.log(error);
  }
};

export const sendDeclineFriendMail = async (user: any, friend: any) => {
  try {
    const getAccess: any = (await oAuth.getAccessToken()).token;

    const transport = nodemailer.createTransport({
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
      name: friend?.name,
      url: `http://localhost:3474/${user?._id}/${friend?._id}/decline-request`,
    };

    const readData = path.join(__dirname, "../view/declineRequest.ejs");
    const data = await ejs.renderFile(readData, passedData);

    const mailer = {
      from: " <eumeh3882@gmail.com> ",
      to: friend.email,
      subject: "Welcome ",
      html: data,
    };

    transport.sendMail(mailer);
  } catch (error) {
    console.log(error);
  }
};
