
// =========================================
// 1. IMPORTAR EL MODELO DE PRODUCTOS
// =========================================

const Producto = require("../models/Producto");

// =========================================
// 2. CONSULTAR TODOS LOS PRODUCTOS
// =========================================

const obtenerProductos = async (req, res) => {
    try {
        const productos = await Producto.find();
        res.json(productos);

    } catch (error) {
        res.status(500).json({
            mensaje: "Error al consultar los productos"
        });
    }
};

// =========================================
// 3. CONSULTAR UN PRODUCTO POR SU ID
// =========================================

const obtenerProducto = async (req, res) => {
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
            mensaje: "Error al consultar el producto"
        });
    }
};

// =========================================
// 4. AGREGAR UN PRODUCTO
// =========================================

const crearProducto = async (req, res) => {
    try {
        const nuevoProducto = new Producto(req.body);
        const productoGuardado = await nuevoProducto.save();

        res.status(201).json(productoGuardado);

    } catch (error) {
        res.status(400).json({
            mensaje: "Error al agregar el producto"
        });
    }
};

// =========================================
// 5. ACTUALIZAR UN PRODUCTO
// =========================================

const actualizarProducto = async (req, res) => {
    try {
        const productoActualizado = await Producto.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!productoActualizado) {
            return res.status(404).json({
                mensaje: "Producto no encontrado"
            });
        }

        res.json(productoActualizado);

    } catch (error) {
        res.status(400).json({
            mensaje: "Error al actualizar el producto"
        });
    }
};

// =========================================
// 6. ELIMINAR UN PRODUCTO
// =========================================

const eliminarProducto = async (req, res) => {
    try {
        const productoEliminado = await Producto.findByIdAndDelete(
            req.params.id
        );

        if (!productoEliminado) {
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
};

// =========================================
// 7. EXPORTAR LAS FUNCIONES
// =========================================

module.exports = {
    obtenerProductos,
    obtenerProducto,
    crearProducto,
    actualizarProducto,
    eliminarProducto
};
