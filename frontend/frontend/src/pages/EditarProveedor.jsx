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
    watch,
    setValue,
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

  // Lógica para los dias de reparto
  const diasDeLaSemana = [
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
    "Domingo",
  ];

  // Miramos el estado actual de 'diasReparto' como array (viene como string separado por comas)
  const diasSeleccionados = watch("diasReparto")?.split(",") || [];

  const toggleDia = (dia) => {
    const actual = new Set(diasSeleccionados); // Usamos set para evitar duplicados
    // Si el dia ya está seleccionado, lo quitamos; si no, lo agregamos
    if (actual.has(dia)) {
      actual.delete(dia);
    } else {
      actual.add(dia);
    }
    setValue("diasReparto", Array.from(actual).join(",")); // Actualizamos el valor del campo
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
                className={`form-control ${
                  errors.nombreEmpresa ? "is-invalid" : ""
                }`}
                {...register("nombreEmpresa", {
                  required: "Campo obligatorio",
                })}
              />
              {errors.nombreEmpresa && (
                <div className="invalid-feedback">
                  {errors.nombreEmpresa.message}
                </div>
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

            <div className="mb-3">
              <label className="form-label">Días de reparto</label>
              <div className="d-flex flex-wrap gap-2">
                {diasDeLaSemana.map((dia) => (
                  <div className="form-check" key={dia}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={`dia-${dia}`}
                      checked={diasSeleccionados.includes(dia)}
                      onChange={() => toggleDia(dia)}
                    />
                    <label className="form-check-label" htmlFor={`dia-${dia}`}>
                      {dia}
                    </label>
                  </div>
                ))}
              </div>
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
