import {Request} from "express";
import {User} from "../core/user";

export interface RequestWithUser extends Request {
    user?: User;
}
