import express from "express";
import userRoute from "./routes/user/index.js"
import authRoute from "./routes/auth/index.js"
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the API");
});

app.use("/auth", authRoute);
app.use("/user", userRoute );

app.use((err, req, res, next) => {
  console.error(err); // Optional: log the error
  res.status(500).json({
    error: "Internal Server Error",
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
