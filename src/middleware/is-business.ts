import { RequestHandler } from "express";
import { appError } from "../error/app-error";
import { auth } from "../service/auth-service";
import { User } from "../database/model/user";
import { extractToken } from "../service/auth-service";

const isBusiness: RequestHandler = async (req, res, next) => {
  try {
    const token = extractToken(req);
    const { email } = auth.verifyJWT(token);
    
    const user = await User.findOne({ email });

    if (!user) {
      throw new appError("User didnt found from token", 401);
    }
    req.user = user;
    const isBusiness = user?.isBusiness;
    if (isBusiness) {
      return next();
    }
    throw new appError(
      "This action can only be performed by a business account",
      401
    );
  } catch (e) {
    next(e);
  }
};

export { isBusiness };
