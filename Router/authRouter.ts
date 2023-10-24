import { Router } from "express";
import { createUser, deleteUser, likeUser, viewUser, viewUsers } from "../Controller/authController";
import multer from "multer"

const upload = multer().single("avatar")

const router = Router()

router.route("/create-user").post(upload,createUser)
router.route("/find-users").get(viewUsers)
router.route("/:userID/find-user").get(viewUser)
router.route("/:userID/delete-user").delete(deleteUser)
router.route("/:userID/like-user").patch(likeUser)

export default router