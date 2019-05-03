import { Application } from "express";
import * as authentication from "../controllers/authentication.controller";

export default (app: Application) => {
  app.route("/:userId");
  // .all(policies.isAllowed)
  // .get(users.read) not sure if should exist
  // .put(users.edit) change the profile when already loged in
  // .delete(users.delete) not sure how should work (maybe just the login and maintain the data -- changing status to deactivated)

  //admin permission (initially unless)
  app.route("/");
  // .all(polices.isAllowed)
  // .get(users.allUsers)

  app.route("/signup").post(/*validations.signup,*/ authentication.signup);
  app.route("/signin").post(/*validations.signin, */ authentication.signin);
  // app.param("userId", users.userById)
};
