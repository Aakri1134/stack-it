import z from "zod"

const usernameSchema = z
  .string()
  .min(3, "Username must be at least 3 characters long")
  .max(20, "Username must not exceed 20 characters")
const emailSchema = z.email("Invalid email format")
const passwordSchema = z
  .string()
  .min(6, "Password must be at least 6 characters long")
  .max(50, "Password must not exceed 50 characters")

const roleSchema = z.enum(["user", "admin"])

export const validateUserInput = (req, res, next) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    if (process.env.NODE_ENV === "development") {
      next()
      return
    } else {
      return res.status(400).json({ error: "Request body is required" })
    }
  }
  const { username, email, password, role } = req.body
  try {
    if (username) {
      usernameSchema.parse(username)
    }
    if (email) {
      emailSchema.parse(email)
    }
    if (password) {
      passwordSchema.parse(password)
    }
    if (role) {
      roleSchema.parse(role)
    }
    next()
  } catch (error) {
    return res
      .status(400)
      .json({ error: "Invalid Input Schema", src: "Input Validation" })
  }
}
