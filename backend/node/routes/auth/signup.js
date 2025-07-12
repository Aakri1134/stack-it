import e from "express";

const signup = e();

signup.post("/", (req, res) => {
  const { username, password } = req.body;

  // Here you would typically handle user registration logic, such as saving to a database
  // For now, we'll just return a success message

  return res.status(201).json({
    message: "User registered successfully",
    user: { username }
  });
});