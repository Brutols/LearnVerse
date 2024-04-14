const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    firstName: {
        type: "string",
        required: true
    },
    lastName: {
        type: "string",
        required: true
    },
    email: {
        type: "string",
        required: true
    },
    password: {
        type: "string",
        required: true
    },
    role: {
        type: "string",
        required: false,
        default: "user"
    },
    profilePic: {
        type: "string",
        required: false,
        default: "https://placehold.it/500x500"
    },
    myCourses: [{
        type: mongoose.Types.ObjectId,
        ref: "courseModel",
        required: false
    }]
}, {timestamps: true, strict: true})

module.exports = mongoose.model("userModel", UserSchema, "users")