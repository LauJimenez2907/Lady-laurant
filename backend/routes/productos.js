/* =========================================
   1. IMPORTAR EXPRESS Y CONTROLADORES
========================================= */

const express = require("express");
const router = express.Router();

const verificarAdministrador = require("../middleware/auth");

const {
    obtenerProductos,
    obtenerProducto,
    crearProducto,
    actualizarProducto,
    eliminarProducto
} = require("../controllers/productosController");

/* =========================================
   2. CONSULTAR TODOS LOS PRODUCTOS
   Acceso público
========================================= */

router.get("/", obtenerProductos);

/* =========================================
   3. CONSULTAR UN PRODUCTO POR ID
   Acceso público
========================================= */

router.get("/:id", obtenerProducto);

/* =========================================
   4. AGREGAR UN PRODUCTO
   Solo administrador
========================================= */

router.post("/", verificarAdministrador, crearProducto);

/* =========================================
   5. ACTUALIZAR UN PRODUCTO
   Solo administrador
========================================= */

router.put("/:id", verificarAdministrador, actualizarProducto);

/* =========================================
   6. ELIMINAR UN PRODUCTO
   Solo administrador
========================================= */

router.delete("/:id", verificarAdministrador, eliminarProducto);

/* =========================================
   7. EXPORTAR LAS RUTAS
========================================= */

module.exports = router;