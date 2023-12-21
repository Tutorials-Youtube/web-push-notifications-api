import { TCodeHttp } from "../controllers/controller";

class ErrorRest extends Error {
    public statusCode: number;
    public detail?: string;
    public status?: number;

    constructor({ message, status, detail }: { message: string; status?: number; detail?: string }, statusCode: TCodeHttp = 500) {
        super(message);
        this.statusCode = statusCode;
        this.detail = detail;
        this.status = status;
        this.name = 'ErrorRest';
    }
}

export default ErrorRest;