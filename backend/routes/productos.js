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

// Obtener un producto por su ID
router.get("/:id", (req, res) => {
    const id = Number(req.params.id);

    const producto = productos.find((item) => item.id === id);

    if (!producto) {
        return res.status(404).json({
            mensaje: "Producto no encontrado"
        });
    }

    res.json(producto);
});

// Agregar un producto nuevo
router.post("/", (req, res) => {
    const nuevoProducto = {
        id: productos.length + 1,
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        precio: req.body.precio,
        categoria: req.body.categoria
    };

    productos.push(nuevoProducto);

    res.status(201).json({
        mensaje: "Producto agregado correctamente",
        producto: nuevoProducto
    });
});

// Exportar las rutas
module.exports = router;


