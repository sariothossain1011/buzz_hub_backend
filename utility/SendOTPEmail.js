const nodemailer = require('nodemailer');
require('dotenv').config();
const SendOTPEmail =async(EmailTo,EmailText,EmailSubject)=>{

    let transporter = nodemailer.createTransport({
        host: 'smtp-mail.outlook.com',
        port: 587,
        // port: 465,
        // secure:true,
        auth:{
            user: "sariothossainweb1011@outlook.com", // Set in .env
            pass: "sariot1011web%test", // Set in .env
        },
        tls: {
            rejectUnauthorized: false,
        }
    })
    
    let mailOptions = {
        from:'Buzz Hub App <buzzhab@gmail.com>',
        to: EmailTo,
        subject: EmailSubject,
        text:EmailText,
    }
    return await transporter.sendMail(mailOptions);
}



module.exports = SendOTPEmail


// const nodemailer = require('nodemailer');

// const SendOTPEmail =async(EmailTo,EmailText,EmailSubject)=>{

//     let transporter = nodemailer.createTransport({
//         service: 'Gmail',
//         auth:{
//             user: 'sariothossain.me@gmail.com',
//             pass: 'sa.me#@co',
//         },
//     })
    
//     let mailOptions = {
//         from:' TASK MANAGER <sariothossain.me@gmail.com>',
//         to: EmailTo,
//         subject: EmailSubject,
//         text:EmailText,
//     }
//     return await transporter.sendMail(mailOptions);
// }



// module.exports = SendOTPEmail












