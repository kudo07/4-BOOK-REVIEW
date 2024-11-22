export const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err); // Prevent duplicate responses
  }
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({ success: false, message });
};
