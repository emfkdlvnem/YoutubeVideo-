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
        // const socket = io('ws://localhost:3001'); // 웹 소켓 서버 주소를 넣어주세요.

        // socket.on('connect', () => {
        //     console.log('WebSocket connected');
        // });

        // socket.on('chatRooms', (chatRooms: ChatRoom[]) => {
        //     setChatRooms(chatRooms);
        // });

        // socket.on('chatMessage', (message: { roomId: string; message: string }) => {
        //     setChatMessages((prevMessages) => [...prevMessages, message]);
        // });

        // socket.on('disconnect', () => {
        //     console.log('WebSocket disconnected');
        // });

        // // 컴포넌트가 언마운트될 때 웹 소켓 연결을 해제합니다.
        // return () => {
        //     socket.disconnect();
        // };

        // 서버로부터 채팅방 리스트를 받아오는 로직을 구현합니다.
        // 여기서는 일단 하드코딩된 부분을 제거하고, usersProfile.json 파일의 데이터를 사용합니다.
        // fetch 함수를 사용하여 데이터를 가져오는 것을 시뮬레이션하는 것으로 가정합니다.
        fetch('/path/to/usersProfile.json')
            .then((response) => response.json())
            .then((data) => {
                const usersInfo = data.usersInfo;
                const chatRoomData = usersInfo.map((user) => ({
                    id: user.id.toString(),
                    name: user.username,
                }));
                setChatRooms(chatRoomData);

                // 선택된 첫 번째 채팅방의 ID 설정
                if (chatRoomData.length > 0 && selectedChatRoom === null) {
                    setSelectedChatRoom(chatRoomData[0].id);
                }
            });
        // 여기서 [] 의존성 배열을 빈 배열로 설정하여 useEffect가 컴포넌트 마운트될 때만 실행되도록
    }, []);

    useEffect(() => {
        // 선택된 첫 번째 채팅방의 ID 설정
        if (chatRooms.length > 0 && selectedChatRoom === null) {
            setSelectedChatRoom(chatRooms[0].id);
        }
    }, [chatRooms, selectedChatRoom]);

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

        setUserProfile({
            username: username,
            profileImage: null, // 여기에 프로필 이미지 URL
        });
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
                updateUserProfile={updateUserProfile}
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
