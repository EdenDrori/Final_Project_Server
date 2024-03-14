import { items } from "./first-items";
import { Item } from "./model/item";
import { User } from "./model/user";
import { users } from "./first-users";
const initDBUsers = async () => {
  

  //add 3 users
  const usersCount = await User.countDocuments();
  if (usersCount != 0) return;

  for (let user of users) {
    const saved = await new User(user).save();
    
  }

  // add 3 items
};
const initDBItems = async () => {
  const itemsCount = await Item.countDocuments();
  if (itemsCount != 0) return;

  for (let item of items) {
    const saved = await new Item(item).save();
    
  }
};

export { initDBUsers, initDBItems };
