import { Router } from "express"
import { Answer, User } from "../../db/schema.js"
import { Question } from "../../db/schema.js"
import jwtAuthentication from "../../middleware/jwtAuthentication.js"

const postAnswer = Router()

postAnswer.post("/", jwtAuthentication, async (req, res) => {
  const userId = req.user.id
  if (!userId) {
    return res.status(400).json({ error: "User ID is required" })
  }
  const { questionId, answer } = req.body
  if (!questionId || !answer) {
    return res
      .status(400)
      .json({ error: "Question ID and answer are required" })
  }
  const newAnswer = new Answer({
    questionId,
    answer,
    user: userId,
    createdAt: new Date(),
  })
  const question = await Question.findById(questionId)
  if (!question) {
    return res.status(404).json({ error: "Question not found" })
  }
  question.answers.push(newAnswer._id)
  const asker = new User.findById(question.user)
  asker.notifications.push({
    type: "answer",
    message: `Your question "${question.title}" has received a new answer.`,
    createdAt: new Date(),
  })

  try {
    await Promise.all([asker.save(), question.save(), newAnswer.save()]).catch(
      (err) => {
        console.error("Error saving question or user:", err)
        return res.status(500).json({ error: "Internal Server Error" })
      }
    )
  } catch (err) {
    console.error("Error saving answer:", err)
    return res.status(500).json({ error: "Internal Server Error" })
  }
})

export default postAnswer
