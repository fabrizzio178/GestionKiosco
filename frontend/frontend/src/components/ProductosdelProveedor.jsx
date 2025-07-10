import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getProductos,
  getProductosYProveedores,
  eliminarProducto,
} from "../services/productosService";

export default function ProductosDelProveedor() {
  const { proveedorId } = useParams();
  const [productos, setProductos] = useState([]);
  const [nombreProveedor, setNombreProveedor] = useState("");
  const navigate = useNavigate();

  const cargarProductos = async () => {
    try {
      const todos = await getProductosYProveedores();
      const filtrados = todos.filter((p) => p.proveedorId == proveedorId);
      setProductos(filtrados);

      if (filtrados.length > 0) {
        setNombreProveedor(
          filtrados[0].proveedor?.nombreEmpresa || "Proveedor desconocido"
        );
      } else {
        setNombreProveedor("Proveedor sin productos");
      }
    } catch (error) {
      alert("Error al cargar productos");
    }
  };

  useEffect(() => {
    cargarProductos();
  }, [proveedorId]);

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-header bg-success text-white d-flex justify-content-between align-items-center">
          <h4 className="mb-0">Productos del Proveedor {nombreProveedor}</h4>
          <button className="btn btn-light btn-sm" onClick={() => navigate("/")}>
            <i className="bi bi-arrow-left"></i> Volver
          </button>
        </div>
        <div className="mb-3 text-end">
          <button
            className="btn btn-success"
            onClick={() =>
              navigate(`/proveedores/${proveedorId}/productos/crear`)
            }
          >
            <i className="bi bi-plus-circle me-1"></i> Agregar Producto
          </button>
        </div>

        <div className="card-body">
          {productos.length === 0 ? (
            <p className="text-muted">
              Este proveedor no tiene productos cargados.
            </p>
          ) : (
            <table className="table table-striped table-bordered">
              <thead className="table-success">
                <tr>
                  <th>Nombre del Producto</th>
                  <th>Precio ($)</th>
                  <th style={{ width: "160px" }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {productos.map((prod) => (
                  <tr key={prod.id}>
                    <td>{prod.nombreProducto}</td>
                    <td>${prod.precio}</td>
                    <td>
                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => navigate(`/productos/${prod.id}/editar`)}
                      >
                        <i className="bi bi-pencil-fill me-1"></i> Editar
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={async () => {
                          if (confirm("¿Eliminar producto?")) {
                            await eliminarProducto(prod.id); 
                            cargarProductos();
                          }
                        }}
                      >
                        <i className="bi bi-trash-fill me-1"></i> Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
