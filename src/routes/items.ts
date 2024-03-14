import { Router } from "express";
import { Item } from "../database/model/item";
import { validateNewItem } from "../middleware/validation";
import { IItem, IItemInput } from "../@types/item";
import { markItemAsSold, newItem } from "../service/items-service";
import { isBusiness } from "../middleware/is-business";

import { appError } from "../error/app-error";
import { validateToken } from "../middleware/validate-token";
import { isLiked } from "../middleware/is-liked";
import { isSellerOrAdmin } from "../middleware/is-seller-or-admin";

const router = Router();

//GET all items
router.get("/", async (req, res, next) => {
  try {
    const allItems = await Item.find();
    if (!allItems) {
      res.json("No Items yet");
    }
    return res.json(allItems);
  } catch (e) {
    next(e);
  }
});

//GET my items
router.get("/my-items", validateToken, async (req, res, next) => {
  try {
    const userId = req.user?._id;
    const myItems = await Item.find({ userId });
    if (!myItems.length) {
      return res.json({ message: "No items for this user", myItems });
    }
    return res.json(myItems);
  } catch (e) {
    next(e);
  }
});

//POST new item
router.post("/", isBusiness, validateNewItem, async (req, res, next) => {
  try {
    const userId = req.user?._id;
    if (!userId) {
      throw new appError("User must have id", 500);
    }
    const saved = await newItem(req.body as IItem, userId);
    res.status(201).json({ message: "New item saved", item: saved });
  } catch (e) {
    next(e);
  }
});

//GET item by id
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const item = (await Item.findById(id)) as IItemInput;
    if (!item) {
      throw new appError("Item not found", 404);
    }
    res.json(item);
  } catch (e) {
    next(e);
  }
});

//PUT edit item
router.put("/:id", async (req, res, next) => {
  try {
    const savedItem = await Item.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    if (savedItem.status === "sold") {
      const updatedStatus = await markItemAsSold(savedItem._id);
      console.log(updatedStatus);
    }

    res.json({ message: "Item updeted", savedItem });
  } catch (e) {
    next(e);
  }
});

//DELETE item
router.delete("/:id", isSellerOrAdmin, async (req, res, next) => {
  try {
    const { id } = req.params;

    const deleteItem = await Item.findOneAndDelete({ _id: id });
    return res.json({ message: "item deleted", deleteItem });
  } catch (e) {
    next(e);
  }
});

//PATCH liked item
router.patch("/:id", validateToken, isLiked, async (req, res, next) => {
  try {
    const userId = req.user._id;
    const saved = await Item.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { likes: userId } },
      {
        new: true,
      }
    );
    if (!saved) {
      throw new appError("Item not found", 404);
    }
    res.json({ saved });
  } catch (e) {
    next(e);
  }
});


export { router as itemsRouter };
