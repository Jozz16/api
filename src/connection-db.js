import * as dotenv from 'dotenv' 
dotenv.config()
import Sequelize from "sequelize";

const dbConfig = {
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  host: "db.vaguzihkidgsfbfwbiei.supabase.co",
  port: process.env.DB_PORT,
  dialect: "postgres",
  logging: false,
};
const db = new Sequelize(dbConfig);

export default db;
