import RepositorioBase from "./RepositorioBase.js";
import Producto from "../models/Producto.js";
import Proveedor from "../models/Proveedor.js";

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
            }
        })

    }

}

export default new ProductoRepository();