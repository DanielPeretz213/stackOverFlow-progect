import { Router, Request, Response } from "express";
import sanitizeContent from "../utils/sanitize";
import {
  userLoginValidation,
  userRegisterValidation,
} from "../validation/auto";
import bcrypt from "bcrypt";
import User, { IUser } from "../models/User";
import { generateToken } from "../utils/token";
import mongoose from "mongoose";

export interface registerValidationProps {
  name: string;
  email: string;
  password: string;
}

const router = Router();

router.post("/register", async (req: Request, res: Response) => {
  Object.keys(req.body).forEach((key) => {
    req.body[key] = sanitizeContent(req.body[key]);
  });
  const { error } = userRegisterValidation.validate(req.body);

  if (error) return res.status(400).send(error.details[0]?.message);
  const findUser = await User.findOne({ email: req.body.email });

  if (findUser) return res.status(400).send("user alredy register");
  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    const newUser = await User.create(req.body);

    const tokenProps = {
      id: newUser._id,
      isAdmin: newUser.isAdmin,
    };

    const token = generateToken(tokenProps);

    if (!token)
      return res.status(500).send("ssamting went wrong with creating a token");

    res
      .status(201)
      .cookie("access_token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      })
      .send({
        message: "user creat seccesfuly",
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
        },
      });
  } catch (error) {
    res.status(500).send({
      messeage: "samting went wrong with register ",
      error: error,
    });
  }
});

router.post("/login", async (req: Request, res: Response) => {
  try {
    Object.keys(req.body).forEach((key) => {
      req.body[key] = sanitizeContent(req.body[key]);
    });

    const { error } = userLoginValidation.validate(req.body);
    if (error) return res.status(400).send(error.details[0]?.message);

    const findEmail: IUser | null = await User.findOne({
      email: req.body.email,
    });
    if (!findEmail) return res.status(400).send("you need to register yet");

    const isCorectPass = await bcrypt.compare(
      req.body.password,
      findEmail.password,
    );
    if (!isCorectPass)
      return res.status(400).send("email or password is not corect");

    const payload = {
      id: findEmail._id,
      isAdmin: findEmail.isAdmin,
    };
    const token = generateToken(payload);

    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      })
      .send({
        message: "you are login seccessfuly",
        user: {
          id: findEmail._id,
          name: findEmail.name,
          email: findEmail.email,
        },
      });
  } catch (error) {
    res.status(500).send({
      messeage: "samting went wrong with login ",
      error: error,
    });
  }
});

export default router;
