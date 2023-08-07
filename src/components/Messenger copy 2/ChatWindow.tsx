// src/components/ChatWindow.tsx
// 채팅창 보여지는 컴포넌트 내부 메세지 보여지는

import React, { useRef, useState } from 'react';
import socket from '../utils/websoket';
import styled from '@emotion/styled';

interface ChatWindowProps {
    chatRoom: string;
    messages: string[];
}

const ChatWindow: React.FC<ChatWindowProps> = ({ chatRoom, messages }) => {
    const messageRef = useRef<HTMLInputElement>(null);
    const [messageInput, setMessageInput] = useState('');

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (messageRef.current && messageRef.current.value.trim()) {
            const message = messageRef.current.value.trim();
            socket.emit('chat message', message); // 백엔드로 메시지 전송
            messageRef.current.value = '';
        }
    };

    return (
        <ChatWindowInn>
            <h2>{chatRoom}</h2>
            <div>
                {messages.map((message, index) => (
                    <div key={index}>{message}</div>
                ))}
            </div>
            <form onSubmit={handleSendMessage}>
                <input
                    type="text"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    ref={messageRef}
                />
                <button type="submit">Send</button>
            </form>
        </ChatWindowInn>
    );
};

const ChatWindowInn = styled.section`
    border: none;
`;
export default ChatWindow;
