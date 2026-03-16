import express from "express";
import multer from "multer";
import fs from "fs";
import fetch from "node-fetch";
import path from "path";
import { fileURLToPath } from "url";
import { sendEmail } from "./mailer.js";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ----------------------
// MULTER SOLO EN MEMORIA
// ----------------------
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.fieldname === "cv" && !file.originalname.match(/\.(pdf|doc|docx)$/)) {
      return cb(new Error("Solo se permiten PDF o DOC para el CV"), false);
    }
    cb(null, true);
  }
}).fields([
  { name: "cv", maxCount: 1 },
  { name: "coverLetter", maxCount: 1 }
]);

// ----------------------
// POST /contact
// ----------------------
router.post("/contact", upload, async (req, res) => {
  try {
    const { name, email, center, city,/* subject,message  */} = req.body;

    const cvFile = req.files?.cv?.[0] || null;
    const coverLetterFile = req.files?.coverLetter?.[0] || null;

    // ----------------------
    // VALIDACIÓN: CV obligatorio
    // ----------------------
    if (!cvFile) {
      return res.status(400).json({
        success: false,
        message: "El CV (PDF) es obligatorio."
      });
    }

    // ----------------------
    // Convertir archivos a Base64
    // ----------------------
    const fileToBase64 = (file) =>
      file.buffer.toString("base64");

    const googlePayload = {
      name,
      email,
      center,
      city,
      /*subject,*/
     /* message,*/
      files: {}
    };

    // CV obligatorio
    googlePayload.files.cv = {
      filename: cvFile.originalname,
      mimeType: cvFile.mimetype,
      base64: fileToBase64(cvFile)
    };

    // Carta (opcional)
    if (coverLetterFile) {
      googlePayload.files.coverLetter = {
        filename: coverLetterFile.originalname,
        mimeType: coverLetterFile.mimetype,
        base64: fileToBase64(coverLetterFile)
      };
    }

    // ----------------------
    // ENVIAR A GOOGLE APPS SCRIPT
    // ----------------------
    const gsResponse = await fetch(process.env.APPS_SCRIPT_WEBAPP_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(googlePayload),
      redirect: "follow"
    });

   const text = await gsResponse.text();

let gsResult;
try {
  gsResult = JSON.parse(text);
} catch (e) {
  console.error("Error: Google no respondió con JSON. Respuesta recibida:", text.substring(0, 100));
  return res.status(500).json({ success: false, message: "Error en la conexión con Google" });
}

    // ----------------------
    // Enviar email con adjuntos (opcional)
    // ----------------------
    const attachments = [
      {
        filename: cvFile.originalname,
        content: cvFile.buffer
      }
    ];

    if (coverLetterFile) {
      attachments.push({
        filename: coverLetterFile.originalname,
        content: coverLetterFile.buffer
      });
    }

 /*   await sendEmail({
      subject: `Nueva solicitud: ${name ||"Sin asunto"}`,
      text: `
        Nombre: ${name}
        Email: ${email}
        Centro: ${center}
        Ciudad: ${city}
      `,
      attachments,
      replyTo: email
    });
*/
    return res.status(200).json({
      success: true,
      message: "Solicitud enviada correctamente.",
      googleResult: gsResult
    });

  } catch (error) {
    console.error("Error al procesar solicitud:", error);
    return res.status(500).json({
      success: false,
      message: "Error interno en el servidor.",
      error: error.message
    });
  }
});

export default router;
