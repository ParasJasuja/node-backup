const mongoose = require("mongoose")

const messageSchema = new mongoose.Schema({
    message: {
        type: String,
    },
    from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    groupChat: {
        type: Boolean,
        required: true,
        default: false,
    },
    groupId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat'
    },
    to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: function () { return !this.groupChat; }
    },
    reply: {
        type: Boolean,
        required: true,
        default: false
    },
    replyTo: {
        type: mongoose.Schema.Types.ObjectId,
        required: function () { return reply }
    },
    edited: {
        type: Boolean,
        required: true,
        default: false
    }
}, { timestamps: true })

module.exports = mongoose.model("Message", messageSchema);