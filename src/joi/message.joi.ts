import Joi from "joi";

import { IMessage } from "../@types/message";

const schema = Joi.object<IMessage>({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  message: Joi.string().required(),
});

export { schema as joiMessageSchema };
