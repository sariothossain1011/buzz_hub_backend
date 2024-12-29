const nodemailer = require('nodemailer');
require('dotenv').config();
const SendOTPEmail =async(EmailTo,EmailText,EmailSubject)=>{

    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        service: 'gmail',
        secure: true,
        auth:{
            user: "iamjim136@gmail.com", // Set in .env
            pass: "scgu bzys nfsx mkow", // Set in .env
        },
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

