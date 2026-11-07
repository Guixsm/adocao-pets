import type { Request, Response, NextFunction } from "express";
import { HttpError } from "../errors.js";

export function errorHandler(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (err instanceof HttpError) {
        return res.status(err.status).json({erro: err.message });
    }
    console.error(err);
    res.status(500).json({ erro: "Erro interno do servidor"});
}
