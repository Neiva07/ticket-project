import { Response, Request, NextFunction } from "express";
import * as responses from "../../../utils/formaters/responses";
import db from "../../../models/index";
import { HttpStatus } from "../../../utils/constants/httpStatus";
import { Codes } from "../../../utils/constants/codes";
import { TicketModel, TicketAttributes } from "../../../models/TicketModel";
import { UserAttributes } from "../../../models/UserModel";
import * as socketIo from "socket.io";

type Message = {
  status: "success" | "error";
};

export const checkTicket = (socket: socketIo.Socket) => {
  socket.on("ticketCheck", (id: string, msg: Message) => {
    socket.to(id).emit(msg.status);
  });
};
