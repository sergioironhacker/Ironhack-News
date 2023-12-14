const qr = require('qrcode');
const User = require('../models/User.model');



module.exports.profile = (req, res, next) => {
    const currentUser = req.session.currentUser; 
   
    if (currentUser) {
      res.render('users/profile', { currentUser }); 
      console.log('currentUser:', currentUser);
    } else {
      res.redirect('/login'); 
    }
  };

 // QR
  module.exports.qr = (req, res, next) => {
  
  const email_address = 'proyectoironhack@gmail.com';

  const subject = 'Ayuda';

  
  const body = 'Si necesitas ayuda, contáctanos 😉';


  const mailto_link = `mailto:${email_address}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  
  qr.toDataURL(mailto_link, (err, qrCode) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error al generar el código QR');
    }
    
    res.send(` <html>
    <head>
      <style>
        body {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
        }
        img {
          max-width: 100%;
          max-height: 100%;
        }
      </style>
    </head>
    <body>
      <img src="${qrCode}" alt="Código QR para enviar correo electrónico"
      <h5>Escanea para solicitar ayuda 😎<h5> 
    </body>
  </html>`);
  });
  }
  

  // image 
  module.exports.profileUpload = async (req, res, next) => {
try {
      const currentUserId = req.session.currentUser._id
      const updateUser = await User.findByIdAndUpdate(currentUserId, {
        picture: req.file.path 
      }, {new: true})
      req.session.currentUser = updateUser
      res.redirect('/profile')
    }
    catch(error) {
        console.log(error)
    }
  }