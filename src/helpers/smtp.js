const {
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URL,
  REFRESH_TOKEN,
  APP_EMAIL,
} = require("../lib");

const createTransport = async () => {
  const nodemailer = require("nodemailer");
  const { google } = require("googleapis");

  const oauthClient = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URL,
  );

  oauthClient.setCredentials({ refresh_token: REFRESH_TOKEN });

  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: APP_EMAIL,
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      refreshToken: REFRESH_TOKEN,
      accessToken: await oauthClient.getAccessToken(),
    },
  });

  return transport;
};

module.exports = createTransport;
