import { Application } from "express";
import * as authentication from "@modules/Users/controllers/authentication.controller";

export default (app: Application) => {
  app.route("/api/users/:userId");
  // .all(policies.isAllowed)
  // .get(users.read) not sure if should exist
  // .put(users.edit) change the profile when already loged in
  // .delete(users.delete) not sure how should work (maybe just the login and maintain the data -- changing status to deactivated)

  //admin permission (initially unless)
  app.route("/api/users");
  // .all(polices.isAllowed)
  // .get(users.allUsers)

  app
    .route("/api/v1/signup")
    .post(/*validations.signup,*/ authentication.signup);
  app
    .route("/api/v1/signin")
    .post(/*validations.signin, */ authentication.signin);
  // app.param("userId", users.userById)
};
