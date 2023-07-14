// import './App.css';
// import React,{useEffect,useState} from 'react';
// import YoutubeVideo from './youtubeVideo';
// import io from "socket.io-client";

// const socket = io("http://localhost:4000");


// function _App() {


//   const [room,setRoom] = useState("");
//   const [link,setLink] = useState("");
//   const [isJoined,setIsJoined] = useState(false);
//   //const [isHost,setIsHost] = useState(false);
//   useEffect(()=>{
//     socket.on("connect", () => {
//       console.log(socket.id); // x8WIv7-mJelg7on_ALbx
//     });

//     socket.on("disconnect", () => {
//       console.log(socket.id); // undefined
//     }
//     );

//   }, []);

//   const handleJoin = () => {
//     console.log("Handle Join Hit");
//     socket.emit("join_room", room);
//     setIsJoined(true);
//     console.log(room)
//   }

//   const handleLink = () => {
//     console.log("Handle Link Hit");
//     socket.emit("send_link", {room,link});
//   }

//   const handleCreate = () => {
//     console.log("Handle Create Hit");

//     socket.emit("create_room", room);
//     console.log(room)
//     setIsJoined(true);
//   }

//   return (
//     <div className="App">
//       <h1>Youtube Sync</h1>
//       <div className="room">
//         <input type="text" placeholder="Enter Room Name" onChange={(e)=>setRoom(e.target.value)} />
//         <button onClick={handleJoin}>Join Room</button>
//         <button onClick={handleCreate}>Create Room</button>
//       </div>
//       {isJoined && <div className="link">
//         <input type="text" placeholder="Enter Youtube Link" onChange={(e)=>setLink(e.target.value)} />
//         {console.log(link)}
//         <button onClick={handleLink}>Send Link</button>
//       </div>}                                                                                                                                                                                         
//       {isJoined && <YoutubeVideo room={room} socket={socket} link={link} />}
//     </div>
//   );
  
// }



// function App() {
//   //Room State
//   const [room, setRoom] = useState("");

//   // Messages States
//   const [message, setMessage] = useState("");
//   const [messageReceived, setMessageReceived] = useState("");

//   const joinRoom = () => {
//     if (room !== "") {
//       socket.emit("join_room", room);
//     }
//   };

//   const sendMessage = () => {
//     socket.emit("send_message", { message, room });
//   };

//   useEffect(() => {
//     socket.on("receive_message", (data) => {
//       setMessageReceived(data.link);
//     });
//   }, [socket]);
//   return (
//     <div className="App">
//       <input
//         placeholder="Room Number..."
//         onChange={(event) => {
//           setRoom(event.target.value);
//         }}
//       />
//       <button onClick={joinRoom}> Join Room</button>
//       <input
//         placeholder="Message..."
//         onChange={(event) => {
//           setMessage(event.target.value);
//         }}
//       />
//       <button onClick={sendMessage}> Send Message</button>
//       <h1> Message:</h1>
//       {messageReceived}
//     </div>
//   );
// }



// export default App;




import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import YoutubeVideo from './youtubeVideo';

const socket = io('http://localhost:3001');

function App() {
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages((messages) => [...messages, message]);
    });

    return () => {
      socket.off('message');
    };
  }, []);

  const handleJoinRoom = () => {
    socket.emit('joinRoom', room);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit('chatMessage', { room, message });
    setMessage('');
  };

  return (
    <div>
      <h1>Chatroom App</h1>
      <div>
        <input
          type="text"
          placeholder="Enter room name"
          value={room}
          onChange={(event) => setRoom(event.target.value)}
        />
        <button onClick={handleJoinRoom}>Join Room</button>
      </div>
      <div>
        {messages.map((msg, index) => (
          <YoutubeVideo link={msg}/>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter message"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default App;