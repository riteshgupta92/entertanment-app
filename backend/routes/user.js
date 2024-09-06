const express = require("express");
const { signup, login, logout } = require("../controllers/user");
const { addBookmark } = require("../controllers/bookmark");
const { getUserBookmarksByEmail } = require("../controllers/getUserBookmark");
const { removeBookmarkById } = require("../controllers/deleteBookmark");
const accessToken = require("../middlewares/verifyAccessToken");
const { refreshToken } = require("../controllers/verifyRefreshToken");

// define routes
const router = express.Router();

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Signup a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - repeatPassword
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 example: "strongpassword"
 *               repeatPassword:
 *                 type: string
 *                 example: "strongpassword"
 *     responses:
 *       201:
 *         description: User signed up successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 email:
 *                   type: string
 *                 bookmarks:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Bookmark'
 *       400:
 *         description: Bad request
 */
router.post("/signup", signup);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login an existing user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 example: "strongpassword"
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                 refreshToken:
 *                   type: string
 *       401:
 *         description: Invalid credentials
 */
router.post("/login", login);

/**
 * @swagger
 * /logout:
 *   post:
 *     summary: Logout an existing user
 *     responses:
 *       200:
 *         description: User logged out successfully
 */
router.post("/logout", logout);

/**
 * @swagger
 * /bookmark:
 *   post:
 *     summary: Add a bookmark
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Bookmark'
 *     responses:
 *       200:
 *         description: Bookmark added successfully
 *       400:
 *         description: Bad request
 */
router.post("/bookmark", accessToken(addBookmark));

/**
 * @swagger
 * /bookmark:
 *   get:
 *     summary: Get user bookmarks by email
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Retrieved user bookmarks successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Bookmark'
 */
router.get("/bookmark", accessToken(getUserBookmarksByEmail));

/**
 * @swagger
 * /bookmark:
 *   delete:
 *     summary: Remove a bookmark by ID
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: number
 *                 example: 123
 *     responses:
 *       200:
 *         description: Bookmark removed successfully
 *       404:
 *         description: Bookmark not found
 */
router.delete("/bookmark", accessToken(removeBookmarkById));

/**
 * @swagger
 * /refresh-token:
 *   get:
 *     summary: Refresh the JWT token
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Token refreshed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 */
router.get("/refresh-token", accessToken(refreshToken));

module.exports = router;
