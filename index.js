import express from "express";
import cors from "cors";
import routerEmail from "./src/routes/email.routes.js";
import errorHandler from "./src/middleware/errorHandler.js";
import error404Handler from "./src/middleware/error404Handler.js";
import { PORT } from "./src/config/config.js";
import morgan from "morgan";

const app = express();

app.disable("x-powered-by");
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://portafolio-jhunior-ccora.vercel.app",
    ],
  })
);
app.use(express.json());
app.use(morgan("dev"));

app.use("/email", routerEmail);

// Middleware para un error 404
app.use(error404Handler);

// Middleware para manejar errores
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
