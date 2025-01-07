"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainError = exports.HTTP = void 0;
var HTTP;
(function (HTTP) {
    HTTP[HTTP["OK"] = 200] = "OK";
    HTTP[HTTP["CREATED"] = 201] = "CREATED";
    HTTP[HTTP["BAD_REQUEST"] = 404] = "BAD_REQUEST";
    HTTP[HTTP["NOT_FOUND"] = 405] = "NOT_FOUND";
    HTTP[HTTP["CONFILT"] = 409] = "CONFILT";
})(HTTP || (exports.HTTP = HTTP = {}));
class mainError extends Error {
    constructor(args) {
        super(args.message);
        this.success = true;
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = args.name;
        this.message = args.message;
        this.status = args.status;
        if (this.success !== undefined) {
            this.success = args.success;
        }
        Error.captureStackTrace(this);
    }
}
exports.mainError = mainError;
