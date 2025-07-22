import { useState, useEffect } from "react";
import { buscarFiltrados } from "../services/productosService";
import { useNavigate } from "react-router-dom";

const diasSemana = [
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
  "Domingo",
];

export default function ComparadorProductos() {
  const [form, setForm] = useState({
    nombre: "",
    dia: "",
    orden: "",
  });

  const [resultados, setResultados] = useState([]);
  const [productoMasBarato, setProductoMasBarato] = useState(null);
  const [productoMasBaratoMenor, setProductoMasBaratoMenor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [paginaActual, setPaginaActual] = useState(1);
  const resultadosPorPagina = 15;
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const buscar = async () => {
    try {
      setLoading(true);
      const data = await buscarFiltrados(form.nombre, form.dia);

      if (form.orden === "asc") {
        data.sort((a, b) => a.precioMayor - b.precioMayor);
      } else if (form.orden === "desc") {
        data.sort((a, b) => b.precioMayor - a.precioMayor);
      }

      const menorPrecioMayor = Math.min(...data.map((p) => p.precioMayor));
      const productoBaratoMayor = data.find(
        (p) => p.precioMayor === menorPrecioMayor
      );

      const menorPrecioMenor = Math.min(...data.map((p) => p.precioMenor));
      const productoBaratoMenor = data.find(
        (p) => p.precioMenor === menorPrecioMenor
      );

      setResultados(data);
      setProductoMasBarato(productoBaratoMayor || null);
      setProductoMasBaratoMenor(productoBaratoMenor || null);
      setPaginaActual(1);
    } catch {
      alert("Error al buscar productos");
    } finally {
      setLoading(false);
    }
  };

  const limpiarResultados = async () => {
    setForm({ nombre: "", dia: "", orden: "" });
    await cargarResultadosIniciales();
  };

  const cargarResultadosIniciales = async () => {
    setLoading(true);
    try {
      const data = await buscarFiltrados("", "");
      setResultados(data);
      setPaginaActual(1);
    } catch {
      alert("Error al cargar productos");
    } finally {
      setLoading(false);
    }
  };

  const indiceUltimo = paginaActual * resultadosPorPagina;
  const indicePrimero = indiceUltimo - resultadosPorPagina;
  const resultadosAMostrar = resultados.slice(indicePrimero, indiceUltimo);
  const totalPaginas = Math.ceil(resultados.length / resultadosPorPagina);

  const cambiarPagina = (numero) => setPaginaActual(numero);
  const siguiente = () => {
    if (paginaActual < totalPaginas) setPaginaActual(paginaActual + 1);
  };
  const anterior = () => {
    if (paginaActual > 1) setPaginaActual(paginaActual - 1);
  };

  useEffect(() => {
    cargarResultadosIniciales();
  }, []);

  return (
    <div className="container mt-5">
      <h3>Comparador de Productos</h3>

      <div className="row mb-3">
        <div className="col-md-4">
          <label>Nombre del producto</label>
          <input
            className="form-control"
            name="nombre"
            value={form.nombre}
            onChange={handleInputChange}
          />
        </div>
        <div className="col-md-4">
          <label>Día de reparto</label>
          <select
            className="form-control"
            name="dia"
            value={form.dia}
            onChange={handleInputChange}
          >
            <option value="">Todos</option>
            {diasSemana.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-4">
          <label>Ordenar por precio POR MAYOR</label>
          <select
            className="form-control"
            name="orden"
            value={form.orden}
            onChange={handleInputChange}
          >
            <option value="">Sin orden</option>
            <option value="asc">Menor precio</option>
            <option value="desc">Mayor precio</option>
          </select>
        </div>
      </div>

      <div className="mb-3 d-flex flex-wrap gap-2">
        <button className="btn btn-primary" onClick={buscar}>
          Buscar
        </button>
        <button className="btn btn-secondary" onClick={limpiarResultados}>
          Limpiar
        </button>
        <button className="btn btn-info btn-sm" onClick={() => navigate("/")}>
          <i className="bi bi-arrow-left"></i> Volver al Inicio
        </button>
      </div>

      <hr />

      <h5>Resultados</h5>
      {loading ? (
        <div className="text-center mt-3">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      ) : resultados.length === 0 ? (
        <p className="text-muted">No se encontraron productos</p>
      ) : (
        <>
          {productoMasBarato && (
            <div className="alert alert-success">
              <strong>¡Mejor precio por mayor!</strong>{" "}
              {productoMasBarato.nombreProducto} a ${productoMasBarato.precioMayor} por{" "}
              {productoMasBarato.proveedor?.nombreEmpresa}
            </div>
          )}
          {productoMasBaratoMenor && (
            <div className="alert alert-info">
              <strong>¡Mejor precio por menor!</strong>{" "}
              {productoMasBaratoMenor.nombreProducto} a ${productoMasBaratoMenor.precioMenor} por{" "}
              {productoMasBaratoMenor.proveedor?.nombreEmpresa}
            </div>
          )}

          <table className="table table-bordered mt-3">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Precio Mayor</th>
                <th>Precio Menor</th>
                <th>Proveedor</th>
                <th>Días de Reparto</th>
              </tr>
            </thead>
            <tbody>
              {resultadosAMostrar.map((prod) => (
                <tr key={prod.id}>
                  <td>{prod.nombreProducto}</td>
                  <td>{prod.cantidad}</td>
                  <td>${prod.precioMayor}</td>
                  <td>${prod.precioMenor}</td>
                  <td>{prod.proveedor?.nombreEmpresa}</td>
                  <td>{prod.proveedor?.diasReparto}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {totalPaginas > 1 && (
            <nav className="mt-3">
              <ul className="pagination justify-content-center">
                <li className={`page-item ${paginaActual === 1 ? "disabled" : ""}`}>
                  <button className="page-link" onClick={anterior}>
                    &laquo; Anterior
                  </button>
                </li>
                {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((num) => (
                  <li
                    key={num}
                    className={`page-item ${num === paginaActual ? "active" : ""}`}
                  >
                    <button className="page-link" onClick={() => cambiarPagina(num)}>
                      {num}
                    </button>
                  </li>
                ))}
                <li
                  className={`page-item ${
                    paginaActual === totalPaginas ? "disabled" : ""
                  }`}
                >
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
  );
}
