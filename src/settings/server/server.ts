//#region imports npm modules
import express, { Application, Request, Response } from "express";
// Local import

// routes controller, middlewares
import middlewares from "./middlewares/middleware";
import router from "../../routes/routes";
import { errorHandler } from "../../helpers/error-handler";
import { blueBright } from "ansi-colors";
import { catchErrorMethod } from "../../core/helpers/catch-error-method";
//#endregion

class Server {
    app: Application;
    private pathDefault = '/api/abrev/v1/';

    constructor() {
        this.app = express();
    }

    private async config() {
        await middlewares(this.app);
        this.routes();
    }

    private routes() {
        // Show API index
        this.app.get('/', (req: Request, res: Response) => res.status(200).send('index API'));
        // Main routes
        this.app.use(this.pathDefault, router);
        this.app.use(errorHandler);
    }

    async start() {
        try {
            await this.config();
        } catch (error: any) {
            await catchErrorMethod(error);
        } finally {
            if (process.env.NODE_ENV === 'production') this.app.listen(this.app.get('port'));
            else
                this.app.listen(this.app.get('port'), () => console.log(`Server started on port ${this.app.get('port')}: ${blueBright(`http://${process.env[`HOSTNAME_APP_${String(process.env.NODE_ENV).toUpperCase()}`]}`)?.replace(String(process.env.PORT), this.app.get('port'))}`));
        }
    }
}

export default Server;
