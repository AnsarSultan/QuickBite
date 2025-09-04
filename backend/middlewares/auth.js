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
    if (!decoded_token) {
      return res.json({ success: false, message: "Access denied" });
    }

    req.user = decoded_token;
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.messsage });
  }
};

export default auth;
