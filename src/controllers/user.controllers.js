import  {User}  from "../models/user.js";
import bcrypt from 'bcryptjs';


export const allUsers = async (req, res) => {
  try {
     const users = await User.findAll();
    

   res.status(200).json(users.rows)
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
      attributes: ['password'] 
    });

    if (!user) {
      return res.status(401).json({ error: 'Correo electrónico o contraseña incorrectos' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Correo electrónico o contraseña incorrectos' });
    }

    res.status(200).json({ message: 'Inicio de sesión exitoso' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Ha ocurrido un error' });
  }
}





