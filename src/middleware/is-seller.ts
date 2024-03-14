import { RequestHandler } from "express";
import { auth, extractToken } from "../service/auth-service";
import { User } from "../database/model/user";
import { appError } from "../error/app-error";
import { IUser } from "../@types/user";
import { Item } from "../database/model/item";
import { isValidObjectId } from "mongoose";

const isSeller: RequestHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const valid = isValidObjectId(id);
    if (!valid) {
      throw new appError("The Id is not type of ObjectId", 401);
    }
    const ItemExist = await Item.findById(id);
    if (!ItemExist) throw new appError("Item does not exist", 401);
    const token = extractToken(req);
    const { email } = auth.verifyJWT(token);

    //get user from database
    const user = (await User.findOne({ email }).lean()) as IUser;
    req.user = user;

    const item = await Item.findById({ _id: id });

    if (!item) throw new appError("Item does not exist", 401);

    if (item.userId == user._id) return next();
    throw new appError(
        "This action can only be performed by the seller."
    ,401);
  } catch (e) {
    next(e);
  }
};

export { isSeller };
