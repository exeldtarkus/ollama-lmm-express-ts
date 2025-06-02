/**
 * @openapi
 * /api/smart-search:
 *   post:
 *     summary: Search for recommended places using an LLM prompt
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               prompt:
 *                 type: string
 *                 example: Best coffee spots in Bandung
 *     responses:
 *       200:
 *         description: List of recommended places
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 query:
 *                   type: string
 *                 recommendations:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                       address:
 *                         type: string
 *                       mapEmbedUrl:
 *                         type: string
 *                       directionsLink:
 *                         type: string
 */
