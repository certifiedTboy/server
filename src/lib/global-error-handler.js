const globalErrorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  if (message === "jwt expired") {
    return res.status(401).json({ error: message, status: 401 });
  }

  res.status(statusCode).json({ error: message, status: statusCode });
};

module.exports = { globalErrorHandler };
