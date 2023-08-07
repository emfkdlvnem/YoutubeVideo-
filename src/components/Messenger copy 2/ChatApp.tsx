import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';

import Modal from 'react-modal';
Modal.setAppElement('#root');

import ChatList from './ChatList';
import ChatWindow from './ChatWindow';

import socket from '../utils/websoket';

const ChatApp: React.FC = () => {
    const [selectedChat, setSelectedChat] = useState<string | null>(null);
    const [messages, setMessages] = useState<string[]>([]);

    const handleChatRoomClick = (chatRoom: string) => {
        setSelectedChat(chatRoom);
    };

    useEffect(() => {
        // 채팅 메시지 받기
        socket.on('chat message', (message: string) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });
    }, []);

    const data = {
        박명수: {
            senderProfileImage: '프로필 이미지 URL',
            senderNickname: '박명수',
            lastMessageDate: '2023-08-07 15:30',
            lastMessageContent: '안녕하세요.',
            newMessageCount: 2,
            messages: ['안녕하세요.', '오랜만이에요.'],
        },
        강해린: {
            senderProfileImage: '프로필 이미지 URL',
            senderNickname: '강해린',
            lastMessageDate: '2023-08-07 12:45',
            lastMessageContent: '오늘 저녁에 같이 운동할까요?',
            newMessageCount: 1,
            messages: ['오늘 저녁에 같이 운동할까요?', '네, 좋아요!'],
        },
    };

    return (
        <ChatAppInn>
            <ChatBox>
                <ChatList
                    chatRooms={Object.keys(data)}
                    onChatRoomClick={handleChatRoomClick}
                    data={data}
                    selectedChat={selectedChat} // Pass the selectedChat to ChatList
                />
                {selectedChat ? (
                    <ChatWindow chatRoom={selectedChat} messages={messages} />
                ) : (
                    <p>채팅을 시작해 보세요.</p>
                )}
            </ChatBox>
        </ChatAppInn>
    );
};

const ChatAppInn = styled.section`
    position: relative;
    max-width: 1440px;
    min-height: 100vh;
    margin: 150px auto 0;
    padding: 20px 60px;
    box-sizing: border-box;
    background-color: #f8f8f8;
`;
const ChatBox = styled.div`
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    width: 100%;
    height: 80%;
    background-color: rgb(172, 214, 215);
`;
export default ChatApp;
