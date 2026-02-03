import { boolean, string } from "joi";
import jwt from "jsonwebtoken";
import type mongoose from "mongoose";
import type { ObjectId } from "mongoose";

interface tokenPayload {
    id: mongoose.Types.ObjectId | string,
    isAdmin: boolean
}

export const generateToken = ({id,isAdmin}:tokenPayload):string => {
  return jwt.sign(
    {
      id,
      isAdmin,
    },
    process.env.ACCESS_TOKEN_PASS!,
    { expiresIn: "3d" },
  );
};
