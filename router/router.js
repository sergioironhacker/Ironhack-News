const router = require("express").Router();
const passport = require("passport");
const axios = require("axios");
const upload = require("../config/storage.config");
const { Subscription } = require("../config/nodemailer.config");
const authMiddleware = require("../middlewares/auth.middlewares");
const authController = require("../controllers/auth.controller");
const usersController = require("../controllers/users.controller");
const newsController = require("../controllers/news.controller");
const adminController = require("../controllers/admin.controller");
const commentsController = require("../controllers/comments.controller");
const spainNewsController = require("../controllers/news.controller");
const likeController = require("../controllers/like.controller");
const ratingController = require("../controllers/rating.controller");
const { toggleLike } = require("../helpers/helpers-hbs");
const News = require("../models/News.model");
const Like = require("../models/Like.model");
const Rating = require("../models/Rating.model");
const User = require("../models/User.model");
const Comment = require("../models/Comment.model");
const {
  transporter,
  createEmailTemplate,
} = require("../config/nodemailer.config");
const GOOGLE_SCOPES = [
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/userinfo.profile",
];

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

router.get("/news", newsController.getNews);

// API japan news

router.get("/japanNews", spainNewsController.getJapanNews);

// API Europe news
router.get("/europeNews", spainNewsController.getSpainNews);

// API African news
router.get("/africanNews", spainNewsController.getafricanNews);

// Api Oceania news
router.get("/oceaniaNews", spainNewsController.getOceaniaNews);

// Api antarticaNews

router.get("/antartidaNews", spainNewsController.getAntartidaNews);

// country info

router.get("/infoCountries", newsController.infoCountries);

// news

router.get("/newsindex", newsController.listNews);
router.get("/news/:id", authMiddleware.isAuthenticated, newsController.details);

// auth

router.get("/login", authMiddleware.isNotAuthenticated, authController.login);
router.post(
  "/login",
  authMiddleware.isNotAuthenticated,
  authController.doLogin
);
router.get(
  "/register",
  authMiddleware.isNotAuthenticated,
  authController.register
);
router.post(
  "/register",
  authMiddleware.isNotAuthenticated,
  authController.doRegister
);
router.get("/logout", authMiddleware.isAuthenticated, authController.logout);
router.get("/activate/:token", authController.activate);

// Google auth
router.get(
  "/auth/google",
  authMiddleware.isNotAuthenticated,
  passport.authenticate("google-auth", { scope: GOOGLE_SCOPES })
);
router.get(
  "/auth/google/callback",
  authMiddleware.isNotAuthenticated,
  authController.doLoginGoogle
);
// Github auth

router.get("/auth/github", passport.authenticate("github-auth"));
router.get(
  "/auth/github/callback",
  passport.authenticate("github-auth", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);

// ruta para aceptar las normas

router.post("/accept-rules", usersController.acceptRules);

// imagen

router.post(
  "/profile/upload",
  authMiddleware.isAuthenticated,
  upload.single("image"),
  usersController.profileUpload
);

// users

router.get("/profile", authMiddleware.isAuthenticated, usersController.profile);
router.get(
  "/profile/:id",
  authMiddleware.isAuthenticated,
  usersController.otherProfile
);

// admin

router.get(
  "/admin/index",
  authMiddleware.isAuthenticated,
  authMiddleware.isAdmin,
  adminController.index
);
router.get(
  "/admin/userlist",
  authMiddleware.isAuthenticated,
  authMiddleware.isAdmin,
  adminController.userlist
);
router.get(
  "/admin/newslist",
  authMiddleware.isAuthenticated,
  authMiddleware.isAdmin,
  adminController.newslist
);
router.get(
  "/admin/news/create",
  authMiddleware.isAuthenticated,
  authMiddleware.isAdmin,
  adminController.create
);
router.post(
  "/admin/news/create",
  authMiddleware.isAuthenticated,
  authMiddleware.isAdmin,
  upload.single("image"),
  adminController.doCreate
);
router.get(
  "/admin/news/:id/delete",
  authMiddleware.isAuthenticated,
  authMiddleware.isAdmin,
  adminController.delete
);
router.get(
  "/admin/news/:id/update",
  authMiddleware.isAuthenticated,
  authMiddleware.isAdmin,
  adminController.update
);
router.post(
  "/admin/news/:id/update",
  authMiddleware.isAuthenticated,
  authMiddleware.isAdmin,
  upload.single("image"),
  adminController.doUpdate
);

// QR

router.get("/generar-codigo-qr", usersController.qr);

// comments

router.get(
  "/comments/:id/delete",
  authMiddleware.isAuthenticated,
  commentsController.delete
);
router.post(
  "/comments/:id/create",
  authMiddleware.isAuthenticated,
  commentsController.doCreate
);

// likes

router.post(
  "/likes/:newsId",
  authMiddleware.isAuthenticated,
  likeController.doCreate
);

// Weather API
router.get("/weather", authMiddleware.isAuthenticated, newsController.weather);

// newsletter

router.post(
  "/subscribe",
  authMiddleware.isAuthenticated,
  usersController.subscribe
);

// rating

router.post(
  "/ratings",
  authMiddleware.isAuthenticated,
  ratingController.doCreateRating
);

// Ruta para eliminar el perfil del usuario

router.post(
  "/delete-account",
  authMiddleware.isAuthenticated,
  usersController.deleteAccount
);

module.exports = router;
