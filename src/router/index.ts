import { Router, Request, Response } from "express";
import { userRouter } from "./user.router";
// import authRouter from "./authRoutes";

export const rootRouter = Router();

// root gateway
rootRouter.get("/", (_req: Request, res: Response): void => {
  res.status(200).json({
    status: "success",
    message: "Welcome to the API v1",
  });
});

// user
rootRouter.use("/users", userRouter);

// auth
// rootRouter.use("/auth", authRouter);

