const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const usersController = require("../controllers/users.controller");
const authMiddleware = require("../middlewares/auth.middlewares");
const newsController = require('../controllers/news.controller');
const adminController = require("../controllers/admin.controller")
const upload = require("../config/storage.config");
const passport = require('passport');
const News = require('../models/News.model')
const commentsController = require('../controllers/comments.controller');
const spainNewsController = require('../controllers/news.controller');
const Like = require('../models/Like.model');
const likeController = require('../controllers/like.controller');
const { toggleLike } = require('../helpers/helpers-hbs');
const Rating = require('../models/Rating.model');
const User = require('../models/User.model');
const axios = require('axios');
const { Subscription } = require('../config/nodemailer.config');
const { transporter, createEmailTemplate } = require('../config/nodemailer.config');
const GOOGLE_SCOPES = [
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile'
]


// home 

router.get("/", async (req, res, next) => {
  try {
    const news = await News.find(); // Obtiene todas las noticias creadas por nosotros a modo gracioso
    res.render("home", { news });
  } catch (error) {
    next(error);
  }
});

// Api US news 

router.get('/news', newsController.getNews);

// API japan news 

router.get('/japanNews', spainNewsController.getJapanNews);

// API Europe news
router.get('/europeNews', spainNewsController.getSpainNews);

// API African news
router.get('/africanNews', spainNewsController.getafricanNews);


// Api Oceania news
router.get('/oceaniaNews', spainNewsController.getOceaniaNews);

// Api antarticaNews

router.get('/antartidaNews', spainNewsController.getAntartidaNews);


// country info 

router.get('/infoCountries', newsController.infoCountries)


// news

router.get('/newsindex', newsController.listNews)
router.get("/news/:id", authMiddleware.isAuthenticated, newsController.details);



// auth google

router.get("/login", authMiddleware.isNotAuthenticated, authController.login);
router.post("/login", authMiddleware.isNotAuthenticated, authController.doLogin);
router.get("/register", authMiddleware.isNotAuthenticated, authController.register);
router.post("/register", authMiddleware.isNotAuthenticated, authController.doRegister);
router.get("/logout", authMiddleware.isAuthenticated, authController.logout);
router.get("/activate/:token", authController.activate);


// auth github 

router.get('/auth/github', passport.authenticate('github-auth'));
router.get('/auth/github/callback', passport.authenticate('github-auth', {
  successRedirect: '/',
  failureRedirect: '/login',
}));


// ruta para aceptar las normas 

router.post('/accept-rules', usersController.acceptRules);



// Google auth
router.get('/auth/google', authMiddleware.isNotAuthenticated, passport.authenticate('google-auth', { scope: GOOGLE_SCOPES }));
router.get('/auth/google/callback', authMiddleware.isNotAuthenticated, authController.doLoginGoogle)

// imagen

router.post("/profile/upload", authMiddleware.isAuthenticated, upload.single('image'), usersController.profileUpload);



// users

router.get("/profile", authMiddleware.isAuthenticated, usersController.profile);
router.get("/profile/:id", authMiddleware.isAuthenticated, usersController.otherProfile);

// admin

router.get('/admin/index', authMiddleware.isAuthenticated, authMiddleware.isAdmin, adminController.index)
router.get("/admin/userlist", authMiddleware.isAuthenticated, authMiddleware.isAdmin, adminController.userlist);
router.get('/admin/newslist', authMiddleware.isAuthenticated, authMiddleware.isAdmin, adminController.newslist);
router.get("/admin/news/create", authMiddleware.isAuthenticated, authMiddleware.isAdmin, adminController.create);
router.post("/admin/news/create", authMiddleware.isAuthenticated, authMiddleware.isAdmin, upload.single('image'), adminController.doCreate);
router.get("/admin/news/:id/delete", authMiddleware.isAuthenticated, authMiddleware.isAdmin, adminController.delete);
router.get("/admin/news/:id/update", authMiddleware.isAuthenticated, authMiddleware.isAdmin, adminController.update);
router.post("/admin/news/:id/update", authMiddleware.isAuthenticated, authMiddleware.isAdmin, upload.single('image'), adminController.doUpdate);

// QR

router.get('/generar-codigo-qr', usersController.qr);


// comments 

router.get("/comments/:id/delete", authMiddleware.isAuthenticated, commentsController.delete);
router.post('/comments/:id/create', authMiddleware.isAuthenticated, commentsController.doCreate);


// likes

router.post('/likes/:newsId', authMiddleware.isAuthenticated, likeController.doCreate);

// Weather API
router.get('/weather', authMiddleware.isAuthenticated, newsController.weather);



// newsletter

router.post('/subscribe', async (req, res) => {
  const email = req.body.email;

  try {

    const newSubscription = new Subscription({ email });
    await newSubscription.save();


    const emailContent = createEmailTemplate({ username: 'Subscriber', activationToken: 'your-activation-token' }); // Puedes ajustar los valores según sea necesario
    await transporter.sendMail({
      from: process.env.NODEMAILER_EMAIL,
      to: email,
      subject: 'Confirmación de Suscripción',
      html: emailContent,
    });

    res.render('users/profile', { email });
  } catch (error) {
    console.error(error);

  }
});

// rating 


router.post('/ratings', async (req, res) => {
  try {
    const { user, news, score } = req.body;

    const newRating = new Rating({ user, news, score });
    await newRating.save();

    const ratings = await Rating.find({ news });
    const totalScore = ratings.reduce((acc, rating) => acc + rating.score, 0);
    const averageScore = totalScore / ratings.length || 0;
    const percentage = averageScore * 20;

    await News.findByIdAndUpdate(news, { $set: { percentage } });

    res.redirect(`/news/${news}`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});



// Ruta para eliminar el perfil del usuario

router.post('/delete-account', async (req, res) => {

  const userId = req.session.currentUser._id;

  console.log('ID de usuario actual:', userId);

  try {

    const deletedUser = await User.findByIdAndDelete(userId);

    console.log('borro al user');

    res.status(200).send('OK');

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error al eliminar el perfil del usuario' });
  }
});





module.exports = router; 