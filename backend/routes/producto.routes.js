import express from "express";
import ProductoService from "../services/productoService.js";
import multer from "multer";
import csv from "csv-parser";
import fs from "fs";


import { createWorker } from "tesseract.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });
// CRUD
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
    const actualizado = await ProductoService.actualizarProducto(
      req.params.id,
      req.body
    );
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

router.delete("/", async (req, res) => {
  try {
    await ProductoService.eliminarTodos();
    res.json({ mensaje: "Todos los productos eliminados" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/proveedor/:proveedorId", async (req, res) => {
  try {
    const proveedorId = parseInt(req.params.proveedorId);
    if (isNaN(proveedorId)) {
      return res.status(400).json({ error: "ID de proveedor inválido" });
    }
    await ProductoService.eliminarTodos(proveedorId);
    res.json({ mensaje: `Productos del proveedor ${proveedorId} eliminados` });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Filtrados GET
router.get("/buscar", async (req, res) => {
  try {
    const { nombre = "", diaReparto = "" } = req.query;
    const productos = await ProductoService.buscarFiltrados(nombre, diaReparto);
    res.json(productos);
  } catch (error) {
    console.error("Error en /productos/buscar:", error);
    res.status(500).json({ error: error.message });
  }
});

// Carga de archivos
// Importar CSV
router.post("/importar-csv", upload.single("archivo"), async (req, res) => {
  try {
    const proveedorId = parseInt(req.query.proveedorId);
    if (!proveedorId) {
      return res.status(400).json({ error: "Proveedor ID es requerido" });
    }

    const productos = [];
    const rawRows = [];

    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on("data", (row) => rawRows.push(row))
      .on("end", async () => {
        try {
          for (const row of rawRows) {
            const keys = Object.keys(row);

            // 1. Buscar nombre y sus variantes
            const nombreKey = keys.find(
              (k) =>
                k.toLowerCase().includes("descrip") ||
                k.toLowerCase().includes("nombre") ||
                k.toLowerCase().includes("producto") ||
                k.toLowerCase().includes("artículo")
            );

            // 2. Buscar precio y sus variantes
            const precioKey = keys.find(
              (k) =>
                k.toLowerCase().includes("c/dto") ||
                k.toLowerCase().includes("c dto") ||
                k.toLowerCase().includes("precio") ||
                k.toLowerCase().includes("valor") ||
                k.toLowerCase().includes("precio unitario") ||
                k.toLowerCase().includes("precio menor") ||
                k.toLowerCase().includes("pr") ||
                k.toLowerCase().includes("p.unit")
            );

            // 3. Buscar cantidades de la caja
            const cantidadKey = keys.find(
              (k) =>
                k.toLowerCase().includes("cant") ||
                k.toLowerCase().includes("caja") ||
                k.toLowerCase().includes("unidades") ||
                k.toLowerCase().includes("cantidad por caja") ||
                k.toLowerCase().includes("caja por")
            );

            if (!nombreKey || !precioKey || !cantidadKey) continue;

            const nombreProducto = row[nombreKey]?.trim();
            if (!nombreProducto) continue;

            const precioMenor =
              parseFloat(String(row[precioKey]).replace(",", ".")) || 0;

            const cantidadProductos =
              parseInt(String(row[cantidadKey]).replace(",", ".")) || 1;
            if (isNaN(cantidadProductos)) continue;
            const precioMayor = Math.round(precioMenor * cantidadProductos, 2); // calculamos precio por unidad por cantidad para obtener el mayor

            productos.push({
              // Llenamos el array con los productos
              nombreProducto,
              marca: "Sin marca",
              precioMayor,
              precioMenor,
              cantidad: cantidadProductos,
            });
          }

          if (productos.length === 0) {
            return res.status(400).json({
              error: "No se detectaron productos válidos en el archivo",
            });
          }

          const resultados = await ProductoService.importarCSV(
            productos,
            proveedorId
          );
          fs.unlinkSync(req.file?.path);
          res.status(201).json({ mensaje: "Productos importados", resultados });
        } catch (error) {
          console.error("Error al importar CSV:", error);
          res.status(400).json({ error: error.message });
        }
      });
  } catch (error) {
    console.error("Error en /productos/importar-csv:", error);
    res.status(500).json({ error: error.message });
  }
});



export default router;
