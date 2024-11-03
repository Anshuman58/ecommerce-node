"use strict";
// message,status,errorcode and errors
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorCode = exports.HTTPException = void 0;
class HTTPException extends Error {
    constructor(message, errorCode, statusCode, error) {
        super(message);
        this.message = message;
        this.errorCode = errorCode;
        this.statusCode = statusCode;
        this.errors = error;
    }
}
exports.HTTPException = HTTPException;
var ErrorCode;
(function (ErrorCode) {
    ErrorCode[ErrorCode["USER_NOT_FOUND"] = 1001] = "USER_NOT_FOUND";
    ErrorCode[ErrorCode["USER_ALREADY_EXISTS"] = 1002] = "USER_ALREADY_EXISTS";
    ErrorCode[ErrorCode["INVALID_CREDENTIAL"] = 1003] = "INVALID_CREDENTIAL";
    ErrorCode[ErrorCode["UNPROCESSABLE_REQUEST"] = 2000] = "UNPROCESSABLE_REQUEST";
    ErrorCode[ErrorCode["INTERNAL_EXCEPTION"] = 3001] = "INTERNAL_EXCEPTION";
    ErrorCode[ErrorCode["UNAUTHORIZED"] = 4001] = "UNAUTHORIZED";
})(ErrorCode || (exports.ErrorCode = ErrorCode = {}));
