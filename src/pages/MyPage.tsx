import React, { useState } from 'react';
import MyInformation from '../components/MyPage/MyInformation';
import MyPostList from '../components/MyPage/MyPostList';
import styled from '@emotion/styled';

const MyPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState('MyInformation');

    const handleTabClick = (tabName: string) => {
        setActiveTab(tabName);
    };

    return (
        <div>
            <Tab>
                <Button onClick={() => handleTabClick('MyInformation')}>나의 정보</Button>
                <Button onClick={() => handleTabClick('MyPostList')}>작성 게시글</Button>
                <Button onClick={() => handleTabClick('MateList')}>운동 메이트</Button>
            </Tab>
            <Content>
                {activeTab === 'MyInformation' && <MyInformation />}
                {activeTab === 'MyPostList' && <MyPostList />}
            </Content>
        </div>
    );
};

const Button = styled.button`
    width: 180px;
    height: 50px;
    border-radius: 30px;
    background-color: white;
    border: 0.5px solid black;
    padding: 9px 20px;
    margin-right: 25px;
    font-weight: bold;
    font-size: 22px;
    cursor: pointer;
    white-space: nowrap;
    overflow: hidden;

    &:hover {
        background-color: #d9d9d9;
    }
`;

const Tab = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 90px;
    margin-bottom: 70px;
`;

const Content = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px;
    margin-bottom: 50px;
`;

export default MyPage;
