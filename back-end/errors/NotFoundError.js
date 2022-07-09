const { METHOD_FAILURE } = require("http-status-codes");
const statusCode = require("http-status-codes");
const CustomAPIError = require("./CustomAPIError");

class NotFoundError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.StatusCode = StatusCode.NOT_FOUND;
  }
}

module.export = NotFoundError;
