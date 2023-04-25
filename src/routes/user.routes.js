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

router.post("/register/v1", insertUser);

router.get("/todas-las-publicaciones/autor", allPublicacionesConAutor);

router.get("/todas-las-publicaciones", allPublicaciones);

router.get("/usuarios", allUsers);

router.get('/buscar-usuarios/:id', obtenerUsuarioPorId);

router.post("/login/v1", loginUser);

router.post("/publicacion/v1", createPublicacion);

router.put("/actualizar-usuario-buscado/:id", actualizarUsuarioBuscado);

router.delete('/eliminar-usuario/:id', eliminarUsuario);

router.delete('/eliminar-publicacion/:id', eliminarPublicacion);



export default router;
