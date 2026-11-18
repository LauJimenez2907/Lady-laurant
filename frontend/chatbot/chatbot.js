
// =========================================
// 1. CREAR EL CONTENEDOR DEL CHATBOT
// =========================================

const chatbot = document.createElement("div");

chatbot.id = "chatbot";

chatbot.innerHTML = `
    <button id="chatbot-boton" type="button">
        Chat Lady Laurant
    </button>

    <div id="chatbot-ventana" style="display: none;">

        <div id="chatbot-encabezado">
            <h3>Asistente Lady Laurant</h3>
            <button id="chatbot-cerrar" type="button">X</button>
        </div>

        <div id="chatbot-mensajes">
            <p class="mensaje-bot">
                ¡Hola! Bienvenido a Lady Laurant.
                ¿En qué podemos ayudarte?
            </p>
        </div>

        <form id="chatbot-formulario">
            <input
                type="text"
                id="chatbot-entrada"
                placeholder="Escribe tu pregunta..."
                required
            >

            <button type="submit">Enviar</button>
        </form>

    </div>
`;

// Agregar el chatbot a la página
document.body.appendChild(chatbot);

// =========================================
// 2. SELECCIONAR ELEMENTOS
// =========================================

const botonChat = document.getElementById("chatbot-boton");
const ventanaChat = document.getElementById("chatbot-ventana");
const botonCerrar = document.getElementById("chatbot-cerrar");
const formularioChat = document.getElementById("chatbot-formulario");
const entradaChat = document.getElementById("chatbot-entrada");
const mensajesChat = document.getElementById("chatbot-mensajes");

// =========================================
// 3. ABRIR Y CERRAR EL CHATBOT
// =========================================

botonChat.addEventListener("click", () => {
    ventanaChat.style.display = "block";
});

botonCerrar.addEventListener("click", () => {
    ventanaChat.style.display = "none";
});

// =========================================
// 4. MOSTRAR MENSAJES
// =========================================

function agregarMensaje(texto, clase) {

    const mensaje = document.createElement("p");

    mensaje.classList.add(clase);

    mensaje.textContent = texto;

    mensajesChat.appendChild(mensaje);

    mensajesChat.scrollTop = mensajesChat.scrollHeight;
}

// =========================================
// 5. RESPUESTAS DEL ASISTENTE
// =========================================

function responderPregunta(pregunta) {

    const texto = pregunta.toLowerCase();

    if (texto.includes("precio") || texto.includes("cuesta")) {

        return "Puedes consultar los precios en nuestro catálogo.";

    } else if (texto.includes("pedido") || texto.includes("comprar")) {

        return "Puedes agregar productos al carrito y finalizar tu pedido por WhatsApp.";

    } else if (texto.includes("envío") || texto.includes("envio")) {

        return "Para consultar el costo y disponibilidad del envío, contáctanos por WhatsApp.";

    } else if (texto.includes("personalizado") || texto.includes("personalizar")) {

        return "¡Claro! Creamos detalles personalizados. Cuéntanos qué tienes en mente.";

    } else if (texto.includes("horario")) {

        return "Para conocer nuestros horarios de atención, escríbenos por WhatsApp.";

    } else if (
        texto.includes("hola") ||
        texto.includes("buenas")
    ) {

        return "¡Hola! Gracias por visitar Lady Laurant. ¿Qué detalle estás buscando?";

    } else if (texto.includes("gracias")) {

        return "¡Con mucho gusto! Gracias por elegir Lady Laurant.";

    } else {

        return "No tengo esa información todavía. Puedes comunicarte con nosotros por WhatsApp para recibir atención personalizada.";
    }
}

// =========================================
// 6. ENVIAR MENSAJES
// =========================================

formularioChat.addEventListener("submit", (evento) => {

    evento.preventDefault();

    const pregunta = entradaChat.value.trim();

    if (pregunta === "") return;

    agregarMensaje(pregunta, "mensaje-usuario");

    const respuesta = responderPregunta(pregunta);

    agregarMensaje(respuesta, "mensaje-bot");

    entradaChat.value = "";
});

// =========================================
// 7. FINALIZAR CONFIGURACION
// =========================================

console.log("Chatbot de Lady Laurant iniciado correctamente.");
