
// =========================================
// 1. IMPORTAR MONGOOSE
// =========================================

const mongoose = require("mongoose");

// =========================================
// 2. DEFINIR LOS DATOS DEL PRODUCTO
// =========================================

const productoSchema = new mongoose.Schema({

    nombre: {
        type: String,
        required: true
    },

    descripcion: {
        type: String,
        required: true
    },

    precio: {
        type: Number,
        required: true
    },

    categoria: {
        type: String,
        required: true
    },

    imagen: {
        type: String,
        default: ""
    }

}, {
    timestamps: true
});

// =========================================
// 3. CREAR EL MODELO
// =========================================

const Producto = mongoose.model("Producto", productoSchema);

// =========================================
// 4. EXPORTAR EL MODELO
// =========================================

module.exports = Producto;
