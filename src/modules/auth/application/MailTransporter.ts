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