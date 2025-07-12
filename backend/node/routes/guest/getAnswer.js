import { Router } from "express";
import { Answer } from "../../db/schema.js";

const getAnswer = Router();

getAnswer.get("/:id", async (req, res) => {
  const answerId = req.params.id;
  if (!answerId) {
    return res.status(400).json({ error: "Question ID is required" });
  }

  try {
    const answer = await Answer.findById(answerId);
    if (!answer) {
      return res.status(404).json({ error: "Answer not found" });
    }   
    return res.status(200).json({
      message: "Answer retrieved successfully",
      answer: {
        id: answer._id,
        questionId: answer.questionId,
        answer: answer.answer,
        user: answer.user,
        createdAt: answer.createdAt,
        updatedAt: answer.updatedAt,
        upvotes: answer.upvotes,
        downvotes: answer.downvotes,
      },
    });
  } catch (err) {
    console.error("Error retrieving Answer:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

