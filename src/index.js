import express from "express";
import morgan from "morgan";
import router from "./routes/user.routes.js";
import { config } from "dotenv";
import bodyParser from 'body-parser';
const puerto = 3002
const app = express();


//setting
app.set("port", config.PORT);
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(router);
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb',parameterLimit: 5000 }));
app.use(express.json());

app.listen(puerto, () => {
    console.log('servicio levantado');
  });
export default app;