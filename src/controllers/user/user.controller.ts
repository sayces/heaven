import { UserModel } from "@/models";
import { Response, Request } from "express";
import { errorSender } from "../utils/errorSender";

export const UserController = {
  // POST /users/create
  async create(req: Request, res: Response): Promise<void> {
    try {
      const { name, password } = req.body;
      if (!name || !password) {
        res
          .status(400)
          .json({ message: "ERR: Login or password has not passed" });
        return;
      }
      const newUser = await UserModel.create({ name, password });

      res.status(201).json(newUser);
    } catch (err: unknown) {
      res
        .status(500)
        .json({ message: errorSender(err, "ERR: Cannot create user") });
    }
  },

  // GET /users
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const usersList = await UserModel.getAll();

      res.json(usersList);
    } catch (err: unknown) {
      res
        .status(500)
        .json({ message: errorSender(err, "ERR: Cannot get list of users") });
    }
  },

  // GET /users/:id
  async getById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const user = await UserModel.getById(id as string);
      if (!user) {
        res.status(404).json({ message: "ERR: User has not found" });
        return;
      }

      res.status(200).json(user);
    } catch (err) {
      res
        .status(500)
        .json({ message: errorSender(err, "ERR: Cannot get user by id") });
    }
  },

  // DELETE /users/:id
  async removeById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const deletedUser = await UserModel.removeById(id as string);
      if (!deletedUser) {
        res.status(404).json({ message: "ERR: User not found" });
        return;
      }

      res.status(200).json(deletedUser);
    } catch (err: unknown) {
      res
        .status(500)
        .json({ message: errorSender(err, "ERR: Cannot delete user") });
    }
  },

  // PUT /users/:id
  async updateById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const updatedUser = await UserModel.updateById(id as string, req.body);
      if (!updatedUser) {
        res.status(404).json({ message: "ERR: User not found" });
        return;
      }

      res.status(200).json(updatedUser);
    } catch (err: unknown) {
      res
        .status(500)
        .json({ message: errorSender(err, "ERR: Cannot update user") });
    }
  },
};
