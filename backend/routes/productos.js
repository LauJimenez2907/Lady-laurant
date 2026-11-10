// Importar Express
const express = require("express");

// Crear un enrutador
const router = express.Router();

// Lista inicial de productos
const productos = [
    {
        id: 1,
        nombre: "Flores eternas",
        descripcion: "Arreglos florales hechos a mano",
        precio: 45000,
        categoria: "Flores"
    },
    {
        id: 2,
        nombre: "Anchetas saludables",
        descripcion: "Detalles con frutas y productos saludables",
        precio: 55000,
        categoria: "Anchetas"
    },
    {
        id: 3,
        nombre: "Cajas sorpresa",
        descripcion: "Cajas personalizadas para ocasiones especiales",
        precio: 60000,
        categoria: "Cajas sorpresa"
    }
];

// Obtener todos los productos
router.get("/", (req, res) => {
    res.json(productos);
});

// Exportar las rutas
module.exports = router;
