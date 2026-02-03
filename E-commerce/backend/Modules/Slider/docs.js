/**
 * @swagger
 * tags:
 *   name: Sliders
 *   description: Slider management APIs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Slider:
 *       type: object
 *       required:
 *         - title
 *         - image
 *         - href
 *         - path
 *       properties:
 *         _id:
 *           type: string
 *           example: 64f1b2c9e4b0c123456789ab
 *         title:
 *           type: string
 *           example: Summer Sale
 *         image:
 *           type: string
 *           example: sliders/summer.png
 *         href:
 *           type: string
 *           example: https://example.com/summer-sale
 *         path:
 *           type: string
 *           example: /summer-sale
 *         isPublished:
 *           type: boolean
 *           example: true
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /api/sliders:
 *   get:
 *     summary: Get all sliders
 *     tags: [Sliders]
 *     description: |
 *       - Admin & SuperAdmin can see all sliders  
 *       - Public users see only published sliders
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Sliders fetched successfully
 *
 *   post:
 *     summary: Create a new slider
 *     tags: [Sliders]
 *     security:
 *       - bearerAuth: []
 *     description: Admin only
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Slider'
 *     responses:
 *       200:
 *         description: Slider created successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */

/**
 * @swagger
 * /api/sliders/{id}:
 *   get:
 *     summary: Get slider by ID
 *     tags: [Sliders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Slider fetched successfully
 *       404:
 *         description: Slider not found
 *
 *   patch:
 *     summary: Update slider
 *     tags: [Sliders]
 *     security:
 *       - bearerAuth: []
 *     description: Admin only
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
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               image:
 *                 type: string
 *               href:
 *                 type: string
 *               path:
 *                 type: string
 *               isPublished:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Slider updated successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *
 *   delete:
 *     summary: Delete slider
 *     tags: [Sliders]
 *     security:
 *       - bearerAuth: []
 *     description: Admin only
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Slider deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */
