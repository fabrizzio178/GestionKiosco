import { Routes, Route } from "react-router-dom";
import ProveedorList from "./components/ProveedorList";
import ProductosDelProveedor from "./components/ProductosdelProveedor";
import CrearProveedor from "./components/CrearProveedor";
import EditarProveedor from "./pages/EditarProveedor";
import FormularioProducto from "./components/FormularioProducto";
export default function App() {
  return (
    <div className="bg-light min-vh-100">
      <h1 className="text-center py-4 bg-dark text-white">Gestión de Kiosco PACHA</h1>
      <Routes>
        <Route path="/" element={<ProveedorList />} />
        <Route path="/proveedores/:proveedorId/productos" element={<ProductosDelProveedor />} />
        <Route path="crear-proveedor" element={<CrearProveedor/>}/>
        <Route path="editar-proveedor/:proveedorId" element={<EditarProveedor/>}></Route>
        <Route path="/proveedores/:proveedorId/productos/crear" element={<FormularioProducto />} />
      </Routes>
    </div>
  );
}
