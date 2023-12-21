import { Request, Response, NextFunction } from 'express';
import ErrorRest from '../core/libs/error-rest';
import { Controller } from '../core/controllers/controller';

const controller = new Controller();

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err instanceof ErrorRest) {
        res.status(err.statusCode).json(controller.setResponse({ text: err.message, errors: err.detail, status: err.status }).response);
    } else {
        const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
        res.status(statusCode).json(controller.setResponse({ text: 'Ha ocurrido un error inesperado', errors: err.message, status: 801 }).response);
    }
};