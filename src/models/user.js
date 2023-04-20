// import {DataTypes, Model } from 'sequelize';
import { Sequelize } from "sequelize";
// import { config } from "../config-db.json" assert{type: "json"};
import db from "../connection-db.js";




export const User = db.define(
  "User",
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    tipoRol: {
      type: Sequelize.ENUM('admin', 'user'),
      defaultValue: 'user',
      allowNull: false,
    }
  }
);
  User.sync()
