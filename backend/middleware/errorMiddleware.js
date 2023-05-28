export const notFoundRoute = (req, res) => {
  res.status(400).json({ msg: "Route does not exist!" });
};

export const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  if (err.name === "CastError" && err.kind === "ObjectID") {
    statusCode = 404;
    message = "Resource not found!";
  }

  res.status(statusCode).json({
    message: message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};
