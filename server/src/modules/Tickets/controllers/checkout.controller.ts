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
    console.log(qr_code);

    await redisClient.hmget("qrCodeSocket", qr_code, (err, socketId) => {
      if (err) {
        console.log(err);
        return responses.sendError(
          res,
          Codes.REDIS__MISSING_DATA,
          "there isn't a ticket request with this QR Code right now",
          HttpStatus.UNPROCESSABLE_ENTITY
        );
      }
      io.to(socketId[0]).emit("ticketChecker", { response: "success" });
    });

    const validTicket = await db.Ticket.findOne({
      where: { qr_code: qr_code, status: "valid" }
    });
    if (validTicket) {
      await validTicket.update({
        status: "invalid"
      });

      responses.sendSuccessful(res, validTicket, HttpStatus.OK);
    }
    responses.sendError(
      res,
      Codes.TICKET_NOT_FOUND,
      "Ticket not found",
      HttpStatus.UNPROCESSABLE_ENTITY
    );
  } catch (error) {
    return responses.sendError(
      res,
      Codes.UNKNOWN_ERROR,
      "Something went wrong. Try again in a few minutes.",
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
};
