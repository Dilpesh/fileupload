/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
"use strict";
function UnauthorizedAccessError(msg, error) {
    Error.call(this, msg);
    Error.captureStackTrace(this, this.constructor);
    this.name = "UnauthorizedAccessError";
    this.message = typeof msg === undefined ? "You are Unauthorized":msg;
    this.status = 401;
    this.inner = error;
}

UnauthorizedAccessError.prototype = Object.create(Error.prototype);
UnauthorizedAccessError.prototype.constructor = UnauthorizedAccessError;

module.exports = UnauthorizedAccessError;

