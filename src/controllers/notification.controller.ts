//#region Imports
import { Request, Response, NextFunction } from "express";
import ErrorRest from "../core/libs/error-rest";
// Local
import { Controller } from "../core/controllers/controller";
import { IPayloadNotificationPush, NotificationPush } from "../libs/notification-push";
// Models
//#endregion


class NotificationController extends Controller {
    private notificationPush = new NotificationPush();

    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { token }: any = req.body;
            //#region Validate params
            const validation = await this.validateParams(req.body, { requiredParameters: { token } });
            if (validation != true)
                throw new ErrorRest({ message: 'Los parámetros son inválidos', status: 700, detail: validation }, 400);
            //#endregion

            const payload: IPayloadNotificationPush = {
                notification: {
                    title: 'Tienes un nuevo mensaje',
                    body: 'Jairo: ¿Hola cómo estás?.',
                    icon: 'assets/icons/icon-384x384.png',
                    actions: [
                        { action: 'reply', title: 'Responder', type: 'text' },
                        { action: 'send', title: 'Send' }
                    ],
                    // tag: 'chat',
                    // renotify: true,
                    data: {
                        onActionClick: {
                            default: { operation: 'openWindow', url: '#/chats/' },
                            reply: {
                                operation: 'focusLastFocusedOrOpen',
                                url: '#/chats/response',
                            },
                            send: {
                                operation: 'sendRequest',
                                url: 'http://localhost:3000/api/abrev/v1/notifications/'
                            }
                        },
                        // name: "jairo Antonio"
                    },
                    // badge: 'assets/icons/badge.png'
                },
            };
            for (const item of token) {
                await this.notificationPush.SendWeb(0, payload, JSON.stringify(item));
            }
            this.setResponse({ text: 'Envio exitoso', data: {} }, 200);

            return res.status(this.code).json(this.response);
        } catch (error) {
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

            console.log("entra una petición");
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
