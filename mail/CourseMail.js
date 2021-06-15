const nodemailer = require('nodemailer');


const sendMail = (to,Score,Date,url) => {
let transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false, // true for 465, false for other ports
    auth: {
        user: '3awenii@gmail.com', // generated ethereal user
        pass: '3aweniprojet'  // generated ethereal password
    },
    tls:{
      rejectUnauthorized:false
    }
  });

  let mailOptions = {
    from: '3awenii@gmail.com', // sender address
    to: 'siwar.hassen@esprit.tn', // list of receivers
    subject: 'Félicitations ! Vous avez obtenu un cértificat', // Subject line
    html: `
    <div style="background-color:orange">
    <p>Nous vous félicitons d'avoir terminé What is Data Science? le ${Date}. Vous avez obtenu un Certificat 3aweni, mais vous avez également droit à un identifiant numérique vérifié de notre site. Les badges numériques  vous permettent de partager votre réussite avec vos collègues, vos employeurs et vos relations sur les réseaux sociaux.
<br/>
    <a href=${url}> cliquer pour recevoir votre certificat<a/>
    </div>
  `
   };
   transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);   
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    res.render('contact', {msg:'Email has been sent'});
});
}

module.exports = sendMail;