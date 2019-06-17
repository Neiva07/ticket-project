import { Application } from "express";
import * as tickets from "../controllers/tickets.controller";
import * as users from "../../Users/controllers/users.controller";
import * as checkout from "../controllers/checkout.controller";

export default (app: Application) => {
  app.route("/api/tickets").post(checkout.checkoutTicket);
};
