import { IUser } from "../@types/user";
import { User } from "../database/model/user";
import { appError } from "../error/app-error";
import { auth } from "./auth-service";

const createUser = async (userData: IUser) => {
  const user = new User(userData);
  user.password = await auth.hashPassword(user.password);
  user.image.url =
    user.image?.url || "https://cdn-icons-png.flaticon.com/256/147/147142.png";
  user.image.alt = user.image?.alt || 'default alt';
  return user.save();
};

const validateUser = async (email: string, password: string) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new appError("Wrong email or password", 401);
  }

  //check the password:
  const isPasswordValid = await auth.validatePassword(password, user.password);

  if (!isPasswordValid) {
    throw new appError("Wrong email or password", 401);
  }

  const jwt = auth.generateJWT({
    email: email,
    _id: user.id,
    isBusiness: user.isBusiness,
    isAdmin: user.isAdmin,
  });

  return { jwt };
};

export { createUser, validateUser };
