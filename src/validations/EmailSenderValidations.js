import { z } from "zod";

const emailSenderSchema = z.object({
  senderNames: z.string().min(1, { message: "El nombre no puede estar vacío" }),
  emailSender: z.string().email({ message: "El correo no es válido" }),
  emailMessage: z
    .string()
    .min(1, { message: "El mensaje no puede estar vacío" }),
});

class EmailSenderValidations {
  static send({ emailData }) {
    return emailSenderSchema.safeParse(emailData);
  }
}

export default EmailSenderValidations;
