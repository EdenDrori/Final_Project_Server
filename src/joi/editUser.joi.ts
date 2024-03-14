import Joi from "joi";
import { IAddress, IImage, IName, IEditUser } from "../@types/user";
import { phoneRegex } from "./patterns";

const schema = Joi.object<IEditUser>({
  name: Joi.object<IName>({
    first: Joi.string().min(2).max(20).required(),
    middle: Joi.string().min(2).max(20).allow(""),
    last: Joi.string().min(2).max(20).required(),
  }),
  address: Joi.object<IAddress>({
    country: Joi.string().min(2).max(50).required(),
    city: Joi.string().min(2).max(50).required(),
    street: Joi.string().min(2).max(100).required(),
    houseNumber: Joi.number().min(0).max(999999).required(),
  }),
  image: Joi.object<IImage>({
    url: Joi.string().min(12).max(5000).allow(""),
    alt: Joi.string().min(2).max(200).allow(""),
  }),
  phone: Joi.string().min(9).max(15).required().pattern(phoneRegex),
});

export { schema as joiEditUserSchema };
