"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const requestController_1 = require("../Controller/requestController");
const router = (0, express_1.Router)();
router.route("/:userID/:friendID/send-request").patch(requestController_1.sendRequest);
router.route("/:userID/:friendID/confirm-request").patch(requestController_1.confirmRequest);
router.route("/:userID/:friendID/decline-request").patch(requestController_1.declineRequest);
exports.default = router;
