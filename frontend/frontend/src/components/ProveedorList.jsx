import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getProveedores,
  eliminarProveedor,
} from "../services/proveedoreService.js";

export default function ProveedorList() {
  const [proveedores, setProveedores] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const cargarProveedores = async () => {
    try {
      const data = await getProveedores();
      setProveedores(data);
    } catch (error) {
      alert("Error al cargar proveedores");
    } finally {
      setLoading(false);
    }
  };

  const handleEliminar = async (id) => {
    if (window.confirm("¿Eliminar proveedor?")) {
      await eliminarProveedor(id);
      cargarProveedores();
    }
  };

  const verProductos = (proveedorId) => {
    navigate(`/proveedores/${proveedorId}/productos`);
  };

  useEffect(() => {
    cargarProveedores();
  }, []);

  return (
    <div className="container mt-5">
      <div className="card shadow-lg">
        <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">
          <h4 className="mb-0">Lista de Proveedores</h4>
          <button
            className="btn btn-success btn-sm"
            onClick={() => navigate("/crear-proveedor")}
          >
            <i className="bi bi-plus-circle me-1"></i> Crear Proveedor
          </button>
        </div>

        <div className="card-body">
          {loading ? (
            <div className="text-center my-4">
              <div className="spinner-border text-secondary" role="status">
                <span className="visually-hidden">Cargando...</span>
              </div>
              <p className="mt-2 text-muted">Cargando proveedores...</p>
            </div>
          ) : proveedores.length === 0 ? (
            <p className="text-muted">No hay proveedores cargados.</p>
          ) : (
            <table className="table table-hover align-middle">
              <thead className="table-dark">
                <tr>
                  <th>Empresa</th>
                  <th>Teléfono</th>
                  <th style={{ width: "220px" }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {proveedores.map((prov) => (
                  <tr key={prov.id}>
                    <td>{prov.nombreEmpresa}</td>
                    <td>{prov.telefono}</td>
                    <td>
                      <button
                        className="btn btn-primary btn-sm me-2"
                        onClick={() => verProductos(prov.id)}
                      >
                        <i className="bi bi-box-seam me-1"></i> Ver productos
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleEliminar(prov.id)}
                      >
                        <i className="bi bi-trash-fill me-1"></i> Eliminar
                      </button>
                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() =>
                          navigate(`/editar-proveedor/${prov.id}`)
                        }
                      >
                        <i className="bi bi-pencil-fill me-1"></i> Editar
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
