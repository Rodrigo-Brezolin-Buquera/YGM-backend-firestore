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