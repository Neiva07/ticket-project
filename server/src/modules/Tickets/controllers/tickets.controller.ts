import { Response, Request } from "express";
import * as responses from "../../../utils/formaters/responses";
import db from "../../../models/index";
import { HttpStatus } from "../../../utils/constants/httpStatus";
import { Codes } from "../../../utils/constants/codes";
import { TicketModel } from "../../../models/TicketModel";
import { price } from "../../../utils/constants/payment";

export const index = async (res: Response, req: Request) => {
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

const createTickets = async (res: Response, req: Request) => {
  const { payment } = req.body;
  const number_tickets = payment / price.meal;
  const tickets = [];

  for (let i = 0; i < number_tickets; i++) {
    const newTicket = await db.Ticket.create({});
    tickets.push(newTicket);
  }
};
