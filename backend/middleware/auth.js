
/* =========================================
   1. IMPORTAR HERRAMIENTAS
========================================= */

const crypto = require("node:crypto");

/* =========================================
   2. CREAR FIRMA DE SEGURIDAD
========================================= */

function crearFirma(datos) {

    return crypto
        .createHmac("sha256", process.env.SESSION_SECRET)
        .update(datos)
        .digest("base64url");
}

/* =========================================
   3. VERIFICAR SESIÓN DEL ADMINISTRADOR
========================================= */

function verificarAdministrador(req, res, next) {

    try {

        const cookie = req.headers.cookie || "";

        const sesion = cookie
            .split(";")
            .map(parte => parte.trim())
            .find(parte => parte.startsWith("ladylaurant_sesion="));

        if (!sesion) {
            return res.status(401).json({
                mensaje: "Debes iniciar sesión."
            });
        }

        const token = sesion.split("=").slice(1).join("=");

        const partes = token.split(".");

        if (partes.length !== 2) {
            return res.status(401).json({
                mensaje: "Sesión inválida."
            });
        }

        const [datos, firmaRecibida] = partes;

        const firmaEsperada = crearFirma(datos);

        const firmaRecibidaBuffer = Buffer.from(firmaRecibida);
        const firmaEsperadaBuffer = Buffer.from(firmaEsperada);

        if (
            firmaRecibidaBuffer.length !== firmaEsperadaBuffer.length ||
            !crypto.timingSafeEqual(
                firmaRecibidaBuffer,
                firmaEsperadaBuffer
            )
        ) {
            return res.status(401).json({
                mensaje: "Sesión no autorizada."
            });
        }

        const informacion = JSON.parse(
            Buffer.from(datos, "base64url").toString()
        );

        if (
            informacion.rol !== "administrador" ||
            informacion.expiracion < Date.now()
        ) {
            return res.status(401).json({
                mensaje: "Tu sesión ha expirado."
            });
        }

        next();

    } catch (error) {

        return res.status(401).json({
            mensaje: "No se pudo verificar la sesión."
        });

    }
}

/* =========================================
   4. EXPORTAR LA PROTECCIÓN
========================================= */

module.exports = verificarAdministrador;
