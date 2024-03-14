import { RequestHandler } from "express";
import { appError } from "../error/app-error";
import { auth, extractToken } from "../service/auth-service";
import { User } from "../database/model/user";


const isAdmin: RequestHandler = async (req, res, next) => {
  try {
    const token = extractToken(req); 
    const { email } = auth.verifyJWT(token);

    
    const user = await User.findOne({ email });

    const isAdmin = user?.isAdmin;
    if (isAdmin) {
      return next();
    }

    throw new appError(
      "This action can only be performed by the administrator",
      401
    );
  } catch (e) {
    next(e);
  }
};

export { isAdmin };
