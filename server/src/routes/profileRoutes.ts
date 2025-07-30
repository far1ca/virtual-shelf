import express, { NextFunction, Request, Response } from "express";
import User from "../models/User";
const router = express.Router();

router.get("/", async (req, res) => {
  const userId = req.query.userId as string;

  const user = await User.findOne({ _id: userId });

  if (!user) {
    return res.status(400).json({ error: "User ID is required" });
  }

  res.status(200).json({
    success: true,
    user: user,
  });
});

router.post("/update", async (req, res) => {
  const { userId: userId, books: books } = req.body;

  if (!userId || !books) {
    return res.status(400).json({ error: "User ID and books are required" });
  }

  try {
    const user = await User.findByIdAndUpdate(userId, { books }, { new: true });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.error("Error updating user books:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
