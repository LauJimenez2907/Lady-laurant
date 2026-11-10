// 1. Importar herramientas
const express = require("express");
const path = require("path");

// 2. Crear el servidor
const app = express();
const PORT = 3000;

// 3. Permitir recibir datos JSON
app.use(express.json());

// 4. Conectar la carpeta frontend
app.use(express.static(path.join(__dirname, "../frontend")));

// 5. Mostrar la página principal
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/intex.html"));
});

// 6. Encender el servidor
app.listen(PORT, () => {
    console.log(`Servidor funcionando en http://localhost:${PORT}`);
});