"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnprocessableError = void 0;
const root_1 = require("./root");
class UnprocessableError extends root_1.HTTPException {
    constructor(error, message, errorCode) {
        super(message, errorCode, 422, error);
    }
}
exports.UnprocessableError = UnprocessableError;
