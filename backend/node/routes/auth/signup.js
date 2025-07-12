import { Router } from "express"
import bcrypt from "bcrypt"
import { User } from "../../db/schema.js"
import jwt from "jsonwebtoken"

export const signup = Router()

signup.post("/", async (req, res) => {
  const { username, email, password, role } = req.body
  if (!username || !password || !email || !role) {
    return res.status(400).json({ error: "Username, Email, Role and password are required" })
  }
  const userExists = await User.findOne({ email })
  if (userExists) {
    return res.status(400).json({ error: "Email already exists" })
  }
  const jwtID = crypto.randomUUID()
  if (!jwtID) {
    return res.status(500).json({ error: "Failed to generate JWT ID" })
  }
  const hashedPassword = bcrypt.hashSync(password, 10)
  const newUser = new User({
    username,
    email,
    type: role || "user",
    password: hashedPassword,
    activeSessions: [jwtID],
    createdAt: new Date(),
    updatedAt: new Date(),
    questions: [],
    answers: [],
    notifications: [],
  })
  try {
    await newUser.save()
  } catch (error) {
    console.error("Error saving user:", error)
    return res.status(500).json({ error: "Internal Server Error" })
  }
  const token = jwt.sign(
    {
      iss: process.env.ISSUER || "Codemons",
      type: "user",
      exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60, // 1 hour expiration
      iat: Math.floor(Date.now() / 1000),

      userId: newUser._id,
      username: newUser.username,
      email: newUser.email,
    },
    process.env.JWT_SECRET
  )
  return res.status(201).json({
    message: "User registered successfully",
    user: { username },
    email: { email },
    type: role || "user",
    token
  })
})