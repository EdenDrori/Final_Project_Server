import { RequestHandler } from "express";
import { Item } from "../database/model/item";
import { isValidObjectId } from "mongoose";
import { appError } from "../error/app-error";

const isLiked: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const itemId = req.params.id;
    const valid = isValidObjectId(itemId);
    if (!valid) {
      throw new appError("The Id is not type of ObjectId", 401);
    }
    const itemExist = await Item.findById(itemId);
    if (!itemExist) throw new appError("Item does not exist", 401);
    const { likes } = await Item.findById(itemId);

    // Check if userId is in the likes array
    if (likes.includes(userId)) {
      const item = await Item.findOneAndUpdate(
        { _id: itemId },
        { $pull: { likes: userId } },
        { new: true }
      );
      res.json({ item });
    } else {
      // Continue to the next middleware
      next();
    }
  } catch (e) {
    next(e);
  }
};
export { isLiked };
