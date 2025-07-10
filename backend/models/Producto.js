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
  precio: {
    type: DataTypes.FLOAT,
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
