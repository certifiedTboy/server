const notFoundError = (req, res, next) => {
  res.status(404).json({
    error: "enpoint does not exist",
    path: req.originalUrl,
    method: req.method,
  });
};

module.exports = { notFoundError };
