import { Response, Request, NextFunction } from "express";
import db from "../../../models/index";
import * as ErrorHandler from "../../../utils/errorHandler";
import * as responses from "../../../utils/formaters/responses";
import { HttpStatus } from "../../../utils/constants/httpStatus";
import { Codes } from "../../../utils/constants/codes";

export const read = async (req: Request, res: Response) => {
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

export const userId = async (
  req: Request,
  res: Response,
  next: NextFunction,
  userId: string
) => {
  try {
    const user = await db.User.findOne({ where: { id: userId } });

    if (!user) {
      responses.sendError(
        res,
        Codes.USER__NOT_FOUND,
        "User not found",
        HttpStatus.UNPROCESSABLE_ENTITY
      );
    } else {
      req.user = user;
    }
    next();
  } catch (err) {
    return responses.sendError(
      res,
      Codes.UNKNOWN_ERROR,
      "Something went wrong. Try again in a few minutes",
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
};
