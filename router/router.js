const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const usersController = require("../controllers/users.controller");
const authMiddleware = require("../middlewares/auth.middlewares");
const newsController = require('../controllers/news.controller');
const adminController = require("../controllers/admin.controller")
const upload = require("../config/storage.config");
const passport = require('passport');
const News = require('../models/News.model')

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


// news
router.get('/news', newsController.getNews);
router.get('/newsindex', newsController.listNews)
router.get("/news/:id", authMiddleware.isAuthenticated, newsController.details);


// auth

router.get("/login", authMiddleware.isNotAuthenticated, authController.login);
router.post("/login", authMiddleware.isNotAuthenticated, authController.doLogin);
router.get("/register", authMiddleware.isNotAuthenticated, authController.register);
router.post("/register", authMiddleware.isNotAuthenticated, authController.doRegister);
router.get("/logout", authMiddleware.isAuthenticated, authController.logout);
router.get("/activate/:token", authController.activate);

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
   
  





module.exports = router; 