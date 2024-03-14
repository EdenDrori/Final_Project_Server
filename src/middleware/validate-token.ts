import { RequestHandler } from "express";
import { appError } from "../error/app-error";
import { auth, extractToken } from "../service/auth-service";
import { User } from "../database/model/user";


const validateToken: RequestHandler = async (req, res, next) => {
  try {
    const token = extractToken(req);

    const { email } = auth.verifyJWT(token);
    const user = await User.findOne({ email });
    if (!user) throw new appError("User didnt found from token", 401);
    req.user = user;

    next();
  } catch (e) {
    next(e);
  }
};

export { validateToken };
