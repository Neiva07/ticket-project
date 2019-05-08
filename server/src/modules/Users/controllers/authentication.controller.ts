import passport from "passport";
//create this file
import * as ErrorHandler from "../../../utils/errorHandler";
import { HttpStatus } from "../../../utils/constants/httpStatus";
import { Request, Response, NextFunction } from "express";
import { Codes } from "../../../utils/constants/codes";
import * as responses from "../../../utils/formaters/responses";
import db from "../../../models/index";
import { Op } from "sequelize";
import { UserAttributes } from "../../../models/UserModel";
import { configureUserAndToken } from "../../../utils/strategies/jwt";

export const signup = async (req: Request, res: Response) => {
  //security measurements
  req.body.role = undefined;

  try {
    const newuser = req.body;

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
        "Email or Enrollment Number already taken",
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
    return responses.sendError(res, code, message, status);
  }
};

export const signin = async (req: Request, res: Response) => {
  const { enrollment_number, password } = req.body;

  try {
    const user = await db.User.findOne({ where: { enrollment_number } });

    if (!user) {
      const message = "No user found with this Enrollment Number";
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
    return responses.sendError(res, code, message, status);
  }
};
export const read = async (res: Response, req: Request) => {
  console.log(req.body);
  try {
    const user = await db.User.findOne({
      where: { enrollment_number: req.body.enrollment_number }
    });
    if (!user) {
      responses.sendError(
        res,
        Codes.USER__NOT_FOUND,
        "user not founded",
        HttpStatus.UNPROCESSABLE_ENTITY
      );
    } else {
      return responses.sendSuccessful(res, user, HttpStatus.OK);
    }
  } catch (err) {
    const {
      code,
      message,
      status
    } = ErrorHandler.getErrorMessageCodeAndHttpStatus(err);
    return responses.sendError(res, code, message, status);
  }
};
