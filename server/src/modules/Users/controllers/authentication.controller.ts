import passport from "passport";
//create this file
// import * as ErrorHandler from "@utils/errorHandler";
import { HttpStatus } from "@utils/constants/httpStatus";
import { Request, Response, NextFunction } from "express";
import { Codes } from "@utils/constants/codes";
import * as responses from "@utils/formaters/responses";
import db from "@models/index";
import { UserModel, UserAttributes, UserInstance } from "@models/UserModel";
import { configureUserAndToken } from "@utils/strategies/jwt";

export const signup = async (req: Request, res: Response) => {
  //security measurements
  req.body.role = undefined;

  try {
    const user = <UserAttributes>await db.User.create(req.body);
    const data = configureUserAndToken(user);

    return responses.sendSuccessful(res, data, HttpStatus.OK);
  } catch (err) {
    // create a file and a function to handle with all errors
    // const {code, message, status} = ErrorHandler
  }
};
