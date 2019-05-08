import { Application } from "express";
import * as tickets from "../controllers/tickets.controller";

export default (app: Application) => {
  app
    .route("/api/tickets/")
    // .all(polices.isAllowed)
    .get(tickets.index);
};
