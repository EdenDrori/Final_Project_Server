import { joiEditUserSchema } from "../../joi/editUser.joi";
import { joiItemSchema } from "../../joi/item.joi";
import { joiLoginSchema } from "../../joi/login.joi";
import { joiMessageSchema } from "../../joi/message.joi";
import { joiUserSchema } from "../../joi/user.joi";
import { validateSchema } from "./validate-schema";

export const validateUserRegistration = validateSchema(joiUserSchema);
export const validateUserEdit = validateSchema(joiEditUserSchema);
export const validateUserLogin = validateSchema(joiLoginSchema);
export const validateNewItem = validateSchema(joiItemSchema);
export const validateNewMessage = validateSchema(joiMessageSchema);
