import { RequestHandler } from "express";
import { auth, extractToken } from "../service/auth-service";
import { User } from "../database/model/user";
import { appError } from "../error/app-error";
import { IUser } from "../@types/user";
import { isValidObjectId } from "mongoose";

const isUser: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const valid = isValidObjectId(id);
    if (!valid) {
      throw new appError("The Id is not type of ObjectId", 401);
    }
    const userExist = await User.findById(id);
    if (!userExist) throw new appError("User does not exist", 401);
    const token = extractToken(req);
    const { email } = auth.verifyJWT(token);

    //get user from database
    const user = (await User.findOne({ email }).lean()) as IUser;

    req.user = user;

    if (!user) throw new appError("User didnt found from token", 401);

    
    if (id == user?._id) return next();

    throw new appError( "The id must belong to the user" ,401);
  } catch (e) {
    next(e);
  }
};

export { isUser };
