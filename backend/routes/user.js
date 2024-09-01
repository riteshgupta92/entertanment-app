const express = require("express");
const {signup, login, logout} = require("../controllers/user");
const {addBookmark} = require("../controllers/bookmark");
const {getUserBookmarksByEmail} = require("../controllers/getUserBookmark");
const {removeBookmarkById} = require("../controllers/deleteBookmark");
const accessToken = require('../middlewares/verifyAccessToken');
const {refreshToken} = require("../controllers/verifyRefreshToken");

// define routes
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout)
router.post("/bookmark", accessToken(addBookmark));
router.get("/bookmark", accessToken(getUserBookmarksByEmail));
router.delete("/bookmark", accessToken(removeBookmarkById));
router.get("/refresh-token", accessToken(refreshToken))

// exported router
module.exports = router;
