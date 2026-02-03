/**
 * @swagger
 * tags:
 *   name: Brands
 *   description: Brand management APIs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Brand:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "64b1f3b2c8d2a9f1e1234567"
 *         title:
 *           type: string
 *           example: "Nike"
 *         image:
 *           type: string
 *           example: "brands/nike.png"
 *         isPublished:
 *           type: boolean
 *           example: true
 *         createdAt:
 *           type: string
 *           example: "2024-01-01T10:00:00.000Z"
 *         updatedAt:
 *           type: string
 *           example: "2024-01-01T10:00:00.000Z"
 *
 *     CreateBrand:
 *       type: object
 *       required:
 *         - title
 *       properties:
 *         title:
 *           type: string
 *           example: "Adidas"
 *         image:
 *           type: string
 *           example: "brands/adidas.png"
 *         isPublished:
 *           type: boolean
 *           example: true
 *
 *     UpdateBrand:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           example: "New Brand Name"
 *         image:
 *           type: string
 *           example: "brands/new.png"
 *         isPublished:
 *           type: boolean
 *           example: false
 */

/* ===================================================== */
/* GET ALL BRANDS                                        */
/* ===================================================== */

/**
 * @swagger
 * /api/brands:
 *   get:
 *     summary: Get all brands
 *     tags: [Brands]
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
 *           example: "nike"
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           example: "-createdAt"
 *       - in: query
 *         name: fields
 *         schema:
 *           type: string
 *           example: "title,image"
 *       - in: query
 *         name: isPublished
 *         schema:
 *           type: boolean
 *           example: true
 *     responses:
 *       200:
 *         description: List of brands
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               results: 2
 *               data:
 *                 - title: "Nike"
 *                   image: "nike.png"
 *                   isPublished: true
 */

/* ===================================================== */
/* GET SINGLE BRAND                                      */
/* ===================================================== */

/**
 * @swagger
 * /api/brands/{id}:
 *   get:
 *     summary: Get brand by ID
 *     tags: [Brands]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "64b1f3b2c8d2a9f1e1234567"
 *     responses:
 *       200:
 *         description: Brand data
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 title: "Nike"
 *                 image: "nike.png"
 *                 isPublished: true
 *       404:
 *         description: Brand not found
 */

/* ===================================================== */
/* CREATE BRAND (ADMIN ONLY)                              */
/* ===================================================== */

/**
 * @swagger
 * /api/brands:
 *   post:
 *     summary: Create a new brand (Admin only)
 *     tags: [Brands]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateBrand'
 *     responses:
 *       200:
 *         description: Brand created successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "create brand successfully"
 *       401:
 *         description: Unauthorized
 */

/* ===================================================== */
/* UPDATE BRAND (ADMIN ONLY)                              */
/* ===================================================== */

/**
 * @swagger
 * /api/brands/{id}:
 *   patch:
 *     summary: Update brand by ID (Admin only)
 *     tags: [Brands]
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
 *             $ref: '#/components/schemas/UpdateBrand'
 *     responses:
 *       200:
 *         description: Brand updated successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "update brand successfully"
 *       400:
 *         description: Invalid ID or validation error
 */

/* ===================================================== */
/* DELETE BRAND (ADMIN ONLY)                              */
/* ===================================================== */

/**
 * @swagger
 * /api/brands/{id}:
 *   delete:
 *     summary: Delete brand by ID (Admin only)
 *     tags: [Brands]
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
 *         description: Brand deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "brand deleted successfully"
 *       400:
 *         description: Brand has related products
 */
