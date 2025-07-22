import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getProductosYProveedores,
  eliminarProducto,
  eliminarTodos,
} from "../services/productosService";

export default function ProductosDelProveedor() {
  const { proveedorId } = useParams();
  const [productos, setProductos] = useState([]);
  const [nombreProveedor, setNombreProveedor] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const productosPorPagina = 10;
  const navigate = useNavigate();

  const cargarProductos = async () => {
    try {
      const todos = await getProductosYProveedores();
      const filtrados = todos.filter((p) => p.proveedorId == proveedorId);
      setProductos(filtrados);
      setPaginaActual(1); 

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

  // Paginado
  const indiceUltimo = paginaActual * productosPorPagina;
  const indicePrimero = indiceUltimo - productosPorPagina;
  const productosAMostrar = productos.slice(indicePrimero, indiceUltimo);
  const totalPaginas = Math.ceil(productos.length / productosPorPagina);

  const cambiarPagina = (numero) => setPaginaActual(numero);
  const siguiente = () => {
    if (paginaActual < totalPaginas) setPaginaActual(paginaActual + 1);
  };
  const anterior = () => {
    if (paginaActual > 1) setPaginaActual(paginaActual - 1);
  };

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-header bg-success text-white d-flex justify-content-between align-items-center">
          <h4 className="mb-0">Productos del Proveedor {nombreProveedor}</h4>
          <button
            className="btn btn-light btn-sm"
            onClick={() => navigate("/")}
          >
            <i className="bi bi-arrow-left"></i> Volver
          </button>
        </div>

        <div className="mb-3 d-flex justify-content-end gap-2">
          <button
            className="btn btn-danger"
            onClick={async () => {
              if (confirm("¿Eliminar TODOS los productos de este proveedor?")) {
                try {
                  await eliminarTodos(proveedorId);
                  await cargarProductos();
                  alert("Todos los productos fueron eliminados");
                } catch (error) {
                  alert("Error al eliminar productos del proveedor");
                }
              }
            }}
          >
            <i className="bi bi-trash-fill me-1"></i> Eliminar Todos
          </button>

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
            <>
              <table className="table table-striped table-bordered">
                <thead className="table-success">
                  <tr>
                    <th>Nombre del Producto</th>
                    <th>Precio por Unidad($)</th>
                    <th>Precio por Mayor($)</th>
                    <th>Cantidad</th>
                    <th style={{ width: "160px" }}>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {productosAMostrar.map((prod) => (
                    <tr key={prod.id}>
                      <td>{prod.nombreProducto}</td>
                      <td>${prod.precioMenor}</td>
                      <td>${prod.precioMayor}</td>
                      <td>{prod.cantidad}</td>
                      <td>
                        <button
                          className="btn btn-warning btn-sm me-2"
                          onClick={() =>
                            navigate(`/productos/${prod.id}/editar`)
                          }
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

              {/* Paginación */}
              {totalPaginas > 1 && (
                <nav className="mt-3">
                  <ul className="pagination justify-content-center">
                    <li className={`page-item ${paginaActual === 1 ? "disabled" : ""}`}>
                      <button className="page-link" onClick={anterior}>
                        &laquo; Anterior
                      </button>
                    </li>
                    {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((num) => (
                      <li key={num} className={`page-item ${num === paginaActual ? "active" : ""}`}>
                        <button className="page-link" onClick={() => cambiarPagina(num)}>
                          {num}
                        </button>
                      </li>
                    ))}
                    <li className={`page-item ${paginaActual === totalPaginas ? "disabled" : ""}`}>
                      <button className="page-link" onClick={siguiente}>
                        Siguiente &raquo;
                      </button>
                    </li>
                  </ul>
                </nav>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
