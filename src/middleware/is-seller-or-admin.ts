import { RequestHandler } from "express";
import { auth, extractToken } from "../service/auth-service";
import { User } from "../database/model/user";
import { Item } from "../database/model/item";
import { IUser } from "../@types/user";
import { appError } from "../error/app-error";
import { isValidObjectId } from "mongoose";

const isSellerOrAdmin: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const valid = isValidObjectId(id);
    if (!valid) {
      throw new appError("The Id is not type of ObjectId", 401);
    }
    const itemExist = await Item.findById(id);
    if (!itemExist) throw new appError("item does not exist", 401);
    const token = extractToken(req);
    const { email } = auth.verifyJWT(token);
    const user = (await User.findOne({ email }).lean()) as IUser;
    if(!user) throw new appError("User didnt found from token", 401);
    
    req.user = user;
    const item = await Item.findById({ _id: id });
    if (!item) throw new appError("item does not exist", 401);

    if (item.userId == user._id) return next();
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

export { isSellerOrAdmin };
