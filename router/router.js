const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const usersController = require("../controllers/users.controller");
const authMiddleware = require("../middlewares/auth.middlewares");
const upload = require("../config/storage.config");
const passport = require('passport');
const newsController = require('../controllers/news.controller');
const adminController = require("../controllers/admin.controller")

const GOOGLE_SCOPES = [
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile'
]



// home 
router.get("/", (req, res, next) => {
  res.render("home");
});




// news
router.get('/newsindex', newsController.listNews)
router.get('/news', newsController.getNews);


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


// users

router.get("/profile", authMiddleware.isAuthenticated, usersController.profile);

// admin

router.get("/admin/userlist", adminController.userlist);








module.exports = router; 