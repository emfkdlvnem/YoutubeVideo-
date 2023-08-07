import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import ChatList from './ChatList';
import ChatWindow from './ChatWindow';

interface ChatRoom {
    id: string;
    name: string;
}

const ChatApp: React.FC = () => {
    const [selectedChatRoom, setSelectedChatRoom] = useState<string | null>(null);
    const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
    const [chatMessages, setChatMessages] = useState<{ roomId: string; message: string }[]>([]);
    const [inputMessage, setInputMessage] = useState('');
    const [username, setUsername] = useState('');

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
        // 실제로는 서버로부터 채팅방 리스트를 받아와야 하지만, 여기서는 하드코딩으로 대체합니다.
        // 받아온 채팅방 리스트를 chatRooms 상태에 업데이트합니다.
        setChatRooms([
            { id: '1', name: '박명수' },
            { id: '2', name: '강해린' },
            { id: '3', name: '전소미' },
            { id: '4', name: '다니엘' },
            { id: '5', name: '카리나' },
            { id: '6', name: '나선욱' },
        ]);
    }, []); // 의존성 배열을 빈 배열로 설정하여 useEffect가 컴포넌트 마운트될 때만 실행되도록 합니다.

    useEffect(() => {
        // 선택된 첫 번째 채팅방의 ID를 설정합니다.
        if (chatRooms.length > 0 && selectedChatRoom === null) {
            setSelectedChatRoom(chatRooms[0].id);
        }
    }, [chatRooms, selectedChatRoom]); // chatRooms와 selectedChatRoom을 의존성 배열에 포함합니다.

    const handleChatRoomClick = (chatRoomId: string) => {
        setSelectedChatRoom(chatRoomId);
    };

    const handleSendMessage = () => {
        if (inputMessage.trim() === '') return;

        setChatMessages((prevMessages) => [
            ...prevMessages,
            { roomId: selectedChatRoom!, message: `${username}: ${inputMessage}` }, // 사용자명과 메시지를 함께 보냅니다.
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
                chatRoomName={chatRooms.find((room) => room.id === selectedChatRoom)?.name} // 선택된 채팅방의 이름을 전달합니다.
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
