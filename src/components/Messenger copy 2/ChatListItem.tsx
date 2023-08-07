// ChatListItem.tsx
import React from 'react';
import styled from '@emotion/styled';

interface Props {
    senderProfileImage: string;
    senderNickname: string;
    lastMessageDate: string;
    lastMessageContent: string;
    newMessageCount: number;
    onClick: () => void;
    isActive: boolean;
}

const ChatListItem: React.FC<Props> = ({
    senderProfileImage,
    senderNickname,
    lastMessageDate,
    lastMessageContent,
    newMessageCount,
    onClick,
    isActive,
}) => {
    return (
        <ProfileListItem onClick={onClick} isActive={isActive}>
            <ProfileImageContainer>
                <ProfileImage src={senderProfileImage} />
            </ProfileImageContainer>

            <ColTop>
                <SenderNickname>{senderNickname}</SenderNickname>
                <LastMessageContent>{lastMessageContent}</LastMessageContent>
            </ColTop>
            <ColBottom>
                <LastMessageDate>{lastMessageDate}</LastMessageDate>
                {newMessageCount > 0 && <NewMessageCount>{newMessageCount}</NewMessageCount>}
            </ColBottom>
        </ProfileListItem>
    );
};

const ProfileListItem = styled.li<{ isActive: boolean }>`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    background-color: white;
    cursor: pointer; /* Add cursor pointer for indicating clickable item */
    padding: 5px; /* Add some padding for better visual */
`;

const ProfileImageContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    border: 1px transparent solid;
    border-radius: 50%;
    overflow: hidden;
`;

const ProfileImage = styled.img`
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover; /* Maintain aspect ratio and cover the container */
`;

const ColTop = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 150px;
`;

const SenderNickname = styled.p`
    font-size: 16px;
    font-weight: bold;
`;

const LastMessageContent = styled.p`
    font-size: 14px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis; /* Add ellipsis for long messages */
`;

const ColBottom = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
    width: 60px;
    height: 44px;
`;

const LastMessageDate = styled.p`
    font-size: 12px;
    color: gray;
    margin-right: 5px;
    white-space: nowrap;
`;

const NewMessageCount = styled.p`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20px;
    height: 20px;
    margin-right: 5px;
    background-color: red;
    color: white;
    border-radius: 50%;
`;

export default ChatListItem;
