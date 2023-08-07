// ChatList.tsx
import React, { useState } from 'react';
import styled from '@emotion/styled';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGroup } from '@fortawesome/free-solid-svg-icons';

import MateList from '../common/MateList';
import ChatListItem from './ChatListItem';

interface ChatListProps {
    chatRooms: string[];
    onChatRoomClick: (chatRoom: string) => void;
    data: ChatData;
    selectedChat: string | null;
}

interface ChatData {
    [key: string]: {
        senderProfileImage: string;
        senderNickname: string;
        lastMessageDate: string;
        lastMessageContent: string;
        newMessageCount: number;
        messages: string[];
    };
}

const ChatList: React.FC<ChatListProps> = ({ chatRooms, onChatRoomClick, data, selectedChat }) => {
    const [isMateListOpen, setIsMateListOpen] = useState(false);

    // 클릭시 운동메이트 리스트 모달창
    const handleShowMateListClick = () => {
        setIsMateListOpen(true);
    };
    const handleCloseMateList = () => {
        setIsMateListOpen(false);
    };

    return (
        <MateListBox>
            <TopArea>
                <MateListTitle>운동 메이트 리스트</MateListTitle>

                <MateListButton onClick={handleShowMateListClick}>
                    <span className="blind">운동 메이트 리스트 버튼</span>
                    <FontAwesomeIcon icon={faUserGroup} />
                </MateListButton>
                {isMateListOpen && <MateList isOpen={true} onClose={handleCloseMateList} />}
            </TopArea>

            <BottomArea>
                {chatRooms.map((room) =>
                    data[room] ? (
                        <ChatListItem
                            key={room}
                            senderProfileImage={data[room].senderProfileImage}
                            senderNickname={data[room].senderNickname}
                            lastMessageDate={data[room].lastMessageDate}
                            lastMessageContent={data[room].lastMessageContent}
                            newMessageCount={data[room].newMessageCount}
                            onClick={() => onChatRoomClick(room)}
                            isActive={selectedChat === room}
                        />
                    ) : null
                )}
            </BottomArea>
        </MateListBox>
    );
};

// emotion css style
const MateListBox = styled.div`
    position: relative;
    top: 0;
    left: 0;
    width: 290px;
    height: 100%;
    padding: 20px;
    background-color: cadetblue;
`;
const TopArea = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 80px;
    margin-bottom: 10px;
    background-color: green;
`;
const MateListButton = styled.button`
    display: inline-block;
    margin-left: 20px;
    font-size: 18px;
    border: none;
    background: none;

    & :hover {
        color: #7f5539;
        transition: all 0.3s;
    }
`;
const MateListTitle = styled.h2``;

const BottomArea = styled.ul`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    li {
        padding-top: 20px;
        font-size: 20px;
        font-weight: 700;
    }
`;
export default ChatList;
