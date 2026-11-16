
// 1. Importar Express y el modelo de productos
const express = require("express");
const Producto = require("../models/Producto");

// 2. Crear un enrutador
const router = express.Router();

// 3. Obtener todos los productos
router.get("/", async (req, res) => {
    try {
        console.log("Consultando productos desde MongoDB");
        const productos = await Producto.find();

        res.json(productos);
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al consultar los productos"
        });
    }
});

// 4. Obtener un producto por su ID
router.get("/:id", async (req, res) => {
    try {
        const producto = await Producto.findById(req.params.id);

        if (!producto) {
            return res.status(404).json({
                mensaje: "Producto no encontrado"
            });
        }

        res.json(producto);
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al buscar el producto"
        });
    }
});

// 5. Agregar un producto nuevo
router.post("/", async (req, res) => {
    try {
        const nuevoProducto = new Producto(req.body);

        await nuevoProducto.save();

        res.status(201).json({
            mensaje: "Producto agregado correctamente",
            producto: nuevoProducto
        });
    } catch (error) {
        res.status(400).json({
            mensaje: "Error al agregar el producto"
        });
    }
});

// 6. Eliminar un producto por su ID
router.delete("/:id", async (req, res) => {
    try {
        const producto = await Producto.findByIdAndDelete(req.params.id);

        if (!producto) {
            return res.status(404).json({
                mensaje: "Producto no encontrado"
            });
        }

        res.json({
            mensaje: "Producto eliminado correctamente"
        });
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al eliminar el producto"
        });
    }
});

// 7. Actualizar un producto por su ID
router.put("/:id", async (req, res) => {
    try {
        const producto = await Producto.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!producto) {
            return res.status(404).json({
                mensaje: "Producto no encontrado"
            });
        }

        res.json({
            mensaje: "Producto actualizado correctamente",
            producto: producto
        });
    } catch (error) {
        res.status(400).json({
            mensaje: "Error al actualizar el producto"
        });
    }
});

// 8. Exportar las rutas
module.exports = router;
