
const express = require("express")
const app = express()

const cors = require("cors")

const http = require("http")
const { Server } = require("socket.io")


const server = http.createServer(app)

app.use(cors())


const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods : ["GET", "POST"],
    }
})


io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`)

    socket.on("Join_Room", (data) => {
        socket.join(data)
    })

    /*socket.on("Send_Message", (data) => {
        socket.broadcast.emit("Receive_Message", data)
    })*/

    socket.on("Send_Message", (data) => {
        socket.to(data.room).emit("Receive_Message", data)
    })

})


server.listen(8000, () => {
    console.log("Server is running at port 8000..!✋")
})


