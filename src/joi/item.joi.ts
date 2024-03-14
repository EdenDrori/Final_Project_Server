import Joi from "joi";
import { IAddress, IImage } from "../@types/user";
import { phoneRegex } from "./patterns";
import { IItem } from "../@types/item";

const schema = Joi.object<IItem>({
  title: Joi.string().min(1).max(50).required(),
  brand: Joi.string().min(1).max(50).required(),
  price: Joi.number().min(1).max(999999).required(),
  category: Joi.string().min(1).max(20).required(),
  description: Joi.string().min(1).max(200).required(),
  size: Joi.string().max(10).allow(""),
  address: Joi.object<IAddress>({
    country: Joi.string().min(2).max(50).required(),
    city: Joi.string().min(2).max(50).required(),
    street: Joi.string().min(2).max(100).required(),
    houseNumber: Joi.number().min(0).max(999999).required(),
  }),
  image: Joi.object<IImage>({
    url: Joi.string().max(5000).allow(""),
    alt: Joi.string().max(200).allow(""),
  }),
  phone: Joi.string().min(9).max(15).required().pattern(phoneRegex),
  status: Joi.string().default("available").allow(""),
});

export { schema as joiItemSchema };
