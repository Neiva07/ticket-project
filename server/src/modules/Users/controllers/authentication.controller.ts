import passport from "passport";

import * as ErrorHandler from "@interfaces/errorHandler";
import * as HtttpStatus from "@utils/constants/httpStatus";
import { Request, Response, NextFunction } from "express";
import { Codes } from "@utils/constants/codes";
import * as responses from "@utils/formaters/responses";
import db from '@models/index'

export  const signup = (req: Request, res: Response) => {
    //security measurements
    req.body.role = undefined;


    // const user = db.User.create({
    //     user: 
    // })
}