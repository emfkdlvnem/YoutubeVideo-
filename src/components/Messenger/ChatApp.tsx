// ChatApp.tsx
import React, { useState, useEffect, useMemo } from 'react';
import styled from '@emotion/styled';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGroup } from '@fortawesome/free-solid-svg-icons';

import Modal from 'react-modal';
Modal.setAppElement('#root');

import ChatList from './ChatList';
import MateList from '../common/MateList';
import ChatWindow from './ChatWindow';

import socket from '../utils/websoket';

const ChatApp: React.FC = () => {
    const MateLists = useMemo(() => ['박명수', '강해린', '전소미', '팜하니', '다니엘'], []);

    // 첫 번째 채팅방 이름을 설정하는 함수
    const getInitialChatRoom = (chatRooms: string[]): string | null => {
        if (chatRooms.length > 0) {
            return chatRooms[0]; // 리스트의 첫 번째 채팅방 이름 반환
        }
        return null; // 채팅방이 없을 경우 null 반환
    };

    const [selectedChat, setSelectedChat] = useState<string | null>(() =>
        getInitialChatRoom(MateLists)
    );
    const [isMateListOpen, setIsMateListOpen] = useState(false);
    const [messages, setMessages] = useState<string[]>([]);

    const handleChatRoomClick = (chatRoom: string) => {
        setSelectedChat(chatRoom);
    };

    // 클릭시 운동메이트 리스트 모달창
    const handleShowMateListClick = () => {
        setIsMateListOpen(true);
    };
    const handleCloseMateList = () => {
        setIsMateListOpen(false);
    };

    useEffect(() => {
        // 채팅 메시지 받기
        socket.on('chat message', (message: string) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });
    }, []);

    return (
        <ChatAppInn>
            <MateListButton onClick={handleShowMateListClick}>
                <span className="blind">운동 메이트 리스트</span>
                <FontAwesomeIcon icon={faUserGroup} />
            </MateListButton>
            {isMateListOpen && <MateList isOpen={true} onClose={handleCloseMateList} />}
            <ChatBox>
                <ChatList
                    chatRooms={MateLists}
                    onChatRoomClick={handleChatRoomClick}
                    MateLists={MateLists}
                />
                {selectedChat ? (
                    <ChatWindow chatRoom={selectedChat} messages={messages} />
                ) : (
                    <p>Select a chat room</p>
                )}
            </ChatBox>
        </ChatAppInn>
    );
};

const ChatAppInn = styled.section`
    position: relative;
    max-width: 1440px;
    min-height: 100vh;
    height: 100%;
    margin: 150px auto 0;
    padding: 20px 60px;
    box-sizing: border-box;
    background-color: #f8f8f8;
`;
const MateListButton = styled.button`
    position: absolute;
`;
const ChatBox = styled.div`
    display: flex;
    align-items: center;
    width: 1440px;
`;
export default ChatApp;
