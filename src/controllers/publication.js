import  {Publicacion}  from "../models/publication.js";
import  {User}  from "../models/user.js";
import jwt from 'jsonwebtoken';



export const createPublicacion = async (req, res) => {
    try {
      // Obtener los datos de la publicación desde el cuerpo de la solicitud
      const { nombreProducto, Titulo, upload, descripcion } = req.body;
      const {token} = req.headers;    
        const decodedToken = jwt.verify(token, 'cj19775');
      // Obtener el usuario actual a través del ID almacenado en la sesión
      const userId = decodedToken.id;
      const user = await User.findByPk(userId);
      
      if (!user) {
        return res.status(401).json({ error: 'No estás autorizado para hacer publicaciones' });
      }
  
      const nuevaPublicacion = await Publicacion.create({
        nombreProducto,
        Titulo,
        url : upload,
        descripcion,
        UserId: user.id, // Agregar el ID de usuario a la nueva publicación
      });
  
      res.status(201).json(nuevaPublicacion);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Ha ocurrido un error' });
    }
  };

  export const allPublicaciones = async (req, res) => {
    try {
      const publicaciones = await Publicacion.findAll({
        order: [
          ['id', 'DESC']
        ],
        include: {
          model: User,
          attributes: ['name', 'email']
        }
      });
  
      res.status(200).json(publicaciones);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Ha ocurrido un error' });
    }
};

export const allPublicacionesConAutor = async (req, res) => {
    try {
      const publicaciones = await Publicacion.findAll({
              include: User
      });
      res.status(200).json(publicaciones);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Ha ocurrido un error' });
    }
  };

export const eliminarPublicacion = async (req, res) => {
    try {
      const postId = req.params.id;
      const post = await Publicacion.findOne({ where: { id: postId } });
      console.log(post,"-------------------")
      await post.destroy();
  
      res.status(200).json({ message: 'Publicación eliminada exitosamente' });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Ha ocurrido un error' });
    }
};