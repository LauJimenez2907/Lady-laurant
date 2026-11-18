
// =========================================
// 1. IMPORTAR EXPRESS Y EL CONTROLADOR
// =========================================

const express = require("express");
const router = express.Router();

const {
    obtenerProductos,
    obtenerProducto,
    crearProducto,
    actualizarProducto,
    eliminarProducto
} = require("../controllers/productosController");

// =========================================
// 2. CONSULTAR TODOS LOS PRODUCTOS
// =========================================

router.get("/", obtenerProductos);

// =========================================
// 3. CONSULTAR UN PRODUCTO POR ID
// =========================================

router.get("/:id", obtenerProducto);

// =========================================
// 4. AGREGAR UN PRODUCTO
// =========================================

router.post("/", crearProducto);

// =========================================
// 5. ACTUALIZAR UN PRODUCTO
// =========================================

router.put("/:id", actualizarProducto);

// =========================================
// 6. ELIMINAR UN PRODUCTO
// =========================================

router.delete("/:id", eliminarProducto);

// =========================================
// 7. EXPORTAR LAS RUTAS
// =========================================

module.exports = router;
