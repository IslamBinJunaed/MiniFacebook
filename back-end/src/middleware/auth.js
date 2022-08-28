import jwt from "jsonwebtoken";

export const authorize = (req, res, next) => {
  try {
    if (req.cookies.fbDemoJWT) {
      req.userEmail = jwt.verify(req.cookies.fbDemoJWT, process.env.JWT_HASH_KEY);
      next();
    } else {
      res.status(401).json({
        isAuthenticated: false,
      });
    }
  } catch (error) {
    res.status(500).json({
      errorMessage: "Internal Server Error",
    });
  }
};
