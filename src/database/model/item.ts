import mongoose from "mongoose";
import { itemSchema } from "../schema/item-schema";


const Item = mongoose.model("items", itemSchema);

export { Item };
