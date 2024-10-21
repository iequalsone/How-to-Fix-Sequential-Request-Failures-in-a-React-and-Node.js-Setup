/// Server side
const express = require("express")
const http = require("http")
const { Server } = require("socket.io")

const app = express()
const server = app.listen(8080)
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
})
PORT = 8080

app.get("/", (req, res) => {
  res.send("Socket.IO Server Running")
})

io.on("connection", (socket) => {
  console.log("Connected")

  // this message is sent and received by the client
  const firstJson = { message: "hello" }
  socket.emit("receivedJson", firstJson)

  socket.on("jsonProcessed", () => {
    console.log("Client has processed the first JSON.")
    setTimeout(() => {
      // This message is not received by the client
      const secondJson = { message: "This is your second JSON!" }

      socket.emit("receivedJson", secondJson)
    }, 1000) // 1-second delay
  })

  socket.on("disconnect", () => {
    console.log("User disconnected")
  })
})
