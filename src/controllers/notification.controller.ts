//#region Imports
import { Request, Response, NextFunction } from "express";
import ErrorRest from "../core/libs/error-rest";
// Local
import { Controller } from "../core/controllers/controller";
// Models
//#endregion

class NotificationController extends Controller {
    create = async (req: Request, res: Response, next: NextFunction) => {
        const { } = req.body;
        try {
            //#region Validate params
            const validation = await this.validateParams(req.body, {});
            if (validation != true)
                throw new ErrorRest({ message: 'Los parámetros son inválidos', status: 700, detail: validation }, 400);
            //#endregion

            this.setResponse({ text: 'Registro creado' }, 201);
            return res.status(this.code).json(this.response);
        }
        catch (error) {
            next(error);
        }
    }

    get = async (req: Request, res: Response, next: NextFunction) => {
        const { } = req.query;
        try {
            //#region Validate params
            const validation = await this.validateParams(req.query, {});
            if (validation != true)
                throw new ErrorRest({ message: 'Los parámetros son inválidos', status: 700, detail: validation }, 400);
            //#endregion

            this.setResponse({ text: 'Exitoso' }, 200);
            return res.status(this.code).json(this.response);
        }
        catch (error) {
            next(error);
        }
    }

    update = async (req: Request, res: Response, next: NextFunction) => {
        const { } = req.body;
        try {
            //#region Validate params
            const validation = await this.validateParams(req.body, {});
            if (validation != true)
                throw new ErrorRest({ message: 'Los parámetros son inválidos', status: 700, detail: validation }, 400);
            //#endregion

            this.setResponse({ text: 'Exitoso' }, 200);
            return res.status(this.code).json(this.response);
        }
        catch (error) {
            next(error);
        }
    }

    delete = async (req: Request, res: Response, next: NextFunction) => {
        const { } = req.query;
        try {
            //#region Validate params
            const validation = await this.validateParams(req.query, {});
            if (validation != true)
                throw new ErrorRest({ message: 'Los parámetros son inválidos', status: 700, detail: validation }, 400);
            //#endregion

            this.setResponse({ text: 'Exitoso' }, 200);
            return res.status(this.code).json(this.response);
        }
        catch (error) {
            next(error);
        }
    }
}

export default NotificationController;
