import React, { useEffect, useState } from 'react'
import './App.css';
import io from 'socket.io-client'
const socket = io.connect("http://localhost:8000")

function App() {
	
	const [message, setMessage] = useState("")
	const [messageReceived, setMessageReceived] = useState("")
	const [room, setRoom] = useState(null)


	useEffect(() => {

		socket.on("Receive_Message", (data) => {
			setMessageReceived(data.message)
		})

	}, [socket])



	const sendMessage = () => {
		socket.emit("Send_Message", { message, room } )
	}


	const joinRoom = () => {
		if(room !== "") {
			socket.emit("Join_Room", room)
		}
	}


	return (
		<div className="App">
			<h2> Socket IO Demo - Real time room based chat app</h2>
			<div>
				<input placeholder="Join Room.." onChange={(event) => setRoom(event.target.value)}/>
				<button onClick={joinRoom}>Join Room</button>
			</div>
			<br/>
			<div>
				<div style={{ display: 'flex', flexDirection:'column', alignItems: 'center',  gap: '5px' }}>
					<input placeholder="Messages.." onChange={(event) => setMessage(event.target.value)}  style={{ minWidth: '400px'}}/>
					<button onClick={sendMessage}>Send Message</button>
				</div>
				<div>
					<h2>Message Received :</h2>
					{messageReceived}
				</div>
			</div>
		</div>
	)
 
}

export default App;
