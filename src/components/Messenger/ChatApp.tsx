import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import ChatList from './ChatList';
import ChatWindow from './ChatWindow';

import stompClient from '../utils/websoket';

interface ChatRoom {
    id: string;
    name: string;
    profileImage: string | null;
}
interface UserProfile {
    username: string;
    profileImage: string | null;
}

const ChatApp: React.FC = () => {
    const [selectedChatRoom, setSelectedChatRoom] = useState<string | null>(null);
    const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
    const [chatMessages, setChatMessages] = useState<{ roomId: string; message: string }[]>([]);
    const [inputMessage, setInputMessage] = useState('');
    const [username, setUsername] = useState('');
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

    useEffect(() => {
        // 여기에 웹 소켓 설정 및 데이터 가져오는 로직 추가
        // ...

        // 서버로부터 채팅방 리스트를 받아오는 로직을 임시로 해놓기
        // 일단 여기서는 usersProfile.json 파일의 데이터를 사용하도록 가정
        fetch('../../usersProfile.json')
            .then((response) => response.json())
            .then((data) => {
                const usersInfo: UserProfile[] = data.usersInfo; // 데이터의 타입을 명시적으로 UserProfile[]로 지정
                const chatRoomData = usersInfo.map((user) => ({
                    id: user.username, // id를 username으로 설정
                    name: user.username,
                    profileImage: user.profileImage,
                }));
                setChatRooms(chatRoomData);

                // 선택된 첫 번째 채팅방의 ID 설정
                if (chatRoomData.length > 0 && selectedChatRoom === null) {
                    setSelectedChatRoom(chatRoomData[0].id);
                }

                // 선택된 첫 번째 유저 프로필 정보 설정
                const defaultUserProfile = usersInfo[0]; // 임시로 첫 번째 프로필을 선택
                if (defaultUserProfile) {
                    setUserProfile(defaultUserProfile);
                    setUsername(defaultUserProfile.username);
                }
            });
        // 기본 유저 정보 설정
        setUsername('윤몽진');

        // Stomp.js 웹소켓 연결 시작
        stompClient.activate();

        // Stomp.js를 이용하여 채팅 메시지 구독 설정
        stompClient.onConnect = () => {
            console.log('WebSocket connected');
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

        setChatMessages((prevMessages) => [
            ...prevMessages,
            // { roomId: selectedChatRoom!, message: newMessage },
            { roomId: selectedChatRoom!, message: newMessage, sentAt: currentTime }, // 보낸 시간 정보 추가
        ]);

        setInputMessage('');
    };

    return (
        <ChatAppWrapper>
            <ChatList chatRooms={chatRooms} onChatRoomClick={handleChatRoomClick} />
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
