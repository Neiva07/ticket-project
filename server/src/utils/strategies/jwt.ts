import { Request, Response, NextFunction } from "express";
import {
  UserModel,
  UserInstance,
  UserAttributes
} from "../../models/UserModel";
import { Strategy, ExtractJwt } from "passport-jwt";
import * as jwt from "jsonwebtoken";
import passport from "passport";
import db from "../../models/index";
import { ErrorHandler } from "../../interfaces/errorHandler";

// Setup work and export for the JWT passport strategy
export default function() {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_JWT
  };
  passport.use(
    new Strategy(opts, (jwt_payload, done) =>
      db.User.findOne({ where: { id: jwt_payload._id } })
        .then((user: UserInstance) => {
          if (user) {
            return done(undefined, user.toJSON());
          } else {
            return done(undefined, false);
          }
        })
        .catch((err: Error) => {
          console.log("return done(err, false);");
          return done(err, false);
        })
    )
  );
}
type ConfiguredUserAndToken = {
  user: UserAttributes;
  token: string;
};

export function configureUserAndToken(
  user: UserAttributes
  // | UserStoreAdminModel
): ConfiguredUserAndToken {
  // select only the essential data to save on jwt
  const tokenUser = {
    email: user.email,
    photo: user.photo,
    first_name: user.first_name,
    last_name: user.last_name,
    _id: user.id,
    enrollment_number: user.enrollment_number
    // role: "student"
  };
  const token = jwt.sign(tokenUser, process.env.SECRET_JWT);

  // return user and token
  return {
    user,
    token
  };
}
export function handleJWTAuthentication(
  req: Request & { err: string },
  res: Response,
  next: NextFunction
) {
  passport.authenticate("jwt", { session: false }, function(
    err: ErrorHandler,
    user: UserModel,
    info
  ) {
    req.user = user;
    if (info) {
      req.err = info.message;
    }
    next();
  })(req, res, next);
}
