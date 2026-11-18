
// =========================================
// 1. IMPORTAR HERRAMIENTAS
// =========================================

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const dns = require("node:dns");

// =========================================
// 2. CONFIGURAR DNS
// =========================================

dns.setServers(["8.8.8.8", "8.8.4.4"]);

// =========================================
// 3. CARGAR VARIABLES DEL ARCHIVO .ENV
// =========================================

dotenv.config({
    path: path.join(__dirname, "../../.env")
});

// =========================================
// 4. CONECTAR CON MONGODB
// =========================================

const conectarDB = async () => {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error("No se encontró MONGODB_URI en el archivo .env");
        }

        await mongoose.connect(process.env.MONGODB_URI);

        console.log("MongoDB conectado correctamente");

    } catch (error) {
        console.error("Error al conectar MongoDB:", error.message);
        process.exit(1);
    }
};

// =========================================
// 5. EXPORTAR LA CONEXIÓN
// =========================================

module.exports = conectarDB;
