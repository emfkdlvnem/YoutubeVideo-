import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
const server = http.createServer(app);

// CORS 미들웨어 추가
app.use(cors());

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173', // 클라이언트 앱의 주소로 변경해주세요.
        methods: ['GET', 'POST'],
    },
});

const PORT = 3001;

// 웹소켓 연결 설정
io.on('connection', (socket) => {
    console.log('A user connected');

    // 클라이언트로부터 채팅 메시지 수신
    socket.on('chat message', (message) => {
        console.log(`Received message: ${message}`);

        // 클라이언트로 메시지 전송 (모든 클라이언트에게 전송)
        io.emit('chat message', message);
    });

    // 클라이언트와의 연결이 끊어질 때
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
