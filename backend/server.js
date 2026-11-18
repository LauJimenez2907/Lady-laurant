
// =========================================
// 1. IMPORTAR HERRAMIENTAS
// =========================================

const express = require("express");
const path = require("path");

const conectarDB = require("./config/database");
const productosRoutes = require("./routes/productos");

// =========================================
// 2. CREAR EL SERVIDOR
// =========================================

const app = express();
const PORT = 3000;

// =========================================
// 3. CONFIGURAR EL SERVIDOR
// =========================================

app.use(express.json());

app.use("/api/productos", productosRoutes);

app.use(express.static(path.join(__dirname, "../frontend")));

// =========================================
// 4. MOSTRAR LA PAGINA PRINCIPAL
// =========================================

app.get("/", (req, res) => {
    res.sendFile(
        path.join(__dirname, "../frontend/intex.html")
    );
});

// =========================================
// 5. INICIAR EL SERVIDOR
// =========================================

const iniciarServidor = async () => {
    try {
        await conectarDB();

        app.listen(PORT, () => {
            console.log(
                `Servidor funcionando en http://localhost:${PORT}`
            );
        });

    } catch (error) {
        console.error("Error al iniciar el servidor:", error.message);
    }
};

// EJECUTAR EL SERVIDOR
iniciarServidor();
