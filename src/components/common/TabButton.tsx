import styled from '@emotion/styled';
import { useState } from 'react';



const TabButton = () => {
    const [category, setCategory] = useState<string>('러닝');

    const handleTabClick = (newCategory: string) => {
        setCategory(newCategory);
    };


    return (
        <MapInn>
            <PageTitle>운동 메이트 찾기</PageTitle>
            <BtnTab>
                <button 
                className={`category01 ${category === '러닝' ? 'active' : ''}`} 
                onClick={() => handleTabClick('러닝')}
                >
                러닝
                </button>
                <button 
                className={`category02 ${category === '등산' ? 'active' : ''}`} 
                onClick={() => handleTabClick('등산')}
                >
                등산
                </button>
                <button 
                className={`category03 ${category === '헬스' ? 'active' : ''}`} 
                onClick={() => handleTabClick('헬스')}
                >
                헬스
                </button>
            </BtnTab>
        </MapInn>
    );
};

const MapInn = styled.div`
    position: relative;
    max-width: 1440px;
    min-height: 100vh;
    height: 100%;
    margin: 120px auto 0;
    padding: 20px 60px;
    box-sizing: border-box;
    background-color: #f8f8f8;
`;
const PageTitle = styled.h2`
    position: relative;

    &::before {
        content: '';
        position: absolute;
        left: 0;
        bottom: -10px;
        width: 100%;
        height: 1px;
        color: #000;
        background-color: #000;
    }
`;
const BtnTab = styled.div`
    position: relative;
    top: 60px;
    
    button {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        border: 1px solid #000;
        border-radius: 20px;
        padding: 4px 20px;
        background-color: #fff;     
        
        &.active {
            background-color: #000;
            color: #fff;
        }
    }
    .category01 {
        left: 40%;
        transform: translateX(-40%);
    }
    .category03 {
        left: 60%;
        transform: translateX(-60%);
    }
`;

export default TabButton;
