import { Router } from "express";

const auth = Router();

auth.get("/", (req, res) => {
  return res.status(200).json({ message: "Auth route is working" });
});

export default auth;