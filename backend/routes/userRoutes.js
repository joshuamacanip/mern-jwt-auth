import express from "express";
import {
  signInUserController,
  postUserController,
  updateUserController,
  deleteUserController,
  logOutUserController,
} from "../controller/userController.js";
const router = express.Router();

router.get("/", signInUserController);
router.post("/", postUserController);
router.post("/logout", logOutUserController);
router.put("/:id", updateUserController);
router.delete("/:id", deleteUserController);

export default router;
