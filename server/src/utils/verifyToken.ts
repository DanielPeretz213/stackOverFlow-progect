import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JwtPayloadUser } from "../types/jwt";

export const verifyToken = (req:Request, res:Response, next:NextFunction) =>{
    const token = req.cookies.access_to_token;

    if(!token) res.status(400).send("Not authenticated");
    try{
        const decoded = jwt.verify(token,process.env.ACCESS_TOKEN_PASS as string);
        console.log(decoded);
        req.user = decoded as JwtPayloadUser;
        next();

    }catch(error){
        return res.status(403).send("token is not valid");
}
    }
     