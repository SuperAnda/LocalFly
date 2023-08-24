const app = require('http').createServer();
const io = require('socket.io')(app);

io.on('connection', socket => {
    console.log('A user connected');

    socket.on('joinRoom', roomName => {
        socket.join(roomName);
        const joinMsg = `User ${socket.id} joined room ${roomName}`
        io.to(roomName).emit('joinRoom', joinMsg);
        console.log(joinMsg);
    });

    socket.on('leaveRoom', roomName => {
        socket.leave(roomName);
        console.log(`User ${socket.id} left room ${roomName}`);
    });

    socket.on('sendMessage', (data) => {

        console.log("data:", data);
        const parsedData = JSON.parse(data);
        io.to(parsedData.roomName).emit('message', parsedData.message);
        console.log(`Message sent to room ${parsedData.roomName}: ${parsedData.message}`);
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

app.listen(11100, () => {
    console.log('Server is running on port 11100');
});
