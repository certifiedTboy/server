const {
  createUser,
  verifyAccount,
  checkUserExists,
} = require("../services/user-services");
const { ResponseHandler } = require("../lib");

const createNewUser = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const result = await createUser({
      firstName,
      lastName,
      email,
      password,
    });

    ResponseHandler.created(
      res,
      { otp: result.otp },
      "user created successfully",
    );
  } catch (error) {
    next(error);
  }
};

const verifyUserAccount = async (req, res, next) => {
  try {
    const { otp } = req.body;

    const result = await verifyAccount(otp);

    ResponseHandler.ok(res, null, "account verified successfully");
  } catch (error) {
    next(error);
  }
};

const getCurrentUser = async (req, res, next) => {
  try {
    const { id } = req.user;

    const user = await checkUserExists({ _id: id });

    ResponseHandler.ok(res, user, "user retrieved successfully");
  } catch (error) {
    next(error);
  }
};

module.exports = { createNewUser, verifyUserAccount, getCurrentUser };
