// pages/Messenger.tsx
import React from 'react';
import styled from '@emotion/styled';
import ChatApp from '../components/Messenger/ChatApp';

interface Props {}

const Messenger: React.FC<Props> = () => {
    return (
        <MessengerWrapper>
            <ChatApp />
        </MessengerWrapper>
    );
};

const MessengerWrapper = styled.div`
    position: relative;
`;

export default Messenger;
