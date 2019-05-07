import { Response, Request } from "express";
import { NextFunction } from "connect";
import * as responses from "../../../utils/formaters/responses";
import db from "../../../models/index";
import { HttpStatus } from "../../../utils/constants/httpStatus";
import { Codes } from "../../../utils/constants/codes";

export const index = async (
  res: Response,
  req: Request,
  next: NextFunction
) => {
  const tickets = await db.Ticket.findAll({});
  if (tickets) {
    return responses.sendSuccessful(res, tickets, HttpStatus.OK);
  } else {
    return responses.sendError(
      res,
      Codes.TICKET_NOT_FOUND,
      "No ticket found",
      HttpStatus.NOT_FOUND
    );
  }
};
