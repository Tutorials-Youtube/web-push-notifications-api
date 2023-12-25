//#region Imports
import webPush from 'web-push';
import { catchErrorMethod } from '../core/helpers/catch-error-method';
//#endregion

//#region Interface and types
export interface IPayloadNotificationPush {
    notification: {
        title: string | undefined;
        body: string | undefined;
        icon?: string; // "<URL String>"
        image?: string; // "<URL String>"
        badge?: string; // "<URL String>" icono monocromático de cuando aparece la notificación
        actions?: TActions;
        vibrate?: string | Array<number>; // "<Array of Integers>"
        sound?: string; // "<URL String>"
        dir?: | 'ltr' | 'rtl' | 'auto'; // "<String of 'auto' | 'ltr' | 'rtl'>"
        tag?: string; // "<String>"
        requireInteraction?: boolean;
        renotify?: boolean;
        silent?: boolean;
        timestamp?: any;
        data?: {
            onActionClick?: TOnActionClick;
        } & { [n: string]: any }
    }
}



type TActions = Array<{ action: string; title: string; icon?: string, type?: 'button' | 'text', placeholder?: string; }>;
type TOnActionClick = {
    default: { operation: TOperation; url?: string }

} | {
    [n: string]: { operation: TOperation; url: string }
};

/**
 * openWindow Abre en una pestaña nueva
 * 
 * navigateLastFocusedOrOpen Navega con la url pasada y en la útima pestaña abierta
 * 
 * focusLastFocusedOrOpen Muestra la última pestaña abierta
 * 
 * sendRequest Hace una petición
 * 
 */
type TOperation = 'openWindow' | 'navigateLastFocusedOrOpen' | 'focusLastFocusedOrOpen' | 'sendRequest'
//#endregion

export class NotificationPush {
    private static key = {
        publicKey: "BMq3KjdEuQHQGmw3PzbTf0tRlNuOUbGC7RfSlaeYV4cvbU0iutBVqL2-rnZ6w8sNKfKpM8XNT3lhArvodzao68g",
        privateKey: "cHRvtnMtvKyzIGpVVLyhwLL7C59tv-DrK6ObQuJzln8"
    }

    protected subject: string = 'mailto:email.test@gmil.com';
    protected options: webPush.RequestOptions = {
        vapidDetails: {
            privateKey: NotificationPush.key.privateKey,
            publicKey: NotificationPush.key.publicKey,
            subject: this.subject
        }
    };

    constructor() {
        webPush.setVapidDetails(this.subject, NotificationPush.key.publicKey, NotificationPush.key.privateKey);
    }

    /**
     * 
     * @param token 
     * @param payload 
     */
    public async SendWeb(userId: any, payload: IPayloadNotificationPush, token?: any): Promise<void> {
        try {
            if (token != undefined) {
                await webPush.sendNotification(JSON.parse(token), JSON.stringify(payload), this.options);
                return;
            }
            // const session = await sessionModel.get({ userId: userId, valid: 1, values: ['web_push_token'], conditional: 'AND web_push_token IS NOT NULL AND web_push_token <> \'\'' });
            // if (session instanceof Array) {
            //     for (const item of session) {
            //         await webPush.sendNotification(JSON.parse(item?.web_push_token), JSON.stringify(payload), this.options);
            //     }
            // }
        } catch (error: any) {
            catchErrorMethod(error);
        }
    }
}