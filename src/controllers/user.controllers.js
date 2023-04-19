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
    console.log(req.body)
     const {name, email, password} = req.body;
     const newUser = await User.create({
      name:name,
      email:email,
      password:password
     });
   res.status(201).json(newUser.rows)
  } catch (error) {
    console.error(error.message);
  }
};

// export const insertUser = async (req, res) => {
//     const NewUser = await sequelize.query("insert into ")
// }
