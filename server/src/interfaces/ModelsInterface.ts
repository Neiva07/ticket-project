import { UserModel } from "../models/UserModel";
import { TicketModel } from "../models/TicketModel";

export interface ModelsInterface {
  User: UserModel;
  Ticket: TicketModel;
}

export interface SafeUsers {
  first_name: string;
  last_name: string;
  email: string;
  photo?: string;
  course?: string;
  degree?: string;
  tickets?: number;
  enrollment_number: number;
}
