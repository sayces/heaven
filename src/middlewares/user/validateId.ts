import { Request, Response, NextFunction } from "express";

export const validateId = (req: Request, res: Response, next: NextFunction): void => {
  const { id } = req.params;

  // Проверка наличия и типа данных
  if (!id || typeof id !== "string") {
    res.status(400).json({ message: "ERR: Invalid or missing ID format" });
    return;
  }

  next();
};
