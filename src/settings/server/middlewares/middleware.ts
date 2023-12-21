import express, { Application, Request, Response, NextFunction } from "express";
import morgan from "morgan";
import dotenvExpand from "dotenv-expand";
import path from "path";
import dotenv from "dotenv";
import { middlewaresCors } from "./cors.middleware";
import { middlewaresDynamicPort } from "./dynamic-port.middleware";

const config = dotenv.config({ path: path.resolve() + '/.env' });
dotenvExpand.expand(config);

const middlewares = async (app: Application): Promise<void> => {
    await middlewaresDynamicPort(app);
    app.use(express.json());
    app.use(morgan('dev'));
    app.use(express.urlencoded({ extended: true }));
    middlewaresCors(app);
};

export default middlewares;
