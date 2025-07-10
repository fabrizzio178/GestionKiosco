import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { crearProducto } from "../services/productosService";

export default function FormularioProducto() {
  const { proveedorId } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await crearProducto({ ...data, proveedorId: parseInt(proveedorId) });
      alert("Producto creado correctamente");
      navigate(`/proveedores/${proveedorId}/productos`);
    } catch (err) {
      alert("Error al crear producto");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-header bg-primary text-white d-flex justify-content-between">
          <h5 className="mb-0">Agregar Producto</h5>
          <button
            className="btn btn-light btn-sm"
            onClick={() => navigate(-1)}
          >
            <i className="bi bi-arrow-left"></i> Volver
          </button>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label className="form-label">Nombre del Producto</label>
              <input
                className={`form-control ${errors.nombreProducto && "is-invalid"}`}
                {...register("nombreProducto", { required: true })}
              />
              {errors.nombreProducto && (
                <div className="invalid-feedback">Este campo es obligatorio</div>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label">Precio</label>
              <input
                type="number"
                step="0.01"
                className="form-control"
                {...register("precio")}
              />
            </div>

            <button className="btn btn-success" type="submit">
              <i className="bi bi-save me-1"></i> Guardar Producto
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
