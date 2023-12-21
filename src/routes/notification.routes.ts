//#region Imports
import { Router } from "express";
import NotificationController from "../controllers/notification.controller";
//#enregion

const notificationRouter = Router();
const notificationController = new NotificationController();

// End points
notificationRouter.route('')
    .post(notificationController.create)
    .get(notificationController.get)
    .put(notificationController.update)
    .delete(notificationController.delete);

export default notificationRouter;
