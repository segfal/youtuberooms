// const express = require("express")
// const app = express()
// const http  = require("http");
// const { Server } = require("socket.io");
// const cors = require("cors");




// app.use(express.static('public'));



// app.use(cors());
// const server = http.createServer(app);
// //Create Room 
// const io = new Server(server, {
//     cors: {
//         origin: "http://localhost:3000",
//         methods: ["GET", "POST"]
//     }
// });

// io.on("connection", (socket) => {
//     console.log("user connected");
//     socket.on("create_room", (data) => {
//         if(data && typeof data === "string"){
//             socket.join(data);
//             console.log("user created room: " + data);
//         }
//         else{
//             console.log("Invalid data");
//         }
//     });


//     socket.on("join_room", (data) => {
//         if(data && typeof data === "string"){
//             socket.join(data);
//             console.log("user joined room: " + data);
//         }
//         else{
//             console.log("Invalid data");
//         }
//     });

//     //send youtube link
//     socket.on("send_link", (data) => {
//         console.log(data);
//         if(data && typeof data.room === "string" && typeof data.link === "string"){
//             console.log("LINK SENT",data.link);
//             socket.to(data.room).emit("receive_link", data);//TODO put broadcast on
//         }
//         else{
//             console.log("Invalid data");

//         }
        
//     });

//     // socket.on("disconnect", () => {
//     //     console.log("user disconnected");
//     // });
// }
// );



// const PORT = process.env.PORT || 4000;

// server.listen(PORT, () => {
//     console.log(`Server listening on port ${PORT}`);
// });











const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});
const cors = require('cors');

app.use(cors());

// Socket.IO connection logic
io.on('connection', (socket) => {
  // Join room
  socket.on('joinRoom', (room) => {
    socket.join(room);
    console.log(`User joined room: ${room}`);
  });

  // Handle chat messages
  socket.on('chatMessage', (data) => {
    io.to(data.room).emit('message', data.message);
  });
  // Handle video controls
  socket.on('on_resume', (data) => {
    console.log("data: ", data)
    io.to(data.room).emit('resume', data.time);
  });
socket.on('on_pause', (data) => {
    io.to(data.room).emit('pause', data.time);
    }
);


});

// Start the server
const PORT = 3001;
http.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
