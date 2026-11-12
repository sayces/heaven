import { users } from "./user.mock";
import { User } from "./types";

export const UserModel = {
  async create(data: Omit<User, "id">): Promise<Omit<User, "id">> {
    const newUserId = String(Date.now());
    const newUser = {
      id: newUserId,
      ...data,
    };

    const isUserExist = users.find((user) => user.name === data.name);

    if (isUserExist) {
      throw new Error("ERR: User already exists");
    }

    users.push(newUser);
    return { ...newUser };
  },

  async getAll(): Promise<User[]> {
    return Promise.resolve([...users]);
  },

  async getById(id: string): Promise<User | null> {
    const user = users.find((user) => user.id === id);

    return user ? { ...user } : null;
  },

  async removeById(id: string): Promise<User | null> {
    const index = users.findIndex((user) => user.id === id);
    if (index === -1) return null;

    const [removed] = users.splice(index, 1);
    return removed;
  },

  async updateById(
    id: string,
    data: Partial<Omit<User, "id">>,
  ): Promise<User | null> {
    const user = users.find((user) => user.id === id);

    Object.assign(user!, data);
    return user ? { ...user } : null;
  },
};
