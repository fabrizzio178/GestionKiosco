import { useState } from "react";
import { buscarFiltrados } from "../services/productosService";

const diasSemana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

export default function ComparadorProductos() {
  const [nombre, setNombre] = useState("");
  const [dia, setDia] = useState("");
  const [resultados, setResultados] = useState([]);

  const buscar = async () => {
    try {
      const data = await buscarFiltrados(nombre, dia);
      setResultados(data);
    } catch {
      alert("Error al buscar productos");
    }
  };

  return (
    <div className="container mt-5">
      <h3>Comparador de Productos</h3>
      <div className="mb-3">
        <label>Nombre del producto</label>
        <input
          className="form-control"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label>Día de reparto</label>
        <select className="form-control" value={dia} onChange={(e) => setDia(e.target.value)}>
          <option value="">Todos</option>
          {diasSemana.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
      </div>
      <button className="btn btn-primary" onClick={buscar}>
        Buscar
      </button>

      <hr />
      <h5>Resultados</h5>
      {resultados.length === 0 ? (
        <p className="text-muted">No se encontraron productos</p>
      ) : (
        <table className="table table-bordered mt-3">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Marca</th>
              <th>Precio Mayor</th>
              <th>Precio Menor</th>
              <th>Proveedor</th>
              <th>Días de Reparto</th>
            </tr>
          </thead>
          <tbody>
            {resultados.map((prod) => (
              <tr key={prod.id}>
                <td>{prod.nombreProducto}</td>
                <td>{prod.marca}</td>
                <td>${prod.precioMayor}</td>
                <td>${prod.precioMenor}</td>
                <td>{prod.proveedor?.nombreEmpresa}</td>
                <td>{prod.proveedor?.diasReparto}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
