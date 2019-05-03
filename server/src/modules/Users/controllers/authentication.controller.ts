import passport from "passport";
//create this file
import * as ErrorHandler from "../../../utils/errorHandler";
import { HttpStatus } from "../../../utils/constants/httpStatus";
import { Request, Response, NextFunction } from "express";
import { Codes } from "../../../utils/constants/codes";
import * as responses from "../../../utils/formaters/responses";
import db from "../../../models/index";
import {
  UserModel,
  UserAttributes,
  UserInstance
} from "../../../models/UserModel";
import { configureUserAndToken } from "../../../utils/strategies/jwt";
import { QueryInterface } from "sequelize/types";

export const signup = async (req: Request, res: Response) => {
  //security measurements
  req.body.role = undefined;

  try {
    const user = <UserAttributes>await db.User.create(req.body);
    const data = configureUserAndToken(user);

    return responses.sendSuccessful(res, data, HttpStatus.OK);
  } catch (err) {
    const {
      code,
      message,
      status
    } = ErrorHandler.getErrorMessageCodeAndHttpStatus(err);
    responses.sendError(res, code, message, status);
  }
};

export const signin = async (req: Request, res: Response) => {
  const { enrollment_number, password } = req.body;

  try {
    const user = await db.User.findOne({ where: { enrollment_number } });
    if (!user) {
      const message = "Could not find any user with that Enrollment Number";
      return responses.sendError(
        res,
        Codes.AUTH__USER_NOT_FOUND,
        message,
        HttpStatus.UNPROCESSABLE_ENTITY
      );
    }
    const data = configureUserAndToken(user);
    return responses.sendSuccessful(res, data, HttpStatus.OK);
  } catch (err) {
    const {
      code,
      message,
      status
    } = ErrorHandler.getErrorMessageCodeAndHttpStatus(err);
    responses.sendError(res, code, message, status);
  }
};
export const ola = (req: Request, res: Response) => {
  res.json({ ola: "ola" });
};
