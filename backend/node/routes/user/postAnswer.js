import { Router } from "express"
import { Answer, User } from "../../db/schema.js"
import { Question } from "../../db/schema.js"
import jwtAuthentication from "../../middleware/jwtAuthentication.js"

const postAnswer = Router()

postAnswer.post("/", jwtAuthentication, async (req, res) => {
  const userId = req.user.id
  console.log("User ID:", userId)
  if (!userId) {
    return res.status(400).json({ error: "User ID is required" })
  }
  const { questionId, answer } = req.body
  console.log("Question ID:", questionId)
  console.log("Answer:", answer)
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
    updatedAt: new Date(),
    upvotes: 0,
    downvotes: 0,
  })
  console.log("New Answer:", newAnswer)
  const question = await Question.findById(questionId)
  if (!question) {
    return res.status(404).json({ error: "Question not found" })
  }

  const [user, asker] = await Promise.all([
    User.findById(userId),
    User.findById(question.user),
  ])

  console.log("Question:", question)
  console.log("User:", user)
  console.log("Asker:", asker)
  question.answers.push(newAnswer._id)
  asker.notifications.push({
    type: "answer",
    message: `Your question "${question.title}" has received a new answer.`,
    questionId: question._id,
    answerId: newAnswer._id,
    createdAt: new Date(),
  })
  if (!user) {
    return res.status(404).json({ error: "User not found" })
  }
  user.answers.push(newAnswer._id)
  user.updatedAt = new Date()

  try {
    await Promise.all([
      asker.save(),
      question.save(),
      newAnswer.save(),
      user.save(),
    ])
    return res.status(201).json({
      message: "Answer posted successfully",
      answer: newAnswer,
    })
  } catch (err) {
    console.error("Error saving answer:", err)
    return res.status(500).json({ error: "Internal Server Error" })
  }
})

export default postAnswer
