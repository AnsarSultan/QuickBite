import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    const token = req.headers["token"];
    if (!token) {
      return res.json({
        success: false,
        message: "Not authorized please provide token",
      });
    }
    const decoded_token = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded_token;
    next();
  } catch (error) {
    console.log("JWT Error:", error.message);

    return res.status(401).json({
      success: false,
      message:
        error.name === "TokenExpiredError"
          ? "Token expired, please login again"
          : "Invalid token",
    });
  }
  };
export default auth;
