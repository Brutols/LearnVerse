const mongoose = require("mongoose")

const CourseSchema = new mongoose.Schema({
    title: {
        type: "string",
        required: true
    },
    desc: {
        type: "string",
        required: true
    },
    price: {
        type: "number",
        required: true
    },
    cover: {
        type: "string",
        required: true
    },
    category: {
        type: "string",
        required: true
    }
}, {timestamps: true, strict: true})

module.exports = mongoose.model("courseModel", CourseSchema, "courses")