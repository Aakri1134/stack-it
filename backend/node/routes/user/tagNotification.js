import { Router } from "express";
import jwtAuthentication from "../../middleware/jwtAuthentication.js";
import { User } from "../../db/schema.js";

const tagNotification = Router();

tagNotification.post("/", jwtAuthentication, async (req, res) => {
  const { reciever } = req.body;
  const userId = req.user.id;
  if (!reciever ) {
    return res.status(400).json({ error: "Reciever ID and message are required" });
  }

  try {
    const user = await User.findById(reciever);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const notification = {
      type: "tag",
      message: `You have been tagged by ${req.user.username} in a post`,
      createdAt: new Date(),
      questionId: req.body.questionId || null,
      answerId: req.body.answerId || null,
    };

    user.notifications.push(notification);
    user.updatedAt = new Date();
    await user.save();

    return res.status(201).json({
      message: "Notification sent successfully",
      notification: notification,
    });
  } catch (err) {
    console.error("Error sending notification:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

export default tagNotification;