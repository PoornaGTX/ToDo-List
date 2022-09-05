class CustomAPIError extends Error {
  //Extends from javaScript Error class
  constructor(message) {
    super(message);
  }
}

module.exports = CustomAPIError;
