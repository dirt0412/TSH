"use strict";
exports.errorHandler = (err, req, res, next) => {
  console.log(res.headersSent);
  if (res.headersSent) {
    return next(err);
  }
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
};
