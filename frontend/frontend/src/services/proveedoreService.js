import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL + "/proveedores";

export const getProveedores = async() => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Error al obtener los proveedores:", error);
        throw error;
    }
}

export const crearProveedor = async(proveedor) => {
    try {
        const response = await axios.post(API_URL, proveedor);
        return response.data;
    } catch (error) {
        console.error("Error al crear el proveedor:", error);
        throw error;
    }
}

export const actualizarProveedor = async(id, proveedor) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, proveedor);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar el proveedor:", error);
        throw error;
    }
}

export const eliminarProveedor = async(id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al eliminar el proveedor:", error);
        throw error;
    }
}