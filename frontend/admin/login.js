
// =====================================
// INICIO DE SESIÓN DEL ADMINISTRADOR
// =====================================

const formularioLogin = document.getElementById("login-formulario");
const campoPassword = document.getElementById("login-password");
const mensajeLogin = document.getElementById("login-mensaje");
const botonLogin = document.getElementById("login-boton");

// =====================================
// VERIFICAR SI YA EXISTE UNA SESIÓN
// =====================================

async function verificarSesion() {
    try {
        const respuesta = await fetch("/api/auth/verificar", {
            credentials: "same-origin"
        });

        if (respuesta.ok) {
            window.location.href = "/admin/panel.html";
        }
    } catch (error) {
        console.error("Error al verificar la sesión:", error);
    }
}

// =====================================
// INICIAR SESIÓN
// =====================================

formularioLogin.addEventListener("submit", async function(evento) {
    evento.preventDefault();

    const password = campoPassword.value;

    mensajeLogin.textContent = "Verificando contraseña...";
    botonLogin.disabled = true;

    try {
        const respuesta = await fetch("/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "same-origin",
            body: JSON.stringify({ password: password })
        });

        const datos = await respuesta.json();

        if (!respuesta.ok) {
            mensajeLogin.textContent = datos.mensaje || "No se pudo iniciar sesión.";
            campoPassword.value = "";
            return;
        }

        mensajeLogin.style.color = "#4b9462";
        mensajeLogin.textContent = "¡Bienvenida! Ingresando al panel...";

        window.location.href = "/admin/panel.html";

    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        mensajeLogin.textContent = "No se pudo conectar con el servidor.";
    } finally {
        botonLogin.disabled = false;
    }
});

// =====================================
// EJECUTAR AL CARGAR LA PÁGINA
// =====================================

verificarSesion();
