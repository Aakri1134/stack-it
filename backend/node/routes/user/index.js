import { Router } from "express";

const user = Router();

user.get("/", (req, res) => {
  return res.status(200).json({ message: "User route is working" });
});

export default user;