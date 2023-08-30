import nodemailer from "nodemailer";
import dotenv from "dotenv"
import { IAuthMailerService } from "./auth.ports";

dotenv.config()

export class AuthMailerService implements IAuthMailerService {
transporter = nodemailer.createTransport(
    {
        service: "Gmail",
        auth: {
            user: process.env.NODEMAILER_USER,
            pass: process.env.NODEMAILER_PASS
        }
})

// sendPasswordToEmail = async (email: string, password: string): Promise<void> => {
//     await this.transporter.sendMail({
//         from: `<${process.env.NODEMAILER_USER}>`,
//         to: email,
//         subject: "Sua senha de acesso",
//         html: `<p>Sua senha de acesso é: ${password} </p>`,
//         text: `Sua senha de acesso é: ${password} `,
//       });
// }

sendResetPasswordLink = async (email:string, resetLink: string): Promise<void> => {
    await this.transporter.sendMail({
        from: `<${process.env.NODEMAILER_USER}>`,
        to: email,
        subject: "Link para redefinir senha",
        html: `<p>Link para redefinir senha: ${resetLink} </p>`,
        text: `Link para redefinir senha: ${resetLink} `,
      });
}

}