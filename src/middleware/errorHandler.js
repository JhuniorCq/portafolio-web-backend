const errorHandler = (error, req, res, next) => {
  res.status(error.statusCode ?? 500).json({
    success: false,
    message: error.message ?? "Error interno del servidor",
  });
};

export default errorHandler;
