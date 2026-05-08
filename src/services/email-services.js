const createTransport = require("../helpers/smtp");
const { APP_EMAIL } = require("../lib");

const sendVerificationEmail = async (email, otp) => {
  const transport = await createTransport();

  try {
    await transport.sendMail({
      to: email,
      from: APP_EMAIL,
      subject: "Account Verification",
      html: `<h1> ${otp} </h1>`,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { sendVerificationEmail };
