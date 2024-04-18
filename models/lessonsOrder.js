const mongoose = require("mongoose");

const LessonsOrderSchema = new mongoose.Schema({
    courseId: {
        type: "string",
        required: true
    },
    lessonsOrder: [{
        lessonId: {
            type: "string",
        },
        position: {
            type: "number"
        }
    }]
}, {timestamps: true, strict: true});

module.exports = mongoose.model("lessonsOrderModel", LessonsOrderSchema, "lessonsOrder")