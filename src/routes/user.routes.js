import { Router } from "express";
import { allUsers, insertUser, loginUser, obtenerUsuarioPorId, actualizarUsuarioBuscado, eliminarUsuario } from "../controllers/user.controllers.js";
import {createPublicacion, allPublicaciones, allPublicacionesConAutor, eliminarPublicacion } from "../controllers/publication.js";
const router = Router();
import sequelize from '../connection-db.js';
// import { Sequelize} from 'sequelize';

(async () => {
  await sequelize.sync();
  console.log('Tabla Publicacion sincronizada');
})();

router.get("/api/v1/usuarios", allUsers);
router.get('/api/v1/usuarios/:id', obtenerUsuarioPorId);
router.post("/api/v1/register", insertUser);
router.post("/api/v1/login", loginUser);
router.put("/api/v1/usuario/:id", actualizarUsuarioBuscado);
router.delete('/api/v1/usuario/:id', eliminarUsuario);



router.post("/api/v1/publicacion", createPublicacion);
router.get("/api/v1/publicaciones", allPublicaciones);
router.get("/api/v1/publicaciones/autor", allPublicacionesConAutor);
router.delete('/api/v1/publicacion/:id', eliminarPublicacion);



export default router;
