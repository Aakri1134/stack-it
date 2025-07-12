import { Router } from "express";
import getUser from "./getUser.js";
import postQuestion from "./postQuestion.js";
import postAnswer from "./postAnswer.js";
import upvote from "./upvote.js";

const user = Router();

user.get("/", (req, res) => {
  return res.status(200).json({ message: "User route is working" });
});
user.use("/getUser", getUser);
user.use("/postQuestion", postQuestion);
user.use("/postAnswer", postAnswer);
user.use("/upvote", upvote);


export default user;