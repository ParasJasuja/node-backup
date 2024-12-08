const mongoose = require("mongoose")

const chatSchema = new mongoose.Schema({
    groupChat: {
        type: Boolean,
        required: true,
        default: function () { return this.users.length != 2 },
    },
    users: [
        {
            name: {
                type: String,
                required: true
            },
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        }
    ],
},
    { timestamps: true })


module.exports = mongoose.model("Chat", chatSchema);