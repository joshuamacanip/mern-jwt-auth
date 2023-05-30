import express from "express";
import {
  signInUserController,
  postUserController,
  updateUserController,
  deleteUserController,
  logOutUserController,
  getUserController,
} from "../controller/userController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

// Public Route
router.get("/", signInUserController);
router.post("/", postUserController);
router.post("/logout", logOutUserController);

// Private Route
router.get("/get", protect, getUserController);
router.put("/:id", updateUserController);
router.delete("/:id", deleteUserController);

export default router;
