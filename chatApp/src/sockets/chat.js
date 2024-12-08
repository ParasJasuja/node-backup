const { Server } = require("socket.io")
const server = require('../app')
const chatEvents = require("../constants/chatEvents")

const socketInIt = () => {
    const io = new Server(server)
    io.on(chatEvents.CONNECT_EVENT, (socket) => {
        console.log("A user conected..." + socket.id);
        socket.on(chatEvents.DISCONNECT_EVENT, () => {
            console.log("User disconnected...." + socket.id);
        })
        socket.on(chatEvents.MESSAGE_EVENT, (message) => {
            console.log(message);
            socket.emit(chatEvents.MESSAGE_EVENT, message);
        })
    })
}

module.exports = socketInIt