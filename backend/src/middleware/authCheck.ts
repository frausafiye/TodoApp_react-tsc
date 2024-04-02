import ErrorMiddleware from "../error";
import { Request, Response, NextFunction } from "express";

const admin = require("../config/firebase-config");
class Middleware {
  decodetoken = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (req.headers.authorization) {
        const token = (<string>req.headers.authorization).split(" ")[1];
        const decodeValue = await admin.auth().verifyIdToken(token);
        console.log(decodeValue);
        if (decodeValue) {
          console.log(decodeValue);
          const user = decodeValue;
          req["user"] = user.uid;
          next();
        } else {
          const error = new ErrorMiddleware("unauthorized user", 403);
          next(error);
        }
      } else {
        const error = new ErrorMiddleware("unauthorized user", 403);
        next(error);
      }
    } catch (err) {
      next(err);
    }
  };
}

const middleware = new Middleware();
export default middleware;
