import RepositorioBase from "./RepositorioBase.js";
import Producto from "../models/Producto.js";
import Proveedor from "../models/Proveedor.js";
import { Op } from "sequelize";

class ProductoRepository extends RepositorioBase {
    constructor(){
        super(Producto);
    }

    async getTodosConProveedor() {
        return this.model.findAll({
            include:{
                model: Proveedor,
                as: "proveedor",
                attributes: ["nombreEmpresa"] // Selecciona los campos que necesitas del proveedor
            },
            order: [["nombreProducto", "ASC"]] // Ordena por nombre de producto
        })
    }

    async buscarFiltrados(nombre="", diaReparto=""){
        return this.model.findAll({
            where:{
                nombreProducto: { [Op.like]: `%${nombre}%` }
            },
            include: {
                model: Proveedor,
                as: "proveedor",
                attributes: ["nombreEmpresa", "diasReparto"],
                where: diaReparto ? {
                    diasReparto: { [Op.like]: `%${diaReparto}%` }
                }: undefined // Si no hay filtro, no lo aplica
            }


        })
    }

    async eliminarTodos(proveedorId){
        return this.model.destroy({
            where: { proveedorId },
        });
    }

}

export default new ProductoRepository();