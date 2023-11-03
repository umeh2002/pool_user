import { Router } from "express";
import {
  confirmRequest,
  declineRequest,
  sendRequest,
} from "../Controller/requestController";

const router = Router();

router.route("/:userID/:friendID/send-request").patch(sendRequest);
router.route("/:userID/:friendID/confirm-request").patch(confirmRequest);
router.route("/:userID/:friendID/decline-request").patch(declineRequest);
router.route("/:userID/:friendID/decline-request").patch(declineRequest);

export default router;
