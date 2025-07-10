import ProveedorRepository from "../repositories/ProveedorRepository.js";

class ProveedorService {
    async getProveedores() {
        return ProveedorRepository.getTodos();
    }

    async getProveedorPorId(id) {
        return ProveedorRepository.obtenerPorId(id);
    }

    async crearProveedor(datos) {
        return ProveedorRepository.crear(datos);
    }

    async actualizarProveedor(id, datos) {
        return ProveedorRepository.actualizar(id, datos);
    }

    async eliminarProveedor(id) {
        return ProveedorRepository.eliminar(id);
    }
}

export default new ProveedorService();
// This service provides methods to interact with the ProveedorRepository, allowing for CRUD operations on Proveedor entities.