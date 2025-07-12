import express from "express";
import userRoute from "./routes/user/index.js"
import authRoute from "./routes/auth/index.js"
import mongoose from "mongoose";
import dotenv from "dotenv";
import { validateUserInput } from "./middleware/inputValidation.js";
import cors from "cors";
dotenv.config();

await mongoose.connect(process.env.MONGODB_URL, {
    dbName: process.env.DB_NAME || "odoo",
}).then(() => {
    console.log("MongoDB connected successfully");
}).catch(err => {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit the process if connection fails
});

const app = express();


app.use(express.json());
app.use(validateUserInput)

app.get("/", (req, res) => {
  res.send("Welcome to the API");
});
// routes --->
app.use("/auth", authRoute);
app.use("/user", userRoute );

app.use((err, req, res, next) => {
// Global error handler
  res.status(500).json({
    error: "Internal Server Error",
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running on port " + (process.env.PORT || 3000));
});
