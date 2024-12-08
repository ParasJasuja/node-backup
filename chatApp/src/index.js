require("dotenv").config({
    path: "./.env"
})

const server = require("./app");
const connectToDB = require("./config/db");
const chatEvents = require("./constants/chatEvents");
const socketInIt = require("./sockets/chat")
const port = process.env.port || 4000


connectToDB()
socketInIt(server)
server.listen(port, () => {
    console.log(`Listening on port :${port}....`);
});