
const express = require("express");
const path = require("path");

const conectarDB = require("./config/database");
const productosRoutes = require("./routes/productos");
const authRoutes = require("./routes/auth");
const verificarAdministrador = require("./middleware/auth");

// =====================================
// CONFIGURACIÓN DEL SERVIDOR
// =====================================

const app = express();

// Puerto automático de Render o puerto 3000 local
const PORT = process.env.PORT || 3000;

// =====================================
// MIDDLEWARES
// =====================================

app.use(express.json());

// =====================================
// RUTAS DE AUTENTICACIÓN
// =====================================

app.use("/api/auth", authRoutes);

// =====================================
// RUTAS DE PRODUCTOS
// =====================================

app.use("/api/productos", productosRoutes);

// =====================================
// PROTEGER EL PANEL ADMINISTRATIVO
// =====================================

app.get("/admin/panel.html", verificarAdministrador, (req, res) => {
    res.sendFile(
        path.join(__dirname, "../frontend/admin/panel.html")
    );
});

// =====================================
// RUTA PRINCIPAL
// =====================================

app.get("/", (req, res) => {
    res.sendFile(
        path.join(__dirname, "../frontend/intex.html")
    );
});

// =====================================
// ARCHIVOS DEL FRONTEND
// =====================================

app.use(express.static(path.join(__dirname, "../frontend")));

// =====================================
// INICIAR SERVIDOR
// =====================================

const iniciarServidor = async () => {
    try {
        await conectarDB();

        app.listen(PORT, () => {
            console.log(`Servidor funcionando en el puerto ${PORT}`);
        });

    } catch (error) {
        console.error("Error al iniciar el servidor:", error.message);
        process.exit(1);
    }
};

iniciarServidor();
