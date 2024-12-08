const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    photo: {
        url: {
            type: string,
            required: true,
            default: "https://picsum.photos/200/300"
        }
    },
    gender: {
        type: string,
        required: true,
        enum: {
            values: ['male', 'female', 'other']
        }
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    forgotPasswordToken: {
        type: String,
    },
    forgotPasswordTokenExpiry: {
        type: Date,
    }
}, {
    timestamps: true
})


module.exports = mongoose.model("User", userSchema);