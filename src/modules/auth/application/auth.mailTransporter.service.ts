import nodemailer from "nodemailer";
import dotenv from "dotenv"

dotenv.config()

// configuração não segura 
export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS
    },
    tls: { ciphers: "SSLv3" }
})


// configuração segura 

// export const transporter = nodemailer.createTransport({
//     host: "smtp.gmail.com",
//     port: 465,
//     secure: true,
//     auth: {
//         type: "OAUTH2",
//         user: process.env.NODEMAILER_USER
        
//     }
// })

// transporter.set('oauth2_provision_cb', (user, renew, callback)=>{
//     let accessToken = userTokens[user];
//     if(!accessToken){
//         return callback(new Error('Unknown user'));
//     }else{
//         return callback(null, accessToken);
//     }
// });
export const sendPasswordToEmail = async (email: string, password: string): Promise<void> => {
    await transporter.sendMail({
        from: `<${process.env.NODEMAILER_USER}>`,
        to: email,
        subject: "Sua senha de acesso",
        html: `<p>Sua senha de acesso é: ${password} </p>`,
        text: `Sua senha de acesso é: ${password} `,
      });

}
