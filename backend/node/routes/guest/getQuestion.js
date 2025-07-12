import { Router } from "express";
import { Question } from "../../db/schema.js";

const getQuestion = Router();

getQuestion.get("/:id", async (req, res) => {
  const questionId = req.params.id;
  if (!questionId) {
    return res.status(400).json({ error: "Question ID is required" });
  }

  try {
    const question = await Question.findById(questionId);
    if (!question) {
      return res.status(404).json({ error: "Question not found" });
    }   
    return res.status(200).json({
      message: "Question retrieved successfully",
      question: {
        id: question._id,
        title: question.title,
        description: question.description,
        tags: question.tags,
        answers: question.answers,
        upvotes: question.upvotes,
        downvotes: question.downvotes,
        user: {
          id: question.user._id,
          username: question.user.username,
          email: question.user.email,
        },
        createdAt: question.createdAt,
        updatedAt: question.updatedAt,
      },
    });
  } catch (err) {
    console.error("Error retrieving question:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

