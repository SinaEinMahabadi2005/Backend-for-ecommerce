/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication & Authorization APIs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     PhoneNumber:
 *       type: object
 *       required:
 *         - phoneNumber
 *       properties:
 *         phoneNumber:
 *           type: string
 *           example: "09123456789"
 *
 *     LoginWithPassword:
 *       type: object
 *       required:
 *         - phoneNumber
 *         - password
 *       properties:
 *         phoneNumber:
 *           type: string
 *           example: "09123456789"
 *         password:
 *           type: string
 *           example: "password123"
 *
 *     LoginWithOtp:
 *       type: object
 *       required:
 *         - phoneNumber
 *         - code
 *       properties:
 *         phoneNumber:
 *           type: string
 *           example: "09123456789"
 *         code:
 *           type: string
 *           example: "1234"
 *
 *     ForgetPassword:
 *       type: object
 *       required:
 *         - phoneNumber
 *         - code
 *         - newPassword
 *       properties:
 *         phoneNumber:
 *           type: string
 *           example: "09123456789"
 *         code:
 *           type: string
 *           example: "1234"
 *         newPassword:
 *           type: string
 *           example: "newPassword123"
 *
 *     AuthResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: "login successfully"
 *         token:
 *           type: string
 *           example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *         user:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *               example: "64b1f3b2c8d2a9f1e1234567"
 *             role:
 *               type: string
 *               example: "user"
 *             fullName:
 *               type: string
 *               example: "John Doe"
 *             phoneNumber:
 *               type: string
 *               example: "09123456789"
 *             cartId:
 *               type: string
 *               example: "64b1f3b2c8d2a9f1e9999999"
 */

/* ===================================================== */
/* AUTH (SEND OTP OR CHECK PASSWORD EXISTENCE)           */
/* ===================================================== */

/**
 * @swagger
 * /api/auth:
 *   post:
 *     summary: Send OTP or detect password login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PhoneNumber'
 *     responses:
 *       200:
 *         description: OTP sent or password login available
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "otp code sent"
 *               data:
 *                 userExist: true
 *                 passwordExist: false
 */

/* ===================================================== */
/* LOGIN WITH PASSWORD                                   */
/* ===================================================== */

/**
 * @swagger
 * /api/auth/login-password:
 *   post:
 *     summary: Login using phone number and password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginWithPassword'
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             $ref: '#/components/schemas/AuthResponse'
 *       400:
 *         description: Invalid phone number or password
 */

/* ===================================================== */
/* LOGIN WITH OTP                                        */
/* ===================================================== */

/**
 * @swagger
 * /api/auth/login-otp:
 *   post:
 *     summary: Login using OTP code
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginWithOtp'
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             $ref: '#/components/schemas/AuthResponse'
 *       400:
 *         description: Invalid OTP code
 */

/* ===================================================== */
/* RESEND OTP CODE                                       */
/* ===================================================== */

/**
 * @swagger
 * /api/auth/resend-code:
 *   post:
 *     summary: Resend OTP code
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PhoneNumber'
 *     responses:
 *       200:
 *         description: OTP resent successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "otp code sent"
 */

/* ===================================================== */
/* FORGET PASSWORD                                       */
/* ===================================================== */

/**
 * @swagger
 * /api/auth/forget-password:
 *   post:
 *     summary: Reset password using OTP
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ForgetPassword'
 *     responses:
 *       200:
 *         description: Password changed successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "password changed successfully"
 *       401:
 *         description: Invalid OTP code
 *       404:
 *         description: User not found
 */
