const perfectExpressSanitizer = require("perfect-express-sanitizer");

const sanitizeData = (req, res, next) => {
  const options = { xss: true, noSql: true, sql: true, level: 5 };

  if (req?.body?.password || req?.body?.confirmPassword) {
    const data = {
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
    };

    delete req?.body?.password;
    delete req?.body?.confirmPassword;

    perfectExpressSanitizer.sanitize.prepareSanitize(req.body, options);

    req.body = { ...req.body, ...data };
  } else {
    perfectExpressSanitizer.sanitize.prepareSanitize(req.body, options);
  }

  next();
};

module.exports = { sanitizeData };
