
// =========================================
// 1. IMPORTAR HERRAMIENTAS
// =========================================

const mongoose = require("mongoose");
const conectarDB = require("../config/database");
const Producto = require("../models/Producto");

// =========================================
// 2. LISTA DE PRODUCTOS POR REGISTRAR
// =========================================

const productos = [
    {
        nombre: "Caja Vision Board",
        descripcion: "Caja personalizada para crear y organizar tus sueños y metas.",
        precio: 0,
        categoria: "Personalizados",
        imagen: "imagenes/Productos/caja-vision-board/caja-vision-board.jpg"
    },
    {
        nombre: "Cuadros personalizados",
        descripcion: "Cuadros personalizados para decorar y regalar en ocasiones especiales.",
        precio: 0,
        categoria: "Personalizados",
        imagen: "imagenes/Productos/cuadros-personalizados/cuadros-personalizados.jpg"
    },
    {
        nombre: "Kit de maquillaje",
        descripcion: "Kit de maquillaje preparado para sorprender con un detalle especial.",
        precio: 0,
        categoria: "Belleza",
        imagen: "imagenes/Productos/kits-maquillaje/kits-maquillaje.jpg"
    },
    {
        nombre: "Peluche sorpresa",
        descripcion: "Peluches especiales para regalar y sorprender a alguien.",
        precio: 0,
        categoria: "Regalos",
        imagen: "imagenes/Productos/peluches-sorpresa/peluches-sorpresa.jpg"
    },
    {
        nombre: "Pocillos personalizados",
        descripcion: "Pocillos personalizados con diseños especiales para regalar.",
        precio: 0,
        categoria: "Personalizados",
        imagen: "imagenes/Productos/pocillos-personalizados/pocillos-personalizados.jpg"
    },
    {
        nombre: "Ramos de limpiapipas",
        descripcion: "Ramos artesanales elaborados a mano con limpiapipas.",
        precio: 0,
        categoria: "Regalos",
        imagen: "imagenes/Productos/ramos-limpiapipas/ramos-limpiapipas.jpg"
    },
    {
        nombre: "Ruleta de fotos",
        descripcion: "Ruleta personalizada con fotografías para conservar recuerdos especiales.",
        precio: 0,
        categoria: "Personalizados",
        imagen: "imagenes/Productos/ruleta-fotos/ruleta-fotos.jpg"
    }
];

// =========================================
// 3. REGISTRAR PRODUCTOS SIN DUPLICAR
// =========================================

const registrarProductos = async () => {
    try {
        await conectarDB();

        let registrados = 0;

        for (const datos of productos) {

            const existente = await Producto.findOne({
                nombre: datos.nombre
            });

            if (existente) {
                console.log(`Ya existe: ${datos.nombre}`);
            } else {
                await Producto.create(datos);
                console.log(`Registrado: ${datos.nombre}`);
                registrados++;
            }
        }

        console.log("--------------------------------");
        console.log(`Productos nuevos registrados: ${registrados}`);
        console.log("Proceso terminado correctamente.");

    } catch (error) {
        console.error("Error al registrar productos:", error.message);

    } finally {
        await mongoose.disconnect();
    }
};

// =========================================
// 4. EJECUTAR EL REGISTRO
// =========================================

registrarProductos();

