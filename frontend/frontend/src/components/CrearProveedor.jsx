import { useForm } from "react-hook-form";
import { crearProveedor } from "../services/proveedoreService";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function CrearProveedor() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();
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
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">Crear Nuevo Proveedor</h4>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label className="form-label">Nombre de la Empresa</label>
              <input
                className={`form-control ${
                  errors.nombreEmpresa ? "is-invalid" : ""
                }`}
                {...register("nombreEmpresa", { required: true })}
              />
              {errors.nombreEmpresa && (
                <div className="invalid-feedback">
                  Este campo es obligatorio
                </div>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label">Teléfono</label>
              <input
                className={`form-control ${
                  errors.telefono ? "is-invalid" : ""
                }`}
                {...register("telefono", { required: true })}
              />
              {errors.telefono && (
                <div className="invalid-feedback">
                  Este campo es obligatorio
                </div>
              )}
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

            <button className="btn btn-success" type="submit">
              <i className="bi bi-check-circle me-1"></i> Guardar
            </button>
            <button
              className="btn btn-secondary ms-2"
              type="button"
              onClick={() => navigate(-1)}
            >
              Cancelar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
