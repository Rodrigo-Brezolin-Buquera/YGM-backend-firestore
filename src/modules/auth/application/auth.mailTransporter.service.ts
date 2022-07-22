import nodemailer from "nodemailer";
import dotenv from "dotenv"

dotenv.config()

export const transporter = nodemailer.createTransport(
    {
        service: "Gmail",
        auth: {
            user: process.env.NODEMAILER_USER,
            pass: process.env.NODEMAILER_PASS
        }
})

export const sendPasswordToEmail = async (email: string, password: string): Promise<void> => {
    await transporter.sendMail({
        from: `<${process.env.NODEMAILER_USER}>`,
        to: email,
        subject: "Sua senha de acesso",
        html: `<p>Sua senha de acesso é: ${password} </p>`,
        text: `Sua senha de acesso é: ${password} `,
      });

}
