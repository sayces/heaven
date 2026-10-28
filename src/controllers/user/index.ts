import userModel from "@/models/user/index";

const userController = {
  create: async (req, res) => {
    try {
      const { name, password } = req.body;
      if (!name || !password) {
        res
          .status(400)
          .json({ message: "Имя пользователя или пароль не переданы" });
      }
      await userModel.create(name, password);

      return res.redirect("/");
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Не удалось создать пользователя";

      return res.status(500).json({ message: errorMessage });
    }
  },
  getAll: async (req, res) => {
    try {
      const usersList = await userModel.getAll();

      return res.json(usersList);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Не удалось получить список пользователей";

      return res.status(500).json({ message: errorMessage });
    }
  },
  getById: (req, res) => {
    try {
      const { id } = req.body;
      if (!id) throw new Error("ID пользователя не передан");
      userModel.getById(id);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Не удалось получить пользователя";

      return res.status(500).json({ message: errorMessage });
    }
  },
  delete: (req, res) => {},
  update: (req, res) => {},
};

export default userController;
