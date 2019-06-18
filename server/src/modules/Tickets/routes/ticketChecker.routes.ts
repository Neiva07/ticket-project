import { Application } from "express";
import * as checkout from "../controllers/checkout.controller";

export default (app: Application) => {
  app.route("/api/tickets").post(checkout.checkoutTicket);
};
