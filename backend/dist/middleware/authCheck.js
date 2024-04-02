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
            try {
                if (req.headers.authorization) {
                    const token = req.headers.authorization.split(" ")[1];
                    console.log("before");
                    const decodeValue = await admin.auth().verifyIdToken(token);
                    console.log(decodeValue);
                    if (decodeValue) {
                        console.log(decodeValue);
                        const user = decodeValue;
                        req["user"] = user.uid;
                        next();
                    }
                    else {
                        console.log("unauthorized user");
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
                console.log("an error accoured");
                next(err);
            }
        };
    }
}
const middleware = new Middleware();
exports.default = middleware;
