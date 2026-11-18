
// =====================================
// ELEMENTOS DEL PANEL ADMINISTRATIVO
// =====================================

const formulario = document.getElementById("form-producto");
const listaProductos = document.getElementById("lista-administracion");
const mensaje = document.getElementById("mensaje");
const botonGuardar = document.getElementById("boton-guardar");
const botonCerrarSesion = document.getElementById("cerrar-sesion");

// =====================================
// VERIFICAR SESIÓN DEL ADMINISTRADOR
// =====================================

async function verificarSesionAdmin() {
    try {
        const respuesta = await fetch("/api/auth/verificar", {
            credentials: "same-origin"
        });

        if (!respuesta.ok) {
            window.location.href = "/admin/index.html";
            return false;
        }

        return true;

    } catch (error) {
        console.error("Error al verificar sesión:", error);
        window.location.href = "/admin/index.html";
        return false;
    }
}

// =====================================
// CARGAR PRODUCTOS
// =====================================

async function cargarProductosAdmin() {
    try {
        const respuesta = await fetch("/api/productos", {
            credentials: "same-origin"
        });

        if (!respuesta.ok) {
            throw new Error("No se pudieron cargar los productos.");
        }

        const productos = await respuesta.json();

        listaProductos.innerHTML = "";

        productos.forEach(producto => {
            const tarjeta = document.createElement("div");
            tarjeta.classList.add("producto-admin");

            const nombre = document.createElement("h3");
            nombre.textContent = producto.nombre;

            const descripcion = document.createElement("p");
            descripcion.textContent = producto.descripcion;

            const precio = document.createElement("p");
            precio.textContent = "$" + Number(producto.precio).toLocaleString("es-CO");

            const categoria = document.createElement("p");
            categoria.textContent = "Categoría: " + producto.categoria;

            const editar = document.createElement("button");
            editar.type = "button";
            editar.textContent = "Editar";
            editar.addEventListener("click", () => editarProducto(producto._id));

            const eliminar = document.createElement("button");
            eliminar.type = "button";
            eliminar.textContent = "Eliminar";
            eliminar.addEventListener("click", () => eliminarProducto(producto._id));

            tarjeta.append(nombre, descripcion, precio, categoria, editar, eliminar);
            listaProductos.appendChild(tarjeta);
        });

        if (productos.length === 0) {
            listaProductos.textContent = "Todavía no hay productos registrados.";
        }

    } catch (error) {
        console.error("Error:", error);
        listaProductos.textContent = "No se pudieron cargar los productos.";
    }
}

// =====================================
// GUARDAR O ACTUALIZAR PRODUCTO
// =====================================

formulario.addEventListener("submit", async function(evento) {
    evento.preventDefault();

    const id = document.getElementById("producto-id").value;

    const producto = {
        nombre: document.getElementById("nombre").value,
        descripcion: document.getElementById("descripcion").value,
        precio: Number(document.getElementById("precio").value),
        categoria: document.getElementById("categoria").value,
        imagen: document.getElementById("imagen").value
    };

    const metodo = id ? "PUT" : "POST";

    const url = id
        ? `/api/productos/${id}`
        : "/api/productos";

    try {
        const respuesta = await fetch(url, {
            method: metodo,
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "same-origin",
            body: JSON.stringify(producto)
        });

        const datos = await respuesta.json();

        if (!respuesta.ok) {
            mensaje.textContent = datos.mensaje || "No se pudo guardar el producto.";
            return;
        }

        mensaje.textContent = "Producto guardado correctamente.";

        limpiarFormulario();
        await cargarProductosAdmin();

    } catch (error) {
        console.error("Error al guardar:", error);
        mensaje.textContent = "Error al conectar con el servidor.";
    }
});

// =====================================
// EDITAR PRODUCTO
// =====================================

async function editarProducto(id) {
    try {
        const respuesta = await fetch(`/api/productos/${id}`);

        if (!respuesta.ok) {
            throw new Error("No se pudo consultar el producto.");
        }

        const producto = await respuesta.json();

        document.getElementById("producto-id").value = producto._id;
        document.getElementById("nombre").value = producto.nombre;
        document.getElementById("descripcion").value = producto.descripcion;
        document.getElementById("precio").value = producto.precio;
        document.getElementById("categoria").value = producto.categoria;
        document.getElementById("imagen").value = producto.imagen;

        botonGuardar.textContent = "Actualizar producto";

        formulario.scrollIntoView({
            behavior: "smooth"
        });

    } catch (error) {
        console.error("Error al editar:", error);
        mensaje.textContent = "No se pudo cargar el producto.";
    }
}

// =====================================
// ELIMINAR PRODUCTO
// =====================================

async function eliminarProducto(id) {
    const confirmar = confirm("¿Estás segura de que deseas eliminar este producto?");

    if (!confirmar) {
        return;
    }

    try {
        const respuesta = await fetch(`/api/productos/${id}`, {
            method: "DELETE",
            credentials: "same-origin"
        });

        const datos = await respuesta.json();

        if (!respuesta.ok) {
            mensaje.textContent = datos.mensaje || "No se pudo eliminar el producto.";
            return;
        }

        mensaje.textContent = "Producto eliminado correctamente.";

        await cargarProductosAdmin();

    } catch (error) {
        console.error("Error al eliminar:", error);
        mensaje.textContent = "Error al conectar con el servidor.";
    }
}

// =====================================
// LIMPIAR FORMULARIO
// =====================================

function limpiarFormulario() {
    formulario.reset();

    document.getElementById("producto-id").value = "";

    botonGuardar.textContent = "Guardar producto";

    mensaje.textContent = "";
}

// =====================================
// CERRAR SESIÓN
// =====================================

if (botonCerrarSesion) {
    botonCerrarSesion.addEventListener("click", async function() {
        try {
            await fetch("/api/auth/logout", {
                method: "POST",
                credentials: "same-origin"
            });

            window.location.href = "/admin/index.html";

        } catch (error) {
            console.error("Error al cerrar sesión:", error);
            mensaje.textContent = "No se pudo cerrar la sesión.";
        }
    });
}

// =====================================
// INICIAR PANEL
// =====================================

document.addEventListener("DOMContentLoaded", async function() {
    const autenticado = await verificarSesionAdmin();

    if (autenticado) {
        await cargarProductosAdmin();
    }
});
