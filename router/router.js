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

// admin

router.get("/admin/userlist", authMiddleware.isAuthenticated, adminController.userlist);
router.get('/admin/newslist', authMiddleware.isAuthenticated, adminController.newslist);
router.get("/admin/news/create", authMiddleware.isAuthenticated, adminController.create);
router.post("/admin/news/create", authMiddleware.isAuthenticated, upload.single('image'), adminController.doCreate);
router.get("/admin/news/:id/delete", authMiddleware.isAuthenticated, adminController.delete);
router.get("/admin/news/:id/update", authMiddleware.isAuthenticated, adminController.update);
router.post("/admin/news/:id/update", authMiddleware.isAuthenticated, upload.single('image'), adminController.doUpdate);



// QR

router.get('/generar-codigo-qr', usersController.qr);


// comments 

router.get("/comments/:id/delete", authMiddleware.isAuthenticated, commentsController.delete);
router.post('/comments/:id/create', authMiddleware.isAuthenticated, commentsController.doCreate);


// likes



router.post('/likes/:newsId', authMiddleware.isAuthenticated, likeController.doCreate);







module.exports = router; 