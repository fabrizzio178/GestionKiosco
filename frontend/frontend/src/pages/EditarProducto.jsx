import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getProductosYProveedores,
  actualizarProducto,
} from "../services/productosService";

export default function EditarProducto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [producto, setProducto] = useState(null);
  const [nombreProducto, setNombreProducto] = useState("");
  const [precio, setPrecio] = useState("");

  useEffect(() => {
    const fetchProducto = async () => {
      const productos = await getProductosYProveedores();
      const encontrado = productos.find((p) => p.id === parseInt(id));
      if (encontrado) {
        setProducto(encontrado);
        setNombreProducto(encontrado.nombreProducto);
        setPrecio(encontrado.precio);
      }
    };
    fetchProducto();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await actualizarProducto(id, {
        nombreProducto,
        precio,
        proveedorId: producto.proveedorId,
      });
      alert("Producto actualizado correctamente");
      navigate(`/proveedores/${producto.proveedorId}/productos`);
    } catch (err) {
      alert("Error al actualizar producto");
    }
  };

  if (!producto)
    return <p className="text-center mt-5">Cargando producto...</p>;

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-header bg-warning text-dark d-flex justify-content-between">
          <h5 className="mb-0">Editar Producto</h5>
          <button
            className="btn btn-light btn-sm"
            onClick={() =>
              navigate(`/proveedores/${producto.proveedorId}/productos`)
            }
          >
            <i className="bi bi-arrow-left"></i> Volver
          </button>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Nombre del Producto</label>
              <input
                className="form-control"
                value={nombreProducto}
                onChange={(e) => setNombreProducto(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Precio</label>
              <input
                type="number"
                step="0.01"
                className="form-control"
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
              />
            </div>

            <button className="btn btn-warning" type="submit">
              <i className="bi bi-save me-1"></i> Actualizar Producto
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
