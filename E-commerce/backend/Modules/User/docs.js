/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management APIs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "64b1f3b2c8d2a9f1e1234567"
 *         phoneNumber:
 *           type: string
 *           example: "09123456789"
 *         fullName:
 *           type: string
 *           example: "John Doe"
 *         role:
 *           type: string
 *           enum: [user, admin, superAdmin]
 *           example: "user"
 *         isActive:
 *           type: boolean
 *           example: true
 *         cartId:
 *           type: string
 *           example: "64b1f3b2c8d2a9f1e9999999"
 *         createdAt:
 *           type: string
 *           example: "2024-01-01T10:00:00.000Z"
 *
 *     UpdateUser:
 *       type: object
 *       properties:
 *         phoneNumber:
 *           type: string
 *           example: "09123456789"
 *         fullName:
 *           type: string
 *           example: "Updated Name"
 *         isActive:
 *           type: boolean
 *           example: true
 *         role:
 *           type: string
 *           enum: [user, admin, superAdmin]
 *
 *     ChangePassword:
 *       type: object
 *       required:
 *         - newPassword
 *       properties:
 *         oldPassword:
 *           type: string
 *           example: "oldPassword123"
 *         newPassword:
 *           type: string
 *           example: "newPassword123"
 */

/* ===================================================== */
/* GET ALL USERS (ADMIN ONLY)                             */
/* ===================================================== */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users (Admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *           example: "0912"
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               results: 2
 *               data:
 *                 - phoneNumber: "09123456789"
 *                   role: "user"
 *                   isActive: true
 *       401:
 *         description: Unauthorized
 */

/* ===================================================== */
/* GET SINGLE USER                                       */
/* ===================================================== */

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get user profile (User can only see own profile)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User data
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 phoneNumber: "09123456789"
 *                 fullName: "John Doe"
 *                 role: "user"
 *       403:
 *         description: Forbidden
 */

/* ===================================================== */
/* UPDATE USER                                          */
/* ===================================================== */

/**
 * @swagger
 * /api/users/{id}:
 *   patch:
 *     summary: Update user profile (role-based access)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUser'
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "user update successfully"
 *       403:
 *         description: Forbidden
 */

/* ===================================================== */
/* CHANGE PASSWORD                                      */
/* ===================================================== */

/**
 * @swagger
 * /api/users/change-password:
 *   patch:
 *     summary: Change or set user password
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ChangePassword'
 *     responses:
 *       200:
 *         description: Password changed successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "update password successfully"
 *       400:
 *         description: Invalid old password
 */
