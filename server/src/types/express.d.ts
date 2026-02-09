import { JwtPayloadUser } from "./jwt";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayloadUser;
      
    }
  }
}

export {};
        