import { users } from "./mock";
import { User } from "./types";

const create = async (name: string, password: string): Promise<User> => {
  try {
    const newUserId = String(Date.now());
    const newUser = {
      id: newUserId,
      name: name,
      password: password,
    };

    const isUserExist = users.find((user) => user.name === name);
    if (isUserExist) {
      throw new Error("Пользователь с таким именем уже существует");
    }

    users.push(newUser);

    return newUser;
  } catch (err) {
    throw err;
  }
};

const getAll = (): User[] => {
  return users;
};

const getById = (id: string): User | number => {
  const user = users.find((user) => user.id === id);
  if (!user) {
    return -1;
  } else {
    return user;
  }
};

const userModel = {
  create,
  getAll,
  getById,
};

export default userModel;
