
/* =========================================
   1. VARIABLES PRINCIPALES
========================================= */

// Guardar los productos que llegan de MongoDB
let productosCargados = [];

// Guardar la categoria seleccionada
let categoriaSeleccionada = "Todos";

// Guardar los productos agregados al carrito
let carrito = [];


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
            
            <button onclick="agregarAlCarrito('${producto._id}')">
    Agregar al carrito
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


 // =========================================
 // 9. FUNCION PARA AGREGAR PRODUCTOS AL CARRITO
 // =========================================

function agregarAlCarrito(idProducto) {

    

    // Buscar el producto seleccionado
    const producto = productosCargados.find(
        producto => producto._id === idProducto
    );

    // Verificar que el producto exista
    if (!producto) {
        alert("No encontramos ese producto.");
        return;
    }

    // Verificar si el producto ya esta en el carrito
    const productoExistente = carrito.find(
        item => item._id === idProducto
    );

    if (productoExistente) {

        // Aumentar la cantidad
        productoExistente.cantidad++;

    } else {

        // Agregar el producto por primera vez
        carrito.push({
            ...producto,
            cantidad: 1
        });

    }

    // Actualizar el carrito en pantalla
    mostrarCarrito();

    alert("¡Producto agregado al carrito!");

}

 // =========================================
 // 10. FUNCION PARA MOSTRAR EL CARRITO
 // =========================================

function mostrarCarrito() {

    // Obtener el contenedor del carrito
    const contenedor = document.getElementById("lista-carrito");

    // Obtener el espacio del total
    const totalElemento = document.getElementById("total-carrito");

    // Limpiar el contenido anterior
    contenedor.innerHTML = "";

    // Variable para calcular el total
    let total = 0;

    // Verificar si el carrito esta vacio
    if (carrito.length === 0) {

        contenedor.innerHTML = "<p>Tu carrito está vacío.</p>";

        totalElemento.textContent = "Total: $0";

        return;
    }

    // Recorrer los productos del carrito
    carrito.forEach(producto => {

        // Calcular el subtotal
        const subtotal = producto.precio * producto.cantidad;

        // Sumar al total
        total += subtotal;

        // Crear el elemento del producto
        const elemento = document.createElement("div");

        elemento.classList.add("producto-carrito");

        elemento.innerHTML = `
            <h3>${producto.nombre}</h3>

            <p>Precio: $${producto.precio.toLocaleString("es-CO")}</p>

            <p>Cantidad: ${producto.cantidad}</p>

            <p>Subtotal: $${subtotal.toLocaleString("es-CO")}</p>
        `;

        // Agregar el producto al carrito visual
        contenedor.appendChild(elemento);

    });

    // Mostrar el total de la compra
    totalElemento.textContent =
        "Total: $" + total.toLocaleString("es-CO");

}


 // =========================================
 // 11. FUNCION PARA FINALIZAR LA COMPRA
 // =========================================

function finalizarCompra() {

    // Verificar si el carrito esta vacio
    if (carrito.length === 0) {

        alert("Tu carrito está vacío. Agrega productos antes de continuar.");

        return;
    }

    // Crear el mensaje de WhatsApp
    let mensajePedido = "¡Hola! Quiero realizar un pedido en Lady Laurant.\n\n";

    let total = 0;

    // Recorrer los productos del carrito
    carrito.forEach(producto => {

        const subtotal = producto.precio * producto.cantidad;

        total += subtotal;

        mensajePedido +=
            "Producto: " + producto.nombre + "\n" +
            "Cantidad: " + producto.cantidad + "\n" +
            "Subtotal: $" + subtotal.toLocaleString("es-CO") + "\n\n";

    });

    // Agregar el total de la compra
    mensajePedido +=
        "TOTAL DEL PEDIDO: $" + total.toLocaleString("es-CO");

    // Preparar el enlace de WhatsApp
    const enlaceWhatsApp =
        "https://wa.me/573027140362?text=" +
        encodeURIComponent(mensajePedido);

    // Abrir WhatsApp
    window.open(enlaceWhatsApp, "_blank");

}
