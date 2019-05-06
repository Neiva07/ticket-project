import passport from "passport";
//create this file
import * as ErrorHandler from "../../../utils/errorHandler";
import { HttpStatus } from "../../../utils/constants/httpStatus";
import { Request, Response, NextFunction } from "express";
import { Codes } from "../../../utils/constants/codes";
import * as responses from "../../../utils/formaters/responses";
import db from "../../../models/index";
import { Op } from "sequelize";
import {
  UserModel,
  UserAttributes,
  UserInstance
} from "../../../models/UserModel";
import { configureUserAndToken } from "../../../utils/strategies/jwt";

export const signup = async (req: Request, res: Response) => {
  //security measurements
  req.body.role = undefined;

  try {
    const newuser = req.body;

    if (!newuser.course || !newuser.degree) {
      return responses.sendError(
        res,
        Codes.AUTH__UNFILLED_FIELD,
        "Missing course information. please fill all mandatory fields",
        HttpStatus.NOT_ACCEPTABLE
      );
    }

    const userAlreadyRegister = await db.User.findOne({
      where: {
        [Op.or]: [
          { email: newuser.email },
          { enrollment_number: newuser.enrollment_number }
        ]
      }
    });
    if (userAlreadyRegister) {
      return responses.sendError(
        res,
        Codes.AUTH__UNIQUE_ALREADY_IN_USE,
        "Email or Enrollment Number invalid",
        HttpStatus.NOT_ACCEPTABLE
      );
    } else {
      const user = <UserAttributes>await db.User.create(newuser);

      const data = configureUserAndToken(user);
      return responses.sendSuccessful(res, data, HttpStatus.OK);
    }
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
    } else if (user.isPassword(password, user.password)) {
      const data = configureUserAndToken(user);
      return responses.sendSuccessful(res, data, HttpStatus.OK);
    } else
      return responses.sendError(
        res,
        Codes.AUTH__WRONG_PASSWORD,
        "Wrong password. try again",
        HttpStatus.UNAUTHORIZED
      );
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
