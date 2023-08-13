import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import ChatList from './ChatList';
import ChatWindow from './ChatWindow';

import socket from '../utils/websoket';

interface ChatRoom {
    id: string;
    name: string;
    profileImage: string | null;
}
interface UserProfile {
    username: string;
    profileImage: string | null;
}
interface ResponseData {
    usersInfo: UserProfile[];
}
interface ChatMessage {
    roomId: string;
    message: string;
    sentAt: Date;
}

const ChatApp: React.FC = () => {
    const [selectedChatRoom, setSelectedChatRoom] = useState<string | null>(null);
    const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
    const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
    const [inputMessage, setInputMessage] = useState('');
    const [username, setUsername] = useState('');
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [isLoading, setIsLoading] = useState(true); // isLoading 상태 추가

    useEffect(() => {
        setUsername('윤몽진');

        // 웹 소켓 연결
        socket.on('connect', () => {
            console.log('WebSocket connected');
        });

        // 메시지를 받을 때의 이벤트
        socket.on('messageReceived', (message) => {
            // 받은 메시지를 어떻게 처리할지 구현
            // chatMessages 상태 업데이트 등
            console.log('Received message:', message);
        });

        // 서버로부터 채팅방 리스트를 받아오는 로직
        fetch('/api/pub/dm/test') // 실제 백엔드 API 주소 사용
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data: ResponseData) => {
                const usersInfo: UserProfile[] = data.usersInfo;

                const chatRoomData = usersInfo.map((user) => ({
                    id: user.username,
                    name: user.username,
                    profileImage: user.profileImage,
                }));

                setChatRooms(chatRoomData);

                // 선택된 첫 번째 채팅방의 ID 설정
                if (chatRoomData.length > 0 && selectedChatRoom === null) {
                    setSelectedChatRoom(chatRoomData[0].id);
                }

                // 선택된 첫 번째 유저 프로필 정보 설정
                const defaultUserProfile = usersInfo[0];
                if (defaultUserProfile) {
                    setUserProfile(defaultUserProfile);
                    setUsername(defaultUserProfile.username);
                }
            })
            .catch((error) => {
                console.error('Error fetching chat rooms:', error);
            });

        // 컴포넌트 unmount 시, 소켓 이벤트 리스너를 제거
        return () => {
            socket.off('messageReceived');
        };
    }, [selectedChatRoom, username]);

    const handleChatRoomClick = (chatRoomId: string) => {
        setSelectedChatRoom(chatRoomId);
        setInputMessage(''); // 클릭 시 메시지 입력창 초기화
    };

    const handleSendMessage = () => {
        if (inputMessage.trim() === '' || username.trim() === '') return;

        const newMessage = `${username}: ${inputMessage}`;
        const currentTime = new Date(); // 현재 시간을 얻어옴

        // 메시지 객체 생성
        const messageObject = {
            roomId: selectedChatRoom!,
            message: newMessage,
            sentAt: currentTime,
        };

        // 로컬 상태 업데이트
        setChatMessages((prevMessages) => [...prevMessages, messageObject]);

        // socket.io를 사용하여 서버에 메시지 전송
        socket.emit('sendMessage', messageObject);

        setInputMessage('');
    };

    return (
        <ChatAppWrapper>
            {chatRooms.length > 0 ? (
                <ChatList chatRooms={chatRooms} onChatRoomClick={handleChatRoomClick} />
            ) : isLoading ? (
                <p>Loading...</p>
            ) : (
                <p>No chat rooms available.</p>
            )}

            <ChatWindow
                chatRoomId={selectedChatRoom}
                chatMessages={chatMessages.filter((message) => message.roomId === selectedChatRoom)}
                onSendMessage={handleSendMessage}
                inputMessage={inputMessage}
                onInputChange={(e) => setInputMessage(e.target.value)}
                username={username}
                onUsernameChange={(e) => setUsername(e.target.value)}
                chatRoomName={chatRooms.find((room) => room.id === selectedChatRoom)?.name}
                userProfile={userProfile}
            />
        </ChatAppWrapper>
    );
};

const ChatAppWrapper = styled.div`
    display: flex;
    position: relative;
    max-width: 1440px;
    min-height: 100vh;
    margin: 150px auto 0;
`;
export default ChatApp;
