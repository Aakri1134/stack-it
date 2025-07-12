import { Router } from "express";
import getUser from "./getUser.js";
import postQuestion from "./postQuestion.js";
import postAnswer from "./postAnswer.js";
import upvote from "./upvote.js";
import downvote from "./downvote.js";
import getNotification from "./getNotification.js";
import tagNotification from "./tagNotification.js";

const user = Router();

user.get("/", (req, res) => {
  return res.status(200).json({ message: "User route is working" });
});
user.use("/getUser", getUser);
user.use("/postQuestion", postQuestion);
user.use("/postAnswer", postAnswer);
user.use("/upvote", upvote);
user.use("/downvote", downvote);
user.use("/getNotification", getNotification);
user.use("/tagNotification", tagNotification);


export default user;