import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "/productos";

export const getProductos = async() => {
    try{
        const response = await axios.get(API_URL);
        return response.data;
    } catch(error){
        console.error("Error al obtener los productos:", error);
        throw error;
    }
}

export const getProductosYProveedores = async() => {
    try{
        const response = await axios.get(`${API_URL}/con-proveedor`);
        return response.data;
    } catch (error){
        console.error("Error al obtener productos y proveedores:", error);
        throw error;

    }

}

export const crearProducto = async(producto) => {
    try{
        const response = await axios.post(API_URL, producto);
        return response.data;
    } catch(error){
        console.error("Error al crear el producto:", error);
        throw error;
    }

}

export const actualizarProducto = async(id, producto) => {
    try{
        const response = await axios.put(`${API_URL}/${id}`, producto);
        return response.data;
    } catch(error){
        console.error("Error al actualizar el producto:", error);
        throw error;
    }
}

export const eliminarProducto = async(id) => {
    try{
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    } catch(error){
        console.error("Error al eliminar el producto:", error);
        throw error;
    }
}

export const eliminarTodos = async(id) => {
    try{
        const response = await axios.delete(`${API_URL}/proveedor/${id}`);
        return response.data;
    } catch(error){
        console.error("Error al eliminar todos los productos del proveedor:", error);
        throw error;
    }

}

export const buscarFiltrados = async(nombre, dia) => {
    try{
        const queryParams = new URLSearchParams();
        if(nombre) queryParams.append("nombre", nombre);
        if(dia) queryParams.append("diaReparto", dia);
        const response = await axios.get(`${API_URL}/buscar?${queryParams.toString()}`);
        return response.data;
    } catch(error){
        console.error("Error al buscar productos filtrados:", error);
        throw error;
    }
}


export const importarCSV = async(formData, proveedorId) => {
    try{
        const response = await axios.post(`${API_URL}/importar-csv?proveedorId=${proveedorId}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch(error){
        console.error("Error al importar CSV:", error);
        throw error;
    }
}