
// =========================================
// 1. CREAR EL CONTENEDOR DEL CHATBOT
// =========================================

const chatbot = document.createElement("div");

chatbot.id = "chatbot";

chatbot.innerHTML = `
    <button id="chatbot-boton" type="button" aria-label="Abrir asistente">
        <span class="chatbot-icono">✦</span>
        <span>¿Te ayudamos?</span>
    </button>

    <div id="chatbot-ventana" style="display: none;">

        <div id="chatbot-encabezado">
            <div class="chatbot-marca">
                <div class="chatbot-avatar">LL</div>
                <div>
                    <h3>Asistente Lady Laurant</h3>
                    <span class="chatbot-estado">En línea para ayudarte</span>
                </div>
            </div>

            <button id="chatbot-cerrar" type="button" aria-label="Cerrar chat">
                ×
            </button>
        </div>

        <div id="chatbot-mensajes">
            <div class="chatbot-bienvenida">
                <p class="mensaje-bot">
                    ¡Hola! Bienvenido a Lady Laurant.
                    <br><br>
                    Soy tu asistente virtual. Estoy aquí para ayudarte
                    a encontrar ese detalle especial.
                    <br><br>
                    ¿Qué te gustaría saber?
                </p>

                <div class="chatbot-sugerencias">
                    <button type="button" class="chatbot-opcion">Ver productos</button>
                    <button type="button" class="chatbot-opcion">Consultar precios</button>
                    <button type="button" class="chatbot-opcion">Hacer un pedido</button>
                </div>
            </div>
        </div>

        <form id="chatbot-formulario">
            <input
                type="text"
                id="chatbot-entrada"
                placeholder="Escribe tu pregunta..."
                autocomplete="off"
                required
            >

            <button type="submit" aria-label="Enviar mensaje">
                ➤
            </button>
        </form>

        <div class="chatbot-pie">
            Detalles hechos con amor ♡
        </div>

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
    ventanaChat.style.display = "flex";
    entradaChat.focus();
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
// 5. NORMALIZAR TEXTO
// =========================================

function normalizarTexto(texto) {

    return texto
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim();
}


// =========================================
// 6. RESPUESTAS DEL ASISTENTE
// =========================================

function responderPregunta(pregunta) {

    const texto = normalizarTexto(pregunta);

    // SALUDOS
    if (
        texto.includes("hola") ||
        texto.includes("buenas") ||
        texto.includes("buenos dias") ||
        texto.includes("buenas tardes") ||
        texto.includes("buenas noches")
    ) {
        return "¡Hola! Qué alegría tenerte en Lady Laurant. ♡ ¿Buscas un regalo especial o quieres conocer nuestros productos?";
    }

    // PRODUCTOS Y CATÁLOGO
    if (
        texto.includes("catalogo") ||
        texto.includes("productos") ||
        texto.includes("que venden") ||
        texto.includes("que ofrecen")
    ) {
        return "¡Tenemos detalles para diferentes ocasiones! Encontrarás flores eternas, anchetas saludables, cajas sorpresa, ramos de limpiapipas, pocillos, cuadros personalizados, peluches, kits de maquillaje, ruletas de fotos y cajas Vision Board. Puedes verlos en nuestra sección Catálogo.";
    }

    // PRECIOS
    if (
        texto.includes("precio") ||
        texto.includes("precios") ||
        texto.includes("cuanto cuesta") ||
        texto.includes("cuanto vale") ||
        texto.includes("valor")
    ) {
        return "Estos son algunos de nuestros precios de referencia:\n\n• Flores eternas: $45.000\n• Anchetas saludables: $55.000\n• Cajas sorpresa: $60.000\n• Ramos de limpiapipas: $35.000\n• Pocillos personalizados: $30.000\n• Cuadros personalizados: $40.000\n• Peluches sorpresa: $50.000\n• Kits de maquillaje: $65.000\n• Ruleta de fotos: $45.000\n• Caja Vision Board: $55.000\n\nLos valores pueden variar según la personalización. ¡Pregúntanos por tu idea!";
    }

    // FLORES
    if (texto.includes("flores") || texto.includes("ramo")) {
        return "¡Las flores son un detalle precioso! Tenemos flores eternas desde $45.000 y ramos de limpiapipas desde $35.000. También podemos orientarte con una idea personalizada.";
    }

    // ANCHETAS
    if (texto.includes("ancheta") || texto.includes("desayuno")) {
        return "¡Nuestras anchetas son ideales para sorprender! Tenemos anchetas saludables con un precio de referencia de $55.000. Escríbenos para conocer las opciones disponibles.";
    }

    // CAJAS SORPRESA
    if (texto.includes("caja sorpresa") || texto.includes("cajas sorpresa")) {
        return "¡Una caja sorpresa es una forma muy especial de regalar! Su precio de referencia es $60.000. Podemos orientarte para personalizarla según la ocasión.";
    }

    // PERSONALIZACIONES
    if (
        texto.includes("personaliz") ||
        texto.includes("a mi gusto") ||
        texto.includes("a mi medida")
    ) {
        return "¡Nos encanta hacer realidad tus ideas! ♡ Cuéntanos qué producto tienes en mente, los colores que deseas y para qué ocasión es. Te ayudaremos a crear un detalle especial.";
    }

    // PEDIDOS Y COMPRAS
    if (
        texto.includes("pedido") ||
        texto.includes("comprar") ||
        texto.includes("encargar") ||
        texto.includes("hacer un pedido")
    ) {
        return "¡Qué emoción que quieras comprar en Lady Laurant! Puedes agregar tus productos al carrito y continuar tu pedido por WhatsApp. Si deseas algo personalizado, también puedes escribirnos directamente.";
    }

    // ENVÍOS
    if (
        texto.includes("envio") ||
        texto.includes("domicilio") ||
        texto.includes("entrega") ||
        texto.includes("transport")
    ) {
        return "Para consultar la disponibilidad, el tiempo de entrega y el costo del envío, necesitamos conocer tu ubicación. Escríbenos por WhatsApp y te ayudaremos.";
    }

    // PAGOS
    if (
        texto.includes("pago") ||
        texto.includes("transferencia") ||
        texto.includes("consignacion") ||
        texto.includes("anticipo")
    ) {
        return "Para conocer los medios de pago y las condiciones de tu pedido, comunícate con nuestro equipo por WhatsApp. Te confirmaremos la información antes de realizar cualquier pago.";
    }

    // HORARIOS
    if (
        texto.includes("horario") ||
        texto.includes("atienden") ||
        texto.includes("abren")
    ) {
        return "Para conocer nuestros horarios de atención, escríbenos por WhatsApp. ¡Con gusto te atenderemos!";
    }

    // CONTACTO
    if (
        texto.includes("contacto") ||
        texto.includes("whatsapp") ||
        texto.includes("telefono") ||
        texto.includes("comunicar")
    ) {
        return "¡Estamos para atenderte! Puedes comunicarte con nosotros por WhatsApp al 302 714 0362.";
    }

    // UBICACIÓN
    if (
        texto.includes("ubicacion") ||
        texto.includes("direccion") ||
        texto.includes("donde estan")
    ) {
        return "Para conocer nuestra ubicación y consultar las opciones de entrega, escríbenos por WhatsApp.";
    }

    // AGRADECIMIENTOS
    if (
        texto.includes("gracias") ||
        texto.includes("muchas gracias")
    ) {
        return "¡Con muchísimo gusto! Gracias por pensar en Lady Laurant para regalar momentos especiales. ♡";
    }

    // DESPEDIDAS
    if (
        texto.includes("adios") ||
        texto.includes("hasta luego") ||
        texto.includes("chao")
    ) {
        return "¡Gracias por visitarnos! Esperamos ayudarte pronto. Recuerda que en Lady Laurant creamos detalles hechos con amor. ♡";
    }

    // RESPUESTA GENERAL
    return "¡Gracias por escribirnos! Todavía no tengo esa respuesta. Puedes preguntarme por nuestros productos, precios, personalizaciones, pedidos o envíos. También puedes comunicarte con nuestro equipo por WhatsApp al 302 714 0362.";
}


// =========================================
// 7. ENVIAR MENSAJES
// =========================================

function enviarMensaje(pregunta) {

    const texto = pregunta.trim();

    if (texto === "") return;

    agregarMensaje(texto, "mensaje-usuario");

    const respuesta = responderPregunta(texto);

    agregarMensaje(respuesta, "mensaje-bot");

    entradaChat.value = "";
    entradaChat.focus();
}


// =========================================
// 8. EVENTO DEL FORMULARIO
// =========================================

formularioChat.addEventListener("submit", (evento) => {

    evento.preventDefault();

    enviarMensaje(entradaChat.value);

});


// =========================================
// 9. BOTONES DE PREGUNTAS RÁPIDAS
// =========================================

document.querySelectorAll(".chatbot-opcion").forEach((boton) => {

    boton.addEventListener("click", () => {

        enviarMensaje(boton.textContent);

    });

});


// =========================================
// 10. FINALIZAR CONFIGURACIÓN
// =========================================

console.log("Chatbot de Lady Laurant iniciado correctamente.");
