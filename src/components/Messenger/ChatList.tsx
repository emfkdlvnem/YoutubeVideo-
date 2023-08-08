import React, { useState } from 'react';
import styled from '@emotion/styled';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserGroup } from '@fortawesome/free-solid-svg-icons';

import MateList from '../common/MateList';

interface ChatRoom {
    id: string;
    name: string;
}

interface Props {
    chatRooms: ChatRoom[];
    onChatRoomClick: (chatRoomId: string) => void;
}

const ChatList: React.FC<Props> = ({ chatRooms, onChatRoomClick }) => {
    const [isMateListOpen, setIsMateListOpen] = useState(false);

    // 클릭시 운동메이트 리스트 모달창
    const handleShowMateListClick = () => {
        setIsMateListOpen(true);
    };
    const handleCloseMateList = () => {
        setIsMateListOpen(false);
    };

    return (
        <ChatListBox>
            <TopArea>
                <MateListTitle>운동 메이트 리스트</MateListTitle>

                <MateListButton onClick={handleShowMateListClick}>
                    <span className="blind">운동 메이트 리스트 버튼</span>
                    <FontAwesomeIcon icon={faUserGroup} />
                </MateListButton>
                {isMateListOpen && <MateList isOpen={true} onClose={handleCloseMateList} />}
            </TopArea>

            <BottomArea>
                {chatRooms.map((chatRoom) => (
                    <li key={chatRoom.id} onClick={() => onChatRoomClick(chatRoom.id)}>
                        {chatRoom.name}
                    </li>
                ))}
            </BottomArea>
        </ChatListBox>
    );
};
// emotion css style
const ChatListBox = styled.div`
    position: absolute;
    top: 0;
    left: 50px;
    width: 320px;
    height: 600px;
    overflow-y: auto;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
`;
const TopArea = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 120px;
    background-color: #ffd4d4;
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
    height: 100%;
    // background-color: #f0f0f0;
    li {
        cursor: pointer;
        width: 100%;
        height: 80px;
        text-align: center;
        font-size: 20px;
        font-weight: 700;
        line-height: 80px;
        border-bottom: 1px solid #fff;
    }
`;
export default ChatList;
