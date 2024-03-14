import mongoose from "mongoose";
import { messageSchema } from "../schema/message-schema";

const Message = mongoose.model("messages", messageSchema);

export { Message };
