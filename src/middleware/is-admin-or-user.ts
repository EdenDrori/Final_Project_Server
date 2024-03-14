import { RequestHandler} from "express";
import { auth } from "../service/auth-service";
import { User } from "../database/model/user";
import { extractToken } from "../service/auth-service";
import { appError } from "../error/app-error";
import { isValidObjectId } from "mongoose";

const isAdminOrUser: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const validId = isValidObjectId(id);
    if (!validId) throw new appError("Id is not valid", 400);
    const userExistById = await User.findById(id);
    if (!userExistById) throw new appError("User does not exist", 401);
    const token = extractToken(req);
    const { email } = auth.verifyJWT(token);
    //get user from database:
    const user = await User.findOne({ email });
    if (!user) throw new appError("User didnt found from token", 401);

    if (id == user.id) return next();

    if (user.isAdmin) return next();
    else
      throw new appError(
        "This action can only be performed by this user or an administrator.",
        401
      );
  } catch (e) {
    next(e);
  }
};

export { isAdminOrUser };
