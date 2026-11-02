import { Router } from "express";
import { UserController } from "@/controllers/user/user.controller";
import { validateId } from "@/middlewares/user/validateId";

export const userRouter = Router();

userRouter.post("/create", UserController.create);
userRouter.get("/", UserController.getAll);
userRouter.get("/:id", validateId, UserController.getById);
userRouter.put("/:id", validateId, UserController.updateById);
userRouter.delete("/:id", validateId, UserController.removeById);
