
/* =========================================
   1. VARIABLES PRINCIPALES
========================================= */

let productosCargados = [];
let categoriaSeleccionada = "Todos";

// Recuperar el carrito guardado en el navegador
let carrito = JSON.parse(localStorage.getItem("carritoLadyLaurant")) || [];


/* =========================================
   2. GUARDAR EL CARRITO
========================================= */

function guardarCarrito() {

    localStorage.setItem(
        "carritoLadyLaurant",
        JSON.stringify(carrito)
    );

}


/* =========================================
   3. CONSULTAR PRODUCTOS
========================================= */

async function cargarProductos() {

    try {

        const respuesta = await fetch("/api/productos");

        if (!respuesta.ok) {
            throw new Error("No se pudieron cargar los productos.");
        }

        productosCargados = await respuesta.json();

        mostrarProductos();

    } catch (error) {

        console.error("Error al cargar productos:", error);

        const contenedor = document.getElementById("lista-productos");

        if (contenedor) {
            contenedor.innerHTML =
                "<p>No fue posible cargar los productos.</p>";
        }

    }

}


/* =========================================
   4. MOSTRAR PRODUCTOS
========================================= */

function mostrarProductos() {

    const contenedor = document.getElementById("lista-productos");
    const campoBusqueda = document.getElementById("buscar-producto");

    if (!contenedor || !campoBusqueda) return;

    const busqueda = campoBusqueda.value.toLowerCase().trim();

    contenedor.innerHTML = "";

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

    productosFiltrados.forEach(producto => {

        const tarjeta = document.createElement("article");

        tarjeta.classList.add("tarjeta-producto");

        const imagen = producto.imagen ||
            "https://placehold.co/300x200?text=Lady+Laurant";

        tarjeta.innerHTML = `
            <img src="${imagen}" alt="${producto.nombre}">

            <h3>${producto.nombre}</h3>

            <p>${producto.descripcion}</p>

            <p>
                <strong>
                    Precio: $${producto.precio.toLocaleString("es-CO")}
                </strong>
            </p>

            <button onclick="solicitarProducto('${producto.nombre}')">
                Solicitar producto
            </button>

            <button onclick="agregarAlCarrito('${producto._id}')">
                Agregar al carrito
            </button>
        `;

        contenedor.appendChild(tarjeta);

    });

    const contador = document.getElementById("contador-productos");

    if (contador) {
        contador.textContent =
            `Mostrando ${productosFiltrados.length} productos`;
    }

}


/* =========================================
   5. BUSCAR PRODUCTOS
========================================= */

function buscarProductos() {
    mostrarProductos();
}


/* =========================================
   6. FILTRAR POR CATEGORIA
========================================= */

function filtrarCategoria(categoria) {

    categoriaSeleccionada = categoria;

    const botones = document.querySelectorAll(".categorias button");

    botones.forEach(boton => {

        boton.classList.remove("categoria-activa");

        if (boton.textContent.trim().toLowerCase() === categoria.toLowerCase()) {
            boton.classList.add("categoria-activa");
        }

    });

    mostrarProductos();

}


/* =========================================
   7. SOLICITAR UN PRODUCTO
========================================= */

function solicitarProducto(nombreProducto) {

    const campoProducto = document.getElementById("producto");

    if (campoProducto) {
        campoProducto.value = nombreProducto;
    }

    const contacto = document.getElementById("contacto");

    if (contacto) {
        contacto.scrollIntoView({ behavior: "smooth" });
    } else {
        window.location.href =
            "contacto.html?producto=" + encodeURIComponent(nombreProducto);
    }

}


/* =========================================
   8. AGREGAR PRODUCTOS AL CARRITO
========================================= */

function agregarAlCarrito(idProducto) {

    const producto = productosCargados.find(
        item => item._id === idProducto
    );

    if (!producto) {
        alert("No encontramos ese producto.");
        return;
    }

    const productoExistente = carrito.find(
        item => item._id === idProducto
    );

    if (productoExistente) {

        productoExistente.cantidad++;

    } else {

        carrito.push({
            ...producto,
            cantidad: 1
        });

    }

    guardarCarrito();

    alert("¡Producto agregado al carrito!");

}


/* =========================================
   9. MOSTRAR EL CARRITO
========================================= */

function mostrarCarrito() {

    const contenedor = document.getElementById("lista-carrito");
    const totalElemento = document.getElementById("total-carrito");

    if (!contenedor || !totalElemento) return;

    contenedor.innerHTML = "";

    let total = 0;

    if (carrito.length === 0) {

        contenedor.innerHTML = "<p>Tu carrito está vacío.</p>";

        totalElemento.textContent = "Total: $0";

        return;
    }

    carrito.forEach(producto => {

        const subtotal = producto.precio * producto.cantidad;

        total += subtotal;

        const elemento = document.createElement("div");

        elemento.classList.add("producto-carrito");

        elemento.innerHTML = `
            <h3>${producto.nombre}</h3>

            <p>Precio: $${producto.precio.toLocaleString("es-CO")}</p>

            <p>Cantidad: ${producto.cantidad}</p>

            <p>Subtotal: $${subtotal.toLocaleString("es-CO")}</p>

            <button onclick="cambiarCantidad('${producto._id}', -1)">
                -
            </button>

            <button onclick="cambiarCantidad('${producto._id}', 1)">
                +
            </button>

            <button onclick="eliminarDelCarrito('${producto._id}')">
                Eliminar
            </button>
        `;

        contenedor.appendChild(elemento);

    });

    totalElemento.textContent =
        "Total: $" + total.toLocaleString("es-CO");

}


/* =========================================
   10. CAMBIAR CANTIDAD
========================================= */

function cambiarCantidad(idProducto, cambio) {

    const producto = carrito.find(
        item => item._id === idProducto
    );

    if (!producto) return;

    producto.cantidad += cambio;

    if (producto.cantidad <= 0) {

        eliminarDelCarrito(idProducto);

        return;
    }

    guardarCarrito();

    mostrarCarrito();

}


/* =========================================
   11. ELIMINAR PRODUCTOS
========================================= */

function eliminarDelCarrito(idProducto) {

    carrito = carrito.filter(
        producto => producto._id !== idProducto
    );

    guardarCarrito();

    mostrarCarrito();

}


/* =========================================
   12. FINALIZAR COMPRA POR WHATSAPP
========================================= */

function finalizarCompra() {

    if (carrito.length === 0) {

        alert("Tu carrito está vacío. Agrega productos antes de continuar.");

        return;
    }

    let mensajePedido =
        "¡Hola! Quiero realizar un pedido en Lady Laurant.\n\n";

    let total = 0;

    carrito.forEach(producto => {

        const subtotal = producto.precio * producto.cantidad;

        total += subtotal;

        mensajePedido +=
            "Producto: " + producto.nombre + "\n" +
            "Cantidad: " + producto.cantidad + "\n" +
            "Subtotal: $" + subtotal.toLocaleString("es-CO") + "\n\n";

    });

    mensajePedido +=
        "TOTAL DEL PEDIDO: $" + total.toLocaleString("es-CO");

    const enlaceWhatsApp =
        "https://wa.me/573027140362?text=" +
        encodeURIComponent(mensajePedido);

    window.open(enlaceWhatsApp, "_blank");

}


/* =========================================
   13. ENVIAR FORMULARIO DE CONTACTO
========================================= */

function enviarPedido(evento) {

    evento.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const producto = document.getElementById("producto").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const mensaje = document.getElementById("mensaje").value.trim();

    if (nombre === "" || producto === "" || telefono === "") {

        alert("Por favor, completa todos los campos obligatorios.");

        return;
    }

    const textoPedido =
        "¡Hola! Quiero realizar un pedido en Lady Laurant.\n\n" +
        "Nombre: " + nombre + "\n" +
        "Producto: " + producto + "\n" +
        "Teléfono: " + telefono + "\n" +
        "Detalles: " + (mensaje || "Sin detalles adicionales");

    const enlaceWhatsApp =
        "https://wa.me/573027140362?text=" +
        encodeURIComponent(textoPedido);

    window.open(enlaceWhatsApp, "_blank");

}


/* =========================================
   14. CARGAR PRODUCTO EN CONTACTO
========================================= */

function cargarProductoContacto() {

    const parametros = new URLSearchParams(window.location.search);

    const producto = parametros.get("producto");

    const campoProducto = document.getElementById("producto");

    if (producto && campoProducto) {
        campoProducto.value = producto;
    }

}


/* =========================================
   15. INICIAR FUNCIONES SEGUN LA PAGINA
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    // Consultar productos solamente en el catálogo
    if (document.getElementById("lista-productos")) {
        cargarProductos();
    }

    // Mostrar carrito solamente en su página
    if (document.getElementById("lista-carrito")) {
        mostrarCarrito();
    }

    // Cargar producto seleccionado en contacto
    cargarProductoContacto();

});
