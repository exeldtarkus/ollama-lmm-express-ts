/**
 * @openapi
 * /api/ollama/smart-search:
 *   post:
 *     summary: Search for recommended places using an LLM prompt
 *     tags:
 *       - Smart Search
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - prompt
 *             properties:
 *               prompt:
 *                 type: string
 *                 example: Best coffee spots in Bandung
 *     responses:
 *       200:
 *         description: List of recommended places with maps and directions
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 query:
 *                   type: string
 *                 recommendations:
 *                   type: object
 *                   properties:
 *                     place:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           name:
 *                             type: string
 *                           address:
 *                             type: string
 *                           mapEmbedUrl:
 *                             type: string
 *                           directionsLink:
 *                             type: string
 *       400:
 *         description: Prompt is missing
 *       500:
 *         description: Internal server error
 */
