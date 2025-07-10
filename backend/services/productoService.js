import ProductoRepository from "../repositories/ProductoRepository.js";
import ProveedorRepository from "../repositories/ProveedorRepository.js";

class ProductoService {
    async getProductos() {
        return ProductoRepository.getTodos();
    }

    async getProductosConProveedor() {
        return ProductoRepository.getTodosConProveedor();
    }

    async getProductoPorId(id) {
        return ProductoRepository.obtenerPorId(id);
    }

    async crearProducto(datos) {
        const proveedorExiste = await ProveedorRepository.obtenerPorId(datos.proveedorId);
        if (!proveedorExiste) {
            throw new Error("Proveedor no encontrado");
        }
        return ProductoRepository.crear(datos);
    }

    async actualizarProducto(id, datos) {
        return ProductoRepository.actualizar(id, datos);
    }

    async eliminarProducto(id) {
        return ProductoRepository.eliminar(id);
    }

    async buscarFiltrados(nombre = "", diaReparto = "") {
        return ProductoRepository.buscarFiltrados(nombre, diaReparto);
    }
}

export default new ProductoService();
