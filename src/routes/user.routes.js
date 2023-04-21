import { Router } from "express";
import { allUsers, insertUser, loginUser,createPublicacion, allPublicaciones, allPublicacionesConAutor, obtenerUsuarioPorId, actualizarUsuarioBuscado } from "../controllers/user.controllers.js";
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

router.get("/usuarios", allUsers);

router.get('/buscar-usuarios/:id', obtenerUsuarioPorId);

router.post("/login/v1", loginUser);

router.post("/publicacion/v1", createPublicacion);

router.put("/actualizar-usuario/:id", actualizarUsuarioBuscado);


router.delete("/:email", (req, res) => {
  // lógica para manejar la ruta "/:email"
  res.send("hola eliminando user");
});

export default router;
