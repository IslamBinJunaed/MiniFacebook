import { Router } from "express";
import { User } from "../models/User.js";
import { createJWT } from "../utils/jwt.js";

export const login = Router();

login.post("/", async (req, res) => {
  try {
    if (await User.exists({ email: req.body.email, password: req.body.password })) {
      if (!req.cookies.fbDemoJWT) {
        createJWT(req, res);
      }
      res.status(200).json({
        isAuthenticated: true,
      });
    } else {
      res.status(401).json({
        errorMessage: "Invalid email / pasword",
      });
    }
  } catch (error) {
    res.status(500).json({
      errorMessage: "Internal Server Error",
    });
  }
});
