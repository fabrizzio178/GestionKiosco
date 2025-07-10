import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import {
  actualizarProveedor,
  getProveedores,
} from "../services/proveedoreService";

export default function EditarProveedor() {
  const { proveedorId } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Cargar datos del proveedor al montar
  useEffect(() => {
    const cargarProveedor = async () => {
      try {
        const todos = await getProveedores();
        const proveedor = todos.find((p) => p.id == proveedorId);
        if (proveedor) {
          reset(proveedor);
        } else {
          alert("Proveedor no encontrado");
          navigate("/"); // Redirige si no existe
        }
      } catch (error) {
        alert("Error al cargar proveedor");
      }
    };
    cargarProveedor();
  }, [proveedorId, reset, navigate]);

  const onSubmit = async (datos) => {
    try {
      await actualizarProveedor(proveedorId, datos);
      alert("Proveedor actualizado correctamente");
      navigate(-1);
    } catch (error) {
      alert("Error al actualizar proveedor");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-header bg-warning d-flex justify-content-between align-items-center">
          <h4 className="mb-0 text-dark">Editar Proveedor</h4>
          <button className="btn btn-dark btn-sm" onClick={() => navigate(-1)}>
            <i className="bi bi-arrow-left"></i> Volver
          </button>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label className="form-label">Nombre de Empresa</label>
              <input
                type="text"
                className={`form-control ${errors.nombreEmpresa ? "is-invalid" : ""}`}
                {...register("nombreEmpresa", { required: "Campo obligatorio" })}
              />
              {errors.nombreEmpresa && (
                <div className="invalid-feedback">{errors.nombreEmpresa.message}</div>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label">Teléfono</label>
              <input
                type="text"
                className="form-control"
                {...register("telefono")}
              />
            </div>

            <button type="submit" className="btn btn-warning">
              <i className="bi bi-save me-1"></i> Guardar cambios
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
