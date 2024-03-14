import { Schema } from "mongoose";
import { IImage } from "../../@types/user";

const imageSchema = new Schema<IImage>({
  url: {
    required: false,
    type: String,

    maxlength: 5000,
   
  },
  alt: {
    required: false,
    type: String,
    maxlength: 200,
  },
});
export { imageSchema };
