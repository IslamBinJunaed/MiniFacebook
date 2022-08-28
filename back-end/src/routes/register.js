import { Router } from "express";
import { User } from "../models/User.js";
import { createJWT } from "../utils/jwt.js";

export const register = Router();

register.post("/", async (req, res) => {
  try {
    if (await User.exists({ email: req.body.email })) {
      res.status(200).json({
        errorMessage: "An account with the provided email already exists",
      });

      return;
    }

    await User.create(req.body);
    createJWT(req, res);

    res.status(200).json({
      isAuthenticated: true,
    });
  } catch (error) {
    res.status(500).json({
      errorMessage: "Internal Server Error",
    });
  }
});
