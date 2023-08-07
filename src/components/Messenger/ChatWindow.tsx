import React from 'react';
import styled from '@emotion/styled';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

interface Props {
    chatRoomId: string | null;
    chatMessages: { roomId: string; message: string }[];
    inputMessage: string;
    onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onSendMessage: () => void;
    username: string;
    onUsernameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    chatRoomName: string | undefined; // 선택된 채팅방의 이름을 받아올 때
}

const ChatWindow: React.FC<Props> = ({
    chatRoomId,
    chatMessages,
    inputMessage,
    onInputChange,
    onSendMessage,
    username,
    chatRoomName, // 선택된 채팅방의 이름을 받아올 때
}) => {
    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onSendMessage();
        }
    };
    return (
        <ChatWindowBox>
            {chatRoomId ? (
                <>
                    <TopArea>
                        <NickNameTitle>{chatRoomName}</NickNameTitle>{' '}
                    </TopArea>
                    <TextBox>
                        <MessageArea>
                            {chatMessages.map((message, index) => (
                                <div key={index}>{message.message}</div>
                            ))}
                        </MessageArea>
                        <SendArea>
                            <div>{username}</div>
                            <input
                                type="text"
                                value={inputMessage}
                                onChange={onInputChange}
                                onKeyPress={handleKeyPress}
                            />
                            <SendBtn onClick={onSendMessage}>
                                <span className="blind">보내기</span>
                                <FontAwesomeIcon icon={faPaperPlane} />
                            </SendBtn>
                        </SendArea>
                    </TextBox>
                </>
            ) : (
                <div>운동 메이트와 함께 채팅을 시작해 보세요!</div>
            )}
        </ChatWindowBox>
    );
};
const ChatWindowBox = styled.div`
    position: relative;
    top: 0;
    left: 390px;
    width: 1000px;
    height: 600px;
    padding: 20px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
    background-color: #d9d9d9;
`;
const TopArea = styled.div`
    position: relative;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    height: 100px;

    ::before {
        content: '';
        position: absolute;
        left: 0;
        bottom: 0px;
        width: 100%;
        height: 1px;
        background-color: rgb(91, 75, 56);
    }
`;
const NickNameTitle = styled.strong`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-size: 20px;
`;

const TextBox = styled.div`
    position: relative;
    input {
        width: 800px;
        height: 40px;
        margin-right: 10px;
        border: 1px solid #fff;
        border-radius: 5px;
        outline: none;
        font-size: 20px;
    }
`;
const MessageArea = styled.div`
    position: absolute;
    overflow-y: scroll;

    background-color: rgb(91, 75, 56);
`;
const SendArea = styled.div`
    position: absolute;
    bottom: 0;
    background-color: rgb(91, 75, 56);
`;
const SendBtn = styled.button`
    width: 40px;
    height: 40px;
    border: none;
    background: none;
`;
export default ChatWindow;
