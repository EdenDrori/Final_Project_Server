import { Request } from "express";
import { IUser } from "./user";
import { IItem } from "./item";
import { IMessage } from "./message";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
      item?: IItem;
      message?: IMessage;
    }
  }
}
