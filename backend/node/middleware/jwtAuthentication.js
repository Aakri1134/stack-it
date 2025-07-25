import jwt from "jsonwebtoken"

const jwtAuthentication = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]
  if (!token) {
    return res.status(401).json({ error: "No token provided" })
  }
  try {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: "Invalid token" })
      }
      req.user = decoded
      next()
    })
  } catch (error) {
    console.error("JWT verification error:", error)
    return res.status(500).json({ error: "Internal Server Error" })
  }
}
export default jwtAuthentication
