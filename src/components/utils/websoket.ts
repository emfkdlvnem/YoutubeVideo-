// src/utils/websocket.ts
import io from 'socket.io-client';

const SERVER_URL = 'ws://localhost:3001';

const socket = io(SERVER_URL);

export default socket;
