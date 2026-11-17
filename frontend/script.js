
/* =========================================
   1. VARIABLES PRINCIPALES
========================================= */

// Guardar los productos que llegan de MongoDB
let productosCargados = [];

// Guardar la categoria seleccionada
let categoriaSeleccionada = "Todos";


// =========================================
// 2. FUNCION PARA MOSTRAR UN MENSAJE
// =========================================

function mostrarMensaje() {

    alert("¡Bienvenido a Lady Laurant! Gracias por visitarnos.");

}


// =========================================
// 3. FUNCION PARA VALIDAR EL FORMULARIO
// =========================================

function enviarPedido(evento) {

    // Evita que la pagina se recargue
    evento.preventDefault();

    // Obtener los datos del formulario
    const nombre = document.getElementById("nombre").value.trim();
    const producto = document.getElementById("producto").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const mensaje = document.getElementById("mensaje").value.trim();

    // Verificar que los campos esten completos
    if (nombre === "" || producto === "" || telefono === "") {

        alert("Por favor, completa todos los campos obligatorios.");

        return;
    }

   
    // Crear el mensaje con los datos del pedido
    const textoPedido =
        "¡Hola! Quiero realizar un pedido en Lady Laurant.\n\n" +
        "Nombre: " + nombre + "\n" +
        "Producto: " + producto + "\n" + 
        "Teléfono: " + telefono + "\n" +
        "Detalles: " + (mensaje || "Sin detalles adicionales");

    // Preparar el enlace de WhatsApp
    const enlaceWhatsApp =
        "https://wa.me/573027140362?text=" +
        encodeURIComponent(textoPedido);

    // Abrir WhatsApp con el pedido escrito
    window.open(enlaceWhatsApp, "_blank");

}


// =========================================
// 4. FUNCION PARA CONSULTAR LOS PRODUCTOS
// =========================================

async function cargarProductos() {

    try {

        // Consultar los productos al servidor
        const respuesta = await fetch("/api/productos");

        // Verificar si la respuesta fue correcta
        if (!respuesta.ok) {
            throw new Error("No se pudieron cargar los productos.");
        }

        // Convertir la respuesta a formato JSON
        const productos = await respuesta.json();

        // Guardar los productos en la variable principal
        productosCargados = productos;

        // Mostrar los productos en el catalogo
        mostrarProductos();

    } catch (error) {

        // Mostrar mensaje si ocurre un error
        console.error("Error al cargar los productos:", error);

    }

}


// =========================================
// 5. FUNCION PARA MOSTRAR LOS PRODUCTOS
// =========================================

function mostrarProductos() {

    // Obtener el contenedor del catalogo
    const contenedor = document.getElementById("lista-productos");

    // Obtener el texto del buscador
    const campoBusqueda = document.getElementById("buscar-producto");

    const busqueda = campoBusqueda.value.toLowerCase().trim();

    // Limpiar el catalogo
    contenedor.innerHTML = "";

    // Filtrar los productos por categoria y busqueda
    const productosFiltrados = productosCargados.filter(producto => {

        const coincideCategoria =
            categoriaSeleccionada === "Todos" ||
            producto.categoria.toLowerCase() === categoriaSeleccionada.toLowerCase();

        const coincideBusqueda =
            producto.nombre.toLowerCase().includes(busqueda) ||
            producto.descripcion.toLowerCase().includes(busqueda) ||
            producto.categoria.toLowerCase().includes(busqueda);

        return coincideCategoria && coincideBusqueda;

    });

    // Recorrer los productos filtrados
    productosFiltrados.forEach(producto => {

        // Crear una tarjeta para cada producto
        const tarjeta = document.createElement("article");

        tarjeta.classList.add("tarjeta-producto");

        // Crear el contenido de la tarjeta
        tarjeta.innerHTML = `
            <img src="${producto.imagen || 'https://placehold.co/300x200?text=Lady+Laurant'}"
                 alt="${producto.nombre}">

            <h3>${producto.nombre}</h3>

            <p>${producto.descripcion}</p>

            <p>
                <strong>Precio: $${producto.precio.toLocaleString("es-CO")}</strong>
            </p>

            <button onclick="solicitarProducto('${producto.nombre}')">
                Solicitar producto
            </button>
        `;

        // Agregar la tarjeta al catalogo
        contenedor.appendChild(tarjeta);

    });

    // Actualizar el contador de productos
    const contador = document.getElementById("contador-productos");

    if (contador) {
        contador.textContent = `Mostrando ${productosFiltrados.length} productos`;
    }

    // Mostrar mensaje si no hay productos
    if (productosFiltrados.length === 0) {
        contenedor.innerHTML = "<p>No encontramos productos con esa busqueda.</p>";
    }

}


// =========================================
// 6. FUNCION PARA BUSCAR PRODUCTOS
// =========================================

function buscarProductos() {

    // Actualizar los productos segun lo que escribe el cliente
    mostrarProductos();

}


// =========================================
// 7. FUNCION PARA FILTRAR POR CATEGORIA
// =========================================

function filtrarCategoria(categoria) {

    // Guardar la categoria seleccionada
    categoriaSeleccionada = categoria;

    // Obtener todos los botones de categorias
    const botones = document.querySelectorAll(".categorias button");

    // Recorrer los botones
    botones.forEach(boton => {

        // Quitar la seleccion anterior
        boton.classList.remove("categoria-activa");

        // Resaltar la categoria seleccionada
        if (boton.textContent.trim().toLowerCase() === categoria.toLowerCase()) {
            boton.classList.add("categoria-activa");
        }

    });

    // Mostrar los productos de esa categoria
    mostrarProductos();

}


// =========================================
// 8. FUNCION PARA SOLICITAR UN PRODUCTO
// =========================================

function solicitarProducto(nombreProducto) {

    // Escribir el producto seleccionado en el formulario
    document.getElementById("producto").value = nombreProducto;

    // Desplazarse hasta la seccion de contacto
    document.getElementById("contacto").scrollIntoView({
        behavior: "smooth"
    });

}


// =========================================
// 9. CARGAR LOS PRODUCTOS AL ABRIR LA PAGINA
// =========================================

document.addEventListener("DOMContentLoaded", cargarProductos);
