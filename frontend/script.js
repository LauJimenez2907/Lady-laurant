
// 1. FUNCION PARA MOSTRAR UN MENSAJE
function mostrarMensaje() {
    alert("¡Bienvenido a Lady Laurant! Gracias por visitarnos.");
}


// 2. FUNCION PARA VALIDAR EL FORMULARIO
function enviarPedido(evento) {

    // Evita que la pagina se recargue
    evento.preventDefault();

    // Obtener los datos del formulario
    const nombre = document.getElementById("nombre").value;
    const producto = document.getElementById("producto").value;
    const telefono = document.getElementById("telefono").value;

    // Verificar que los campos esten completos
    if (nombre === "" || producto === "" || telefono === "") {

        alert("Por favor, completa todos los campos.");

        return;
    }

    // Mostrar mensaje de confirmacion
    alert("¡Gracias, " + nombre + "! Recibimos tu solicitud de " + producto + ".");

}
