import { Request, Response, NextFunction } from "express";

export const validateId = (req: Request, res: Response, next: NextFunction): void => {
  const { id } = req.params;

  // Проверяем наличие и тип данных
  if (!id || typeof id !== "string") {
    res.status(400).json({ message: "ERR: Invalid or missing ID format" });
    return; // Завершаем запрос, если валидация не прошла
  }

  next();
};
