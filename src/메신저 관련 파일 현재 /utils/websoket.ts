// // src/utils/websocket.ts
import io from 'socket.io-client';

const SERVER_URL = 'http://localhost:8080'; // WebSocket 서버 주소

const socket = io(SERVER_URL, {
    transports: ['websocket'], // WebSocket 전송 방식 선택
});

export default socket;
