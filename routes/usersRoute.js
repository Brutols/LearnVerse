const express = require("express");
const router = express.Router();
const userModel = require("../models/users");
const bcrypt = require("bcrypt");
const { uploadFile } = require("../cloudinaryConfig/cloudinaryConfig")

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     description: Retrieve all users from the database.
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Successful response with list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   firstName:
 *                     type: string
 *                   lastName:
 *                     type: string
 *                   email:
 *                     type: string
 *                   password:
 *                     type: string
 *                   role:
 *                     type: string
 *                   profilePic:
 *                     type: string
 *                   myCourses:
 *                     type: array
 *                     items:
 *                       type: string
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
router.get("/users", async (req, res) => {
    try {
        const users = await userModel.find()

        res.status(200).send(users)
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
 * /users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     description: Retrieve a user from the database by ID.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to retrieve
 *     responses:
 *       200:
 *         description: Successful response with the requested user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 firstName:
 *                   type: string
 *                 lastName:
 *                   type: string
 *                 email:
 *                   type: string
 *                 password:
 *                   type: string
 *                 role:
 *                   type: string
 *                 profilePic:
 *                   type: string
 *                 myCourses:
 *                   type: array
 *                   items:
 *                     type: string
 *       404:
 *         description: User not found
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
 *                   example: "User not found, does not exist"
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
router.get("/users/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const user = await userModel.findOne(id)

        if (!user) {
            return res.status(404)
                    .send({
                        statusCode: 404,
                        message: "user not found, does not exists"
                    })
        }

        res.status(200).send(user)
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
 * /users:
 *   post:
 *     summary: Create a new user
 *     description: Create a new user in the database.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Successful response with the created user
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
 *                     firstName:
 *                       type: string
 *                     lastName:
 *                       type: string
 *                     email:
 *                       type: string
 *                     password:
 *                       type: string
 *                     role:
 *                       type: string
 *                     profilePic:
 *                       type: string
 *                     myCourses:
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
router.post("/users", async (req, res) => {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    const newUser = new userModel({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword
    })

    try {
        const userToSave = await newUser.save();
        res.status(201).send({
            statusCode: 201,
            payload: userToSave
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
 * /users/uploadImg:
 *   post:
 *     summary: Upload user profile picture
 *     description: Uploads a user's profile picture to the server.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               profilePic:
 *                 type: string
 *                 format: binary
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
 *                   example: "/uploads/profile_pics/image123.jpg"
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
router.post('/users/uploadImg', uploadFile, async (req, res) => {
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
 * /users/{id}:
 *   patch:
 *     summary: Update a user
 *     description: Update an existing user in the database by ID.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *               profilePic:
 *                 type: string
 *               myCourses:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Successful response with the updated user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 firstName:
 *                   type: string
 *                 lastName:
 *                   type: string
 *                 email:
 *                   type: string
 *                 password:
 *                   type: string
 *                 role:
 *                   type: string
 *                 profilePic:
 *                   type: string
 *                 myCourses:
 *                   type: array
 *                   items:
 *                     type: string
 *       404:
 *         description: User not found
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
 *                   example: "No user found with the given ID"
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
router.patch("/users/:id", async (req, res) => {
    const { id } = req.params;
    const user = await userModel.findById(id);

    if (!user) {
        return res.status(404).send({
            statusCode: 404,
            message: 'no user found with the given id'
        })
    }

    try {
        const updatedData = req.body;
        const options = { new: true };

        const result = await userModel.findByIdAndUpdate(id, updatedData, options).populate('myCourses');

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
 * /users/{id}:
 *   delete:
 *     summary: Delete a user
 *     description: Delete an existing user from the database by ID.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to delete
 *     responses:
 *       200:
 *         description: Successful response with a message indicating the user has been deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "User with id {id} deleted successfully"
 *       404:
 *         description: User not found
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
 *                   example: "No user found with the given ID"
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
router.delete("/users/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const user = await userModel.findByIdAndDelete(id)
        if (!user) {
            return res.status(404).send({
                statusCode: 404,
                message: 'no user found with the given id'
            })
        }

        res.status(200).send(`User with id ${id} deleted successfully`)
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