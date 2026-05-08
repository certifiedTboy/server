const { body, validationResult } = require("express-validator");
const { HttpException } = require("../lib");

/**
 * validation rules for creating a new user
 * using express validator
 */
const createUserValidationRules = [
  body("firstName")
    .notEmpty()
    .withMessage("First name is required")
    .isLength({ min: 3 }),
  body("lastName")
    .notEmpty()
    .withMessage("Last name is required")
    .isLength({ min: 3 }),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email address"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .matches(/^.{8,}$/)
    .withMessage("Password must be at least 8 characters long")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[0-9]/)
    .withMessage("Password must contain at least one number")
    .matches(/[^A-Za-z0-9]/)
    .withMessage("Password must contain at least one special character"),

  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Passwords do not match");
    }
    return true;
  }),
];

const verifyUserValidationRules = [
  body("otp")
    .notEmpty()
    .withMessage("otp is required")
    .matches(/^[0-9]{6}$/)
    .withMessage("Invalid otp"),
];

/**
 * check validation errors
 */

const checkValidationErrors = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new HttpException(errors.array()[0].msg, 400);
  }

  next();
};

module.exports = {
  checkValidationErrors,
  createUserValidationRules,
  verifyUserValidationRules,
};
