import { users } from "./mock";

export const create = (name, password) => {
  const id = Date.now();
  users.push()
}

export const getAll = () => {
  return users;
}

export const getUserById = (id: number) => {
  return users.find(user => user.id === id)
}