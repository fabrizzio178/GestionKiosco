import RepositorioBase from "./RepositorioBase.js";
import Proveedor from "../models/Proveedor.js";

class ProveedorRepository extends RepositorioBase {
    constructor(){
        super(Proveedor);
    }

}

export default new ProveedorRepository();