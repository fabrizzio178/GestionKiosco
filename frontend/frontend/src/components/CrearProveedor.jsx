import { useForm } from "react-hook-form";
import { crearProveedor } from "../services/proveedoreService";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function CrearProveedor() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await crearProveedor(data);
      alert("Proveedor creado correctamente");
      navigate("/");
    } catch {
      alert("Error al crear proveedor");
    }
  };

  useEffect(() => {
  setTimeout(() => {
    window.dispatchEvent(new Event("resize"));
  }, 100);
}, []);

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">Crear Nuevo Proveedor</h4>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label className="form-label">Nombre de la Empresa</label>
              <input
                className={`form-control ${errors.nombreEmpresa ? "is-invalid" : ""}`}
                {...register("nombreEmpresa", { required: true })}
              />
              {errors.nombreEmpresa && <div className="invalid-feedback">Este campo es obligatorio</div>}
            </div>

            <div className="mb-3">
              <label className="form-label">Teléfono</label>
              <input
                className={`form-control ${errors.telefono ? "is-invalid" : ""}`}
                {...register("telefono", { required: true })}
              />
              {errors.telefono && <div className="invalid-feedback">Este campo es obligatorio</div>}
            </div>

            <button className="btn btn-success" type="submit">
              <i className="bi bi-check-circle me-1"></i> Guardar
            </button>
            <button className="btn btn-secondary ms-2" type="button" onClick={() => navigate(-1)}>
              Cancelar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
