const qr = require("qrcode");
const User = require("../models/User.model");

// usersController.profile

module.exports.profile = (req, res, next) => {
  const currentUser = req.session.currentUser;

  if (currentUser) {
    const acceptedRules = req.session.acceptedRules; // Verificar si el usuario aceptó las reglas

    if (!acceptedRules) {
      // Si las reglas no han sido aceptadas, mostrar el mensaje
      req.session.acceptedRules = true; // Marcar las reglas como aceptadas

      return res.render("users/profile", { currentUser, showRules: true });
    }

    return res.render("users/profile", { currentUser, showRules: false });
  } else {
    res.redirect("/login");
  }
};

module.exports.otherProfile = (req, res, next) => {
  const { id } = req.params;

  User.findById(id)
    .then((user) => {
      if (user) {
        res.render("users/other-users", { user });
      } else {
        res.redirect("/login");
      }
    })
    .catch(next);
};

module.exports.acceptRules = (req, res, next) => {
  // Marcar las reglas como aceptadas en la sesión del usuario
  req.session.acceptedRules = req.body.accepted;
  res.sendStatus(200);
};

// QR
module.exports.qr = (req, res, next) => {
  const email_address = "proyectoironhack@gmail.com";

  const subject = "Ayuda";

  const body = "Si necesitas ayuda, contáctanos 😉";

  const mailto_link = `mailto:${email_address}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;

  qr.toDataURL(mailto_link, (err, qrCode) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error al generar el código QR");
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
        <button onclick="goBack()"><h3>Volver Atrás<h3></button>
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
};

// image
module.exports.profileUpload = async (req, res, next) => {
  try {
    const currentUserId = req.session.currentUser._id;
    const updateUser = await User.findByIdAndUpdate(
      currentUserId,
      {
        picture: req.file.path,
      },
      { new: true }
    );
    req.session.currentUser = updateUser;
    res.redirect("/profile");
  } catch (error) {
    console.log(error);
  }
};

module.exports.deleteAccount = async (req, res) => {
  const userId = req.session.currentUser._id;

  console.log("ID de usuario actual:", userId);

  try {
    const deletedUser = await User.findByIdAndDelete(userId);

    console.log("borro al user");

    res.status(200).send("OK");
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Error al eliminar el perfil del usuario" });
  }
}

module.exports.subscribe = async (req, res) => {
  const email = req.body.email;

  try {
    const newSubscription = new Subscription({ email });
    await newSubscription.save();

    const emailContent = createEmailTemplate({
      username: "Subscriber",
      activationToken: "your-activation-token",
    }); // Puedes ajustar los valores según sea necesario
    await transporter.sendMail({
      from: process.env.NODEMAILER_EMAIL,
      to: email,
      subject: "Confirmación de Suscripción",
      html: emailContent,
    });

    res.render("users/profile", { email });
  } catch (error) {
    console.error(error);
  }
}