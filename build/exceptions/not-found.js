"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotfoundException = void 0;
const root_1 = require("./root");
class NotfoundException extends root_1.HTTPException {
    constructor(message, errorCode) {
        super(message, errorCode, 404, null);
    }
}
exports.NotfoundException = NotfoundException;
