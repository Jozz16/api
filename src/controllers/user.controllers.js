// import  sequelize  from "../connection-db.js";
import  {User}  from "../models/user.js";
// import { Publicacion } from "../models/publication.js";


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
    
    const newUser = await User.create({
      name,
      email,
      password
    });
    
    res.status(201).json(newUser.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Ha ocurrido un error' });
  }
};

// export const insertUser = async (req, res) => {
//     const NewUser = await sequelize.query("insert into ")
// }
