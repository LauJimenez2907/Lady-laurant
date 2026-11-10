// 1. Importar herramientas
const express = require("express");
const path = require("path");
const productosRoutes = require("./routes/productos");

// 2. Crear el servidor
const app = express();

// 3. Definir el puerto
const PORT = 3000;

// 4. Permitir recibir datos JSON
app.use(express.json());

// 5. Conectar las rutas de productos
app.use("/api/productos", productosRoutes);

// 6. Conectar la carpeta frontend
app.use(express.static(path.join(__dirname, "../frontend")));

// 7. Mostrar la página principal
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/intex.html"));
});

// 8. Encender el servidor
app.listen(PORT, () => {
    console.log(`Servidor funcionando en http://localhost:${PORT}`);
});