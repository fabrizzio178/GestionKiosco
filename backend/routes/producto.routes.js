import express from 'express';
import ProductoService from '../services/productoService.js';

const router = express.Router();

// GET /productos
router.get("/", async (req, res) => {
    try {
        const productos = await ProductoService.getProductos();
        res.json(productos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /productos/proveedor
router.get("/con-proveedor", async (req, res) => {
    try {
        const productos = await ProductoService.getProductosConProveedor();
        res.json(productos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST /api/productos
router.post("/", async (req, res) => {
    try {
        const nuevoProducto = await ProductoService.crearProducto(req.body);
        res.status(201).json(nuevoProducto);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// PUT /api/productos/:id
router.put("/:id", async (req, res) => {
    try {
        const actualizado = await ProductoService.actualizarProducto(req.params.id, req.body);
        res.json(actualizado);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// DELETE /api/productos/:id
router.delete("/:id", async (req, res) => {
    try {
        await ProductoService.eliminarProducto(req.params.id);
        res.json({ mensaje: "Producto eliminado" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Filtrados GET
router.get("/buscar", async(req, res) => {
    try{
        const {nombre="", diaReparto=""} = req.query;
        const productos = await ProductoService.buscarFiltrados(nombre, diaReparto);
        res.json(productos);
    } catch (error) {
        console.error("Error en /productos/buscar:", error);
        res.status(500).json({ error: error.message });
    }
    


})

export default router;