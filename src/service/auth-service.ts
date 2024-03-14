import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { IJWTPayload } from "../@types/user";
import { Request } from "express";
import { appError } from "../error/app-error";
const authService = {
  hashPassword: (plainTextPassword: string, rounds = 12) => {
    return bcrypt.hash(plainTextPassword, rounds);
  },

  validatePassword: (plainTextPassword: string, hash: string) => {
    return bcrypt.compare(plainTextPassword, hash);
  },

  generateJWT: (payload: IJWTPayload) => {
    const secret = process.env.JWT_SECRET!;
    return jwt.sign(payload, secret);
  },

  verifyJWT: (token: string) => {
    const secret = process.env.JWT_SECRET!;
    const payload = jwt.verify(token, secret);
    return payload as IJWTPayload & { iat: number };
  },
 
};
 const extractToken = (req: Request) => {
   const authHeader = req.header("Authorization");
   if (
     authHeader &&
     authHeader.length > 7 &&
     authHeader.toLowerCase().startsWith("bearer ")
   ) {
     return authHeader.substring(7);
   }
   throw new appError("token is missing in Authorization header", 401);
 };


export { authService as auth, extractToken };
