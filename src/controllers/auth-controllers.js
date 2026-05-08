const { login, newAccessToken } = require("../services/auth-services");
const { ResponseHandler } = require("../lib");

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const result = await login(email, password);

    ResponseHandler.auth(res, result, "login successful");
  } catch (error) {
    next(error);
  }
};

const getNewAcessToken = async (req, res, next) => {
  try {
    const { id, email } = req.user;

    const result = await newAccessToken(id, email);

    ResponseHandler.auth(res, result, "success");
  } catch (error) {
    next(error);
  }
};

module.exports = { loginUser, getNewAcessToken };
