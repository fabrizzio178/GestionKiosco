import { DataTypes, Model } from "sequelize";
import sequelize from "../db.js";

class Proveedor extends Model {}

Proveedor.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombreEmpresa: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  telefono: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  diasReparto:{
    type: DataTypes.STRING,
    allowNull: true,
  }
}, {
  sequelize,
  modelName: "Proveedor",
  tableName: "Proveedores",
  timestamps: true,
});

export default Proveedor;
