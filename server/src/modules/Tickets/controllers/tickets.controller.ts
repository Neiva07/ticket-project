import { Response, Request, NextFunction } from "express";
import * as responses from "../../../utils/formaters/responses";
import db from "../../../models/index";
import { HttpStatus } from "../../../utils/constants/httpStatus";
import { Codes } from "../../../utils/constants/codes";
import { TicketModel, TicketAttributes } from "../../../models/TicketModel";
import { price } from "../../../utils/constants/payment";
import { UserAttributes } from "../../../models/UserModel";

export const index = async (req: Request, res: Response) => {
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

export const createTickets = async (req: Request, res: Response) => {
  const { purchase } = req.body;
  const user: UserAttributes = req.user;
  console.log(purchase.amount.value / price.meal);
  const ticketsNumber = Math.ceil(purchase.amount.value / price.meal);
  console.log(`\n number of tickets :${ticketsNumber} \n`);
  const ticketArray = Array(ticketsNumber).fill({
    owner: user.id,
    bought_by: user.id
  });

  try {
    const tickets = await db.Ticket.bulkCreate(ticketArray);
    // console.log(tickets);

    if (!tickets) {
      return responses.sendError(
        res,
        Codes.TICKET_NOT_CREATED,
        "Something went wrong during the tickets creation",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }

    return responses.sendSuccessful(res, tickets, HttpStatus.OK);
  } catch (error) {
    return responses.sendError(
      res,
      Codes.UNKNOWN_ERROR,
      "Something went wrong. Try again in a few minutes.",
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
};

export const getUserTickets = async (req: Request, res: Response) => {
  const { user } = req;

  try {
    const tickets = await db.Ticket.findAll({
      where: { owner: user.id }
    });
    console.log(tickets);
    if (!tickets) {
      return responses.sendError(
        res,
        Codes.TICKET_NOT_FOUND,
        "User has no ticket",
        HttpStatus.NOT_FOUND
      );
    }
    return responses.sendSuccessful(res, tickets, HttpStatus.OK);
  } catch (error) {
    return responses.sendError(
      res,
      Codes.UNKNOWN_ERROR,
      "Something went wrong. Try again in a few minutes.",
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
};

// const findAllTickets = () => {
//   return db.Ticket.findAll({
//     include: [
//       {
//         model: db.User,
//         where: { email: "lucas@g3efil.com" }
//       }
//     ]
//   });
// };
