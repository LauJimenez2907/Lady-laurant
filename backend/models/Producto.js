// 1. Importar Mongoose
const mongoose = require("mongoose");

// 2. Definir la estructura de los productos
const productoSchema = new mongoose.Schema({

    // Nombre del producto
    nombre: {
        type: String,
        required: true
    },

    // Descripción del producto
    descripcion: {
        type: String,
        required: true
    },

    // Precio del producto
    precio: {
        type: Number,
        required: true
    },

    // Categoría del producto
    categoria: {
        type: String,
        required: true
    },

    // Imagen del producto
    imagen: {
        type: String,
        default: ""
    }

}, { timestamps: true });

// 3. Crear el modelo
const Producto = mongoose.model("Producto", productoSchema);

// 4. Exportar el modelo
module.exports = Producto;