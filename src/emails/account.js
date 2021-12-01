const sgMail = require('@sendgrid/mail')

const sendgridAPIkey = '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'

sgMail.setApiKey(sendgridAPIkey)



const req_OTP = (reciever,OTP)=>{
    sgMail.send({
        to: reciever,
        from: 'ak656634@gmail.com',
        subject: 'OTP-Reset your password',
        html: "<h2>The OTP is "+OTP+"<h2>"
    })
    
}
module.exports= req_OTP;