// src/utils/websocket.ts
import { io, Socket } from 'socket.io-client';

const socket: Socket = io('ws://localhost:8080');

export default socket;
