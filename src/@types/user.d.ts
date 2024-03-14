type IName = {
  first: string;
  middle?: string;
  last: string;
};

type IAddress = {
  state?: string;
  country: string;
  city: string;
  street: string;
  houseNumber: number;
  zip?: string;
};

type IImage = {
  alt?: string;
  url?: string;
};

type IUser = {
  name: IName;
  address: IAddress;
  image?: IImage;
  email: string;
  phone: string;
  password: string;
  isBusiness: boolean;
  isAdmin?: boolean;
  createdAt?: Date;
  _id?: string;
};
type IEditUser = {
  name: IName;
  address: IAddress;
  image?: IImage;
  phone: string;
};

type ILogin = {
  email: string;
  password: string;
};

type IJWTPayload = {
  email: string;
  isBusiness: boolean;
  isAdmin: boolean;
  _id: string;
};

export { IUser, IName, IAddress, IImage, ILogin, IJWTPayload, IEditUser };
