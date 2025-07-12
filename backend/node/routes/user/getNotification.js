import { Router } from "express"
import { User } from "../../db/schema.js"
import jwtAuthentication from "../../middleware/jwtAuthentication.js"

const getNotification = Router()

getNotification.get("/", jwtAuthentication, async (req, res) => {
  const userId = req.user.id
  if (!userId) {
    return res.status(400).json({ error: "Invalid JWT" })
  }

  try {
    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ error: "User not found" })
    }

    return res.status(200).json({
      message: "Notifications retrieved successfully",
      notifications: user.notifications,
    })
  } catch (err) {
    console.error("Error retrieving notifications:", err)
    return res.status(500).json({ error: "Internal Server Error" })
  }
})

export default getNotification