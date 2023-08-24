
const socketIOClient = require('socket.io-client');
// 目标Socket.IO服务器的URL
const targetServerURL = 'ws://localhost:11100';

// 创建Socket.IO客户端实例
const clientSocket = socketIOClient(targetServerURL);

// 加入的房间名
const roomName = 'room1';

// 连接成功处理程序
clientSocket.on('connect', () => {
    
    console.log('Connected to target server.');
    // 发送加入房间请求
    clientSocket.emit('joinRoom', roomName);
});

// 监听服务器发送的消息
clientSocket.on('message', message => {
    console.log('Received message:', message);
});

// 处理断开连接事件
clientSocket.on('disconnect', () => {
    console.log('Disconnected from target server.');
});