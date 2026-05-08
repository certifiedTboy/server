const User = require("../models/user-model");
const { HttpException } = require("../lib");
const { hashPassword } = require("../helpers/password");
const { generateOtp } = require("../helpers/code-generator");
const { sendVerificationEmail } = require("../services/email-services");

const createUser = async (userData) => {
  const user = new User({
    ...userData,
    otp: generateOtp(),
    otpExpiresIn: new Date(Date.now() + 15 * 60 * 1000),
    password: await hashPassword(userData.password),
  });

  await user.save();

  if (!user) {
    throw new HttpException("user creation failed", 400);
  }
  // await sendVerificationEmail(user.email, user.otp);

  return user;
};

const checkUserExists = async (query) => {
  const userExist = await User.findOne(query).select(
    "-__v -otp -otpExpiresIn -createdAt -updatedAt",
  );

  if (!userExist) {
    throw new HttpException("user not found", 404);
  }

  return userExist;
};

const verifyAccount = async (otp) => {
  const user = await checkUserExists({ otp });

  if (user.otpExpiresIn < Date.now()) {
    // decide to do something creative
    /**
     * for example
     * you can decide to send a new otp to the user
     * you can also decide to delete the user's account and request they recrete it
     */
    throw new HttpException("otp expired", 400);
  }

  user.isVerified = true;
  user.otp = null;
  user.otpExpiresIn = null;

  await user.save();

  return user;
};

module.exports = { createUser, verifyAccount, checkUserExists };
