import { Router } from "express";
import { allUsers, insertUser, loginUser,createPublicacion, allPublicaciones, allPublicacionesConAutor } from "../controllers/user.controllers.js";
const router = Router();
import sequelize from '../connection-db.js';
// import { Sequelize} from 'sequelize';

(async () => {
  await sequelize.sync();
  console.log('Tabla Publicacion sincronizada');
})();

router.post("/register/v1", insertUser);

router.get("/todas-las-publicaciones/autor", allPublicacionesConAutor);

router.get("/todas-las-publicaciones", allPublicaciones);

router.get("/", allUsers);

router.post("/login/v1", loginUser);

router.post("/publicacion/v1", createPublicacion);





router.get("/:email", (req, res) => {
  // lógica para manejar la ruta "/:email"
  res.send("hola get email");
});
router.put("/:email", (req, res) => {
  // lógica para manejar la ruta "/:email"
  res.send("hola modificando user");
});

router.delete("/:email", (req, res) => {
  // lógica para manejar la ruta "/:email"
  res.send("hola eliminando user");
});

export default router;
