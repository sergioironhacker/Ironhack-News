const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const usersController = require("../controllers/users.controller");
const authMiddleware = require("../middlewares/auth.middlewares");
const newsController = require('../controllers/news.controller');
const adminController = require("../controllers/admin.controller")
const upload = require("../config/storage.config");
const passport = require('passport');
const News = require('../models/News.model')
const commentsController = require('../controllers/Comments.controller');
const spainNewsController = require('../controllers/news.controller');
const Like = require('../models/Like.model');
const likeController = require('../controllers/like.controller');
const { toggleLike } = require('../helpers/helpers-hbs');



const Rating = require('../models/rating.model'); ///////////////////





// Ruta para crear una nueva calificación
router.post('/ratings', async (req, res) => {
  try {
    const { user, news, score } = req.body;
    const newRating = new Rating({ user, news, score });
    await newRating.save();

    res.redirect(`/news/${news}`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Ruta para obtener todas las calificaciones para una noticia específica
router.get('/ratings/news/:newsId', async (req, res) => {
  try {
    const newsId = req.params.newsId;
    const ratings = await Rating.find({ news: newsId });
    res.json(ratings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});





/////////////////////////////////

const User = require('../models/User.model')  ////////////////////////




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






//////////////////////////////////////////





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



// auth

router.get("/login", authMiddleware.isNotAuthenticated, authController.login);
router.post("/login", authMiddleware.isNotAuthenticated, authController.doLogin);
router.get("/register", authMiddleware.isNotAuthenticated, authController.register);
router.post("/register", authMiddleware.isNotAuthenticated, authController.doRegister);
router.get("/logout", authMiddleware.isAuthenticated, authController.logout);
router.get("/activate/:token", authController.activate);


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




// Weather

const axios = require('axios');

// Define la ruta para obtener el tiempo
router.get('/weather', async (req, res, next) => {
  try {
    const city = req.query.city || 'Spain';
    const apiKey = '1144b4b24f28054b05d43e5d00d6df2d';
    const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);

    const weatherData = weatherResponse.data;

    res.render('news/weather', { weather: weatherData });
  } catch (error) {
    next(error);
  }
});






module.exports = router; 