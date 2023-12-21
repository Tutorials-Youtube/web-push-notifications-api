import { Application, NextFunction, Request, Response } from "express";

export const middlewaresCors = (app: Application) => {
    app.use((req: Request, res: Response, next: NextFunction) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
        res.header('Allow', 'GET, POST, PUT, DELETE');
        //? Manejar las exepciones no controladas que ocurran durante la ejecución
        // BUG Genera un log en el servidor por exceso de oyentes
        // TODO moverlo para una parte donde no se produzca.
        // process.on('unhandledRejection', (error: unknown, promise) => {
        //     if (process.env.NODE_ENV === 'development')
        //         // console.log(' Oh Lord! We forgot to handle a promise rejection here: ', promise);
        //         console.log(' The error was: ', error);
        //     res.status(500).json(setResponse({ text: 'Ha ocurrido un error grave', errors: String(error), status: 800 }));
        // });
        // process.on('uncaughtException', (error: unknown, promise) => {
        //     if (process.env.NODE_ENV === 'development')
        //         // console.log(' Oh Lord! We forgot to handle a promise rejection here: ', promise);
        //         console.log(' The error was: ', error);
        //     res.status(500).json(setResponse({ text: 'Ha ocurrido un error grave', errors: String(error), status: 800 }));
        // });
        next();
    });
}