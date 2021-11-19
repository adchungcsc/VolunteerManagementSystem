const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origins: ['http://localhost:4200']
  }
});

let users = 0;

app.get('/', (req, res) => {
  res.send('<h1>Hey Socket.io</h1>');
});

io.on('connection', (socket) => {
  io.emit('server uptime', process.uptime());

  console.log('user connected');
  io.emit('user count update', ++users);

  socket.on('disconnect', () => {
    console.log('user disconnected');
    io.emit('user count update', --users);
  });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});