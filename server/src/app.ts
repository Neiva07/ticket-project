import * as express from "express";
import * as passport from "passport";
import userRoutes from "./modules/Users/routes/users.routes";
import ticketRoutes from "./modules/Tickets/routes/tickets.routes";
import * as cors from "cors";
import * as bodyParser from "body-parser";
import { handleJWTAuthentication } from "./utils/strategies/jwt";
import * as cookieParser from "cookie-parser";
import * as methodOverride from "method-override";
require("dotenv").config(".env");

import jwt from "./utils/strategies/jwt";

class App {
  public express: express.Application;

  constructor() {
    this.express = express();

    this.init();
    this.express.use(handleJWTAuthentication);

    this.routes();
  }

  private init() {
    this.express.use(bodyParser.urlencoded({ extended: false }));
    this.express.use(bodyParser.json());
    this.express.use(cookieParser());
    this.express.use(methodOverride());

    this.express.use(cors());
    this.express.use(passport.initialize());
    jwt();
  }

  private routes(): void {
    userRoutes(this.express);
    ticketRoutes(this.express);
  }
}

export default new App().express;
