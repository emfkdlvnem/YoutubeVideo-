import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import ChatList from './ChatList';
import ChatWindow from './ChatWindow';

interface ChatRoom {
    id: string;
    name: string;
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

    const updateUserProfile = (username: string, profileImage: string | null) => {
        setUserProfile({
            username: username,
            profileImage: profileImage,
        });
    };

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
                }));
                setChatRooms(chatRoomData);

                // 선택된 첫 번째 채팅방의 ID 설정
                if (chatRoomData.length > 0 && selectedChatRoom === null) {
                    setSelectedChatRoom(chatRoomData[0].id);
                }

                // 선택된 첫 번째 유저 프로필 정보 설정
                const defaultUserProfile = usersInfo.find((user) => user.username === username);
                if (defaultUserProfile) {
                    updateUserProfile(defaultUserProfile.username, defaultUserProfile.profileImage);
                }
            });
    }, [selectedChatRoom, username]);

    const handleChatRoomClick = (chatRoomId: string) => {
        setSelectedChatRoom(chatRoomId);
    };

    const handleSendMessage = () => {
        if (inputMessage.trim() === '' || username.trim() === '') return;

        const newMessage = `${username}: ${inputMessage}`;
        setChatMessages((prevMessages) => [
            ...prevMessages,
            { roomId: selectedChatRoom!, message: newMessage },
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
