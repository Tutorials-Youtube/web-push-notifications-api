import { Security } from "../libs/security";

//#region Interface type

// Interfaz para respuesta http
export interface IResponse {
    status: number;
    error: boolean;
    message: {
        text: string,
        errors: any
    };
    data: any;
}

type IParamsResponse = {
    text: string;
    data?: any;
    errors?: any;
    status?: number;
}
/**
 * @example
 * +------+-------------------------------+--------------------------+
 * | Code | Reason-Phrase                 | Defined in...            |
 * +------+-------------------------------+--------------------------+
 * | 100  | Continue                      | Section 6.2.1            |
 * | 101  | Switching Protocols           | Section 6.2.2            |
 * | 200  | OK                            | Section 6.3.1            |
 * | 201  | Created                       | Section 6.3.2            |
 * | 202  | Accepted                      | Section 6.3.3            |
 * | 203  | Non-Authoritative Information | Section 6.3.4            |
 * | 204  | No Content                    | Section 6.3.5            |
 * | 205  | Reset Content                 | Section 6.3.6            |
 * | 206  | Partial Content               | Section 4.1 of [RFC7233] |
 * | 300  | Multiple Choices              | Section 6.4.1            |
 * | 301  | Moved Permanently             | Section 6.4.2            |
 * | 302  | Found                         | Section 6.4.3            |
 * | 303  | See Other                     | Section 6.4.4            |
 * | 304  | Not Modified                  | Section 4.1 of [RFC7232] |
 * | 305  | Use Proxy                     | Section 6.4.5            |
 * | 307  | Temporary Redirect            | Section 6.4.7            |
 * | 400  | Bad Request                   | Section 6.5.1            |
 * | 401  | Unauthorized                  | Section 3.1 of [RFC7235] |
 * | 402  | Payment Required              | Section 6.5.2            |
 * | 403  | Forbidden                     | Section 6.5.3            |
 * | 404  | Not Found                     | Section 6.5.4            |
 * | 405  | Method Not Allowed            | Section 6.5.5            |
 * | 406  | Not Acceptable                | Section 6.5.6            |
 * | 407  | Proxy Authentication Required | Section 3.2 of [RFC7235] |
 * | 408  | Request Timeout               | Section 6.5.7            |
 * | 409  | Conflict                      | Section 6.5.8            |
 * | 410  | Gone                          | Section 6.5.9            |
 * | 411  | Length Required               | Section 6.5.10           |
 * | 412  | Precondition Failed           | Section 4.2 of [RFC7232] |
 * | 413  | Payload Too Large             | Section 6.5.11           |
 * | 414  | URI Too Long                  | Section 6.5.12           |
 * | 415  | Unsupported Media Type        | Section 6.5.13           |
 * | 416  | Range Not Satisfiable         | Section 4.4 of [RFC7233] |
 * | 417  | Expectation Failed            | Section 6.5.14           |
 * | 426  | Upgrade Required              | Section 6.5.15           |
 * | 500  | Internal Server Error         | Section 6.6.1            |
 * | 501  | Not Implemented               | Section 6.6.2            |
 * | 502  | Bad Gateway                   | Section 6.6.3            |
 * | 503  | Service Unavailable           | Section 6.6.4            |
 * | 504  | Gateway Timeout               | Section 6.6.5            |
 * | 505  | HTTP Version Not Supported    | Section 6.6.6            |
 * +------+-------------------------------+--------------------------+
 */
export type TCodeHttp =
    100 | 101 | 200 | 201 |
    202 | 203 | 204 | 205 | 206 |
    300 | 301 | 302 | 303 | 304 | 305 | 307 |
    400 | 401 | 402 | 403 | 404 | 405 | 406 | 407 | 408 | 409 | 410 | 411 | 412 | 413 | 414 | 415 | 416 | 417 | 426 |
    500 | 501 | 502 | 503 | 504 | 505;

// Intefaz para la validación de parámetros
interface Irequest {
    requiredParameters?: Object | any;
    nullParameters?: Object | any;
    strict?: boolean;
}
//#endregion

export class Controller extends Security {

    //#region Propiedades
    protected response: IResponse = {
        status: 200,
        error: false,
        message: {
            text: '',
            errors: []
        },
        data: []
    };
    protected code: TCodeHttp = 200;


    //#endregion

    /**
     * 
     * @param options 
     * @param codeHttp 
     * @returns 
     * @example 
     *  setResponse({ text: 'Los parámetros son inválidos', errors: validation, status: 700 }) // Error response
     *  setResponse({ text: 'Recurso creado' }, 201)
     *  setResponse({ text: 'Listado de usuarios', [{name:""}] })
     */
    public setResponse(options: IParamsResponse, codeHttp?: TCodeHttp): { response: IResponse; code?: TCodeHttp } {
        this.response = {
            status: options.status || 200,
            error: options.errors != undefined ? true : false,
            message: {
                text: options.text || '',
                errors: options.errors || []
            },
            data: options.data || []
        };
        let dataReturn: { response: IResponse; code?: TCodeHttp } = { response: this.response };
        if (codeHttp != undefined) {
            this.code = codeHttp;
            Object.assign(dataReturn, { code: codeHttp });
        }
        return dataReturn;
    }

    /**
     * 
     * Este método valida por cantidad de parámetros y valida que los valores no sean nulos o indefinidos.
     * @param req Parameter object sent via http
     * @param options 
     * @returns true or reply message
     * @example
     * ValidateParams(req.query, {requiredParameters:{param1, param2}})
     * ValidateParams(req.body, {requiredParameters:{param1, param2}, nullParameters:{param3, param4}})
     * ValidateParams(req.query, {requiredParameters:{param1, param2}, nullParameters:{param3}, skipQuantityValidation:true})
     */
    protected async validateParams(req: object | any, { strict = true, nullParameters, requiredParameters }: Irequest): Promise<any> {
        nullParameters = nullParameters !== undefined && Object.entries(nullParameters).length != 0 ? nullParameters : {};
        requiredParameters = requiredParameters !== undefined && Object.entries(requiredParameters).length != 0 ? requiredParameters : {};
        let control: number = 0;
        let validParams: Array<any> = Object.keys(requiredParameters || {});
        let paramsNull: Array<any> = typeof nullParameters == 'object' ? Object.keys(nullParameters) : [];
        let response = {};

        // Verifica si el valor es nulo y requerido, cosa que no es permitida por el método 
        for (let i = 0; i < paramsNull.length; i++) {
            const equals = await this.validateEquals(validParams, paramsNull[i]);
            if (equals != -1) {
                return `the <${paramsNull[i]}> parameter cannot be mandatory and null at the same time`;
            };
        }

        if (Object.keys(req).length > 0) {
            var request = Object.keys(req);
            // Se asignan los parámetros que son nulos al array de parámetros válidos
            Array.prototype.push.apply(validParams, paramsNull);

            if (paramsNull.length > 0) {
                for (const item of paramsNull) {
                    if (request.indexOf(item) == -1) request.push(item);
                }
            }

            //#region Obtiene los parámetros que no son admitidos, o están mandando adicionalmente
            let unsupported_parameters = await this.getInvalidParameters(request, validParams);
            if ((unsupported_parameters.length > 0) && strict) {
                response = {
                    message: `thes number of parameters are not valid: expected <${Object.keys(requiredParameters).length + paramsNull.length}>`,
                    expected: validParams,
                    unsupported_parameters
                };

                paramsNull.length > 0 ? Object.assign(response, { optional: paramsNull }) : '';
                let missingParameters = await this.getMissingParameters(req, requiredParameters);
                missingParameters.length > 0 ? Object.assign(response, { missing_parameters: missingParameters }) : '';
                return response;
            }

            //#endregion

            //#region Valida que los valores requeridos los estén enviando.
            if (request.length != validParams.length && strict) {
                const arrayParamInvalid = await this.getInvalidParameters(request, validParams);
                const invalidParams: string = `invalidParams = <${arrayParamInvalid}>`;
                let missingParameters = await this.getMissingParameters(req, requiredParameters);
                response = {
                    message: `the number of parameters are not valid: expected <${Object.keys(requiredParameters).length + paramsNull.length}>`,
                    expected: validParams
                }
                paramsNull.length > 0 ? Object.assign(response, { optional: paramsNull }) : '';
                arrayParamInvalid.length > 0 ? Object.assign(response, { invalid_params: invalidParams }) : '';
                missingParameters.length > 0 ? Object.assign(response, { missing_parameters: missingParameters }) : '';
                return response;
            }
            //#endregion

            await this.asignValueToNull(req, paramsNull);
            for (let index1 = 0; index1 < validParams.length; index1++) {
                // Se asegura de que los parámetros envíados sean igual a los esperados
                var validation = await this.validateEquals(request, validParams[index1]);
                control = 0;
                if (validation != -1) {
                    control = 1;
                    // Se valida que los valores no sean nulos o indefinidos
                    if (req[request[validation]] == '' || req[request[validation]] == null || req[request[validation]] == undefined) {
                        response = `the <${request[validation]}> parameter cannot be null or undefined`;
                        return response;
                    }
                }
                else if (control == 0 && validation == -1) {
                    const arrayParamInvalid = await this.getInvalidParameters(request, validParams);
                    response = `invalid parameters near <${arrayParamInvalid[0]}>: expected <${validParams[index1]}>`;
                    return response;
                }
            }

            return true;
        }
        else if ((Object.keys(req).length === validParams.length) || !strict) {
            return true;
        }
        else {
            response = {
                message: `the number of parameters are not valid > length of received parameters = 0: expected <${Object.keys(requiredParameters).length || 0 + paramsNull.length}>`,
                expected: validParams
            }
            paramsNull.length > 0 ? Object.assign(response, { optional: paramsNull }) : '';
            return response;
        }

    }

    //#region Métodos privados

    //#region Validación de parámetros
    /**
     * 
     * @param request 
     * @param value 
     * @returns index when equal or -1 when not
     */
    private async validateEquals(request: Array<any>, value: string): Promise<any> {
        for (let index2 = 0; index2 < request.length; index2++) {
            if (request[index2] == value) {
                return index2;
            }
        }
        return -1;
    }

    /**
     * 
     * @param req 
     * @param paramsValid 
     * @returns array of invalid parameters
     */
    private async getInvalidParameters(req: Array<any>, paramsValid: Array<any>): Promise<Array<any>> {
        let invalidParams: any[] = [];
        for (let index = 0; index < req.length; index++) {
            const result = await this.validateEquals(paramsValid, req[index]);
            if (result == -1) {
                invalidParams.push(req[index]);
            }
        }
        return invalidParams;
    }

    private async getMissingParameters(req: Object, requiredParameters: any): Promise<Array<any>> {
        let missingParameters = [];
        for (const item of Object.keys(requiredParameters)) {
            if (!Object.hasOwn(req, item)) missingParameters.push(item);
        }
        return missingParameters;
    }

    /**
     * 
     * @param request 
     * @param array 
     */
    private async asignValueToNull(request: Object | any, array: Array<any>): Promise<void> {
        for (let i = 0; i < array.length; i++) {
            if (request[array[i]] != undefined || request[array[i]] == null) { request[array[i]] = ' ' };
        }
    }

    //#endregion


    //#endregion
}