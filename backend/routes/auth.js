
const express = require("express");
const crypto = require("node:crypto");

const router = express.Router();

// =====================================
// CREAR FIRMA DE SEGURIDAD
// =====================================

function crearFirma(datos) {
    return crypto
        .createHmac("sha256", process.env.SESSION_SECRET)
        .update(datos)
        .digest("base64url");
}

// =====================================
// INICIAR SESIÓN
// =====================================

router.post("/login", (req, res) => {
    const { password } = req.body;

    if (!process.env.ADMIN_PASSWORD || !process.env.SESSION_SECRET) {
        return res.status(500).json({
            mensaje: "La autenticación no está configurada."
        });
    }

    if (typeof password !== "string") {
        return res.status(400).json({
            mensaje: "Debes escribir la contraseña."
        });
    }

    const contraseñaRecibida = crypto
        .createHash("sha256")
        .update(password)
        .digest();

    const contraseñaCorrecta = crypto
        .createHash("sha256")
        .update(process.env.ADMIN_PASSWORD)
        .digest();

    const coincide = crypto.timingSafeEqual(
        contraseñaRecibida,
        contraseñaCorrecta
    );

    if (!coincide) {
        return res.status(401).json({
            mensaje: "La contraseña es incorrecta."
        });
    }

    const informacion = {
        rol: "administrador",
        expiracion: Date.now() + (2 * 60 * 60 * 1000)
    };

    const datos = Buffer
        .from(JSON.stringify(informacion))
        .toString("base64url");

    const firma = crearFirma(datos);
    const token = `${datos}.${firma}`;

    res.cookie("ladylaurant_sesion", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 2 * 60 * 60 * 1000
    });

    res.json({
        mensaje: "Sesión iniciada correctamente."
    });
});

// =====================================
// VERIFICAR SESIÓN
// =====================================

const verificarAdministrador = require("../middleware/auth");

router.get("/verificar", verificarAdministrador, (req, res) => {
    res.json({
        autenticado: true,
        mensaje: "Administrador autenticado."
    });
});

// =====================================
// CERRAR SESIÓN
// =====================================

router.post("/logout", (req, res) => {
    res.clearCookie("ladylaurant_sesion", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/"
    });

    res.json({
        mensaje: "Sesión cerrada correctamente."
    });
});

module.exports = router;
