import { users } from "./mock";
import { User } from "./types";

export const UserModel = {
  async create(data: Omit<User, "id">): Promise<Omit<User, "id">> {
    try {
      const newUserId = String(Date.now());
      const newUser = {
        id: newUserId,
        ...data,
      };

      const isUserExist = users.find((user) => user.name === data.name);

      if (isUserExist) {
        throw new Error("Пользователь с таким именем уже существует");
      }

      users.push(newUser);

      return { ...newUser };
    } catch (err) {
      throw err;
    }
  },

  async getAll(): Promise<User[]> {
    try {
      return Promise.resolve([...users]);
    } catch (err) {
      throw err;
    }
  },

  async getById(id: string): Promise<User | null> {
    try {
      const user = users.find((user) => user.id === id);

      return user ? { ...user } : null;
    } catch (err) {
      throw err;
    }
  },

  async removeById(id: string): Promise<boolean> {
    try {
      const initialLength = users.length;

      const userIndex = users.findIndex((user) => user.id === id);
      if (userIndex === -1) {
        throw new Error("Пользователь с таким ID не найден");
      }

      users.splice(userIndex, 1);

      return users.length < initialLength;
    } catch (err) {
      throw err;
    }
  },

  async updateById(
    id: string,
    data: Partial<Omit<User, "id">>,
  ): Promise<User | null> {
    try {
      const user = users.find((user) => user.id === id);
      if (!user) throw new Error("Пользователь с таким ID не найден");

      Object.assign(user, data);

      return { ...user };
    } catch (err) {
      throw err;
    }
  },
};
