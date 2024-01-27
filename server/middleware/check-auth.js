const jwt = require("jsonwebtoken");
const HttpError = require("../models/http-error");

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") return next();

  try {
    const token = req.headers.authorization.split(" ")[1]; // 'Bearer TOKEN'
    if (!token) throw new Error("인증 실패!");

    const decodedToken = jwt.verify(token, "secret_dont_share");
    req.userData = { userId: decodedToken.userId };
    next();
  } catch (error) {
    return next(new HttpError("인증 실패!", 403));
  }
};
