const error404Handler = (req, res, next) => {
  try {
    throw new Error("Recurso no encontrado");
  } catch (error) {
    error.statusCode = 404;
    next(error);
  }
};

export default error404Handler;
