
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




/*

https://github.com/segfal/youtuberooms

So does the socket server look like this => 

io.on("connection", function (client) {
  console.log("We have a new client: " + client.id);

*/
// Socket.IO connection logic
io.on('connection', (socket) => {
  // Join room
  console.log("SOCKET",socket.id);
  socket.on('joinRoom', (room) => {
    socket.join(room);
    console.log(`User joined room: ${room}`);
  });

  // Handle chat messages
  socket.on('chatMessage', (data) => {
    console.log("data: ", data)
    console.log("socket.room: ", socket.rooms)

    io.to(data.room).emit('message', data.message);
  });
  // Handle video controls
  socket.on('on_resume', (data) => {
    console.log("data: ", data)
    io.to(data.room).emit('resume', data);
  });
socket.on('on_pause', (data) => {
    console.log(data)
    io.to(data.room).emit('pause', data);
    }
);


});

// Start the server
const PORT = 3001;
http.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
