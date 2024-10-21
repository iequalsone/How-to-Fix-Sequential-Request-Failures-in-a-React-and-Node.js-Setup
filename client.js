// Client side
import React, { useRef, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import io from "socket.io-client"
const Male = ({ title }) => {
  const navigate = useNavigate()
  const socket = useRef(null)

  const [jsonData, setJsonData] = useState(null)

  useEffect(() => {
    socket.current = io("http://localhost:8080")

    socket.current.on("connect", () => {
      console.log("Connection to server established")
    })

    socket.current.on("receiveJson", (data) => {
      console.log("Received JSON from server:", data)
      setJsonData(data)
    })

    return () => {
      console.log("Disconnected from socket")
      socket.current.disconnect()
    }
  }, [])

  const handleJsonProcessing = () => {
    console.log("Emitting JsonProcessed event")

    socket.current.emit("jsonProcessed")
    setJsonData(null)
  }

  return (
    <div>
      {jsonData ? (
        <div>
          <pre>{JSON.stringify(jsonData, null, 2)}</pre>
          <button onClick={handleJsonProcessing}>Done with JSON</button>
        </div>
      ) : (
        <p>No JSON data received.</p>
      )}
    </div>
  )
}
