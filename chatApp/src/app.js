const app = require('express')()
const { createServer } = require("http")
const server = createServer(app);
const cors = require("cors")

const chatRouter = require("./routes/chat")

const chatRoutes = "/api/v1/chat/"
app.use(cors({
    origin: "http://127.0.0.1:5500"
}))
app.use(chatRoutes, chatRouter)
const messageRoutes = "api/v1/messages"



module.exports = server