import { Router } from "express"
import jwtAuthentication from "../../middleware/jwtAuthentication.js"
import { Question } from "../../db/schema.js"

const postQuestion = Router()

postQuestion.post("/", jwtAuthentication, async (req, res) => {
  const { title, description, tags } = req.body
  const userId = req.user.userId
  console.log("User ID:", userId)
  if (!userId) {
    return res.status(400).json({ error: "User ID is required" })
  }
  if (!title || !description) {
    return res.status(400).json({ error: "Title and description are required" })
  }
  const newQuestion = new Question({
    title,
    description,
    tags: tags || [],
    user: userId,
  })
  try {
    await newQuestion.save()
  } catch (err) {
    console.error("Error saving question:", err)
    return res.status(500).json({ error: "Internal Server Error" })
  }
  return res
    .status(201)
    .json({ message: "Question posted successfully", question: newQuestion })
})


export default postQuestion