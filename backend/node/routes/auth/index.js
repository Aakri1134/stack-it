import { Router } from "express";
import { login } from "./login.js";
import { signup } from "./signup.js";

const auth = Router();

auth.get("/", (req, res) => {
  return res.status(200).json({ message: "Auth route is working" });
});

auth.use("/login", login);
auth.use("/signup", signup);

export default auth;