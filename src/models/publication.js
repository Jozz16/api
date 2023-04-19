import {DataTypes, Model } from 'sequelize';
import sequelize from "../services/connection-db.js";
import User from './user.js';

class Publicacion extends Model{

}
Publicacion.init({

    nombreProducto: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    }},
    {
        sequelize,
        modelName: "Publicacion",
        tableName: "publicaciones",
        underscored: true,
    }
)


User.hasMany(Publicacion);
Publicacion.belongsTo(User);


export default  Publicacion ;