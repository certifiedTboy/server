const {
  HttpException,
  ACCESS_TOKEN_EXPIRES_IN,
  REFRESH_TOKEN_EXPIRES_IN,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
} = require("../lib");
const { checkUserExists } = require("./user-services");
const { comparePassword } = require("../helpers/password");
const { generateJWT } = require("../helpers/jwt");

const login = async (email, password) => {
  const user = await checkUserExists({ email });

  if (!user.isVerified) {
    // perfom certain actions to ease the user experience of the user
    throw new HttpException("your account is not verified", 403);
  }

  const passwordIsValid = await comparePassword(password, user.password);

  if (!passwordIsValid) {
    throw new HttpException("invalid credentials", 403);
  }

  const payload = {
    id: user._id.toString(),
    email: user.email,
  };

  // generate jwt tokens
  const accessToken = generateJWT(
    ACCESS_TOKEN_SECRET,
    payload,
    ACCESS_TOKEN_EXPIRES_IN,
  );

  const refreshToken = generateJWT(
    REFRESH_TOKEN_SECRET,
    payload,
    REFRESH_TOKEN_EXPIRES_IN,
  );

  return { accessToken, refreshToken };
};

const newAccessToken = async (id, email) => {
  const user = await checkUserExists({ _id: id });

  const payload = { id: user?._id.toString(), email: user?.email };

  const accessToken = generateJWT(
    ACCESS_TOKEN_SECRET,
    payload,
    ACCESS_TOKEN_EXPIRES_IN,
  );

  const refreshToken = generateJWT(
    REFRESH_TOKEN_SECRET,
    payload,
    REFRESH_TOKEN_EXPIRES_IN,
  );

  return { accessToken, refreshToken };
};

module.exports = { login, newAccessToken };
