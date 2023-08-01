import styled from '@emotion/styled';
import { useEffect, useRef, useState } from 'react';

declare global {
    interface Window {
        kakao: any;
    }
}

interface Coords {
    lat: number;
    lng: number;
}

const categoryCoords: { [key: string]: Coords } = {
    러닝: { lat: 37.444917, lng: 127.138868 },
    등산: { lat: 37.444917, lng: 127.138868 },
    헬스: { lat: 37.444917, lng: 127.138868 },
};

const Map = () => {
    const container = useRef<HTMLDivElement>(null);
    const [map, setMap] = useState<any>(null);
    const [category, setCategory] = useState<string>('러닝');

    const handleTabClick = (newCategory: string) => {
        setCategory(newCategory);
    };

    useEffect(() => {
        const script = document.createElement('script');
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=ee5f634503306d250300857b899299a0`;
        document.head.appendChild(script);
    
        script.onload = () => {
            window.kakao.maps.load(() => {
                const map = new window.kakao.maps.Map(container.current, {
                center: new window.kakao.maps.LatLng(37.444917, 127.138868),
                level: 3,
                });
    
                setMap(map);
            });
        };
    }, []);

    useEffect(() => {
        if (map && category) {
        const coords = categoryCoords[category];

        if (coords) {
            const locPosition = new window.kakao.maps.LatLng(coords.lat, coords.lng);
            map.setCenter(locPosition);
        }
        }
    }, [map, category]);

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
            <MapContainer id="map" ref={container} style={{ width: '100%', height: '100%' }}></MapContainer>
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
const MapContainer = styled.div`
    width:1000px;
    height:500px;
    margin: 150px auto 0;
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

export default Map;
