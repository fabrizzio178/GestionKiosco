import { DataTypes, Model } from "sequelize";
import sequelize from "../db.js";
import Proveedor from "./Proveedor.js";

class Producto extends Model {}

Producto.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombreProducto: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  precioMayor: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  precioMenor: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  marca: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
}, {
  sequelize,
  modelName: "Producto",
  tableName: "Productos",
  timestamps: true,
});

// Relación N:1 con Proveedor
Producto.belongsTo(Proveedor, {
  foreignKey: "proveedorId",
  as: "proveedor",
});

export default Producto;
