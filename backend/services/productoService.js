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
    const proveedorExiste = await ProveedorRepository.obtenerPorId(
      datos.proveedorId
    );
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

  async importarCSV(productos) {
    const resultados = [];

    for (const prod of productos) {
      try {
        const proveedorId = parseInt(prod.proveedorId);
        const proveedor = await ProveedorRepository.obtenerPorId(proveedorId);
        if (!proveedor) {
          resultados.push({
            producto: prod.nombreProducto,
            estado: "Proveedor no encontrado",
          });
          continue;
        }

        const datos = {
          nombreProducto: prod.nombreProducto,
          marca: prod.marca,
          precioMayor: parseFloat(prod.precioMayor),
          precioMenor: parseFloat(prod.precioMenor),
          proveedorId: proveedorId,
        };

        await ProductoRepository.crear(datos);
        resultados.push({
          producto: prod.nombreProducto,
          estado: "Importado con éxito",
        });
      } catch (error) {
        resultados.push({
          producto: prod.nombreProducto,
          estado: "Error: " + error.message,
        });
      }
    }

    return resultados;
  }
}

export default new ProductoService();
