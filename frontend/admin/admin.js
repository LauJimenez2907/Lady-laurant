
// =========================================
// 1. SELECCIONAR ELEMENTOS DEL HTML
// =========================================

const formulario = document.getElementById("form-producto");
const listaAdministracion = document.getElementById("lista-administracion");
const mensaje = document.getElementById("mensaje");

// =========================================
// 2. CONSULTAR PRODUCTOS
// =========================================

async function cargarProductosAdmin() {

    try {

        const respuesta = await fetch("/api/productos");

        if (!respuesta.ok) {
            throw new Error("No se pudieron consultar los productos.");
        }

        const productos = await respuesta.json();

        mostrarProductosAdmin(productos);

    } catch (error) {

        console.error(error);

        listaAdministracion.innerHTML =
            "<p>Error al cargar los productos.</p>";
    }
}

// =========================================
// 3. MOSTRAR PRODUCTOS
// =========================================

function mostrarProductosAdmin(productos) {

    listaAdministracion.innerHTML = "";

    if (productos.length === 0) {

        listaAdministracion.innerHTML =
            "<p>No hay productos registrados.</p>";

        return;
    }

    productos.forEach(producto => {

        const tarjeta = document.createElement("div");

        tarjeta.classList.add("producto-admin");

        tarjeta.innerHTML = `
            <h3>${producto.nombre}</h3>

            <p>${producto.descripcion}</p>

            <p>
                Precio: $${producto.precio.toLocaleString("es-CO")}
            </p>

            <p>Categoría: ${producto.categoria}</p>

            <button onclick="editarProducto('${producto._id}')">
                Editar
            </button>

            <button onclick="eliminarProducto('${producto._id}')">
                Eliminar
            </button>
        `;

        listaAdministracion.appendChild(tarjeta);
    });
}

// =========================================
// 4. GUARDAR O ACTUALIZAR PRODUCTOS
// =========================================

formulario.addEventListener("submit", async (evento) => {

    evento.preventDefault();

    const id = document.getElementById("producto-id").value;

    const producto = {

        nombre: document.getElementById("nombre").value.trim(),

        descripcion: document.getElementById("descripcion").value.trim(),

        precio: Number(document.getElementById("precio").value),

        categoria: document.getElementById("categoria").value.trim(),

        imagen: document.getElementById("imagen").value.trim()
    };

    try {

        const respuesta = await fetch(
            id ? `/api/productos/${id}` : "/api/productos",
            {
                method: id ? "PUT" : "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(producto)
            }
        );

        if (!respuesta.ok) {
            throw new Error("No se pudo guardar el producto.");
        }

        mensaje.textContent = id
            ? "Producto actualizado correctamente."
            : "Producto agregado correctamente.";

        limpiarFormulario();

        cargarProductosAdmin();

    } catch (error) {

        console.error(error);

        mensaje.textContent = "Ocurrió un error al guardar el producto.";
    }
});

// =========================================
// 5. EDITAR PRODUCTOS
// =========================================

async function editarProducto(id) {

    try {

        const respuesta = await fetch(`/api/productos/${id}`);

        if (!respuesta.ok) {
            throw new Error("No se encontró el producto.");
        }

        const producto = await respuesta.json();

        document.getElementById("producto-id").value = producto._id;

        document.getElementById("nombre").value = producto.nombre;

        document.getElementById("descripcion").value = producto.descripcion;

        document.getElementById("precio").value = producto.precio;

        document.getElementById("categoria").value = producto.categoria;

        document.getElementById("imagen").value = producto.imagen || "";

        document.getElementById("boton-guardar").textContent =
            "Actualizar producto";

        formulario.scrollIntoView({
            behavior: "smooth"
        });

    } catch (error) {

        console.error(error);

        mensaje.textContent = "No se pudo cargar el producto.";
    }
}

// =========================================
// 6. ELIMINAR PRODUCTOS
// =========================================

async function eliminarProducto(id) {

    const confirmar = confirm(
        "¿Estás segura de que deseas eliminar este producto?"
    );

    if (!confirmar) return;

    try {

        const respuesta = await fetch(`/api/productos/${id}`, {
            method: "DELETE"
        });

        if (!respuesta.ok) {
            throw new Error("No se pudo eliminar el producto.");
        }

        mensaje.textContent = "Producto eliminado correctamente.";

        cargarProductosAdmin();

    } catch (error) {

        console.error(error);

        mensaje.textContent = "Ocurrió un error al eliminar el producto.";
    }
}

// =========================================
// 7. LIMPIAR FORMULARIO
// =========================================

function limpiarFormulario() {

    formulario.reset();

    document.getElementById("producto-id").value = "";

    document.getElementById("boton-guardar").textContent =
        "Guardar producto";
}

// =========================================
// 8. CARGAR PRODUCTOS AL ABRIR EL PANEL
// =========================================

document.addEventListener("DOMContentLoaded", cargarProductosAdmin);
