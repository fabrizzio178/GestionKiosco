import express from "express";
import cors from "cors";
import sequelize from "./db.js";

// Modelos
import Proveedor from "./models/Proveedor.js";
import Producto from "./models/Producto.js";

// Relaciones
Proveedor.hasMany(Producto, { foreignKey: "proveedorId", as: "productos" });

// Routes
import productoRouter from "./routes/producto.routes.js";
import proveedorRouter from "./routes/proveedor.routes.js";


const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors(
    {
        origin: "https://gestionpachi.vercel.app", // Cambia segun frontend
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true
    }
));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("¡Hola, mundo!");
});
app.use("/api/productos", productoRouter)
app.use("/api/proveedores", proveedorRouter);

(async () => {
    try {
        await sequelize.authenticate();
        console.log("Conexión a la base de datos establecida correctamente.");

        // Crea las tablas si no existen
        await sequelize.sync({ force: false }); // ¡cambiar a true solo si querés borrar y recrear!

        app.listen(PORT, () => {
            console.log(`Servidor escuchando en http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("No se pudo conectar a la base de datos:", error);
    }
})();
