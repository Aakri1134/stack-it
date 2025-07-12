import { Router } from "express";
import { login } from "./login.js";
import { signup } from "./signup.js";

const auth = Router();

auth.get("/", (req, res) => {
  return res.status(200).json({ message: "Auth route is working" });
});

auth.post("/login", login);
auth.post("/signup", signup);

export default auth;