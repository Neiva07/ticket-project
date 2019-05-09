import * as express from "express";
import userRoutes from "./modules/Users/routes/users.routes";
import ticketRoutes from "./modules/Tickets/routes/tickets.routes";
import * as cors from "cors";
import * as bodyParser from "body-parser";

class App {
  public express: express.Application;

  constructor() {
    this.express = express();

    this.middleware();
  }

  private middleware(): void {
    this.express.use(bodyParser.urlencoded({ extended: false }));

    this.express.use(bodyParser.json());

    this.express.use(cors());

    userRoutes(this.express);
    ticketRoutes(this.express);
  }
}

export default new App().express;
