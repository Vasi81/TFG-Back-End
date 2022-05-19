const dbConfig = require("../config/db.config.js");
var nodemailer = require('nodemailer');

// email sender function

exports.sendEmail = function(toEmail,subject,message,req, res){
// Definimos el transporter
    var transporter = nodemailer.createTransport({
        pool: true,
        host: dbConfig.host,
        port: dbConfig.port,
        secure: true, 
        auth: {
            user: dbConfig.user,
            pass: dbConfig.pass,
          },

    });
// Definimos el email
var mailOptions = {
    from: dbConfig.from,
    to: toEmail,
    subject: subject,
    text: message
};
// Enviamos el email
transporter.sendMail(mailOptions, function(error, info){

    if (error){
        console.log(error);
        res.send(500, err.message);
    } else {
        console.log("Email sent");
        res.status(200).jsonp(req.body);
    }
});
};