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

    res.send(`
  <html>
    <head>
      <style>
        body {
          display: flex;
          background-image: url('https://cmsv2-assets.apptegy.net/uploads/14780/file/1875479/e39dad10-ff77-4fb2-85e1-fe91cd41bce9.jpeg');
          background-size: cover;
          justify-content: center;
          background-repeat: no-repeat;
          align-items: center;
          height: 100vh;
          margin: 0;
          color: white;
        }
       
        .container {
          text-align: center;
          margin-top: -60vh;
        }

        img {
          max-width: 80%; /* Ajusta el tamaño de la imagen según sea necesario */
          max-height: 80vh; /* Ajusta el tamaño de la imagen según sea necesario */
          display: block; 
          margin-left: auto; 
          margin-right: auto;  
        }
       
      </style>
    </head>
    <body>
      <div class="container">
        <img src="${qrCode}" alt="Código QR para enviar correo electrónico">
        <h3>Escanea para solicitar ayuda 😎</h3>
        <button onclick="goBack()">Volver Atrás</button>
      </div>
      <script>
        function goBack() {
          window.history.back();
        }
      </script>
    </body>
  </html>
`);

  });
}


// image 
module.exports.profileUpload = async (req, res, next) => {
  try {
    const currentUserId = req.session.currentUser._id
    const updateUser = await User.findByIdAndUpdate(currentUserId, {
      picture: req.file.path
    }, { new: true })
    req.session.currentUser = updateUser
    res.redirect('/profile')
  }
  catch (error) {
    console.log(error)
  }
}