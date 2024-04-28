const mongoose = require("mongoose");

const LessonsOrderSchema = new mongoose.Schema(
  {
    courseId: {
      type: "string",
      required: true,
    },
    lessonsOrder: [{
        type: mongoose.Types.ObjectId,
        ref: 'lessons',
        required: false,
        default: []
    }],
  },
  { timestamps: true, strict: true }
);

module.exports = mongoose.model(
  "lessonsOrderModel",
  LessonsOrderSchema,
  "lessonsOrder"
);
