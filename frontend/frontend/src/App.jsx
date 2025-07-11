import { Routes, Route } from "react-router-dom";
import ProveedorList from "./components/ProveedorList";
import ProductosDelProveedor from "./components/ProductosList";
import CrearProveedor from "./components/CrearProveedor";
import EditarProveedor from "./pages/EditarProveedor";
import FormularioProducto from "./components/CrearProducto";
import EditarProducto from "./pages/EditarProducto";
import Navegacion from "./components/NavBar";
import ComparadorProductos from "./components/ComparadorProductos";

export default function App() {
  return (
    <div className="bg-light min-vh-100">
      <Navegacion />

      <h1 className="text-center py-4 bg-dark text-white mt-5">
        Gestión de Kiosco PACHA
      </h1>

      <Routes>
        <Route path="/" element={<ProveedorList />} />
        <Route
          path="/proveedores/:proveedorId/productos"
          element={<ProductosDelProveedor />}
        />
        <Route path="crear-proveedor" element={<CrearProveedor />} />
        <Route
          path="editar-proveedor/:proveedorId"
          element={<EditarProveedor />}
        />
        <Route
          path="/proveedores/:proveedorId/productos/crear"
          element={<FormularioProducto />}
        />
        <Route path="/productos/:id/editar" element={<EditarProducto />} />

        <Route path="/comparador" element={<ComparadorProductos/>}></Route>
      </Routes>
    </div>
  );
}
