// src/utils/websocket.ts
// import io from 'socket.io-client';

// const SERVER_URL = 'ws://localhost:3001';

// const socket = io(SERVER_URL);

// export default socket;
// utils/websocket.ts
const createWebSocket = (): WebSocket => {
    const socket = new WebSocket('ws://your-backend-url');

    socket.onopen = () => {
        console.log('WebSocket connected');
    };

    socket.onmessage = (event) => {
        console.log('WebSocket message received:', event.data);
        // 채팅 메시지를 받아와서 처리하는 로직을 추가합니다.
        // 예시: setChatMessages((prevMessages) => [...prevMessages, event.data]);
    };

    socket.onclose = () => {
        console.log('WebSocket disconnected');
    };

    return socket;
};

export default createWebSocket;
