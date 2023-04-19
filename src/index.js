import express from "express";
import morgan from "morgan";
import router from "./routes/user.routes.js";
import { config } from "dotenv";
const puerto = 3002
const app = express();

//setting
app.set("port", config.PORT);
app.use(morgan("dev"));
app.use(express.json());
app.use(router);

app.listen(puerto, () => {
    console.log('servicio levantado');
  });
export default app;