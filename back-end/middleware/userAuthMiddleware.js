const jwt = require("jsonwebtoken");
const { UnAuthenticatedError } = require("../errors/index");

const userAuthMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnAuthenticatedError("Authentication Invalid");
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: payload.userId };
    console.log(payload.userId);
    next();
  } catch (error) {
    throw new UnAuthenticatedError("Authentication Invalid");
  }
};

module.exports = userAuthMiddleware;
