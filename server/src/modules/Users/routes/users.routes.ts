import { Application } from "express";
import * as authentication from "../controllers/authentication.controller";
import * as validations from "../validations/user.validations";
import * as users from "../controllers/users.controller";

export default (app: Application) => {
  app.route("/api/users/:userId");
  // .all(policies.isAllowed)
  // .get(users.read);
  // .put(users.edit) change the profile when already loged in
  // .delete(users.delete) not sure how should work (maybe just the login and maintain the data -- changing status to deactivated)

  //admin permission (initially unless)
  app
    .route("/api/users")
    // .all(polices.isAllowed)
    .get(users.read);
  // .get(users.allUsers)

  app.route("/auth/signup").post(validations.signup, authentication.signup);
  app.route("/auth/signin").post(validations.signin, authentication.signin);

  app.route("/users/me").get(users.me);

  // app.param("userId", users.userById)
};
