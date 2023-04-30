import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../models/error';

export const errorHandler = (
    err: TypeError | CustomError,
    req: Request,
    res: Response, 
    next: NextFunction
) => {
    return res.status(400).json({ message: err.message });
}