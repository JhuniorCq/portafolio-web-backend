import {
  EMAIL_HOST,
  EMAIL_PASS,
  EMAIL_PORT,
  EMAIL_USER,
} from "../config/config.js";
import nodemailer from "nodemailer";
import EmailSenderValidations from "../validations/EmailSenderValidations.js";

class EmailController {
  static async send(req, res, next) {
    try {
      // Validación de los datos
      const emailSenderValidated = EmailSenderValidations.send({
        emailData: req.body,
      });

      if (!emailSenderValidated.success) {
        const error = new Error("Datos inválidos");
        error.statusCode = 400;
        throw error;
      }

      const { senderNames, emailMessage, emailSender } =
        emailSenderValidated.data;

      // Configuración del transporter
      const transporter = nodemailer.createTransport({
        host: EMAIL_HOST, // Servidor SMTP (aquí Gmail como ejemplo)
        port: EMAIL_PORT, // Puerto SMTP (587 para STARTTLS)
        secure: false, // false para STARTTLS (true si usas el puerto 465)
        auth: {
          user: EMAIL_USER, // Tu correo electrónico
          pass: EMAIL_PASS, // Contraseña de aplicación (no tu contraseña normal)
        },
      });

      // Configuración del email
      const mailOptions = {
        from: emailSender,
        replyTo: emailSender,
        to: EMAIL_USER,
        subject: "Contacto - Portafolio Web",
        html: `<p>De: <strong>${emailSender}</strong></p><p>Nombres: ${senderNames}</p><p>Mensaje: ${emailMessage}</p>`,
        text: `De: ${emailSender}\nNombres: ${senderNames}\nMensaje: ${emailMessage}`,
      };

      // Envío del email
      await transporter.sendMail(mailOptions);

      res.json({
        success: true,
        message: "Correo enviado",
      });
    } catch (error) {
      console.error("Error en send en EmailController", error.message);
      next(error);
    }
  }
}

export default EmailController;
