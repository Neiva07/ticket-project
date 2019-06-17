import { Response, Request, NextFunction, RequestHandler } from "express";
import * as responses from "../../../utils/formaters/responses";
import db from "../../../models/index";
import { HttpStatus } from "../../../utils/constants/httpStatus";
import { Codes } from "../../../utils/constants/codes";
import { TicketModel, TicketAttributes } from "../../../models/TicketModel";
import { UserAttributes } from "../../../models/UserModel";
import { io, redisClient } from "../../../server";
type Message = {
  status: "success" | "error";
};

export const checkoutTicket = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const { qr_code } = req.body;

  try {
    redisClient.get(qr_code, (err, socketId) =>
      io.to(socketId).emit("ticketChecker", { response: "success" })
    );

    const validTicket = await db.Ticket.findOne({
      where: { qr_code: qr_code, status: "valid" }
    });
    await validTicket.update({
      status: "invalid"
    });

    responses.sendSuccessful(res, validTicket, HttpStatus.OK);
  } catch (error) {
    return responses.sendError(
      res,
      Codes.UNKNOWN_ERROR,
      "Something went wrong. Try again in a few minutes.",
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
};
