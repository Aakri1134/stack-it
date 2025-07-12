import { Router } from "express";
import { Question, User } from "../../db/schema.js";
import jwtAuthentication from "../../middleware/jwtAuthentication.js";

const deleteQuestion = Router();

deleteQuestion.delete("/:id", jwtAuthentication, async (req, res) => {
  const questionId = req.params.id;
  if (!questionId) {
    return res.status(400).json({ error: "Question ID is required" });
  }

  try {
    const userId = req.user.id;
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if(question.user.toString() !== userId && user.type !== 'admin') {
      return res.status(403).json({ error: "You do not have permission to delete this question" });
    }
    const question = await Question.findByIdAndDelete(questionId);
    if (!question) {
      return res.status(404).json({ error: "Question not found" });
    }
    
    return res.status(200).json({
      message: "Question deleted successfully",
      questionId: question._id,
    });
  } catch (err) {
    console.error("Error deleting question:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}); 