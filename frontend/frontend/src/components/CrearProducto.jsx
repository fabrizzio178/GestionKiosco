import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { crearProducto, importarCSV } from "../services/productosService";
import { useEffect } from "react";

export default function FormularioProducto() {
  const { proveedorId } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await crearProducto({
        ...data,
        proveedorId: parseInt(proveedorId),
        precioMenor: parseFloat(data.precioMenor),
        precioMayor: parseFloat(data.precioMayor),
      });
      alert("Producto creado correctamente");
      navigate(`/proveedores/${proveedorId}/productos`);
    } catch (err) {
      alert("Error al crear producto");
    }
  };

  const handleCSV = async (e) => {
    const archivo = e.target.files[0];
    if (!archivo) return;

    const formData = new FormData();
    formData.append("archivo", archivo);

    try {
      const response = await importarCSV(formData);
      alert("Importación exitosa");
      document.getElementById("fileInput").value = null;

      // Si estás en una pantalla donde se muestra la tabla, recargala acá
      // cargarProductosDelProveedor();
    } catch (error) {
      console.error("Error al importar CSV:", error);
      alert("Error al importar el archivo CSV");
    }
  };

  // Evita que los inputs se "cuelguen" en algunos navegadores al usar animaciones o efectos
  useEffect(() => {
    const timer = setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Agregar Producto</h5>

          <div className="d-flex gap-2">
            <button
              className="btn btn-light btn-sm"
              onClick={() => navigate(-1)}
            >
              <i className="bi bi-arrow-left"></i> Volver
            </button>

            <button
              className="btn btn-success btn-sm"
              onClick={() => document.getElementById("fileInput").click()}
            >
              <i className="bi bi-upload me-1"></i> Importar desde CSV
            </button>
          </div>

          <input
            type="file"
            id="fileInput"
            accept=".csv"
            style={{ display: "none" }}
            onChange={handleCSV}
          />
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label className="form-label">Nombre del Producto</label>
              <input
                className={`form-control ${
                  errors.nombreProducto ? "is-invalid" : ""
                }`}
                {...register("nombreProducto", {
                  required: "Este campo es obligatorio",
                })}
              />
              {errors.nombreProducto && (
                <div className="invalid-feedback">
                  {errors.nombreProducto.message}
                </div>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label">Precio por Unidad</label>
              <input
                type="number"
                step="0.01"
                className={`form-control ${
                  errors.precioMenor ? "is-invalid" : ""
                }`}
                {...register("precioMenor", {
                  required: "Ingrese un precio",
                  min: { value: 0, message: "Debe ser positivo" },
                })}
              />
              {errors.precioMenor && (
                <div className="invalid-feedback">
                  {errors.precioMenor.message}
                </div>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label">Precio por Mayor</label>
              <input
                type="number"
                step="0.01"
                className={`form-control ${
                  errors.precioMayor ? "is-invalid" : ""
                }`}
                {...register("precioMayor", {
                  required: "Ingrese un precio",
                  min: { value: 0, message: "Debe ser positivo" },
                })}
              />
              {errors.precioMayor && (
                <div className="invalid-feedback">
                  {errors.precioMayor.message}
                </div>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label">Marca</label>
              <input
                type="text"
                className="form-control"
                {...register("marca")}
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
