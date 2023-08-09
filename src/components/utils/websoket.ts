// src/utils/websocket.ts
// import io from 'socket.io-client';

// const SERVER_URL = 'ws://localhost:3001';

// const socket = io(SERVER_URL);

// export default socket;

// const createWebSocket = (): WebSocket => {
//     const socket = new WebSocket('ws://your-backend-url');

//     socket.onopen = () => {
//         console.log('WebSocket connected');
//     };

//     socket.onmessage = (event) => {
//         console.log('WebSocket message received:', event.data);
//         // 채팅 메시지를 받아와서 처리하는 로직을 추가합니다.
//         // 예시: setChatMessages((prevMessages) => [...prevMessages, event.data]);
//     };

//     socket.onclose = () => {
//         console.log('WebSocket disconnected');
//     };

//     return socket;
// };
// export default createWebSocket;

import { Client } from '@stomp/stompjs';

const SERVER_URL = 'ws://your-backend-url'; // 웹 소켓 서버 주소

// Stomp 클라이언트 생성
const stompClient = new Client();

// 웹 소켓 연결
stompClient.configure({
    brokerURL: SERVER_URL,
    onConnect: () => {
        console.log('WebSocket connected');
        // 연결에 성공하면 여기서 구독(subscribe) 설정 등을 수행합니다.
    },
    onDisconnect: () => {
        console.log('WebSocket disconnected');
    },
    debug: (msg) => {
        console.log(msg);
    },
});

// Stomp 클라이언트 연결 시작
stompClient.activate();

export default stompClient;
