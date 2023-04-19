import Sequelize from "sequelize";

const dbConfig = {
  username: "postgres",
  password: "Catateamo123",
  database: "postgres",
  host: "db.vaguzihkidgsfbfwbiei.supabase.co",
  port: "5432",
  dialect: "postgres",
  logging: false,
};
const db = new Sequelize(dbConfig);

export default db;
