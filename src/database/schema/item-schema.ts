import { Schema } from "mongoose";
import { IItem } from "../../@types/item";
import { addressSchema } from "./address-schema";
import { imageSchema } from "./image-schema";

const itemSchema = new Schema<IItem>({
  address: addressSchema,
  image: {
    type: imageSchema,
    required: false,
    default: {
      url: "https://i.pinimg.com/564x/cb/c1/c1/cbc1c1aeef9092676adcd3c13a167860.jpg",
      alt: "item",
    },
  },
  phone: {
    required: true,
    type: String,
    minlength: 9,
    maxlength: 15,
  },

  title: {
    required: true,
    type: String,
    minlength: 1,
    maxlength: 50,
  },
  brand: {
    required: true,
    type: String,
    minlength: 1,
    maxlength: 50,
  },
  size: {
    required: false,
    type: String,

    maxlength: 10,
  },
  price: {
    required: true,
    type: Number,
    minlength: 1,
    maxlength: 6,
  },
  description: {
    required: true,
    type: String,
    minlength: 1,
    maxlength: 200,
  },
  itemNumber: {
    required: false,
    type: Number,
    default: () => Math.round(Math.random() * 1_000_000),
    minlength: 5,
    maxlength: 999999999999999,
    unique: true,
  },
  userId: {
    required: false,
    type: String,
    minlength: 20,
    maxlength: 30,
  },
  likes: [
    {
      required: false,
      type: String,
      default: [],
    },
  ],
  createdAt: {
    required: false,
    type: Date,
    default: new Date(),
  },
  status: {
    required: false,
    type: String,
    enum: ["sold", "available"],
  },
  category: {
    required: false,
    type: String,
    enum: ["clothing", "accessories", "shoes", "bags", "others"],
  },
  saleDate: {
    required: false,
    type: Date,
    default: null,
  },
});

export { itemSchema };
