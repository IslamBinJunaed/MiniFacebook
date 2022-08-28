import jwt from "jsonwebtoken";

export const createJWT = (req, res) => {
  const fbDemoJWT = jwt.sign(req.body.email, process.env.JWT_HASH_KEY);

  res.cookie("fbDemoJWT", fbDemoJWT, {
    maxAge: 3600000 * 24 * 7,
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
};
