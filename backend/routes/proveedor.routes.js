import express from "express";
import ProveedorService from "../services/proveedorService.js";

const router = express.Router();

// GET /api/proveedores
router.get("/", async (req, res) => {
    try {
        const proveedores = await ProveedorService.getProveedores();
        res.json(proveedores);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /api/proveedores/:id
router.get("/:id", async (req, res) => {
    try {
        const proveedor = await ProveedorService.getProveedorPorId(req.params.id);
        if (!proveedor) {
            return res.status(404).json({ error: "Proveedor no encontrado" });
        }
        res.json(proveedor);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST /api/proveedores
router.post("/", async (req, res) => {
    try {
        const nuevoProveedor = await ProveedorService.crearProveedor(req.body);
        res.status(201).json(nuevoProveedor);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// PUT /api/proveedores/:id
router.put("/:id", async (req, res) => {
    try {
        const actualizado = await ProveedorService.actualizarProveedor(req.params.id, req.body);
        res.json(actualizado);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// DELETE /api/proveedores/:id
router.delete("/:id", async (req, res) => {
    try {
        await ProveedorService.eliminarProveedor(req.params.id);
        res.json({ mensaje: "Proveedor eliminado" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

export default router;
