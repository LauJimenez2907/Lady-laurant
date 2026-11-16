
 // 1. Importar herramientas
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

// 2. Configurar DNS de Google
const dns = require("node:dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

// 3. Cargar las variables del archivo .env
dotenv.config({
    path: path.join(__dirname, "../../.env")
});

// 4. Crear la función de conexión
const conectarDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        console.log("MongoDB conectado correctamente");
    } catch (error) {
        console.error("Error al conectar MongoDB:", error.message);
        process.exit(1);
    }
};

// 5. Exportar la función
module.exports = conectarDB;
