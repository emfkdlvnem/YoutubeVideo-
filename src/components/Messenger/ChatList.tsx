// ChatList.tsx
import React from 'react';
import styled from '@emotion/styled';

interface ChatListProps {
    chatRooms: string[];
    onChatRoomClick: (chatRoom: string) => void;
    MateLists: string[];
}

const ChatList: React.FC<ChatListProps> = ({ chatRooms, onChatRoomClick, MateLists }) => {
    return (
        <div>
            <MateListTitle>운동 메이트 리스트</MateListTitle>
            <ul>
                {chatRooms.map((room) =>
                    // 삼항 연산자를 사용하여 조건부 렌더링
                    MateLists.includes(room) ? (
                        <li key={room} onClick={() => onChatRoomClick(room)}>
                            {room}
                        </li>
                    ) : null
                )}
            </ul>
        </div>
    );
};

// emotion css style
const MateListTitle = styled.h2``;
export default ChatList;
