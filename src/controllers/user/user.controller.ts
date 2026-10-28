import UserModel from "@/models/index";
import { Response, Request } from "express";

export const UserController = {
  // POST /users/create
  async create(req: Request, res: Response): Promise<void> {
    try {
      const { name, password } = req.body;
      if (!name || !password) {
        res
          .status(400)
          .json({ message: "Имя пользователя или пароль не переданы" });
      }
      const newUser = await UserModel.create({ name, password });

      res.status(201).json(newUser).redirect("/");
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Не удалось создать пользователя";

      res.status(500).json({ message: errorMessage });
    }
  },

  // GET /users
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const usersList = await UserModel.getAll();

      res.json(usersList);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Не удалось получить список пользователей";

      res.status(500).json({ message: errorMessage });
    }
  },

  // GET /users/:id
  async getById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.body;
      if (!id) throw new Error("ID пользователя не передан");
      UserModel.getById(id);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Не удалось получить пользователя";

      res.status(500).json({ message: errorMessage });
    }
  },
  async removeById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.body;
      if (!id) throw new Error("ID пользователя не передан");
      UserModel.removeById(id);
    } catch (err) {}
  },
  async updateById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const updatedUser = await UserModel.updateById(id, req.body);
      if (!updatedUser) {
        res
          .status(404)
          .json({ message: "Пользователь для обновления не найден" });
        return;
      }

      res.status(200).json(updatedUser);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Не удалось обновить пользователя";

      res.status(500).json({ message: errorMessage });
    }
  },
};
