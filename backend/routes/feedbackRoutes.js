import express from "express";
import {
  submitFeedback,
  getAllFeedbacks,
  deleteFeedback,
} from "../controllers/feedbackController.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

//  Anyone can submit feedback
router.post("/", submitFeedback);

//  Only admin (with token) can view feedbacks
router.get("/", verifyToken, getAllFeedbacks);

// Only admin (with token) can delete feedback
router.delete("/:id", verifyToken, deleteFeedback); 

export default router;
