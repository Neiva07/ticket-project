import { Response, Request, NextFunction, RequestHandler } from "express";
import * as responses from "../../../utils/formaters/responses";
import db from "../../../models/index";
import { HttpStatus } from "../../../utils/constants/httpStatus";
import { Codes } from "../../../utils/constants/codes";
import { TicketModel, TicketAttributes } from "../../../models/TicketModel";
import { UserAttributes } from "../../../models/UserModel";
import { io, ClientStore } from "../../../server";
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
    responses.sendSuccessful(res, {}, HttpStatus.OK);

    // const validTicket = await db.Ticket.findOne({
    //   where: { qr_code: qr_code, status: "valid" }
    // });
    // await validTicket.update({
    //   status: "invalid"
    // });

    // console.log(`this is the qr_code checked : ${qr_code}`);

    // console.log("req.session id :", req.session.id);

    // io.to(req.session[qr_code]).emit("ticketChecker", {
    //   response: "success"
    // });

    // responses.sendSuccessful(res, validTicket, HttpStatus.OK);
  } catch (error) {
    return responses.sendError(
      res,
      Codes.UNKNOWN_ERROR,
      "Something went wrong. Try again in a few minutes.",
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
};
