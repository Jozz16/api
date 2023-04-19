import { Router } from "express";
import { allUsers, insertUser } from "../controllers/user.controllers.js";
const router = Router();

router.post("/register/v1", insertUser);

router.get("/:email", (req, res) => {
  // lógica para manejar la ruta "/:email"
  res.send("hola get email");
});

router.get("/", allUsers);

router.put("/:email", (req, res) => {
  // lógica para manejar la ruta "/:email"
  res.send("hola modificando user");
});

router.delete("/:email", (req, res) => {
  // lógica para manejar la ruta "/:email"
  res.send("hola eliminando user");
});

export default router;
