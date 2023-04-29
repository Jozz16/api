import  {User}  from "../models/user.js";
import  {Publicacion}  from "../models/publication.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Sequelize } from 'sequelize';



export const allUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    const countByRol = await User.findAll({
      attributes: ['tipoRol', [Sequelize.fn('COUNT', 'id'), 'count']],
      group: ['tipoRol']
    });
    res.status(200).json({ users, countByRol });
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




