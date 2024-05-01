const express = require("express");
const router = express.Router();
const lessonsOrderModel = require("../models/lessonsOrder");

/**
 * @swagger
 * /lessonsOrder/{courseId}:
 *   get:
 *     summary: Get lessons order by courseId
 *     description: Retrieve lessons order for a specific course from the database.
 *     tags:
 *       - Lessons Order
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the course to retrieve lessons order for
 *     responses:
 *       200:
 *         description: Successful response with lessons order for the given courseId
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 courseId:
 *                   type: string
 *                 lessonOrder:
 *                   type: array
 *                   items:
 *                     type: string
 *       404:
 *         description: Lessons order not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: "No lesson order found with the given courseId"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: "Internal server error: [error message]"
 */
router.get("/lessonsOrder/:courseId", async (req, res) => {
    const { courseId } = req.params;
    try {
        const lessonsOrder = await lessonsOrderModel.findOne({
            courseId: courseId
        }).populate('lessonsOrder')

        if (!lessonsOrder) {
            return res.status(404).send({
                statusCode: 404,
                message: 'no lessonOrder found with the given courseId'
            })
        }
        res.status(200).send(lessonsOrder)
    } catch (error) {
        res
            .status(500)
            .send({
                statusCode: 500,
                message: `Internal server error ${error}`
            })
    }
});

/**
 * @swagger
 * /lessonsOrder:
 *   post:
 *     summary: Create a new lessons order
 *     description: Create a new lessons order in the database.
 *     tags:
 *       - Lessons Order
 *     requestBody:
 *       description: Lessons order information
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - courseId
 *               - lessonsOrder
 *             properties:
 *               courseId:
 *                 type: string
 *                 description: The ID of the course for which the lessons order is defined
 *               lessonsOrder:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: The order of lesson IDs
 *             example:
 *               courseId: "60b8d29569b1c4a7a2ef1a7d"
 *               lessonsOrder:
 *                 - "60b8d29569b1c4a7a2ef1a7e"
 *                 - "60b8d29569b1c4a7a2ef1a7f"
 *                 - "60b8d29569b1c4a7a2ef1a7g"
 *     responses:
 *       201:
 *         description: Lessons order created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 201
 *                 payload:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     courseId:
 *                       type: string
 *                     lessonsOrder:
 *                       type: array
 *                       items:
 *                         type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: "Internal server error: [error message]"
 */
router.post("/lessonsOrder", async (req, res) => {
    const newLessonsOrder = new lessonsOrderModel({
        courseId: req.body.courseId,
        lessonsOrder: req.body.lessonsOrder
    })

    try {
        const lessonsOrderToSave = await newLessonsOrder.save();
        res.status(201).send({
            statusCode: 201,
            payload: lessonsOrderToSave
        })
    } catch (error) {
        res
            .status(500)
            .send({
                statusCode: 500,
                message: `Internal server error ${error}`
            })
    }
});

/**
 * @swagger
 * /lessonsOrder/{id}:
 *   patch:
 *     summary: Update a lessons order
 *     description: Update an existing lessons order in the database by ID.
 *     tags:
 *       - Lessons Order
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the lessons order to update
 *     requestBody:
 *       description: Lessons order data to update
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               courseId:
 *                 type: string
 *                 description: The ID of the course for which the lessons order is defined (optional)
 *               lessonsOrder:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: The updated order of lesson IDs
 *             example:
 *               courseId: "60b8d29569b1c4a7a2ef1a7d"
 *               lessonsOrder:
 *                 - "60b8d29569b1c4a7a2ef1a7e"
 *                 - "60b8d29569b1c4a7a2ef1a7f"
 *                 - "60b8d29569b1c4a7a2ef1a7g"
 *     responses:
 *       200:
 *         description: Successful response with updated lessons order data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 courseId:
 *                   type: string
 *                 lessonsOrder:
 *                   type: array
 *                   items:
 *                     type: string
 *       404:
 *         description: Lessons order not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: "No lessons order found with the given ID"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */
router.patch("/lessonsOrder/:id", async (req, res) => {
    const { id } = req.params;
    const lessonOrder = await lessonsOrderModel.findById(id);

    if (!lessonOrder) {
        return res.status(404).send({
            statusCode: 404,
            message: 'no lessonOrder found with the given id'
        })
    }

    try {
        const updatedData = req.body;
        const options = { new: true };

        const result = await lessonsOrderModel.findByIdAndUpdate(id, updatedData, options);

        res.status(200).send(result)
    } catch (error) {
        res
            .status(500)
            .send({
                statusCode: 500,
                message: 'Internal server error'
            })
    }
});

/**
 * @swagger
 * /lessonsOrder/{id}:
 *   delete:
 *     summary: Delete a lessons order
 *     description: Delete an existing lessons order from the database by ID.
 *     tags:
 *       - Lessons Order
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the lessons order to delete
 *     responses:
 *       200:
 *         description: Successful response indicating lessons order deletion
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Lessons order with id {id} deleted successfully"
 *       404:
 *         description: Lessons order not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: "No lessons order found with the given ID"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */
router.delete("/lessonsOrder/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const lessonOrder = await lessonsOrderModel.findByIdAndDelete(id)
        if (!lessonOrder) {
            return res.status(404).send({
                statusCode: 404,
                message: 'no lessonOrder found with the given id'
            })
        }

        res.status(200).send(`LessonOrder with id ${id} deleted successfully`)
    } catch (error) {
        res
            .status(500)
            .send({
                statusCode: 500,
                message: 'Internal server error'
            })
    }
});

module.exports = router;