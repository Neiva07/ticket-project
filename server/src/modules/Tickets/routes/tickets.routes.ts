import { Application } from "express";
import * as tickets from "../controllers/tickets.controller";
import * as users from "../../Users/controllers/users.controller";

export default (app: Application) => {
  app
    .route("/api/users/:userId/tickets/")
    // .all(polices.isAllowed)
    .get(tickets.getUserTickets)
    .post(tickets.createTickets);

  app.route("/api/tickets").get(tickets.index);

  app.param("userId", users.userId);
};
