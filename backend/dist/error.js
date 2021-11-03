"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ErrorMiddleware extends Error {
    constructor(message, status) {
        super(message);
        this.message = message;
        this.status = status;
        if (status !== undefined) {
            this.status = status;
        }
        this.message = message;
    }
}
exports.default = ErrorMiddleware;
