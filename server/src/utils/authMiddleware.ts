import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { JwtPayloadUser } from "../types/jwt";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
const token = req.cookies.access_to_token;

  if (!token) return res.status(400).send("you need to login first");

  try {
    const decoded = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_PASS!,
    ) as JwtPayloadUser;
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};
