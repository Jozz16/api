import  {User}  from "../models/user.js";
import  {Publicacion}  from "../models/publication.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';


export const allUsers = async (req, res) => {
  try {
     const users = await User.findAll();
    

   res.status(200).json(users)
  } catch (error) {
    console.error(error.message);
  }
};
export const insertUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ error: 'El correo electrónico ya está en uso' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword
    });

    res.status(201).json(newUser.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Ha ocurrido un error' });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ 
      where: { email },
    });
    
    if (!user) {
      return res.status(401).json({ error: 'Correo electrónico o contraseña incorrectos' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Correo electrónico o contraseña incorrectos' });
    }
    const rolUser = user.tipoRol
    
    const token = jwt.sign({ email: user.email, id: user.id, rol: user.tipoRol }, 'cj19775', { expiresIn: '1h' });
    res.status(200).json({ message: 'Inicio de sesión exitoso', token, rolUser});
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Ha ocurrido un error' });
  }
};

export const createPublicacion = async (req, res) => {
  try {
    // Obtener los datos de la publicación desde el cuerpo de la solicitud
    const { nombreProducto, Titulo, url, descripcion } = req.body;
    const {token} = req.headers;
    
      const decodedToken = jwt.verify(token, 'cj19775');
      console.log('Token decodificado:', decodedToken);
    // Obtener el usuario actual a través del ID almacenado en la sesión
    const userId = decodedToken.id;
    const user = await User.findByPk(userId);
    
    if (!user) {
      return res.status(401).json({ error: 'No estás autorizado para hacer publicaciones' });
    }

    // Crear una nueva publicación en la base de datos y asociarla con el usuario actual
    const nuevaPublicacion = await Publicacion.create({
      nombreProducto,
      Titulo,
      url,
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
    const publicaciones = await Publicacion.findAll();

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

export const obtenerUsuarioPorId = async (req, res) => {
  try {
    const usuarioId = req.params.id;
    const usuario = await User.findOne({ where: { id: usuarioId }});
    const roles = [
      {
        rol: "admin",
        text: "admin"
      },
      {
        rol: "user",
        text: "user"
      }
    ]
    
    res.status(200).json({ usuario, roles });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Ha ocurrido un error' });
  }
};
export const actualizarUsuarioBuscado = async (req, res) => {
  try {
    const usuarioId = req.params.id;
    console.log(usuarioId,"--------------------------------------")
    const { name, email, tipoRol } = req.body;

    const usuario = await User.findOne({ where: { id: usuarioId }});
    await usuario.update({ name, email, tipoRol });

    res.status(200).json({ message: 'Usuario actualizado exitosamente' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Ha ocurrido un error' });
  }
};
export const eliminarUsuario = async (req, res) => {
  try {
    const usuarioId = req.params.id;
    const usuario = await User.findOne({ where: { id: usuarioId }});
    await usuario.destroy();

    res.status(200).json({ message: 'Usuario eliminado exitosamente' });
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


