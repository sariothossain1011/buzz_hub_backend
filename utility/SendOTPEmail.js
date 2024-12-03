const nodemailer = require('nodemailer');
require('dotenv').config();
const SendEmailUtility =async(EmailTo,EmailText,EmailSubject)=>{

    let transporter = nodemailer.createTransport({
        host: 'smtp-mail.outlook.com',
        port: 587,
        secure:false,
        auth:{
            // user: 'sariothossainweb1011@outlook.com',
            // pass: 'sariot1011webtest',
            user: process.env.EMAIL_USER, // Set in .env
            pass: process.env.EMAIL_PASS, // Set in .env
        },
        tls: {
            rejectUnauthorized: false,
        }
    })
    
    let mailOptions = {
        from:'Buzz Hub App <sariothossainweb1011@outlook.com>',
        to: EmailTo,
        subject: EmailSubject,
        text:EmailText,
    }
    return await transporter.sendMail(mailOptions);
}



module.exports = SendEmailUtility







