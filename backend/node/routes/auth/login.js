import e, { Router } from "express"
import bcrypt from "bcrypt"
import { User } from "../../db/schema.js"
import jwt from "jsonwebtoken"

export const login = Router()

login.post("/", async (req, res) => {
  const { email, password, role} = req.body
  if (!email || !password || !role) {
    return res.status(400).json({ error: "Email and password are required" })
  }
  const user = await User.findOne({ email })
  if (!user) {
    return res.status(400).json({ error: "Invalid email or password" })
  }

	if (user.type !== role) {
		return res.status(403).json({ error: "Access denied for this role" })
	}

  if (!(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ error: "Invalid email or password" })
  }

  const jwtID = crypto.randomUUID()
  if (!jwtID) {
    return res.status(500).json({ error: "Failed to generate JWT ID" })
  }
  const token = jwt.sign(
    {
      iss: process.env.ISSUER || "Codemons",
      type: role || "user",
      exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60, // 1 hour expiration
      iat: Math.floor(Date.now() / 1000),
			jti: jwtID,
      userId: user._id,
      username: user.username,
      email: user.email,
    },
    process.env.JWT_SECRET
  )

  user.activeSessions.push(jwtID)
  user.updatedAt = new Date()
  try {
    user.save()
  } catch (err) {
    console.error("Error updating user session:", err)
    return res.status(500).json({ error: "Internal Server Error" })
  }

  return res.status(200).json({
    message: "Login successful",
    user: { username: user.username, email: user.email },
    token,
    type: "user",
  })
})

