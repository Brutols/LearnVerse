const express = require("express");
const router = express.Router();
const lessonModel = require("../models/lessons");
const { uploadFile } = require("../cloudinaryConfig/cloudinaryConfig")

/**
 * @swagger
 * /lessons/{courseId}:
 *   get:
 *     summary: Get lessons by courseId
 *     description: Retrieve lessons from the database by courseId.
 *     tags:
 *       - Lessons
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: string
 *         description: The courseId of the lessons to retrieve
 *     responses:
 *       200:
 *         description: Successful response with list of lessons
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   courseId:
 *                     type: string
 *                   title:
 *                     type: string
 *                   desc:
 *                     type: string
 *                   fileUrl:
 *                     type: string
 *                   cover:
 *                     type: string
 *       404:
 *         description: Lessons not found for the given courseId
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
 *                   example: "No lessons found with the given courseId"
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
router.get("/lessons/:courseId", async (req, res) => {
    const { courseId } = req.params;
    try {
        const lessons = await lessonModel.find({
            courseId: courseId
        })

        if (!lessons) {
            return res.status(404).send({
                statusCode: 404,
                message: "no lessons found with the given courseId"
            })
        }

        res.status(200).send(lessons);
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
 * /lessons/{id}:
 *   get:
 *     summary: Get a lesson by ID
 *     description: Retrieve a lesson from the database by ID.
 *     tags:
 *       - Lessons
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the lesson to retrieve
 *     responses:
 *       200:
 *         description: Successful response with the requested lesson
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 courseId:
 *                   type: string
 *                 title:
 *                   type: string
 *                 desc:
 *                   type: string
 *                 fileUrl:
 *                   type: string
 *                 cover:
 *                   type: string
 *       404:
 *         description: Lesson not found
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
 *                   example: "No lesson found with the given ID"
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
router.get("/lessons/single/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const lesson = await lessonModel.findById(id);

        if (!lesson) {
            return res.status(404).send({
                statusCode: 404,
                message: 'no lesson found with the given id'
            })
        }

        res.status(200).send(lesson);
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
 * /lessons:
 *   post:
 *     summary: Create a new lesson
 *     description: Create a new lesson in the database.
 *     tags:
 *       - Lessons
 *     requestBody:
 *       description: Lesson information
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - courseId
 *               - title
 *               - desc
 *               - fileUrl
 *             properties:
 *               courseId:
 *                 type: string
 *                 description: The ID of the course to which the lesson belongs
 *               title:
 *                 type: string
 *                 description: The title of the lesson
 *               desc:
 *                 type: string
 *                 description: The description of the lesson
 *               fileUrl:
 *                 type: string
 *                 description: The URL of the file associated with the lesson
 *               cover:
 *                 type: string
 *                 description: The cover image URL of the lesson (optional)
 *             example:
 *               courseId: "60b8d29569b1c4a7a2ef1a7d"
 *               title: "Introduction to Programming"
 *               desc: "This lesson covers the basics of programming."
 *               fileUrl: "https://example.com/lesson_file.pdf"
 *               cover: "https://example.com/lesson_cover.jpg"
 *     responses:
 *       201:
 *         description: Lesson created successfully
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
 *                     title:
 *                       type: string
 *                     desc:
 *                       type: string
 *                     fileUrl:
 *                       type: string
 *                     cover:
 *                       type: string
 *                   example:
 *                     _id: "60b8d29569b1c4a7a2ef1a7d"
 *                     courseId: "60b8d29569b1c4a7a2ef1a7e"
 *                     title: "Introduction to Programming"
 *                     desc: "This lesson covers the basics of programming."
 *                     fileUrl: "https://example.com/lesson_file.pdf"
 *                     cover: "https://example.com/lesson_cover.jpg"
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
router.post("/lessons", async (req, res) => {
    const newLesson = new lessonModel({
        courseId: req.body.courseId,
        title: req.body.title,
        desc: req.body.desc,
        fileUrl: req.body.fileUrl,
        cover: req.body.cover
    })

    try {
        const lessonToSave = await newLesson.save();
        res.status(201).send({
            statusCode: 201,
            payload: lessonToSave
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
 * /lessons/uploadImg:
 *   post:
 *     summary: Upload lesson cover image
 *     description: Uploads a lesson's cover image to the server.
 *     tags:
 *       - Lessons
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               cover:
 *                 type: string
 *                 format: binary
 *                 description: The cover image file of the lesson
 *     responses:
 *       200:
 *         description: Successful response with uploaded image path
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 source:
 *                   type: string
 *                   description: The path to the uploaded image
 *                   example: "/uploads/lesson_covers/image123.jpg"
 *       500:
 *         description: File upload error
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
 *                   example: "File Upload Error"
 */
router.post('/lessons/uploadImg', uploadFile, async (req, res) => {
    try {
        res.status(200).json({ source: req.file.path })
    } catch (error) {
        res.status(500)
            .send({
                statusCode: 500,
                message: 'File Upload Error'
            })
    }
});

/**
 * @swagger
 * /lessons/uploadVideo:
 *   post:
 *     summary: Upload a video for a lesson
 *     description: Upload a video file for a lesson.
 *     tags:
 *       - Lessons
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               fileUrl:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Successful response with the source of the uploaded video file
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 source:
 *                   type: string
 *                   format: uri
 *                   description: URL of the uploaded video file
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
 *                   example: "File Upload Error"
 */
router.post('/lessons/uploadVideo', uploadFile, async (req, res) => {
    try {
        res.status(200).json({ source: req.file.path })
    } catch (error) {
        res.status(500)
            .send({
                statusCode: 500,
                message: 'File Upload Error'
            })
    }
});

/**
 * @swagger
 * /lessons/{id}:
 *   patch:
 *     summary: Update a lesson
 *     description: Update an existing lesson in the database by ID.
 *     tags:
 *       - Lessons
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the lesson to update
 *     requestBody:
 *       description: Lesson data to update
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               courseId:
 *                 type: string
 *                 description: The ID of the course the lesson belongs to (optional)
 *               title:
 *                 type: string
 *                 description: The title of the lesson (optional)
 *               desc:
 *                 type: string
 *                 description: The description of the lesson (optional)
 *               fileUrl:
 *                 type: string
 *                 description: The URL of the file associated with the lesson (optional)
 *               cover:
 *                 type: string
 *                 description: The URL of the cover image associated with the lesson (optional)
 *             example:
 *               courseId: "60b8d29569b1c4a7a2ef1a7d"
 *               title: "Advanced Programming"
 *               desc: "This lesson covers advanced programming concepts."
 *               fileUrl: "https://example.com/new_lesson_file.pdf"
 *               cover: "https://example.com/new_lesson_cover.jpg"
 *     responses:
 *       200:
 *         description: Successful response with updated lesson data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 courseId:
 *                   type: string
 *                 title:
 *                   type: string
 *                 desc:
 *                   type: string
 *                 fileUrl:
 *                   type: string
 *                 cover:
 *                   type: string
 *       404:
 *         description: Lesson not found
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
 *                   example: "No lesson found with the given ID"
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
router.patch("/lessons/:id", async (req, res) => {
    const { id } = req.params;
    const lesson = await lessonModel.findById(id);

    if (!lesson) {
        return res.status(404).send({
            statusCode: 404,
            message: 'no lesson found with the given id'
        })
    }

    try {
        const updatedData = req.body;
        const options = { new: true };

        const result = await lessonModel.findByIdAndUpdate(id, updatedData, options);

        res.status(200).send(result)
    } catch (error) {
        response
            .status(500)
            .send({
                statusCode: 500,
                message: 'Internal server error'
            })
    }
});

/**
 * @swagger
 * /lessons/{id}:
 *   delete:
 *     summary: Delete a lesson
 *     description: Delete an existing lesson from the database by ID.
 *     tags:
 *       - Lessons
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the lesson to delete
 *     responses:
 *       200:
 *         description: Successful response indicating lesson deletion
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Lesson with id {id} deleted successfully"
 *       404:
 *         description: Lesson not found
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
 *                   example: "No lesson found with the given ID"
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
router.delete("/lessons/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const lesson = await lessonModel.findByIdAndDelete(id)
        if (!lesson) {
            return res.status(404).send({
                statusCode: 404,
                message: 'no lesson found with the given id'
            })
        }

        res.status(200).send(`Lesson with id ${id} deleted successfully`)
    } catch (error) {
        response
            .status(500)
            .send({
                statusCode: 500,
                message: 'Internal server error'
            })
    }
});

module.exports = router;