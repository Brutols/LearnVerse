const express = require("express");
const router = express.Router();
const courseModel = require("../models/courses");
const { cloudUpload } = require("../cloudinaryConfig/cloudinaryConfig")

/**
 * @swagger
 * /courses:
 *   get:
 *     summary: Get all courses
 *     description: Retrieve all courses from the database.
 *     tags:
 *       - Courses
 *     responses:
 *       200:
 *         description: Successful response with list of courses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   desc:
 *                     type: string
 *                   price:
 *                     type: number
 *                   cover:
 *                     type: string
 *                   category:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
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
router.get("/courses", async (req, res) => {
    try {
        const courses = await courseModel.find();

        res.status(200).send(courses)
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
 * /courses/{id}:
 *   get:
 *     summary: Get a course by ID
 *     description: Retrieve a course from the database by ID.
 *     tags:
 *       - Courses
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the course to retrieve
 *     responses:
 *       200:
 *         description: Successful response with the requested course
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 desc:
 *                   type: string
 *                 price:
 *                   type: number
 *                 cover:
 *                   type: string
 *                 category:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Course not found
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
 *                   example: "Course not found with the given ID"
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
router.get("/courses/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const course = await courseModel.findById(id);

        if (!course) {
            return res.status(404)
                    .send({
                        statusCode: 404,
                        message: "course not found with given id"
                    })
        }

        res.status(200).send(course)
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
 * /courses/{category}:
 *   get:
 *     summary: Get courses by category
 *     description: Retrieve courses from the database by category.
 *     tags:
 *       - Courses
 *     parameters:
 *       - in: path
 *         name: category
 *         required: true
 *         schema:
 *           type: string
 *         description: The category of the courses to retrieve
 *     responses:
 *       200:
 *         description: Successful response with list of courses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   desc:
 *                     type: string
 *                   price:
 *                     type: number
 *                   cover:
 *                     type: string
 *                   category:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *       404:
 *         description: Courses not found for the given category
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
 *                   example: "No courses found with the given category"
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
router.get("/courses/:category", async (req, res) => {
    const { category } = req.params;
    try {
        const courses = await courseModel.find({
            category: {
                $regex: '.*' + category + '.*',
                $options: 'i'
            }
        })

        if (!courses) {
            return res.status(404).send({
                statusCode: 404,
                message: 'no courses found with the given query'
            })
        }

        res.status(200).send(courses);
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
 * /courses:
 *   post:
 *     summary: Create a new course
 *     description: Create a new course in the database.
 *     tags:
 *       - Courses
 *     requestBody:
 *       description: Course information
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - desc
 *               - price
 *               - cover
 *               - category
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the course
 *               desc:
 *                 type: string
 *                 description: The description of the course
 *               price:
 *                 type: number
 *                 description: The price of the course
 *               cover:
 *                 type: string
 *                 description: The cover image URL of the course
 *               category:
 *                 type: string
 *                 description: The category of the course
 *             example:
 *               title: "Sample Course"
 *               desc: "This is a sample course description."
 *               price: 19.99
 *               cover: "https://example.com/course-cover.jpg"
 *               category: "Programming"
 *     responses:
 *       201:
 *         description: Course created successfully
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
 *                     title:
 *                       type: string
 *                     desc:
 *                       type: string
 *                     price:
 *                       type: number
 *                     cover:
 *                       type: string
 *                     category:
 *                       type: string
 *                     createdAt:
 *                       type: string
 *                       format: date-time
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
router.post("/courses", async (req, res) => {
    const newCourse = new courseModel({
        title: req.body.title,
        desc: req.body.desc,
        price: req.body.price,
        cover: req.body.cover,
        category: req.body.category
    })

    try {
        const courseToSave = await newCourse.save();
        res.status(201).send({
            statusCode: 201,
            payload: courseToSave
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
 * /courses/uploadImg:
 *   post:
 *     summary: Upload a course cover image
 *     description: Upload a cover image for a course.
 *     tags:
 *       - Courses
 *     requestBody:
 *       description: Course cover image file to upload
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               cover:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Successful response with the uploaded image path
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 source:
 *                   type: string
 *                   description: The path of the uploaded image
 *       500:
 *         description: Internal server error or file upload error
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
 *                   example: 'File Upload Error'
 */
router.post('/courses/uploadImg', cloudUpload.single('cover'), async (req, res) => {
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
 * /courses/{id}:
 *   patch:
 *     summary: Update a course
 *     description: Update an existing course in the database by ID.
 *     tags:
 *       - Courses
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the course to update
 *     requestBody:
 *       description: Course data to update
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The updated title of the course
 *               desc:
 *                 type: string
 *                 description: The updated description of the course
 *               price:
 *                 type: number
 *                 description: The updated price of the course
 *               cover:
 *                 type: string
 *                 description: The updated cover image URL of the course
 *               category:
 *                 type: string
 *                 description: The updated category of the course
 *             example:
 *               title: "Updated Course Title"
 *               desc: "Updated course description."
 *               price: 29.99
 *               cover: "https://example.com/updated-cover.jpg"
 *               category: "Updated Category"
 *     responses:
 *       200:
 *         description: Successful response with updated course data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 desc:
 *                   type: string
 *                 price:
 *                   type: number
 *                 cover:
 *                   type: string
 *                 category:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Course not found
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
 *                   example: "No course found with the given ID"
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
router.patch("/courses/:id", async (req, res) => {
    const { id } = req.params;
    const course = await courseModel.findById(id);

    if (!course) {
        return res.status(404).send({
            statusCode: 404,
            message: 'no course found with the given id'
        })
    }

    try {
        const updatedData = req.body;
        const options = { new: true };

        const result = await courseModel.findByIdAndUpdate(id, updatedData, options);

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
 * /courses/{id}:
 *   delete:
 *     summary: Delete a course
 *     description: Delete an existing course from the database by ID.
 *     tags:
 *       - Courses
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the course to delete
 *     responses:
 *       200:
 *         description: Successful response indicating course deletion
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Course with id {id} deleted successfully"
 *       404:
 *         description: Course not found
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
 *                   example: "No course found with the given ID"
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
router.delete("/courses/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const course = await courseModel.findByIdAndDelete(id)
        if (!course) {
            return res.status(404).send({
                statusCode: 404,
                message: 'no course found with the given id'
            })
        }

        res.status(200).send(`Course with id ${id} deleted successfully`)
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