import { blueBright, redBright, yellowBright } from "ansi-colors";
import path from "path";

export interface IErrorCatch {
    origin_method: string,
    message: string,
    path_error: string
}

export async function catchErrorMethod(error: Error) {
    try {
        const isDebug = process.env?.DEBUG == undefined || (process.env?.DEBUG && process.env?.DEBUG == 'true') ? true : false;
        const pathFileError = error.stack?.split('\n')[1].split(path.parse(path.resolve()).base)[1]?.replace(')', '');
        if (process.env.NODE_ENV == 'production') {
            const dataError: IErrorCatch = {
                message: error.message,
                origin_method: error.stack?.split('\n')[1]?.trim().match(/^at\s+(.*)\s+\(/)?.[1] || 'Función desconocida',
                path_error: pathFileError || ''
            }
            console.log(dataError);
            //* You can use it as you like, save to file or send email.
            //? await saveLogsAndSendEmail(dataError.origin_method, dataError)
        }
        if (isDebug) {
            const textError = redBright("Método del Error: ") + blueBright(error.stack?.split('\n')[1]?.trim().match(/^at\s+(.*)\s+\(/)?.[1] || 'Función desconocida') + `${redBright(' Mensaje: ')}${yellowBright(error.message)} ` + `${redBright('Ruta de archivo:')} ${blueBright(pathFileError || '')}`;
            console.log(textError);
            return textError;
        } else return '';
    } catch (error: any) {
        console.log(redBright(error.message));
    }
}
