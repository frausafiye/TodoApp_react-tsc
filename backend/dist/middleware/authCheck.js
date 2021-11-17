"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = __importDefault(require("../error"));
const admin = require("../config/firebase-config");
class Middleware {
    constructor() {
        this.decodetoken = async (req, res, next) => {
            console.log("here1");
            try {
                if (req.headers.authorization) {
                    console.log("here");
                    const token = req.headers.authorization.split(" ")[1];
                    const decodeValue = await admin.auth().verifyIdToken(token);
                    if (decodeValue) {
                        const user = decodeValue;
                        req["user"] = user.uid;
                        next();
                    }
                    else {
                        const error = new error_1.default("unauthorized user", 403);
                        next(error);
                    }
                }
                else {
                    const error = new error_1.default("unauthorized user", 403);
                    next(error);
                }
            }
            catch (err) {
                next(err);
            }
        };
    }
}
const middleware = new Middleware();
exports.default = middleware;
