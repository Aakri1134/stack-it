import { Router } from "express";
import { User } from "../../db/schema.js";
import jwtAuthentication from "../../middleware/jwtAuthentication.js";

const getUser = Router();

getUser.get("/", jwtAuthentication, async (req, res) => {
  const userId = req.user.id;
  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({
      message: "User retrieved successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.type,
        questions: user.questions,
        answers: user.answers,
        notifications: user.notifications,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (err) {
    console.error("Error retrieving user:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

export default getUser;