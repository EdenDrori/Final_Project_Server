import { Schema } from "mongoose";
import { IMessage } from "../../@types/message";


const messageSchema = new Schema<IMessage>({
  name: {
    required: true,
    type: String,
    maxlength: 100,
  },
  email: {
    required: true,
    type: String,
    minlength: 7,
    maxlength: 100,
  },
  message: {
    required: true,
    type: String,
    minlength: 2,
    maxlength: 10000,
  },
});
export { messageSchema };
