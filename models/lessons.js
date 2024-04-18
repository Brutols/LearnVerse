const mongoose = require("mongoose")

const LessonSchema = new mongoose.Schema({
    courseId: {
        type: "string",
        required: true
    },
    title: {
        type: "string",
        required: true
    },
    desc: {
        type: "string",
        required: true
    },
    fileUrl: {
        type: "string",
        required: true
    },
    cover: {
        type: "string",
        required: true
    }
}, {timestamps: true, strict: true})

module.exports = mongoose.model("lessonModel", LessonSchema, "lessons")