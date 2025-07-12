import { Router } from "express"
import jwtAuthentication from "../../middleware/jwtAuthentication.js"
import { Question, User, Answer } from "../../db/schema.js"

const upvote = Router()

upvote.post("/", jwtAuthentication, async (req, res) => {
  const { id, type } = req.body

  const userId = req.user.id
  if (!userId) {
    return res.status(400).json({ error: "User ID is required" })
  }
  if (type === "question") {
    if (!id) {
      return res.status(400).json({ error: "Question ID is required" })
    }
    const [user, question] = await Promise.all([
      User.findById(userId),
        Question.findById(id),
    ])
    if (!question) {
      return res.status(404).json({ error: "Question not found" })
    }
    if (!user) {
      return res.status(404).json({ error: "User not found" })
    }
    if (user.upvotes.includes(id)) {
      user.upvotes = user.upvotes.filter((upvoteId) => upvoteId !== id)
      question.upvotes -= 1
      user.updatedAt = new Date()
      question.updatedAt = new Date()
      try {
        await Promise.all([question.save(), user.save()])
        return res
          .status(200)
          .json({ message: "Upvote removed successfully", id })
      } catch (err) {
        console.error("Error saving question:", err)
        return res.status(500).json({ error: "Internal Server Error" })
      }
    }
    if(user.downvotes.includes(id)) {
      user.downvotes = user.downvotes.filter((downvoteId) => downvoteId !== id)
      question.downvotes -= 1
      user.updatedAt = new Date()
      question.updatedAt = new Date()
    }
    user.upvotes.push(id)
    user.updatedAt = new Date()
    question.upvotes += 1

    question.updatedAt = new Date()

    const asker = await User.findById(question.user)
    if (!asker) {
      return res.status(404).json({ error: "Asker not found" })
    }
    asker.notifications.push({
      type: "upvote",
      message: `Your question "${question.title}" has received an upvote.`,
      questionId: question._id,
      createdAt: new Date(),
    })

    try {
      await Promise.all([question.save(), asker.save(), user.save()])
      return res
        .status(200)
        .json({ message: "Upvote for question successful", id })
    } catch (err) {
      console.error("Error saving question:", err)
      return res.status(500).json({ error: "Internal Server Error" })
    }
  } else if (type === "answer") {
    if (!id) {
      return res.status(400).json({ error: "Answer ID is required" })
    }
    const [answer, user] = await Promise.all([
      Answer.findById(id),
      User.findById(userId),
    ])
    if (!answer) {
      return res.status(404).json({ error: "Answer not found" })
    }
    if (!user) {
      return res.status(404).json({ error: "User not found" })
    }
    if (user.upvotes.includes(id)) {
      user.upvotes = user.upvotes.filter((upvoteId) => upvoteId !== id)
      answer.upvotes -= 1
      user.updatedAt = new Date()
      answer.updatedAt = new Date()
      try {
        await Promise.all([answer.save(), user.save()])
        return res
          .status(200)
          .json({ message: "Upvote removed successfully", id })
      } catch (err) {
        console.error("Error saving question:", err)
        return res.status(500).json({ error: "Internal Server Error" })
      }
    }
    if (user.downvotes.includes(id)) {
      user.downvotes = user.downvotes.filter((downvoteId) => downvoteId !== id)
      answer.downvotes -= 1
      user.updatedAt = new Date()
      answer.updatedAt = new Date()
    }
    user.upvotes.push(id)
    user.updatedAt = new Date()
    answer.upvotes += 1
    answer.updatedAt = new Date()
    const replier = await User.findById(asnwer.user)
    if (!replier) {
      return res.status(404).json({ error: "Answer not found" })
    }

    replier.notifications.push({
      type: "upvote",
      message: `Your answer has received an upvote.`,
      answerId: answer._id,
      questionId: answer.questionId,
      createdAt: new Date(),
    })
    replier.updatedAt = new Date()
    try {
      await Promise.all([answer.save(), replier.save()])
      return res
        .status(200)
        .json({ message: "Upvote for answer successful", id })
    } catch (err) {
      console.error("Error saving answer:", err)
      return res.status(500).json({ error: "Internal Server Error" })
    }
  } else {
    return res
      .status(400)
      .json({ error: "Invalid type. Use 'question' or 'answer'." })
  }
})

export default upvote
