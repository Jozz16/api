import { Sequelize } from "sequelize";
import {User} from './user.js';
import db from "../connection-db.js";

export const Publicacion = db.define(
    "Publicacion",{
        nombreProducto: {
            type: Sequelize.STRING,
            allowNull: false
        },
        Titulo: {
            type: Sequelize.STRING,
            allowNull: false
        },
        url: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        descripcion: {
            type: Sequelize.STRING,
            allowNull: false
        },
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        }
    
    })




User.hasMany(Publicacion);
Publicacion.belongsTo(User);


export default  Publicacion ;